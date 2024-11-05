import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string(),
  VITE_GOOGLE_CLIENT_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const env = import.meta.env;
  return envSchema.parse(env);
}
