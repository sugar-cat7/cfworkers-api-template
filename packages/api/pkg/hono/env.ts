import type { Env } from "../env";
import type { CustomLogger } from "../logging";
import { Database } from "../db";
import { Tracer } from "@opentelemetry/api";

export type ServiceContext = {
    logger: CustomLogger;
    db: Database
    queue: Queue
    tracer: Tracer
};

export type HonoEnv = {
    Bindings: {
        env: Env;
    };
    Variables: {
        requestId: string;
        services: ServiceContext;
    };
};
