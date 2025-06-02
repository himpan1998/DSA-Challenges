import Ajv from "ajv";
import { Op } from "sequelize";
import { uploadImage,isExists } from "../helper/sharedMethods";
import db from '../models/index'
import gstSchema from "./validators/gst";
const ajv = new Ajv();
import {getIsActiveData} from "../helper/sharedMethods";
const { commonResponse } = require("@ssiltools/shared-files");
/**
 * Create a new gst
 * @param req 
 * @param res 
 * @returns 
 */

const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(gstSchema);
    let key: any = req.body.key || null;
    /**UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_gst_masters.update(
        req.body.values,
        {
          where: {
            id: key,
          },
        }
      );
      if (update) return commonResponse(res, 200,update, [], "");
      return commonResponse(res, 500, [], [], "");
    }

    if (!validate(req.body)) {
      return commonResponse(res, 400, [], [], "", process.env.ENVIROMENT);
    }

    const duplicate=await isExists(res,(db.tbl_gst_masters),{gst_value:req.body.gst_value})     
    if (duplicate) {
      return commonResponse(res, 409, duplicate, []);
    }

    //Insert Data
    let createData = await db.tbl_gst_masters.create(req.body);
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

const getAll = async (req: any, res: any) => {
  try {
    let paramsActive=req.body.is_active==undefined?1:req.body.is_active
    let isActiveBrand=getIsActiveData('',paramsActive)
    let key: any = req.body.key || null;

    var conditions:any = { where: {
      [Op.and]:[isActiveBrand,{id: key}]
    }}
    var conditions:any = {  where:{
      [Op.or]:[isActiveBrand]
    }}
   
    let resultTotal = await db.tbl_gst_masters.findAll(conditions);

    if (key !== null) {
      if(req.query?.take) {
        conditions['limit'] = +req.query.take
        conditions['offset'] = +req.query?.skip
      }
      let resp = await db.tbl_gst_masters.findAll(conditions);
      return commonResponse(res, 200, resp, []);
      
    } else {
      if(req.query?.take) {
        conditions['limit'] = +req.query.take
        conditions['offset'] = +req.query?.skip

        let resp = await db.tbl_gst_masters.findAll(conditions);
        return commonResponse(res, 200, {data:resp,totalCount:resultTotal.length}, [], "");
      }
      
      let resp = await db.tbl_gst_masters.findAll(conditions);
      return commonResponse(res, 200, resp, []);
      
      
    }

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


const gstRoutes = {
  create,
  getAll
}

export default gstRoutes;
