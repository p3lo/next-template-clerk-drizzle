import { db } from '@/db/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { NextResponse } from 'next/server';

async function handler() {
  try {
    const migration = await migrate(db, { migrationsFolder: 'db/migrations' });
    return NextResponse.json({ migration }, { status: 200 });
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }
}

export const GET = handler;
