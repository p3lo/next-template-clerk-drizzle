import type { InferModel } from 'drizzle-orm';
import { json, pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    externalId: varchar('external_id', { length: 255 }).notNull(),
    userInfo: json('user_info').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (users) => {
    return {
      externalIdIndex: uniqueIndex('externalid_idx').on(users.externalId),
    };
  }
);

export type User = InferModel<typeof users>;
