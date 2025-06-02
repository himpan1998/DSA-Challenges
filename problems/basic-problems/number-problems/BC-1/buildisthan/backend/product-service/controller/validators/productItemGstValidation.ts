const productItemGst = {
    type: 'object',
    properties: {
        "user_id":{type:"number"},
        "gst_number":{type:"string",maxLength:15,minLength:15},
        "business_name": { type: "string" },
         
    },
    required: ["user_id","gst_number","business_name"],
    additionalProperties: true,
}
const productItemGstValidation = {
    productItemGst
}

export default productItemGstValidation


