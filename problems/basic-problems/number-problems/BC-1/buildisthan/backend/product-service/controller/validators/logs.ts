const logSchema = {
    type: 'object',
    properties: {
        "type": { type: "string" },
        "id": { type: ["string", "number"] },
        "payload": {
            type: "object"
        },
        "should_update": { type: "string" },
        "transaction":{ type: "object"},
    },
    required: ["type", "payload", "id"],
    additionalProperties: true,
}

export default logSchema;