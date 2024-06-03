import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { createDB } from '@/pkg/db'
import { zEnv } from '@/pkg/env'

const main = async () => {
    const envResult = zEnv.safeParse(process.env)
    if (!envResult.success) {
        console.error('Failed to parse environment variables', envResult.error)
        process.exit(1)
    }

    const db = await createDB(
        {
            host: envResult.data.DB_HOST,
            username: envResult.data.DB_USER,
            password: envResult.data.DB_PASSWORD,
            database: envResult.data.DB_NAME,
            retry: 5,
        }
    )

    await migrate(db.query, {
        migrationsFolder: './gen/db/migration/ddl',
    })

    await db.client.end()
}

await main().catch((err) => {
    console.error(err)
    process.exit(1)
})
