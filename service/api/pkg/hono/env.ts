import type { Env } from "@/pkg/env";
import type { CustomLogger } from "@/pkg/logging";
import { Database } from "@/pkg/db";

export type ServiceContext = {
    logger: CustomLogger;
    db: Database
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
