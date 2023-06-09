// import { prisma } from "@/lib/db";
import { db } from '@/db/db';
import { profiles, users } from '@/db/schema';
import { clerkClient } from '@clerk/nextjs/server';
import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created') {
    const { id, username, ...attributes } = evt.data;

    await db.transaction(async (trx) => {
      const user = await trx
        .insert(users)
        .values({ externalId: id as string, userInfo: attributes })
        .onConflictDoUpdate({ target: users.externalId, set: { userInfo: attributes } })
        .returning();

      await trx
        .insert(profiles)
        .values({ userId: user[0].id, avatar: '' as string, username: username as string, email: '' as string });
    });
  }
}

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
