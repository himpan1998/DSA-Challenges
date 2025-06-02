import Ajv from "ajv";
import { uploadImage } from "../helper/sharedMethods";
import db from '../models/index'
import productSpecificationMappingSchema from "./validators/productSpecificationMapping";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");

/**
 * Create a new product specification mapping
 * @param req 
 * @param res 
 * @returns 
 */

const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(productSpecificationMappingSchema);
    let key: any = req.body.key || null;
    
    /**UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_product_specification_mappings.update(
        req.body.values,
        {
          where: {
            id: key,
          },
        }
      );
      if (update) return commonResponse(res, 200, update, [], "");
      return commonResponse(res, 500, [], [], "");
    }

    if (!validate(req.body)) {
      return commonResponse(res, 400, [], [], "", process.env.ENVIROMENT);
    }

    //Insert Data
    let createData = await db.tbl_product_specification_mappings.create(req.body);
    return commonResponse(res, 200, createData, []);
  } catch (err: any) {
    return commonResponse(
      res,
      500,
      [],
      err.message,
      "",
      process.env.ENVIROMENT
    );
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const getAll = async (req: any, res: any) => {
  try {
    let resp = await db.tbl_product_specification_mappings.findAll(
      {
        attributes:['id','product_id', 'specification_id','is_active']
      }
    );
    
    return commonResponse(res, 200, resp, []);
  } catch (err: any) {
    return commonResponse(
      res,
      500,
      [],
      err.message,
      "",
      process.env.ENVIROMENT
    );
  }
};



const  productSpecificationMappingRoutes= {
  create,
  getAll
}

export default productSpecificationMappingRoutes;
