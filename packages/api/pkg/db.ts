import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from "pg";

type ConnectionOptions = {
    connectionString: string;
    retry: number | false;
    // logger?: Logger;
};

export type Query = ReturnType<typeof drizzle>
export type Database = {
    query: Query;
    client: Client;
};

export const createDB = async (opts: ConnectionOptions): Promise<Database> => {
    const client = new Client(opts.connectionString);
    await client.connect();
    return {
        query: drizzle(client),
        client,
    };
}
