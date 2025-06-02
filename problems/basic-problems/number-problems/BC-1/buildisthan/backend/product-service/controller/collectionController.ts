import Ajv from "ajv";
import { Op } from "sequelize";
import { uploadImage } from "../helper/sharedMethods";
import db from "../models/index";
import {getIsActiveData,isExists} from "../helper/sharedMethods";
import collectionSchema from "./validators/collection";

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
    const validate = ajv.compile(collectionSchema);
    let key: any = req.body.key || null;

    /**UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_collection_masters.update(
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

    const duplicate=await isExists(res,(db.tbl_collection_masters),{name:req.body.name})     
    if (duplicate) {
      return commonResponse(res, 409, duplicate, []);
    }

    //Insert Data
    let createData = await db.tbl_collection_masters.create(req.body);
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
 * get data isActive or all data
 * @param req 
 * @param res 
 * @returns 
 */
const get = async (req: any, res: any) => {
  try {
    let paramsActive =
      req.query.is_active == undefined ? 1 : req.query.is_active;
    let isActiveCollection = getIsActiveData("", paramsActive);

    var conditions:any={ where: isActiveCollection}
    let data = await db.tbl_collection_masters.findAll(conditions);
    if(req.query?.take) {
      conditions['limit'] = +req.query.take
      conditions['offset'] = +req.query?.skip

      let resp = await db.tbl_collection_masters.findAll(conditions);
      return commonResponse(res, 200, {data:resp,totalCount:data.length}, []);
    }
    return commonResponse(res, 200, data);

    
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

const collectionRoutes = {
  create,
  get
};

export default collectionRoutes;
