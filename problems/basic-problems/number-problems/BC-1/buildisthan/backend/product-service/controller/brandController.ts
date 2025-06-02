import Ajv from "ajv";
import { range, uploadImage } from "../helper/sharedMethods";
import db from "../models/index";
import brandValidators from "./validators/brand";
const ajv = new Ajv();
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");
import { getIsActiveData, offsetOrLimit } from "../helper/sharedMethods";
import { Op } from "sequelize";
const brand = db.tbl_brand_masters;

/**
 * Create a new product
 * @param req
 * @param res
 * @returns
 */

const create = async (req: any, res: any) => {
  try {
    // const tokenExtract = extractTokenInfo('', req.headers) 
    // console.log("token:",tokenExtract.user_id)

    const validate = ajv.compile(brandValidators.create);
    let key: any = req.body.key || null;
    delete req.body.key;

    // Update Data
    let data: any = req.body;
    if (key !== null) {
      let update: any = await brand.update(data, {
        where: {
          id: key,
        },
      });
      if (update)
        return commonResponse(
          res,
          200,
          update,
          [],
          "Data Updated Successfully.."
        );
      return commonResponse(res, 500, [], [], "Something Went Wrong!!");
    }
    //Validation Check
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const isDuplicate: any = await brand.findOne({
      where: {
        brand_name: data.brand_name,
      },
    });
    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }

    // return res.send({});
    data.created_by = req.user_id
    const createdData = await brand.create(data);

    return commonResponse(
      res,
      200,
      createdData,
      [],
      "Brand Created Successfully.."
    );
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
 * Create a new product
 * @param req
 * @param res
 * @returns
 */
const getAll = async (req: any, res: any) => {
  try {


    let web_api = req.query.web_api;
    let paramsActive =
      req.query.is_active == undefined ? 1 : parseInt(req.query.is_active);

    console.log("datatype:", typeof (paramsActive))

    let isActiveBrand = getIsActiveData(web_api, paramsActive);
    var conditions: any = { where: isActiveBrand }
    const data = await brand.findAll(conditions);

    if (req.query?.take) {
      conditions['limit'] = +req.query.take
      conditions['offset'] = +req.query?.skip
      const result = await brand.findAll(conditions);
      return commonResponse(res, 200, { data: result, totalCount: data.length })
    }
    return commonResponse(res, 200, data)



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

const brandRoutes = {
  create,
  getAll
};

export default brandRoutes;
