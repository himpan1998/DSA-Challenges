import Ajv from "ajv";
import { uploadImage } from "../helper/sharedMethods";
import db from "../models/index";
import uomValidators from "./validators/uom";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");
import {getIsActiveData} from "../helper/sharedMethods";
import { Op } from "sequelize";
const uom = db.tbl_uom_master;

/**
 * Create a new product
 * @param req
 * @param res
 * @returns
 */
const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(uomValidators.create);
    let key: any = req.body.key || null;
    delete req.body.key;
    // Update Data
    let data: any = req.body;
    if (key !== null) {
      let update: any = await uom.update(data, {
        where: {
          id: key,
        },
      });
      if (update)
        return commonResponse(res, 200, [], [], "Data Updated Successfully..");
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

    const isDuplicate: any = await uom.findOne({
      where: {
        [Op.or]: [
          { name: data.name},
          { symbol:data.symbol }
        ]
                 
        }
      },
    );
    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }

    // return res.send({});
    const createdData = await uom.create(data);

    return commonResponse(
      res,
      200,
      createdData,
      [],
      "Unit Created Successfully.."
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
      req.query.is_active == undefined ? 1 : req.query.is_active;
     let isActiveUOM = getIsActiveData(web_api, paramsActive);

    var conditions:any={ where: isActiveUOM,    attributes: { exclude: ["deletedAt", "updatedAt"] },}

    const data = await uom.findAll(conditions);

    if(req.query?.take) {
      conditions['limit'] = +req.query.take
      conditions['offset'] = +req.query?.skip

      const result = await uom.findAll(conditions);
      return commonResponse(res, 200, {data:result,totalCount:data.length});
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


const uomRoutes = {
  create,
  getAll,
};

export default uomRoutes;
