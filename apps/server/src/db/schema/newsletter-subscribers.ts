import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { timestamps } from '../utils';

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  confirmedAt: timestamp('confirmed_at'),
  ...timestamps,
});
