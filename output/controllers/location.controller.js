import { ResponseErrorSchema } from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { useLocationIQProvider } from '../index.js';
import { JWTGuard } from "@tsdiapi/jwt-auth";
export default async function registerLocationRoutes({ useRoute }) {
    useRoute()
        .controller('location')
        .get('/search')
        .description('Search locations by query')
        .auth()
        .query(Type.Object({
        q: Type.String(),
        limit: Type.Optional(Type.Number())
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
        const data = await locationService.forward(req.query.q, { limit: req.query.limit });
        return { status: 200, data };
    })
        .build();
    useRoute()
        .controller('location')
        .get('/reverse')
        .description('Get location by coordinates')
        .query(Type.Object({
        lat: Type.Number(),
        lon: Type.Number()
    }))
        .code(200, Type.Object({
        place_id: Type.Optional(Type.String()),
        display_name: Type.String(),
        lat: Type.String(),
        lon: Type.String(),
        address: Type.Optional(Type.Any())
    }))
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .auth('bearer')
        .guard(JWTGuard())
        .handler(async (req) => {
        const locationService = useLocationIQProvider();
        const data = await locationService.reverse(req.query.lat, req.query.lon);
        return { status: 200, data };
    })
        .build();
    useRoute()
        .controller('location')
        .get('/autocomplete')
        .description('Get location suggestions')
        .query(Type.Object({
        q: Type.String(),
        limit: Type.Optional(Type.Number())
    }))
        .code(200, Type.Array(Type.Object({
        place_id: Type.Optional(Type.String()),
        display_name: Type.String(),
        lat: Type.String(),
        lon: Type.String(),
        address: Type.Optional(Type.Any())
    })))
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .code(500, ResponseErrorSchema)
        .auth('bearer')
        .guard(JWTGuard())
        .handler(async (req) => {
        const locationService = useLocationIQProvider();
        const data = await locationService.autocomplete(req.query.q, req.query.limit);
        return { status: 200, data };
    })
        .build();
}
//# sourceMappingURL=location.controller.js.map