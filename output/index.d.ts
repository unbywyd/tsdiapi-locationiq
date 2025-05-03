import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { LocationIQProvider, LocationIQConfig } from "./provider.js";
declare module "fastify" {
    interface FastifyInstance {
        locationiq: LocationIQProvider;
    }
}
declare class LocationIQPlugin implements AppPlugin {
    name: string;
    config: LocationIQConfig;
    context: AppContext;
    provider: LocationIQProvider;
    constructor(config?: LocationIQConfig);
    onInit(ctx: AppContext): Promise<void>;
    preReady(): Promise<void>;
}
export declare function useLocationIQProvider(): LocationIQProvider;
export default function createPlugin(config?: LocationIQConfig): LocationIQPlugin;
export {};
//# sourceMappingURL=index.d.ts.map