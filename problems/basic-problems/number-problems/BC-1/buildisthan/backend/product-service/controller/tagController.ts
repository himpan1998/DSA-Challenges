import Ajv from "ajv";
import { uploadImage } from "../helper/sharedMethods";
import db from '../models/index'
import tagSchema from "./validators/tag";
import { getIsActiveData,isExists } from "../helper/sharedMethods";
import { Op } from "sequelize";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");


/**
 * Create a new collection
 * @param req 
 * @param res 
 * @returns 
 */


 const create = async (req: any, res: any) => {
    try {
      const validate = ajv.compile(tagSchema);
      let key: any = req.body.key || null;   

  
      /**UPDATE*/
      if (key !== null) {
        let update: any = await db.tbl_tag_masters.update(
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
  
      const duplicate=await isExists(res,(db.tbl_tag_masters),{type:req.body.type})     
      if (duplicate) {
        return commonResponse(res, 409, duplicate, []);
      }
      
      //Insert Data
      let createData = await db.tbl_tag_masters.create(req.body);
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
      let web_api=req.query.web_api
      let paramsActive=req.query.is_active==undefined?1:req.query.is_active
      let isActiveTag= getIsActiveData(web_api,paramsActive)
      var conditions:any={ where:isActiveTag}

      let result = await db.tbl_tag_masters.findAll(conditions);

      if(req.query?.take) {
        conditions['limit'] = +req.query.take
        conditions['offset'] = +req.query?.skip
        let resp = await db.tbl_tag_masters.findAll(conditions);      
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



  const tagRoutes= {
    create,
    getAll,
  }


  export default tagRoutes;
