import { z } from 'zod';

const serverSchema = z.object({
  DATABASE_URL: z.string(),
  // RESEND_API_KEY: z.string(),
  // FROM_EMAIL: z.string(),
  CORS_ORIGIN: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  // DISCORD_CLIENT_ID: z.string(),
  // DISCORD_CLIENT_SECRET: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  // S3_ACCESS_KEY: z.string(),
  // S3_SECRET_KEY: z.string(),
  // S3_REGION: z.string(),
  // S3_ENDPOINT: z.string(),
  // S3_BUCKET_NAME: z.string(),
  // S3_PUBLIC_URL: z.string(),
  // CLOUDFLARE_API_TOKEN_VALUE: z.string(),
  CRON_SERVICE: z.coerce.boolean().optional(),
  PORT: z.coerce.number(),
});

const parsedEnv = serverSchema.safeParse(process.env);
if (!parsedEnv.success) {
  const errors = parsedEnv.error.issues;
  for (const error of errors) {
    console.error(JSON.stringify(error, null, 2));
  }

  process.exit(1);
}

export const serverEnv = parsedEnv.data;
