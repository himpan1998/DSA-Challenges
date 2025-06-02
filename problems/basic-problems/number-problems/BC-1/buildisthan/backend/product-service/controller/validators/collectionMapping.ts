const collectionMappingSchema = {
    type: 'object',
    properties: {
        "product_id": { type: "number" },
        "collection_id": { type: "number" },
                },
    required: ["product_id", "collection_id"],
    additionalProperties: true,
}


export default collectionMappingSchema;