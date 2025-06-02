import Ajv from "ajv";
import { uploadImage } from "../helper/sharedMethods";
import db from '../models/index'
import subCategoryValidators from "./validators/subcategory";
import {getIsActiveData} from "../helper/sharedMethods";
import { Op } from "sequelize";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");
const subcategory = db.tbl_sub_categories_master;

/**
 * Create a new subcategory
 * @param req 
 * @param res 
 * @returns 
 */
 const create = async (req: any, res: any) => {
    try {
        const validate = ajv.compile(subCategoryValidators.create);
        let key: any = req.body.key || null;
        delete req.body.key;
        // Update Data
        let data: any = req.body;
        if (key !== null) {
          let update: any = await subcategory.update(data, {
            where: {
              id: key,
            },
          });
          if (update)
            return commonResponse(res, 200,update, [], "Data Updated Successfully..");
            
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
        
        const isDuplicate: any = await subcategory.findOne({
            where: {
                sub_category_name: data.sub_category_name,
            }
        });
        if (isDuplicate !== null) {
            return commonResponse(res, 409, isDuplicate, []);
        }

        // const pictures = req.files
    
        // let image_paths = '';
        // if(pictures instanceof Array) {
        //     for(var i = 0; i < pictures.length; i++){
        //          image_paths = await uploadImage(req, "b2b-product-images", "images")
        //     }
        // } else {
        //      image_paths = await uploadImage(req, "b2b-product-images", "images")
        // }
        
        // data.subCategoryImage = image_paths
        // return res.send({});
        const createdData = await subcategory.create(data);

        return commonResponse(res, 200, createdData, [], "Product Sub category Created Successfully..");

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
}

/**
 * Get all subcategories
 * @param req 
 * @param res 
 * @returns 
 */
 const getAll = async (req: any, res: any) => {
    try {
        let paramsActive=req.query.is_active==undefined?1:req.query.is_active
        
        let isActiveSubCategory= getIsActiveData('',paramsActive)

        var conditions:any={ attributes:['id', 'sub_category_name', 'category_id','is_active','parent_id', 'createdAt'],        
            where:{
                [Op.or]:[isActiveSubCategory]
        }}
        const data = await subcategory.findAll(conditions);
        // const getCatOrSubCate=[]
        // console.log('cate',data)
        

        if(req.query?.take) {
            conditions['limit'] = +req.query.take
            conditions['offset'] = +req.query?.skip
            const result = await subcategory.findAll(conditions);
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
    }
    
    /**
     * Get all subcategories by category id
     * @param req 
     * @param res 
     * @returns 
    */
   const getById = async (req: any, res: any) => {
       const id = req.query.id || 1

       try {
           let paramsActive=req.query.is_active==undefined?1:req.query.is_active
           let isActiveSubCategory= getIsActiveData('',paramsActive)
           const result = await subcategory.findAll({
               attributes:['id', 'sub_category_name','is_active'],
               where:{
                   [Op.and]:[{ category_id: id},isActiveSubCategory]
            }
                       
        });

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
}

/**
 * Get all subcategories within same entity using parent id
 * @param req 
 * @param res 
 * @returns 
 */
 const getChildById = async (req: any, res: any) => {
    const id = req.query.id || 0

    try {

        const result = await subcategory.findAll({
            where:{
                parent_id: id
            }
        });

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
}

/**
 * @param req 
 * @param res 
 * @returns 
 * @author Ravi Ranjan Kumar
 */
 const getCategoryMasterFromSubCategory = async (req: any, res: any) => {
    try {
        const result = await subcategory.findAll({
            where:{
                parent_id: null
            }
        });
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
}

const subCategoryRoutes = {
    create,
    getAll,
    getById,
    getChildById,
    getCategoryMasterFromSubCategory
}

export default subCategoryRoutes;
