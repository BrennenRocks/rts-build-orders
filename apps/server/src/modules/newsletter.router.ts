import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import {
  newsletterSubscribers as newsletterSubscribersTable,
  newsletterVerificationTokens as newsletterVerificationTokensTable,
} from '@/db/schema';
import { sendNewsletterConfirmationEmail } from '@/lib/email';
import { publicProcedure, router } from '@/lib/trpc';
import { generateToken, hashToken } from '@/lib/utils';

export const newsletterRouter = router({
  signup: publicProcedure
    .input(z.object({ email: z.email() }))
    .mutation(async ({ input }) => {
      const { email } = input;

      const subscriber = await db.query.newsletterSubscribers.findFirst({
        where: eq(newsletterSubscribersTable.email, email),
      });

      if (subscriber) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exists',
        });
      }

      const [newSubscriber] = await db
        .insert(newsletterSubscribersTable)
        .values({ email })
        .returning();

      const token = generateToken();
      const tokenHash = hashToken(token);

      try {
        await db.insert(newsletterVerificationTokensTable).values({
          tokenHash,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 min
          newsletterSubscriberId: newSubscriber.id,
        });
      } catch (e) {
        console.error(e);
      }

      await sendNewsletterConfirmationEmail(email, token);

      return { message: 'Newsletter confirmation email sent' };
    }),

  confirm: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const { token } = input;
      const tokenHash = hashToken(token);

      const record = await db.query.newsletterVerificationTokens.findFirst({
        where: eq(newsletterVerificationTokensTable.tokenHash, tokenHash),
        with: { newsletterSubscriber: true },
      });

      if (!record || record.used || record.expiresAt < new Date()) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid or expired token',
        });
      }

      await db
        .update(newsletterSubscribersTable)
        .set({ confirmedAt: new Date() })
        .where(
          eq(newsletterSubscribersTable.id, record.newsletterSubscriberId)
        );

      await db
        .update(newsletterVerificationTokensTable)
        .set({ used: true })
        .where(eq(newsletterVerificationTokensTable.tokenHash, tokenHash));

      return { message: "Email confirmed! You're on the waitlist." };
    }),
});
