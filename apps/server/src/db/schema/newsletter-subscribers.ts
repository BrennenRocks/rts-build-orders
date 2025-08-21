import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../shared';

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  confirmedAt: timestamp('confirmed_at'),
  ...timestamps,
});

export const newsletterVerificationTokens = pgTable(
  'newsletter_verification_tokens',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tokenHash: text('token_hash').notNull().unique(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    used: boolean('used').default(false).notNull(),
    newsletterSubscriberId: integer('newsletter_subscriber_id')
      .notNull()
      .references(() => newsletterSubscribers.id, { onDelete: 'cascade' }),
    ...timestamps,
  }
);

export const newsletterSubscribersRelations = relations(
  newsletterSubscribers,
  ({ many }) => ({
    verificationTokens: many(newsletterVerificationTokens),
  })
);

export const newsletterVerificationTokensRelations = relations(
  newsletterVerificationTokens,
  ({ one }) => ({
    newsletterSubscriber: one(newsletterSubscribers, {
      fields: [newsletterVerificationTokens.newsletterSubscriberId],
      references: [newsletterSubscribers.id],
    }),
  })
);
