import type { Env } from "@/pkg/env";
import type { CustomLogger } from "@/pkg/logging";
import { Query } from "@/pkg/db";

export type ServiceContext = {
    logger: CustomLogger;
    db: Query
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
