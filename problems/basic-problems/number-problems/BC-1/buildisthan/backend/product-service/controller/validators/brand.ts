const create = {
    type: 'object',
    properties: {
        "brand_name": { type: "string" },
        "alias": { type: "string" },
        "description": { type: "string" },
        "is_active": { type : "string"},
        "created_by":{type:"integer"},
        "updated_by":{type:"integer"},
        "deleted_by":{type:"integer"}

    },
    required: ["brand_name"],
    additionalProperties: true,
}

const brandValidators = {
    create
}

export default brandValidators