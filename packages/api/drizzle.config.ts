import type { Config } from 'drizzle-kit'

export default {
    schema: './routes/schema/db/index.ts',
    out: './gen/db/migration/ddl',
    dialect: 'postgresql',
    verbose: false,
    strict: true,
} satisfies Config
