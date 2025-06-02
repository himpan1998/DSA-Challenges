const create = {
    type: 'object',
    properties: {
        "user_masters_id": { type: "number" },
        "product_items_id": { type: "number" },
        "rating": { type: "float" }
    },
    required: ["user_masters_id", "rating", "product_items_id"],
    additionalProperties: true,
}

const productItemRatingValidators = {
    create
}

export default productItemRatingValidators