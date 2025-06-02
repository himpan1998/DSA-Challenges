const productEnquire = {
    type: 'object',
    properties: {
        "request_id":{type:"string"},
        "sku_id":{type:"string"},
        "product_id": { type: "integer" },
        "category_id": {type: "integer"},
        "address_id":{type:"integer"},
        "user_id":{type:"integer"},
        "user_name":{type:"string"},
        "business_gst_id":{type:"integer"},
        "uom_id":{type:"intrger"},
        "order_quantity": {type:"integer"},
        "price": {type: "string"},
        "comment": {type: "string"},
        
    },
        "business_gst_id":{type:"integer"},
    required: ["request_id","sku_id","product_id","category_id","address_id","business_gst_id","uom_id","order_quantity"],
    additionalProperties: true,
}
const productEnquireValidators = {
    productEnquire
}

export default productEnquireValidators


