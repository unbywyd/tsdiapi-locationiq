import axios from 'axios';
export class LocationIQProvider {
    config;
    logger;
    defaultBaseUrl = 'https://api.locationiq.com/v1';
    init(config, logger) {
        this.config = {
            ...config,
            baseUrl: config.baseUrl || this.defaultBaseUrl
        };
        this.logger = logger;
    }
    async autocomplete(query, options = {}) {
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
            return response.data.map(this.mapLocationResult);
        }
        catch (error) {
            this.logger.error(`Error in autocomplete: ${error}`);
            throw new Error('Failed to fetch autocomplete results');
        }
    }
    async forward(query, options = {}) {
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
            return response.data.map(this.mapLocationResult);
        }
        catch (error) {
            this.logger.error(`Error in forward geocoding: ${error}`);
            throw new Error('Failed to fetch forward geocoding results');
        }
    }
    async reverse(lat, lon, options = {}) {
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
            return this.mapLocationResult(response.data);
        }
        catch (error) {
            this.logger.error(`Error in reverse geocoding: ${error}`);
            throw new Error('Failed to fetch reverse geocoding results');
        }
    }
    mapLocationResult(item) {
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
//# sourceMappingURL=provider.js.map