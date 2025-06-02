const seoValidation = {
    type: 'object',
    properties: {
        page_id: { type: "integer" },
        product_id: { type: "integer" },
        page_name: { type: "string" },
        seo_description: { type: "string" },
        seo_keywords: { type:"string" },
        seo_title: { type:"string" }
     
    },
    required: ["product_id", "page_name", "seo_keywords", "seo_description", "seo_title"],
    additionalProperties: true
  }
  
  const seo = {
    seoValidation
}

export default seo 

 