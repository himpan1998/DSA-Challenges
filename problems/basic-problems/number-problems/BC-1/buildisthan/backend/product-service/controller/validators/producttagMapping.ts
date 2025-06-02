const producttagMappingSchema = {
    type: 'object',
    properties: {
        "product_id": { type: "number" },
        "tag_id":{ type: "number" },
                },
    required: ["product_id", "tag_id"],
    additionalProperties: false,
}

export default producttagMappingSchema;