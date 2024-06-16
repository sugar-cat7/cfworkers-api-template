import type { Env } from "@/pkg/env";
import type { CustomLogger } from "@/pkg/logging";
import { Database } from "@/pkg/db";
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
