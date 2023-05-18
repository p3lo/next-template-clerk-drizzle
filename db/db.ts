import { Pool } from 'pg';
import invariant from 'tiny-invariant';
import { drizzle } from 'drizzle-orm/node-postgres';

invariant(process.env.DATABASE_URL, 'DATABASE_URL is not set');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
