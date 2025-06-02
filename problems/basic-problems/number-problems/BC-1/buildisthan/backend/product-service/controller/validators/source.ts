const sourceSchema = {
    type: 'object',
    properties: {
        "name": { type: "string" },
         "description":{ type: "string" },
                },
    required: ["name","description"],
    additionalProperties: false,
}

export default sourceSchema;