import Ajv from "ajv";
const ajv = new Ajv();
import db from "../models/index";
const { commonResponse } = require("@ssiltools/shared-files");

import seoValidation from "./../controller/validators/seoValidation";
import { isExists } from "../helper/sharedMethods";

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * Get SEO Entry Records
 */
const getSeo = async (req: any, res: any) => {
  try {
    const seo = await db.tbl_seo_master.findAll().then((result: any) => {
      return commonResponse(res, 200, result, [], "", process.env.ENVIROMENT);
    });
  } catch (error) {
    return commonResponse(
      res,
      500,
      [],
      [],
      `error:${error}`,
      process.env.ENVIROMENT
    );
  }
};
/**
 *
 * @param req
 * @param res
 * @returns
 * get seo data by product id
 */
const getByProductIdSeo = async (req: any, res: any) => {
  try {
    const product_id = req.params;
    const seo = await db.tbl_seo_master
      .findOne({
        where: {
          product_id: product_id.id,
        },
      })
      .then((result: any) => {
        return commonResponse(res, 200, result, [], "", process.env.ENVIROMENT);
      });
  } catch (error) {
    return commonResponse(
      res,
      500,
      [],
      [],
      `error:${error}`,
      process.env.ENVIROMENT
    );
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 * create seo
 */
const createSeo = async (req: any, res: any) => {
  try {
    let validate = ajv.compile(seoValidation.seoValidation);
    let valid = validate(req.body);
    if (!valid) {
      return commonResponse(res, 400, [], validate.errors);
    } 
    
    const duplicate=await isExists(res,(db.tbl_seo_master),{page_name:req.body.page_name})     
    if (duplicate) {
      return commonResponse(res, 409, duplicate, []);
    }

    await db.tbl_seo_master
    .create(req.body)
    .then((result: any) => {
      return commonResponse(res, 200, result, [], "", process.env.ENVIRO);
    });
    
  } catch (error) {
    return commonResponse(
      res,
      500,
      [],
      [],
      `error:${error}`,
      process.env.ENVIROMENT
    );
  }
};
/**
 *
 * @param req
 * @param res
 * @returns
 * update seo
 */
const updateSeo = async (req: any, res: any) => {
  try {
    const product_id = req.params;

    const data = await db.tbl_seo_master
      .update(req.body, {
        where: {
          product_id: product_id.id,
        },
      })
      .then((result: any) => {
        return commonResponse(res, 200, result, [], "", process.env.ENVIRO);
      });
  } catch (error) {
    return commonResponse(
      res,
      500,
      [],
      [],
      `error:${error}`,
      process.env.ENVIROMENT
    );
  }
};
const seoController: any = {
  getSeo,
  getByProductIdSeo,
  createSeo,
  updateSeo,
};
export default seoController;
