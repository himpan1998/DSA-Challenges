import db from "../../models";
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");
const { Sequelize, QueryTypes } = require('sequelize')
import Ajv from "ajv";
const ajv = new Ajv();
import productValidators from "../validators/productCart";
const { Op } = require('sequelize')

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * create and update product item card
 */
const create = async (req: any, res: any) => {
    try {
        const { product_id } = req.body

        const data = extractTokenInfo('', req.headers)

        const userReq = {
            "product_id": product_id,
            "user_id": data.member_master.id,
            "sku_id": req.body.sku_id,
            "category_id": req.body.category_id,
            "user_name": data.member_master.username,
            "quantity": req.body.quantity,
            "ask_price": req.body.price,
            "status": false,
            "is_saved_for_later": req.body.is_saved_for_later || false
        }
        //Validation Check
        const validate = ajv.compile(productValidators.create);
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
        }
        else {

            const isAdd = await db.tbl_product_cart_master.findOne({
                where: {
                    product_id: product_id
                }
            })

            if (isAdd?.product_id === userReq?.product_id) {
                const isUpdateProduct = await db.tbl_product_cart_master.update(userReq, {
                    where: {
                        product_id: product_id
                    }
                }).then((result: any) => {
                    return commonResponse(res, 200, result, [], "Update cart product", process.env.ENVIROMENT)


                })


            }
            else {
                await db.tbl_product_cart_master.create(userReq).then((result: any) => {
                    return commonResponse(res, 200, result, [], "", process.env.ENVIROMENT)
                })
            }

        }



    } catch (err: any) {
        return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT)
    }
}
/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * get CartItem by UserID
 */
const getCartByUserId = async (req: any, res: any) => {
    try {
        const user_id = req.params

        const data = await db.tbl_product_cart_master.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                user_id: user_id.id
            },
            include: [{
                model: db.tbl_product_master,
                as: 'product_items',
                attributes: ['id', 'product_name', 'short_description', 'full_description'],
                include: [{
                    model: db.tbl_uom_master,
                    as: 'uom',
                    attributes: ['id', 'name', 'symbol']
                }, {
                    model: db.tbl_product_images,
                    as: 'images',
                    attributes: ['id', 'image_url']
                },]

            }
            ],


        })

        if (data.length > 0) {

            return commonResponse(res, 200, data, [], "", process.env.ENVIROMENT)
        }
        else {

            return commonResponse(res, 200, null, "", "No record found", process.env.ENVIROMENT)
        }

    } catch (err: any) {
        return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT)
    }
}
/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * delete cart items and check save for later
 */
const deleteCartItemByUserId = async (req: any, res: any) => {
    try {
        const { user_id, product_id } = req.body
        const isDelete = await db.tbl_product_cart_master.destroy({
            where: {

                [Op.and]: [{ user_id: user_id }, { product_id: product_id }, { is_saved_for_later: 0 }]
            }
        })

        return commonResponse(res, 200, isDelete, [], "", process.env.ENVIROMENT)


    } catch (err: any) {
        return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT)
    }


}
/**
 *  get cart Item according to user id
 * @param req 
 * @param res 
 * @returns 
 */
const getCartListSaveForLater = async (req: any, res: any) => {
    try {
        const user_id = req.params
        const data = await db.tbl_product_cart_master.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                // user_id: user_id.id,
                [Op.and]: [{ user_id: user_id.id }, { is_saved_for_later: 1 }]
            },
            include: [{
                model: db.tbl_product_master,
                as: 'product_items',
                attributes: ['product_name', 'short_description', 'full_description'],
                include: [{
                    model: db.tbl_uom_master,
                    as: 'uom',
                    attributes: ['name', 'symbol']
                }]

            }
            ],


        })

        if (data.length > 0) {

            return commonResponse(res, 200, data, [], "", process.env.ENVIROMENT)
        }
        else {

            return commonResponse(res, 200, null, "", "No record found", process.env.ENVIROMENT)
        }

    } catch (err: any) {
        return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT)
    }
}
/**
 * db migration and insert bulk create with function
 * @param insertData 
 */
const bulkInsert = async (insertData: any) => {

    try {
        const dd = await db.tbl_product_block_mappings.bulkCreate(insertData)



    } catch (error: any) {
        console.log('error', error.message)
    }

}

const productItemCardRouter = {
    create,
    getCartByUserId,
    deleteCartItemByUserId,
    getCartListSaveForLater,
    bulkInsert
}

export default productItemCardRouter;