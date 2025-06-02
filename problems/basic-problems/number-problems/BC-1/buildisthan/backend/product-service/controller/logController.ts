import db from '../models/index'
import logValidator from "./validators/logs";
import { getModelAndAttributes, logUpdateChanges, validateInputs } from "../helper/sharedMethods";
const { commonResponse } = require("@ssiltools/shared-files");

/**
 * Creates Log
 * @param req 
 * @param res 
 * @returns 
 */
const create = async (req: any, res: any) => {
    try {

        var body: any = req.body
        const isValid = validateInputs(logValidator, body);
        if (isValid.status === 400)
            return commonResponse(
                res,
                isValid.status,
                [],
                isValid.errors,
                "",
                process.env.ENVIROMENT
            );
        body.created_by = req.user_id
        const log = await logUpdateChanges(body);
        console.log('log', log)
        return commonResponse(res, 200, log, []);
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
 * Get Log By Id
 * @param req 
 * @param res 
 * @returns 
 */
const getLogById = async (req: any, res: any) => {
    try {
        const type = req.query.type || 'product'
        const id = req.query.id || 1

        const conditions = {
            include: [{
                model: db.tbl_product_master,
                as: 'product'
            }],
            where: {
                product_id:id
            },
            order:[['createdAt', 'desc']]
        }
        var result: any = []
        const ENTITY: any = await getModelAndAttributes(type);
        result = await ENTITY.log.db.findAll(conditions);
        
     
        return commonResponse(res, 200, result, []);

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



const logController = {
    create,
    getLogById
}


export default logController;
