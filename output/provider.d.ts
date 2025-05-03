import type { AppContext } from "@tsdiapi/server";
type Logger = AppContext["fastify"]["log"];
export interface LocationIQConfig {
    apiKey: string;
    baseUrl?: string;
}
export interface LocationResult {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    lat: string;
    lon: string;
    display_name: string;
    class?: string;
    type?: string;
    importance?: number;
    display_place?: string;
    display_address?: string;
    boundingbox?: string[];
    address?: {
        name?: string;
        house_number?: string;
        road?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
        attraction?: string;
        suburb?: string;
        state_district?: string;
        country_code?: string;
    };
}
export interface ForwardGeocodingOptions {
    format?: 'json' | 'xml' | 'xmlv1.1';
    limit?: number;
}
export interface ReverseGeocodingOptions {
    format?: 'json' | 'xml' | 'xmlv1.1';
}
export declare class LocationIQProvider {
    private config;
    private logger;
    private readonly defaultBaseUrl;
    init(config: LocationIQConfig, logger: Logger): void;
    autocomplete(query: string, limit?: number): Promise<LocationResult[]>;
    forward(query: string, options?: ForwardGeocodingOptions): Promise<LocationResult[]>;
    reverse(lat: number, lon: number, options?: ReverseGeocodingOptions): Promise<LocationResult>;
    private mapLocationResult;
}
export {};
//# sourceMappingURL=provider.d.ts.map