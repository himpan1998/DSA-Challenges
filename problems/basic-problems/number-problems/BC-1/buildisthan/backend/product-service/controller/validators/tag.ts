const tagSchema = {
    type: 'object',
    properties: {
        "type": { type: "string" },
        "description":{ type: "string" },
                },
    required: ["type", "description"],
    additionalProperties: false,
}

export default tagSchema;