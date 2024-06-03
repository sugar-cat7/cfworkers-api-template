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
    DB_HOST: z.string().default('localhost'),
    DB_PASSWORD: z.string().default('password'),
    DB_USER: z.string().default('user'),
    DB_NAME: z.string().default('localdb'),
});

export type Env = z.infer<typeof zEnv>;
