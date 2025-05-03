import { LocationIQProvider } from "./provider.js";
let locationiqProvider;
const defaultConfig = {
    apiKey: "",
    baseUrl: "https://api.locationiq.com/v1"
};
class LocationIQPlugin {
    name = "tsdiapi-locationiq";
    config;
    context;
    provider;
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new LocationIQProvider();
    }
    async onInit(ctx) {
        this.context = ctx;
        // Get API key from environment or config
        const config = this.config;
        const apiKey = ctx.projectConfig.get('LOCATIONIQ_API_KEY', config.apiKey);
        this.config.apiKey = apiKey;
        this.provider.init(this.config, ctx.fastify.log);
        locationiqProvider = this.provider;
        ctx.fastify.decorate('locationiq', this.provider);
    }
}
export function useLocationIQProvider() {
    if (!locationiqProvider) {
        throw new Error('LocationIQ Plugin not initialized');
    }
    return locationiqProvider;
}
export default function createPlugin(config) {
    return new LocationIQPlugin(config);
}
//# sourceMappingURL=index.js.map