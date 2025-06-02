const create = {
    type: 'object',
    properties: {
        "category_name": { type: ["string"]},
        "sap_profit_center":{type:"string"},
        "sap_storage_location":{type:"string"},
        "category_image":{type:"string"},
        "is_active": { type : "boolean"},
        "created_by":{type:"integer"},
        "updated_by":{type:"integer"},
        "deleted_by":{type:"integer"}


    },
    required: ["category_name"],
    additionalProperties: true,
}

const categoryValidators = {
    create
}

export default categoryValidators