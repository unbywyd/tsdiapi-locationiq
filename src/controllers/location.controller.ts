import { AppContext, ResponseErrorSchema } from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { useLocationIQProvider } from '../index.js';
import { JWTGuard } from "@tsdiapi/jwt-auth";

export default async function registerLocationRoutes({ useRoute }: AppContext) {
    useRoute()
        .controller('location')
        .get('/search')
        .description('Search locations by query')
        .query(Type.Object({
            q: Type.String(),
            limit: Type.Optional(Type.Number()),
            language: Type.Optional(Type.String()),
            countrycodes: Type.Optional(Type.Array(Type.String())),
            normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
        }))
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, Type.Array(Type.Object({
            place_id: Type.Optional(Type.String()),
            display_name: Type.String(),
            lat: Type.String(),
            lon: Type.String(),
            address: Type.Optional(Type.Any())
        })))
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
        .query(Type.Object({
            lat: Type.Number(),
            lon: Type.Number(),
            language: Type.Optional(Type.String()),
            normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
        }))
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, Type.Object({
            place_id: Type.Optional(Type.String()),
            display_name: Type.String(),
            lat: Type.String(),
            lon: Type.String(),
            address: Type.Optional(Type.Any())
        }))
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
        .query(Type.Object({
            q: Type.String(),
            limit: Type.Optional(Type.Number()),
            language: Type.Optional(Type.String()),
            countrycodes: Type.Optional(Type.Array(Type.String())),
            normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
        }))
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .code(200, Type.Array(Type.Object({
            place_id: Type.Optional(Type.String()),
            display_name: Type.String(),
            lat: Type.String(),
            lon: Type.String(),
            address: Type.Optional(Type.Any())
        })))
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