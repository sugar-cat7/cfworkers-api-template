import { z } from "zod";

export const zEnv = z.object({
    CLOUDFLARE_API_KEY: z.string().optional(),
    CLOUDFLARE_ZONE_ID: z.string().optional(),
    LOG_TYPE: z.enum(['pretty', 'json']).default('pretty'),
    LOG_MINLEVEL: z
        .string()
        .regex(/^\d+$/)
        .transform((s) => parseInt(s, 10)).default("0"),
    LOG_HIDE_POSITION: z.string()
        .transform((s) => s === 'true').default("false"),
    POSTGRES_DB_HOST: z.string().default('localhost'),
    POSTGRES_DB_PASSWORD: z.string().default('password'),
    POSTGRES_DB_USER: z.string().default('user'),
});

export type Env = z.infer<typeof zEnv>;
