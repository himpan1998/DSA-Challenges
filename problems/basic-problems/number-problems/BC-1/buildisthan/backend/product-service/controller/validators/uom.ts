const create = {
    type: 'object',
    properties: {
        "sap_mandt":{type:"string"},
        "sap_spras":{type:"string"},
        "sap_msehi":{type:"string"},
        "sap_mseh3":{type:"string"},
        "sap_mseh6":{type:"string"},
        "sap_mseht":{type:"string"},
        "sap_msehl":{type:"string"},
        "name": { type:"string"},
        "symbol": {type: "string"},
        "is_active": { type : "number"}
    },
    required: ["name", "symbol"],
    additionalProperties: true,
}

const uomValidators = {
    create
}

export default uomValidators