import { type DrizzleD1Database, drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

type ConnectionOptions = {
  binding: D1Database
  // retry: number | false;
  // logger?: Logger;
}

export type Database = DrizzleD1Database<typeof schema>

export const createDB = (opts: ConnectionOptions): Database => {
  // TODO: ping the database to ensure it's up
  return drizzle(opts.binding, { schema })
}
