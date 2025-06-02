import db from "../models/index";
const { commonResponse } = require("@ssiltools/shared-files");
import { validateInputs } from "../helper/sharedMethods"
import sapValidators from '../controller/validators/sapValidation'

const SapConstantTable = db.tbl_sap_constant_master

/**
 * create Material group:
 * @param req 
 * @param res 
 * @returns 
 */
const createSapMaterialGroups = async (req: any, res: any) => {
    try {
        const body = req.body;
        const userInput = {
            name: body.name.toUpperCase(),
            description: body.description,
            is_sap_created: body.is_sap_created,
            is_active: body.is_active,
            created_by: body.created_by,
            updated_by: body.updated_by
        }
        const isValid = validateInputs(sapValidators.createSapMaterialGroupSchema, userInput);
        if (isValid.status === 400)
            return commonResponse(
                res,
                isValid.status,
                [],
                isValid.errors,
                "",
                process.env.ENVIROMENT
            );

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

        const createMaterial = await db.tbl_sap_material_group_master.create(userInput)
        return commonResponse(
            res,
            200,
            createMaterial,
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
 * get Material List:
 * @param req 
 * @param res 
 * @returns 
 */
const getSapMaterialGroups = async (req: any, res: any) => {
    try {
        const userInput = req.query
        let getMaterial
        if (userInput.name != undefined) {
            getMaterial = await db.tbl_sap_material_group_master.findOne({
                where: {
                    name: userInput.name
                }
            })
            return commonResponse(
                res,
                200,
                getMaterial,
                "",
                "",
                process.env.ENVIROMENT
            );
        }
        else {
            getMaterial = await db.tbl_sap_material_group_master.findAll()
            return commonResponse(
                res,
                200,
                getMaterial,
                "",
                "",
                process.env.ENVIROMENT
            );
        }

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
 * Update Material Group:
 * @param req 
 * @param res 
 * @returns 
 */
const updateSapMaterialGroups = async (req: any, res: any) => {
    try {
        const body = req.body;
        const update = {
            name: body.name.toUpperCase(),
            description: body.description,
            is_sap_created: body.is_sap_created,
            is_active: body.is_active,
            created_by: body.created_by,
            updated_by: body.updated_by
        }
        const updateMaterial = await db.tbl_sap_material_group_master.update(update, {
            where: {
                id: body.id
            }
        })

        if (updateMaterial[0] === 0) {
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
            updateMaterial,
            "",
            "Update successfully",
            process.env.ENVIROMENT
        );
    } catch (error: any) {
        let typeOfError = error?.errors[0]?.validatorKey || null
        let message = error?.errors[0]?.message || null
        let statusCode = 500
        if (typeOfError !== null) {
            statusCode = 400
        }
        return commonResponse(
            res,
            statusCode,
            message,
            message,
            message,
            process.env.ENVIROMENT
        );
    }
}



/**
 * create sap constant: 
 * @param req 
 * @param res 
 * @returns 
 */

const createSapConstant = async (req: any, res: any) => {
    try {
        const body = req.body;
        const data = {
            name: body.name,
            display_name: body.display_name,
            value: body.value,
            description: body.description,
            is_sap_created: body.is_sap_created,
            is_active: body.is_active,
            created_by: body.created_by,
            updated_by: body.updated_by
        }
        const isValid = validateInputs(sapValidators.createSapConstantSchema, data);
        if (isValid.status === 400)
            return commonResponse(
                res,
                isValid.status,
                [],
                isValid.errors,
                "",
                process.env.ENVIROMENT
            );
        // duplicate check
        const isExist = await db.tbl_sap_constant_master.findOne({
            where: {
                name: body.name
            }
        })
        if (isExist) {
            return commonResponse(
                res,
                409,
                isExist,
                "",
                `The name ${isExist.name} is already exist`,
                process.env.ENVIROMENT
            );
        }
        const insertConstant = await db.tbl_sap_constant_master.create(body)
        return commonResponse(
            res,
            200,
            insertConstant,
            "",
            "",
            process.env.ENVIROMENT
        );

    } catch (error: any) {
        return commonResponse(
            res,
            500,
            error.message,
            "",
            "",
            process.env.ENVIROMENT
        );
    }

}

/**
 * get sap constant list:
 * @param req 
 * @param res 
 * @returns 
 */
const getSapConstant = async (req: any, res: any) => {
    try {
        const body = req.query
        let getSapConstant
        if (body.name !== undefined) {
            getSapConstant = await db.tbl_sap_constant_master.findOne({
                where: {
                    name: body.name
                }
            })
            return commonResponse(
                res,
                200,
                getSapConstant,
                "",
                "",
                process.env.ENVIROMENT
            );
        }
        else {
            getSapConstant = await db.tbl_sap_constant_master.findAll()
            return commonResponse(
                res,
                200,
                getSapConstant,
                "",
                "",
                process.env.ENVIROMENT
            );
        }
    } catch (error: any) {
        return commonResponse(
            res,
            500,
            error.message,
            "",
            "",
            process.env.ENVIROMENT
        );
    }
}

/**
 * update sap constant 
 * @param req 
 * @param res 
 * @returns 
 */
const updateSapConstant = async (req: any, res: any) => {
    try {
        const body = req.body;
        const data = {
            name: body.name,
            display_name: body.display_name,
            value: body.value,
            description: body.description,
            is_sap_created: body.is_sap_created,
            is_active: body.is_active,
            created_by: body.created_by,
            updated_by: body.updated_by
        }

        if (data.name) {
            const isDuplicate = await SapConstantTable.findOne({
                where: { name: data.name }
            })

            if (isDuplicate) {
                return commonResponse(
                    res,
                    400,
                    [],
                    [],
                    "Record with same name already exist",
                    process.env.ENVIROMENT
                );
            }
        }

        const updateConstant = await SapConstantTable.update(data, {
            where: {
                id: body.id
            }
        })
        if (updateConstant[0] === 0) {
            return commonResponse(
                res,
                200,
                [],
                "",
                "Data not updated",
                process.env.ENVIROMENT
            );
        }
        return commonResponse(
            res,
            200,
            updateConstant,
            "",
            "Data Update successfully",
            process.env.ENVIROMENT
        );
    } catch (error: any) {
        console.log("error: ", error);
        return commonResponse(
            res,
            500,
            [],
            [],
            "",
            process.env.ENVIROMENT
        );
    }
}



const sapController = {
    createSapMaterialGroups,
    getSapMaterialGroups,
    updateSapMaterialGroups,
    createSapConstant,
    getSapConstant,
    updateSapConstant
};

export default sapController;
