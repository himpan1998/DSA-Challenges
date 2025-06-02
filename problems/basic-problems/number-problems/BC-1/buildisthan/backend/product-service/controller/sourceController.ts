import Ajv from "ajv";
import { getIsActiveData,isExists } from "../helper/sharedMethods";
import { uploadImage } from "../helper/sharedMethods";
import db from "../models/index";
import sourceSchema from "./validators/source";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");

/**
 * Create a new source
 * @param req
 * @param res
 * @returns
 */

const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(sourceSchema);

    let key: any = req.body.key || null;
    /** UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_source_masters.update(req.body.values, {
        where: {
          id: key,
        },
      });
      if (update) return commonResponse(res, 200, update, [], "");
      return commonResponse(res, 500, [], [], "");
    }

    if (!validate(req.body)) {
      return commonResponse(res, 400, [], [], "", process.env.ENVIROMENT);
    }

    const duplicate=await isExists(res,(db.tbl_source_masters),{name:req.body.name})     
    if (duplicate) {
      return commonResponse(res, 409, duplicate, []);
    }

    //Insert Data
    let createData = await db.tbl_source_masters.create(req.body);
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
 * get data
 * @param req 
 * @param res 
 * @returns 
 */
const getAll = async (req: any, res: any) => {
  try {
    let web_api = req.query.web_api;
    let paramsActive =
      req.query.is_active == undefined ? 1 : req.query.is_active;
    let isActiveSource = getIsActiveData(web_api, paramsActive);

    var conditions: any = {
      where: isActiveSource,
      attributes: ["id", "name", "description", "is_active"],
    }

    let result = await db.tbl_source_masters.findAll(conditions);

    if (req.query?.take) {
      conditions['limit'] = +req.query.take
      conditions['offset'] = +req.query?.skip
      let resp = await db.tbl_source_masters.findAll(conditions);
      return commonResponse(res, 200, { data: resp, totalCount: result.length }, []);
    }

    return commonResponse(res, 200, result);


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


const sourceRoutes = {
  create,
  getAll
};

export default sourceRoutes;
