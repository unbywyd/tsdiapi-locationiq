export declare const LocationSearchQuerySchema: import("@sinclair/typebox").TObject<{
    q: import("@sinclair/typebox").TString;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    countrycodes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    normalizecity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>>;
}> & {
    $id: string;
};
export declare const LocationSearchResponseSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TRef<"LocationItemSchema">> & {
    $id: string;
};
export declare const LocationReverseQuerySchema: import("@sinclair/typebox").TObject<{
    lat: import("@sinclair/typebox").TNumber;
    lon: import("@sinclair/typebox").TNumber;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    normalizecity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>>;
}> & {
    $id: string;
};
export declare const LocationReverseResponseSchema: import("@sinclair/typebox").TRef<"LocationItemSchema"> & {
    $id: string;
};
export declare const LocationAutocompleteQuerySchema: import("@sinclair/typebox").TObject<{
    q: import("@sinclair/typebox").TString;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    language: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    countrycodes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    normalizecity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>>;
}> & {
    $id: string;
};
export declare const LocationAutocompleteResponseSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TRef<"LocationItemSchema">> & {
    $id: string;
};
//# sourceMappingURL=location.schemas.d.ts.map