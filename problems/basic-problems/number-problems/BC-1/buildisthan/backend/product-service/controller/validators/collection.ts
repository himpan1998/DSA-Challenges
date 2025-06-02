const collectionSchema = {
    type: 'object',
    properties: {
        "name": { type: "string" },

    },
    required: ["name"],
    additionalProperties: true,
}


export default collectionSchema;