
const gstSchema = {
    type: 'object',
    properties: {
        "gst_value": { type: "number" },
        "type":{ type: "string" },
                },
    required: ["gst_value", "type"],
    additionalProperties: false,
}

export default gstSchema;