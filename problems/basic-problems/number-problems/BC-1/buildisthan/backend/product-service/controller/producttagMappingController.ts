import Ajv from "ajv";
import { uploadImage } from "../helper/sharedMethods";
import db from "../models/index";
import producttagMappingSchema from "./validators/producttagMapping";
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
    const validate = ajv.compile(producttagMappingSchema);
    let key: any = req.body.key || null;

    /**UPDATE*/
    if (key !== null) {
      let update: any = await db.tbl_product_tag_mappings.update(
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
    let createData = await db.tbl_product_tag_mappings.create(req.body);
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
 * get product tag mapping data
 * @param req 
 * @param res 
 * @returns 
 */
const getAll = async (req: any, res: any) => {
  try {
    let resp = await db.tbl_product_tag_mappings.findAll();

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

export default {
  create,
  getAll,
};
