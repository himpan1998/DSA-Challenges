
const createSapMaterialGroupSchema = {
    type: 'object',
    properties: {
        "name": { type: "string"},
        "description": { type: "string"},
        "is_sap_created": { type: "boolean"},
        "is_active": { type : "boolean"},
        "created_by": { type : "integer"},
        "updated_by": { type : "integer"},
        
    },
    
    required: ["name","description","is_sap_created","is_active"],
    additionalProperties: false,
     
}

const createSapConstantSchema= {
    type: 'object',
    properties: {
        "name": { type:"string"},
        "display_name": { type:"string"},
        "value": { type:"string"},
        "description": { type:"string"},
        "is_sap_created": { type:"boolean"},
        "is_active": { type :"boolean"},
        "created_by": { type :"integer"},
        "updated_by": { type :"integer"},
        
    },
    
    required: ["name","display_name","value","description","is_sap_created","is_active"],
    additionalProperties: false,
     
}

const sapValidators = {
    createSapMaterialGroupSchema,
    createSapConstantSchema
}

export default sapValidators
