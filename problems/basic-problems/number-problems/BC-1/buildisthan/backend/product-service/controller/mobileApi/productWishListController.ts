import db from "../../models";
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");

import Ajv from "ajv";
const ajv = new Ajv();
import productWishListValidators from "../validators/productWishListvalidation";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * create ProductWishList
 */
const createProductWishList = async (req: any, res: any) => {
  try {
    const userReq = {
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      user_name: req.body.user_name,
      image_url: req.body.image_url,
      quantity: req.body.quantity, 
      ask_price:req.body.ask_price,
      uom_symbol:req.body.uom_symbol,        
      isStatus: req.body.isStatus
    };

    const { product_id } = req.body;
    //Validation Check
    const validate = ajv.compile(productWishListValidators.create);
    const valid = validate(userReq);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    } else {
      const isAdd = await db.tbl_product_wish_lists_master.findOne({
        where: {
          product_id: product_id,
        },
      });
     
      if (isAdd?._previousDataValues.product_id == userReq.product_id) {
        commonResponse(
          res,
          200,
          isAdd,
          [],
          "Duplicate records found!",
          process.env.ENVIROMENT
        );
      } else {
        await db.tbl_product_wish_lists_master.create(userReq).then((result: any) => {
          return commonResponse(
            res,
            200,
            result,
            [],
            "",
            process.env.ENVIROMENT
          );
        });
      }
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

/**
 * get ProductWishList data
 * @param req 
 * @param res 
 * @returns 
 */
const getProductWishList=async(req:any,res:any)=>{
    try {
        let user_id: any =req.params ;
        

      const data=await db.tbl_product_wish_lists_master.findAll({
            where:{
                user_id:user_id.id
            },
            include:[
              {
                model:db.tbl_product_images,
                as:'product_images'
              }
            ]
        }) 

        return commonResponse(
          res,
          200,
          data,
          [],
          "",
          process.env.ENVIROMENT
        );
        
    } catch (err:any) {
        return commonResponse(
            res,
            500,
            [],
            err.message,
            "",
            process.env.ENVIROMENT
          );
    }
}

/***
 * Delete Product wishList
 */
const deleteProductWishlist = async (req: any, res: any) => {
  try {
    const { user_id, product_id } = req.body;
    await db.tbl_product_wish_lists_master
      .destroy({
        where: {
          user_id: user_id,
          product_id: product_id,
        },
      })
      .then((result: any) => {
        return commonResponse(res, 200, result, [], "", process.env.ENVIROMENT);
      });
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
const productWishListRouter = { createProductWishList, deleteProductWishlist,getProductWishList };
export default productWishListRouter;
