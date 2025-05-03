import { PluginOptions } from "./index.js";
import type { AppContext } from "@tsdiapi/server";

export class LocationiqProvider {
    private config: PluginOptions;
    private context: AppContext;

    constructor(config: PluginOptions, ctx: AppContext) {
        this.config = config;
        this.context = ctx;
    }

    public init() {
        this.context.fastify.log.info(`Initializing Locationiq provider...`);
        // TODO: Your initialization logic here
    }
}