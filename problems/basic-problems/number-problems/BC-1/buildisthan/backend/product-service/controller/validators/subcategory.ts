const create = {
    type: 'object',
    properties: {
        "category_id": { type: "string" },
        "brand_id": {type: "string"},
        "parent_id": {type: "string"},
        "sub_category_name": {type: "string"},
        "sub_category_image": {type: "string"},
        "isActive": { type : "string"}
    },
    required: ["sub_category_name", "category_id"],
    additionalProperties: true,
}

const subCategoryValidators = {
    create
}

export default subCategoryValidators