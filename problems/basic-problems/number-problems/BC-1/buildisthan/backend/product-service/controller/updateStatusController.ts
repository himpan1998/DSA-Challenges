import db from "../models/index";
const { commonResponse } = require("@ssiltools/shared-files");

const brandMasterDB = db.tbl_brand_masters;
const gstMasterDB = db.tbl_gst_masters;
const collectionMasterDB = db.tbl_collection_masters;
const uomMasterDB = db.tbl_uom_master;
const specificationdMasterDB = db.tbl_specification_masters;
const sourceMasterDB = db.tbl_source_masters;
const categoryMasterDB = db.tbl_category_masters;
const subCategoryMasterDB = db.tbl_sub_categories_master;
const tagMasterDB=db.tbl_tag_master;
const productItemDB=db.tbl_product_master
const sapConstantDB = db.tbl_sap_constant_master;



const getEntity = async (res:any,type: any) => {
  let entityObj: any = {};
  switch (type) {
    case "brand":
      entityObj = brandMasterDB;
      break;
    case "gst":
      entityObj = gstMasterDB;
      break;
    case "collection":
      entityObj = collectionMasterDB;
      break;
    case "uom":
      entityObj = uomMasterDB;
      break;
    case "specification":
      entityObj = specificationdMasterDB;
      break;
    case "source":
      entityObj = sourceMasterDB;
      break;
    case "category":
      entityObj = categoryMasterDB;
      break;
    case "sub-category":
      entityObj = subCategoryMasterDB;
      break;
    case "tag":
      entityObj = tagMasterDB;
      break;
      case "product-items":
      entityObj = productItemDB;
      break;
    case "sap-constant":
      entityObj = sapConstantDB;
      break;
    default:
      return res.status(400).json({message:"type is missing"})
  }
  return entityObj;
};

/**
 * update Status with is_active & type
 * @param req
 * @param res
 */

const updateStatus = async (req: any, res: any) => {
  try {
    const body = req.body;
    const type = body.type;
    console.log('ddddd',body.id)
    delete body.type;
    if (body.is_active === undefined || body.is_active === null) {
      return commonResponse(res, 400, [], "", `Is active field is missing`);
    }
    const ENTITY: any = await getEntity(res,type);
     
    const result = await ENTITY.update(body, {
      where: { id: body.id },
    })
   
    if (result[0] === 0) {
      return commonResponse(
        res,
        200,
        [],
        "",
        `Could not update data! invalid 🤦‍♀️ where query`
      );
    }
    return commonResponse(
      res,
      200,
      result,
      "",
      "Update has been successfully!"
    );
  } catch (error: any) {
    return commonResponse(
      res,
      500,
      [],
      error.message,
      "",
      process.env.ENVIROMENT
    );
  }
};

const updateStatusController = {
  updateStatus,
};

export default updateStatusController;
