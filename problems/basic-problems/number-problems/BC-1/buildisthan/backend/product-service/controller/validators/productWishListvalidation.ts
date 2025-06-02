const create = {
    type: 'object',
    properties: {
        "product_id": { type: "integer" },
        "user_id": { type : "integer"},
        "user_name": { type : "string"},
        "quantity": {type: "integer"},
        "uom_id": {type: "integer"},
        "ask_price": { type : "integer"},       
        "isStatus":{ type: "boolean" }       
       
         
    },
    required: ["product_id", "user_id", "user_name", "quantity", "ask_price", "isStatus"],
    additionalProperties: true,
}

const productCardValidators = {
    create
}

export default productCardValidators