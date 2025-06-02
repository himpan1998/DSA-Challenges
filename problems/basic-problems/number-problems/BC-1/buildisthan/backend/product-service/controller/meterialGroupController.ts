import Ajv from "ajv";
const ajv = new Ajv();
import db from "../models/index";
const { commonResponse } = require("@ssiltools/shared-files");
import createValidation from './validators/materialGroupValidations'
import { Op } from "sequelize";

/**
 * create meterial group
 * @param req 
 * @param res 
 * @returns 
 */
const createMeterialGroups = async (req: any, res: any) => {
    try {
        const body = req.body;   
        if(body.name?.toUpperCase()){
            return commonResponse(
                res,
                500,
                [],
               "",
                "name field is't upper case!🤦‍♂️",
                process.env.ENVIROMENT
            );
        }
        const userInput={
            name:body.NAME,
            description:body.description,
            is_sap_created:body.is_sap_created,
            is_active:body.is_active,
            created_by:body.created_by,
            updated_by:body.updated_by
        }          

        const validate = ajv.compile(createValidation.createValidation);
        const valid = validate(userInput);
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

        const isDuplicate = await db.tbl_sap_material_group_master.findOne({
            where: {
                name: userInput.name
            }
        })
        if (isDuplicate) {
            return commonResponse(
                res,
                409,
                isDuplicate,
                "",
                `You've already entered that name ${isDuplicate.name}`,
                process.env.ENVIROMENT
            );
        }
     
        const createMeterial = await db.tbl_sap_material_group_master.create(userInput)
        return commonResponse(
            res,
            200,
            createMeterial,
            "",
            "",
            process.env.ENVIROMENT
        );

    } catch (erro: any) {
        return commonResponse(
            res,
            500,
            erro.message,
            "",
            "",
            process.env.ENVIROMENT
        );
    }
}

/**
 * get meterial information
 * @param req 
 * @param res 
 * @returns 
 */
const getMeterialGroups=async(req:any,res:any)=>{
    try {
      const userInput=req.query  
      if(userInput.name?.toUpperCase()){
        return commonResponse(
            res,
            500,
            [],
           "",
            "name field is't upper case!🤦‍♂️",
            process.env.ENVIROMENT
        );
    }   
      let getMaterial

      if(!userInput.name===undefined){
        getMaterial= await db.tbl_sap_material_group_master.findOne({
            where:{
                name:userInput.NAME
            }
          }) 
      }
      else{
        getMaterial= await db.tbl_sap_material_group_master.findOne() 
        return commonResponse(
            res,
            200,
            getMaterial,
            "",
            "",
            process.env.ENVIROMENT
        );
      }
     
    } catch (erro:any) {
        return commonResponse(
            res,
            500,
            erro.message,
            "",
            "",
            process.env.ENVIROMENT
        );
    }
}

const updateMeterialGroups=async(req:any,res:any)=>{
    try {
        const body=req.body;
        const update={
            name:body.NAME,
            description:body.description,
            is_sap_created:body.is_sap_created,
            is_active:body.is_active,
            created_by:body.created_by,
            updated_by:body.updated_by
        }
        if(body.name?.toUpperCase()){
            return commonResponse(
                res,
                500,
                [],
               "",
                "name field is't upper case!🤦‍♂️",
                process.env.ENVIROMENT
            );
        }
        const updateMeterial=await db.tbl_sap_material_group_master.update(update,{
            where:{
                id:body.id
            }
        })
              
        if(updateMeterial[0]===0){
            return commonResponse(
                res,
                200,
                [],
                "",
                "Update Error!   No valid information could be updated",
                process.env.ENVIROMENT
            );
        }
        return commonResponse(
            res,
            200,
            updateMeterial,
            "",
            "Update successfully",
            process.env.ENVIROMENT
        );
    } catch (erro:any) {
        return commonResponse(
            res,
            500,
            erro.message,
            "",
            "",
            process.env.ENVIROMENT
        ); 
    }
}
const meterialGroupRouter = {
    createMeterialGroups,
    getMeterialGroups,
    updateMeterialGroups
};

export default meterialGroupRouter;
