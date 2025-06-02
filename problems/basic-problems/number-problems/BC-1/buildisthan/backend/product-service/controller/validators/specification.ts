
const specificationSchema = {
    type: 'object',
    properties: {
        "name": { type: "string" },
        "type":{ type: "string" },
        "description":{ type: "string" },
                },
    required: ["name", "description"],
    additionalProperties: false,
}

export default specificationSchema;