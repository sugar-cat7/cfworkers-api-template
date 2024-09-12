import type { ExtractTablesWithRelations } from 'drizzle-orm'
import type { SQLiteTransaction, SQLiteTransactionConfig } from 'drizzle-orm/sqlite-core'
import { AppError, type BaseError, ErrorCodeSchema, type Result, wrap } from '../../errors'
import type { Database } from './provider'
import type * as schema from './schema'

const defaultConfig: SQLiteTransactionConfig = {
  behavior: 'deferred',
}

/**
 *
 * @deprecated Use `db.batch` instead of `txManager`
 *ß https://orm.drizzle.team/docs/batch-api
 */
export const txManager = async <T, E extends BaseError>(
  db: Database,
  operation: (
    tx: SQLiteTransaction<
      'async',
      D1Result<unknown>,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >
  ) => Promise<Result<T, E>>,
  config?: SQLiteTransactionConfig
): Promise<Result<T, E>> => {
  const result = await wrap(
    db.transaction(async (tx) => {
      const op = await operation(tx)
      if (op.err) {
        tx.rollback()
      }
      return op
    }, config || defaultConfig),
    (e) =>
      new AppError({
        message: `Failed to execute transaction: ${e}`,
        code: ErrorCodeSchema.Enum.INTERNAL_SERVER_ERROR,
      })
  )
  if (result.err) {
    throw result.err
  }
  return result.val
}
