const productSpecificationMappingSchema = {
    type: 'object',
    properties: {
        "product_id": { type: "number" },
        "specification_id":{ type: "number" },
        "is_active":{ type: "number" },
                },
    required: ["product_id", "specification_id","is_active"],
    additionalProperties: false,
}

export default productSpecificationMappingSchema;


