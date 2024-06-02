import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from "pg";

type ConnectionOptions = {
    host: string;
    username: string;
    password: string;
    retry: number | false;
    // logger?: Logger;
};

export type Query = ReturnType<typeof drizzle>
type Database = {
    db: Query;
    client: Client;
};

export const createDB = async (opts: ConnectionOptions): Promise<Database> => {
    const client = new Client({ connectionString: `postgres://${opts.username}:${opts.password}@${opts.host}` });
    await client.connect();
    return {
        db: drizzle(client),
        client,
    };
}
