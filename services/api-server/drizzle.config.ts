import type { Config } from 'drizzle-kit'

export default {
  schema: './pkg/db/sqlite/schema/index.ts',
  out: './pkg/db/sqlite/gen/ddl',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    databaseId: process.env.CLOUDFLARE_DATABASE_ID || '',
    token: process.env.CLOUDFLARE_D1_TOKEN || '',
  },
} satisfies Config