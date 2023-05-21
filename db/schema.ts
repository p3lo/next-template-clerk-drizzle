import { relations, type InferModel } from 'drizzle-orm';
import { integer, json, pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

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

export const profiles = pgTable(
  'profiles',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    avatar: varchar('avatar', { length: 255 }).notNull().default(''),
    username: varchar('username', { length: 255 }).notNull().default(''),
    email: varchar('email', { length: 255 }).notNull().default(''),
  },
  (profiles) => {
    return {
      userIdIndex: uniqueIndex('user_id_idx').on(profiles.userId),
    };
  }
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export type User = InferModel<typeof users>;
