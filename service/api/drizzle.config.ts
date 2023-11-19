import type { Config } from 'drizzle-kit'

const cfConfig = {
  schema: './schema/db/schema.ts',
  out: './schema/db/migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: './wrangler.toml',
    dbName: 'test-app',
  },
  verbose: false,
  strict: true,
} satisfies Config

const localConfig = {
  schema: './schema/db/schema.ts',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config

export default process.env.NODE_ENV === 'production' ? cfConfig : localConfig
