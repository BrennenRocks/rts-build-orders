import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { serverEnv } from 'env.server';
import { db } from '../db';
// biome-ignore lint/performance/noNamespaceImport: Drizzle expects this
import * as schema from '../db/schema/auth';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  trustedOrigins: [serverEnv.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
  },
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
});
