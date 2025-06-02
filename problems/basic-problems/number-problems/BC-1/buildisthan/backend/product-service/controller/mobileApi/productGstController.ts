import db from "../../models";
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");
const { Sequelize, QueryTypes } = require('sequelize')
import Ajv from "ajv";
const ajv = new Ajv();
import productItemGstValidation from "../validators/productItemGstValidation";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * create new business gst 
 */
const create = async (req: any, res: any) => {

    try {

        //Validation Check
        const validate = ajv.compile(productItemGstValidation.productItemGst);
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
        //create gst master
        const data = await db.tbl_business_gst_master.create(req.body).then((result: any) => {
            return commonResponse(
                res,
                200,
                result,
                [],
                "",
                process.env.ENVIROMENT
            );
        })
    } catch (error: any) {
        return commonResponse(
            res,
            500,
            [],
            error.message,
            "",
            process.env.ENVIROMENT
        );
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * get business gst list data
 */
const getBusinessGst=async(req:any,res:any)=>{
    
    try {
        let user_id: any =req.params ;        
        const data=await db.tbl_business_gst_master.findAll({
            where:{
                user_id:user_id.id
            }
        })
        
        if(data.length===0){
            console.log('logs',data.length)
            return commonResponse(
                res,
                200,
                data,
                [],
                "Data not found!",
                process.env.ENVIROMENT
            );
        }
        else{
            return commonResponse(
                res,
                200,
                data,
                [],
                "",
                process.env.ENVIROMENT
            );
        }
       
                
        
    } catch (error:any) {
        return commonResponse(
            res,
            500,
            [],
            error.message,
            "",
            process.env.ENVIROMENT
        );
    }
}

const businessGstRoutes = {
    create,
    getBusinessGst

}

export default businessGstRoutes;
