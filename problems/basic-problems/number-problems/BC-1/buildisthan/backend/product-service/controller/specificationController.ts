import Ajv from "ajv";
import {getIsActiveData,isExists} from "../helper/sharedMethods";
import { uploadImage } from "../helper/sharedMethods";
import db from '../models/index'
import specificationSchema from "./validators/specification";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");

/**
 * Create a new product specification
 * @param req 
 * @param res 
 * @returns 
 */

const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(specificationSchema);
   
    let key: any = req.body.key || null;
    /**UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_specification_masters.update(
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

    const duplicate=await isExists(res,(db.tbl_specification_masters),{name:req.body.name})     
    if (duplicate) {
      return commonResponse(res, 409, duplicate, []);
    }

    

    //Insert Data
    let createData = await db.tbl_specification_masters.create(req.body);
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
 * get Specifiction of controller with isActive || !
 * @param req 
 * @param res 
 * @returns 
 */
const getAll = async (req: any, res: any) => {
  try {
    let web_api=req.query.web_api
    let paramsActive=req.query.is_active==undefined?1:req.query.is_active
    let isActiveSpecific= getIsActiveData(web_api,paramsActive)
    var condition:any={where:isActiveSpecific}
    let result = await db.tbl_specification_masters.findAll(condition);

    if(req.query?.take) {
      condition['limit'] = +req.query.take
      condition['offset'] = +req.query?.skip
      let resp = await db.tbl_specification_masters.findAll(condition);    
      return commonResponse(res, 200, {data:resp,totalCount:result.length}, []);
    }
    return commonResponse(res, 200, result, []);

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


const  specificationRoutes= {
  create,
  getAll,
}

export default specificationRoutes;
