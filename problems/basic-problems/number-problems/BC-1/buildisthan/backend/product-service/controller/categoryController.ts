import Ajv from "ajv";
import { Op } from "sequelize";
import fs from "fs"
import { uploadImage,getIsActiveData } from "../helper/sharedMethods";
import db from "../models/index";
import userSerivceDB from "../remote/user.service";
import categoryValidators from "./validators/category";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");
const category = db.tbl_category_masters;

/**
 * Create a new product and delete auto generated temp file
 * @param req
 * @param res
 * @returns
 */
const create = async (req: any, res: any) => {
  try {
   let uploadPath='./tmp'  
    const validate = ajv.compile(categoryValidators.create);
    let key: any = req.body.key || null;
    delete req.body.key;
    // Update Data
    let data: any = req.body;
    if (key !== null) {
      if (req.files) {
        image_paths = await uploadImage(req, "b2b-product-images", "images");
        data.category_image = image_paths;
        // if (fs.existsSync(uploadPath)) {
        //   fs.unlinkSync(uploadPath);
        // }
        //by dilip
        fs.unlink(uploadPath,function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
     });  
      }
      let update: any = await category.update(data, {
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

    const isDuplicate: any = await category.findOne({
      where: {
        category_name: data.category_name,
      },
    });
    if (isDuplicate !== null) {            
      // if (fs.existsSync(uploadPath)) {
      //   fs.rmdirSync(uploadPath, {recursive: true})
      // }
      //by dilip
      fs.unlink(uploadPath,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });

      return commonResponse(res, 409, isDuplicate, []);
    }

    var image_paths = "";
    image_paths = await uploadImage(req, "b2b-product-images", "images");
    // return res.send({});
    data.category_image = image_paths;
    data.is_active = req.body.is_active
    const createdData = await category.create(data);
   
    return commonResponse(
      res,
      200,
      createdData,
      [],
      "Product Category Created Successfully.."
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
 * Create a new category
 * @param req
 * @param res
 * @returns
 */
const getAll = async (req: any, res: any) => {
  try {
     
    const web_api = req.query.web_api;
    const paramsActive = req.query.is_active == undefined ? 1 : req.query.is_active;
    const isActiveBrand = getIsActiveData(web_api, paramsActive);
    const conditions: any = {where:isActiveBrand}   

    const data = await db.tbl_category_masters.findAll(conditions);
    if(req.query?.take) {
      conditions['limit'] = +req.query.take
      conditions['offset'] = +req.query?.skip
      const result = await db.tbl_category_masters.findAll(conditions);
      return commonResponse(res, 200, {data:result,totalCount:data.length});
    }
    const result = await db.tbl_category_masters.findAll(conditions);
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
//under working
const getCategoryByProductList = async (req: any, res: any) => {
  /*       
        const {user_pincode}=req.query
       
        var ProductIds : any = []
        var CategoryIds : any = []
        if(user_pincode?.length>0){
         const userSerTable =await userSerivceDB.query(`SELECT block_id FROM tbl_area_pincode_masters where pincode=${user_pincode} and block_id > 0`)
         const userBlockId=userSerTable[0][0]?.block_id
        
        //  const getProductIds = await db.sequelize.query(`SELECT DISTINCT product_id from tbl_product_availability_based_on_blocks where block_id = '${userBlockId}'`)
         const getCategoryIds = await db.sequelize.query(`SELECT DISTINCT category_id from tbl_product_availability_based_on_blocks where block_id = '${userBlockId}'`)
        
        //  ProductIds = getProductIds[0].map((e: any) => {
        //      return e.product_id
        //  })
        
         CategoryIds = getCategoryIds[0].map((e: any) => {
            
             return e.category_id

         })

        
         if(CategoryIds.length <=0){
           return commonResponse(res, 200,{"isDeliver":false},'', "😓Sorry! We're not serviceable here");
         }
         else{
            const categoryByPincode = await db.sequelize.query(`SELECT id, category_name,category_image,is_active FROM tbl_category_masters where id in(${CategoryIds})`)        
           
            return commonResponse(res, 200, categoryByPincode[0]);
    
         }
         
        }


         const categoryByPincode = await db.sequelize.query(`SELECT id, category_name,category_image,is_active FROM tbl_category_masters`)
         
           
            return commonResponse(res, 200, categoryByPincode[0]);*/
  try {
    const { user_pincode } = req.query;

    var ProductIds: any = [];
    var CategoryIds: any = [];
    if (user_pincode?.length > 0) {
      const userSerTable = await userSerivceDB.query(
        `SELECT block_id FROM tbl_area_pincode_masters where pincode=${user_pincode} and block_id > 0`
      );
      const userBlockId = userSerTable[0][0]?.block_id;

      //  const getProductIds = await db.sequelize.query(`SELECT DISTINCT product_id from tbl_product_availability_based_on_blocks where block_id = '${userBlockId}'`)
      const getCategoryIds = await db.sequelize.query(
        `SELECT DISTINCT category_id from tbl_product_availability_based_on_blocks where block_id = '${userBlockId}'`
      );

      //  ProductIds = getProductIds[0].map((e: any) => {
      //      return e.product_id
      //  })

      CategoryIds = getCategoryIds[0].map((e: any) => {
        return e.category_id;
      });
    }

    if (CategoryIds.length <= 0) {
      return commonResponse(
        res,
        200,
        { isDeliver: false },
        "",
        "😓Sorry! We're not serviceable here"
      );
    } else {
      const categoryByPincode = await db.sequelize.query(
        `SELECT id, category_name,category_image FROM tbl_category_masters where id in(${CategoryIds})`
      );

      return commonResponse(res, 200, categoryByPincode[0]);
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


const categoryRoutes = {
  create,
  getAll
};

export default categoryRoutes;
