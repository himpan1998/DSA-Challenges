const create = {
    type: 'object',
    properties: {
        "product_id": { type: "integer" },
        "user_id": { type : "integer"},
        "user_name": { type : "string"},
        "quantity": {type: "integer"},
        "uom_id": {type: "integer"},
        "ask_price": { type : "string"},
        "status": { type : "boolean"},
        "is_saved_for_later":{ type: "boolean" },
         
    },
    required: ["product_id", "user_id", "user_name", "quantity", "ask_price", "is_saved_for_later"],
    additionalProperties: true,
}

const productCardValidators = {
    create
}

export default productCardValidators