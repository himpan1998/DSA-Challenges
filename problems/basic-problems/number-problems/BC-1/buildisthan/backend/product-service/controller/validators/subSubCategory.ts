const create = {
    type: 'object',
    properties: {  

        "subCategoryID": { type: "number" },
        "subSubCategoryName":  { type: "string" },
        "images": { type: "string" },
    },
    required: ["subCategoryID", "subSubCategoryName"],
    additionalProperties: true,
}

const subSubCategoryValidators = {
    create
}

export default subSubCategoryValidators