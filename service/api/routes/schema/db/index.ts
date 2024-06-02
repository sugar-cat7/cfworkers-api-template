import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

const UserTableSchema = pgTable('user', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
})

type InsertUserTable = InferInsertModel<typeof UserTableSchema>
type SelectUserTable = InferSelectModel<typeof UserTableSchema>
const insertUserSchema = createInsertSchema(UserTableSchema)
const selectUserTable = createSelectSchema(UserTableSchema)

export { UserTableSchema, InsertUserTable, SelectUserTable, insertUserSchema, selectUserTable }
