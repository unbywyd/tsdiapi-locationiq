import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { LocationIQProvider, LocationIQConfig } from "./provider.js";
import registerLocationRoutes from "./controllers/location.controller.js";

let locationiqProvider: LocationIQProvider;

declare module "fastify" {
    interface FastifyInstance {
        locationiq: LocationIQProvider;
    }
}
const defaultConfig: LocationIQConfig = {
    apiKey: "",
    baseUrl: "https://api.locationiq.com/v1",
    autoRegisterControllers: true
};

class LocationIQPlugin implements AppPlugin {
    name = "tsdiapi-locationiq";
    config: LocationIQConfig;
    context: AppContext;
    provider: LocationIQProvider;

    constructor(config?: LocationIQConfig) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new LocationIQProvider();
    }

    async onInit(ctx: AppContext) {
        this.context = ctx;
        // Get API key from environment or config
        const config = this.config;
        const apiKey = ctx.projectConfig.get('LOCATIONIQ_API_KEY', config.apiKey) as string;

        this.config.apiKey = apiKey;
        this.provider.init(this.config, ctx.fastify.log);
        locationiqProvider = this.provider;
        ctx.fastify.decorate('locationiq', this.provider);

    }
    async preReady() {
        if (this.config.autoRegisterControllers) {
            await registerLocationRoutes(this.context);
        }
    }
}

export function useLocationIQProvider(): LocationIQProvider {
    if (!locationiqProvider) {
        throw new Error('LocationIQ Plugin not initialized');
    }
    return locationiqProvider;
}

export default function createPlugin(config?: LocationIQConfig) {
    return new LocationIQPlugin(config);
}