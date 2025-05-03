import { response400, type AppContext } from "@tsdiapi/server";
import axios, { AxiosError } from 'axios';
type Logger = AppContext["fastify"]["log"];

export interface LocationIQConfig {
    apiKey: string;
    baseUrl?: string;
    autoRegisterControllers?: boolean;
}

// Common response interface for all LocationIQ API endpoints
export interface LocationResult {
    // Common fields for all responses
    place_id?: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    lat: string;
    lon: string;
    display_name: string;

    // Forward Geocoding specific fields
    class?: string;
    type?: string;
    importance?: number;

    // Autocomplete specific fields
    display_place?: string;
    display_address?: string;
    boundingbox?: string[];

    // Address fields (used in different ways by different endpoints)
    address?: {
        // Forward Geocoding address fields
        name?: string;
        house_number?: string;
        road?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;

        // Reverse Geocoding specific address fields
        attraction?: string;
        suburb?: string;
        state_district?: string;
        country_code?: string;
    };
}

export interface ForwardGeocodingOptions {
    format?: 'json' | 'xml' | 'xmlv1.1';
    limit?: number;
    countrycodes?: string[];
    normalizecity?: 0 | 1;
    acceptLanguage?: string;
}

export interface ReverseGeocodingOptions {
    format?: 'json' | 'xml' | 'xmlv1.1';
    normalizecity?: 0 | 1;
    acceptLanguage?: string;
}

export interface AutocompleteOptions {
    limit?: number;
    countrycodes?: string[];
    normalizecity?: 0 | 1;
    acceptLanguage?: string;
}

export class LocationIQProvider {
    private config: LocationIQConfig;
    private logger: Logger;
    private readonly defaultBaseUrl = 'https://api.locationiq.com/v1';

    init(config: LocationIQConfig, logger: Logger) {
        this.config = {
            ...config,
            baseUrl: config.baseUrl || this.defaultBaseUrl
        };
        this.logger = logger;
    }

    async autocomplete(query: string, options: AutocompleteOptions = {}): Promise<LocationResult[]> {
        try {
            this.logger.info(`Searching locations for query: ${query}`);

            const response = await axios.get(`${this.config.baseUrl}/autocomplete`, {
                params: {
                    key: this.config.apiKey,
                    q: query,
                    limit: options.limit,
                    ...(options.countrycodes && { countrycodes: options.countrycodes.join(',') }),
                    ...(options.normalizecity && { normalizecity: options.normalizecity }),
                    'accept-language': options.acceptLanguage || 'en',
                    dedupe: 1
                }
            });

            if (response.data.error) {
                throw response400(response.data.error);
            }

            return response.data.map(this.mapLocationResult);
        } catch (error) {
            this.logger.error(`Error in autocomplete: ${error}`);
            if (error instanceof AxiosError) {
                throw response400(error.response?.data.error || 'Failed to fetch autocomplete results');
            }
            throw response400('Failed to fetch autocomplete results');
        }
    }

    async forward(query: string, options: ForwardGeocodingOptions = {}): Promise<LocationResult[]> {
        try {
            this.logger.info(`Forward geocoding for query: ${query}`);

            const response = await axios.get(`${this.config.baseUrl}/search`, {
                params: {
                    key: this.config.apiKey,
                    q: query,
                    format: options.format || 'json',
                    limit: options.limit,
                    ...(options.countrycodes && { countrycodes: options.countrycodes.join(',') }),
                    ...(options.normalizecity && { normalizecity: options.normalizecity }),
                    'accept-language': options.acceptLanguage || 'en'
                }
            });

            if (response.data.error) {
                throw response400(response.data.error);
            }

            return response.data.map(this.mapLocationResult);
        } catch (error) {
            this.logger.error(`Error in forward geocoding: ${error}`);
            if (error instanceof AxiosError) {
                throw response400(error.response?.data.error || 'Failed to fetch forward geocoding results');
            }
            throw response400('Failed to fetch forward geocoding results');
        }
    }

    async reverse(lat: number, lon: number, options: ReverseGeocodingOptions = {}): Promise<LocationResult> {
        try {
            this.logger.info(`Reverse geocoding for coordinates: ${lat}, ${lon}`);

            const response = await axios.get(`${this.config.baseUrl}/reverse`, {
                params: {
                    key: this.config.apiKey,
                    lat,
                    lon,
                    format: options.format || 'json',
                    ...(options.normalizecity && { normalizecity: options.normalizecity }),
                    'accept-language': options.acceptLanguage || 'en'
                }
            });

            if (response.data.error) {
                throw response400(response.data.error);
            }

            return this.mapLocationResult(response.data);
        } catch (error) {
            this.logger.error(`Error in reverse geocoding: ${error}`);
            if (error instanceof AxiosError) {
                throw response400(error.response?.data.error || 'Failed to fetch reverse geocoding results');
            }
            throw response400('Failed to fetch reverse geocoding results');
        }
    }

    private mapLocationResult(item: any): LocationResult {
        return {
            // Common fields
            place_id: item.place_id,
            licence: item.licence,
            osm_type: item.osm_type,
            osm_id: item.osm_id,
            lat: item.lat,
            lon: item.lon,
            display_name: item.display_name,

            // Forward Geocoding fields
            class: item.class,
            type: item.type,
            importance: item.importance,

            // Autocomplete fields
            display_place: item.display_place,
            display_address: item.display_address,
            boundingbox: item.boundingbox,

            // Address fields
            address: item.address ? {
                // Forward Geocoding address fields
                name: item.address.name,
                house_number: item.address.house_number,
                road: item.address.road,
                city: item.address.city,
                state: item.address.state,
                postcode: item.address.postcode,
                country: item.address.country,

                // Reverse Geocoding address fields
                attraction: item.address.attraction,
                suburb: item.address.suburb,
                state_district: item.address.state_district,
                country_code: item.address.country_code
            } : undefined
        };
    }
}