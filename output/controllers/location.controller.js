import { ResponseErrorSchema } from "@tsdiapi/server";
import { useLocationIQProvider } from '../index.js';
import { JWTGuard } from "@tsdiapi/jwt-auth";
import { LocationSearchQuerySchema, LocationSearchResponseSchema, LocationReverseQuerySchema, LocationReverseResponseSchema, LocationAutocompleteQuerySchema, LocationAutocompleteResponseSchema } from './location.schemas.js';
export default async function registerLocationRoutes({ useRoute }) {
    useRoute()
        .controller('location')
        .get('/search')
        .description('Search locations by query')
        .query(LocationSearchQuerySchema)
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, LocationSearchResponseSchema)
        .auth('bearer')
        .guard(JWTGuard())
        .handler(async (req) => {
        const locationService = useLocationIQProvider();
        const data = await locationService.forward(req.query.q, {
            limit: req.query.limit,
            acceptLanguage: req.query.language,
            countrycodes: req.query.countrycodes,
            normalizecity: req.query.normalizecity
        });
        return { status: 200, data };
    })
        .build();
    useRoute()
        .controller('location')
        .get('/reverse')
        .description('Get location by coordinates')
        .query(LocationReverseQuerySchema)
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, LocationReverseResponseSchema)
        .auth('bearer')
        .guard(JWTGuard())
        .handler(async (req) => {
        const locationService = useLocationIQProvider();
        const data = await locationService.reverse(req.query.lat, req.query.lon, {
            acceptLanguage: req.query.language,
            normalizecity: req.query.normalizecity
        });
        return { status: 200, data };
    })
        .build();
    useRoute()
        .controller('location')
        .get('/autocomplete')
        .description('Get location suggestions')
        .query(LocationAutocompleteQuerySchema)
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, LocationAutocompleteResponseSchema)
        .auth('bearer')
        .guard(JWTGuard())
        .handler(async (req) => {
        const locationService = useLocationIQProvider();
        const data = await locationService.autocomplete(req.query.q, {
            limit: req.query.limit,
            acceptLanguage: req.query.language,
            countrycodes: req.query.countrycodes,
            normalizecity: req.query.normalizecity
        });
        return { status: 200, data };
    })
        .build();
}
//# sourceMappingURL=location.controller.js.map