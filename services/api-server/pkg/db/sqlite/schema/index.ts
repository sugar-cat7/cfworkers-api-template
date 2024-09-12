import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const example = sqliteTable('example', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
})

const insertExampleSchema = createInsertSchema(example)
const selectExampleSchema = createSelectSchema(example)
type InsertExampleTable = InferInsertModel<typeof example>
type SelectExampleTable = InferSelectModel<typeof example>

export {
  example,
  type InsertExampleTable,
  type SelectExampleTable,
  insertExampleSchema,
  selectExampleSchema,
}
