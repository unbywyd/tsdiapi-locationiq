import { Type } from '@sinclair/typebox';
import { addSchema } from '@tsdiapi/server';
// Общая схема для локации (используется в нескольких ответах)
// Схема используется через Type.Ref('LocationItemSchema') в других схемах ответов
const LocationItemSchema = addSchema(Type.Object({
    place_id: Type.Optional(Type.String()),
    display_name: Type.String(),
    lat: Type.String(),
    lon: Type.String(),
    address: Type.Optional(Type.Any())
}, { $id: 'LocationItemSchema' }));
// Query схема для /search
export const LocationSearchQuerySchema = addSchema(Type.Object({
    q: Type.String(),
    limit: Type.Optional(Type.Number()),
    language: Type.Optional(Type.String()),
    countrycodes: Type.Optional(Type.Array(Type.String())),
    normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
}, { $id: 'LocationSearchQuerySchema' }));
// Response схема для /search
const LocationSearchResponseSchemaBase = Type.Array(Type.Ref('LocationItemSchema'));
LocationSearchResponseSchemaBase.$id = 'LocationSearchResponseSchema';
export const LocationSearchResponseSchema = addSchema(LocationSearchResponseSchemaBase);
// Query схема для /reverse
export const LocationReverseQuerySchema = addSchema(Type.Object({
    lat: Type.Number(),
    lon: Type.Number(),
    language: Type.Optional(Type.String()),
    normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
}, { $id: 'LocationReverseQuerySchema' }));
// Response схема для /reverse
const LocationReverseResponseSchemaBase = Type.Ref('LocationItemSchema');
LocationReverseResponseSchemaBase.$id = 'LocationReverseResponseSchema';
export const LocationReverseResponseSchema = addSchema(LocationReverseResponseSchemaBase);
// Query схема для /autocomplete
export const LocationAutocompleteQuerySchema = addSchema(Type.Object({
    q: Type.String(),
    limit: Type.Optional(Type.Number()),
    language: Type.Optional(Type.String()),
    countrycodes: Type.Optional(Type.Array(Type.String())),
    normalizecity: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(1)]))
}, { $id: 'LocationAutocompleteQuerySchema' }));
// Response схема для /autocomplete
const LocationAutocompleteResponseSchemaBase = Type.Array(Type.Ref('LocationItemSchema'));
LocationAutocompleteResponseSchemaBase.$id = 'LocationAutocompleteResponseSchema';
export const LocationAutocompleteResponseSchema = addSchema(LocationAutocompleteResponseSchemaBase);
//# sourceMappingURL=location.schemas.js.map