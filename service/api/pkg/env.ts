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
    DB_CONNECTION_STRING: z.string().default("postgresql://user:password@localhost:5432/localdb    "),
});

export type Env = z.infer<typeof zEnv>;
