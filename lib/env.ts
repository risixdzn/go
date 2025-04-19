import { z } from "zod";

const envSchema = z.object({
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),

    DATABASE_URL: z.string().url(),

    SIGNUP_MODE: z.enum(["public", "restricted"]),
    WHITELIST_EMAILS: z.string().optional(),
});

export const env = envSchema.parse(process.env);
