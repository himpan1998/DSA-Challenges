import Ajv from "ajv";
import sequelize from "sequelize";
import { cleanTmp } from "../helper/sharedMethods";
import db from '../models/index'
import userSerivceDB from "../remote/user.service";
const ajv = new Ajv();
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");
const readXlsxFile = require('read-excel-file/node')


/**
 * Get Seller Products as per Category - Sub Category
 * @param req 
 * @param res 
 * @returns 
 */
const getProductList = async (req: any, res: any) => {
    try {
        const data = extractTokenInfo('', req.headers)
        if (data?.status === 401) {
            return commonResponse(res, 401, [], [], "");
        }
        let category_id = req.query.category_id || 0
        let sub_category_id = req.query.sub_category_id || 0

        let conditions: any = {
            attributes: ['id', 'product_name', 'original_price', 'brand_id', 'categories_id', 'sub_categories_id', 'sku', 'product_type', 'is_active'],
            where: [{
                categories_id: category_id,
                is_active: 1
            }],
            include: [{
                model: db.tbl_seller_linked_product_mappings,
                required: false,
                as: 'sellerProducts',
                attributes: ['product_id', 'seller_id', 'price'],
                where: {
                    seller_id: data?.id
                }
            }]
        }
        if (sub_category_id > 0) {
            conditions['where'].push({
                sub_categories_id: sub_category_id
            })
        }
        if (category_id != 0) {
            let resp = await db.tbl_product_master.findAll(conditions);
            return commonResponse(res, 200, resp, []);
        } else {
            let resp = await db.tbl_product_master.findAll({
                attributes: ['id', 'product_name', 'original_price', 'brand_id', 'categories_id', 'sub_categories_id', 'sku', 'product_type', 'is_active']
            });
            return commonResponse(res, 200, resp, [], "");

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
 * set Product Price
 * @param req 
 * @param res 
 * @returns 
 */
const setProductPrices = async (req: any, res: any) => {
    try {
        const data = extractTokenInfo('', req.headers)
        const { product_prices } = req.body
        if (product_prices.length && data?.id) {
            //var transaction: any = await db.sequelize.transaction()
            await db.tbl_seller_linked_product_mappings.destroy({
                where: {
                    seller_id: data?.id
                }
            })

            product_prices.map(async (e: any) => {

                await db.tbl_seller_linked_product_mappings.create({
                    seller_id: data?.id,
                    product_id: e.id,
                    price: e.price,
                    shipping_cost: 0,
                    order: 1,
                    is_approved: 0
                })
            })

            //await transaction.commit()
            return commonResponse(res, 200, [], [], "");
        }


        return commonResponse(res, 400, [], [], "");

    } catch (err: any) {

        //transaction.rollback()

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
 * Create / Update Seller Product Prices
 * @param req 
 * @param res 
 * @returns 
 */
const createOrUpdateSellerPrices = async (req: any, res: any) => {
    try {
        const data = extractTokenInfo('', req.headers)
        const seller_id = data.id
        const { product_prices } = req.body
        if (product_prices.length && seller_id > 0) {
            product_prices.map(async (e: any) => {

                const shouldUpdate = await db.tbl_seller_linked_product_mappings.findOne({
                    where: {
                        product_id: e.id,
                        seller_id: seller_id
                    }
                })
                if (shouldUpdate) {
                    await db.tbl_seller_linked_product_mappings.update({
                        price: e.price
                    }, {
                        where: {
                            product_id: e.id
                        }
                    })
                } else {
                    await db.tbl_seller_linked_product_mappings.create({
                        seller_id: data?.id,
                        product_id: e.id,
                        price: e.price,
                        shipping_cost: 0,
                        order: 1,
                        is_approved: 0
                    })
                }

            })

            //await transaction.commit()
            return commonResponse(res, 200, [], [], "");
        }

    } catch (err: any) {

        //transaction.rollback()

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
 * Set Seller Categories
 * @param req 
 * @param res 
 * @returns 
 */
const setSellerCategories = async (req: any, res: any) => {

    try {

        var data = extractTokenInfo('', req.headers)
        const { categories_id } = req.body
        if (req.body?.seller_id)
            data.id = req.body.seller_id

        const destroyAll = await db.tbl_seller_categories_mappings.destroy({
            where: {
                seller_id: data?.id
            }
        });

        categories_id.map(async (e: any) => {

            await db.tbl_seller_categories_mappings.create({
                seller_id: data?.id,
                category_id: e
            })


        })


        return commonResponse(res, 200, [], [], "");


    } catch (err: any) {

        //transaction.rollback()

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

//getSellerCategoriesWithServiceArea
/**
 * Set Seller Categories
 * @param req 
 * @param res 
 * @returns 
 */
const getSellerCategoriesWithServiceArea = async (req: any, res: any) => {

    try {

        var data: any = extractTokenInfo('', req.headers)
        if(data?.status === 401){
            return res.send(401);
        }
        if (req.query?.seller_id) {
            data.id = req.query.seller_id;
        }

        const result = await db.tbl_seller_categories_mappings.findAll({
            attributes: ['seller_id', 'category_id'],
            include: [{
                model: db.tbl_category_masters,
                attributes: ['id', 'category_name'],
                as: 'category'
            }],
            where: {
                seller_id: data?.id
            }
        });

        const categoriesStatesServiceAreas = await userSerivceDB.query(`SELECT DISTINCT sdm.state_id, sdm.category_id, sm.state_name as state_name from tbl_seller_selling_districts_mappings sdm JOIN tbl_state_masters sm ON sm.id = sdm.state_id where sdm.seller_id = ${data?.id}`);
        const categoriesDistrictsServiceAreas = await userSerivceDB.query(`SELECT sdm.district_id, sdm.category_id, dm.district_name as district_name from tbl_seller_selling_districts_mappings sdm JOIN tbl_district_masters dm ON dm.id = sdm.district_id where sdm.seller_id = ${data?.id}`);
        const categoriesBlocksServiceAreas = await userSerivceDB.query(`SELECT sbm.block_id, sbm.category_id, bm.block_name as block_name from tbl_seller_selling_blocks_mappings sbm JOIN tbl_block_masters bm ON bm.id = sbm.block_id where sbm.seller_id = ${data?.id}`);
        var finalResult : any = []
        result.map((each : any) => {
            finalResult.push({
                category_id: each.category_id,
                category_name: each.category?.category_name,
                seller_id: each.seller_id,
                state_id: categoriesStatesServiceAreas[0]?.filter((e : any) => e.category_id === each.category_id)?.map((e : any) => {
                    return {
                        value: e.state_id,
                        label: e.state_name
                    }
                }),
                district_ids: categoriesDistrictsServiceAreas[0]?.filter((e : any) => e.category_id === each.category_id)?.map((e : any) => {
                    return  {
                        value: e.district_id,
                        label: e.district_name
                    }
                }),
                block_ids: categoriesBlocksServiceAreas[0]?.filter((e : any) => e.category_id === each.category_id)?.map((e : any) => {
                    return {
                        value: e.block_id,
                        label: e.block_name
                    }
                }),    
            })
        })
        return commonResponse(res, 200, finalResult, [], "");


    } catch (err: any) {

        //transaction.rollback()

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
 * Set Seller Categories
 * @param req 
 * @param res 
 * @returns 
 */
const getSellerCategories = async (req: any, res: any) => {

    try {

        var data: any = extractTokenInfo('', req.headers)
        if (req.body?.seller_id) {
            data.id = req.body.seller_id;
        }

        const result = await db.tbl_seller_categories_mappings.findAll({
            attributes: ['seller_id', 'category_id'],
            include: [{
                model: db.tbl_category_masters,
                attributes: ['id', 'category_name'],
                as: 'category'
            }],
            where: {
                seller_id: data?.id
            }
        });

        return commonResponse(res, 200, result, [], "");


    } catch (err: any) {

        //transaction.rollback()

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
 * Get Product wise Seller Info
 * @param req 
 * @param res 
 * @returns 
 */
const getProductWiseSellers = async (req: any, res: any) => {

    try {
        if(!req.query.product_id){
            return commonResponse(res, 400, [], "Product IDs are required", "Product IDs are required");
        }
        let product_id : any = ""
        let product_idArr = JSON.parse(req.query.product_id) || []
        if(Array?.isArray(product_idArr)){
            product_id = product_idArr.join(',')

        }else{
            product_id = product_idArr
        }
       
        let queryStr = `SELECT * FROM tbl_seller_linked_product_mappings WHERE product_id in (${product_id}) group by seller_id having count(*) = ${product_idArr.length}`
        const result = await db.sequelize.query(queryStr)
        if (result) {
            const sellers = result[0]?.map((e: any) => e.seller_id).join(',');
            if (sellers.length > 0) {
                const sellersData = await userSerivceDB.query(`SELECT tbl_member_masters.id as id, tbl_member_masters.email as email, tbl_member_masters.fullname as username, tbl_user_masters.phone_no as mobile, tbl_user_masters.sap_id as sap_id from tbl_member_masters INNER JOIN tbl_user_masters ON tbl_user_masters.member_id = tbl_member_masters.id AND tbl_member_masters.id in (${sellers})`)
                return commonResponse(res, 200, sellersData ? sellersData[0] : [], [], "");
            }
        }

        return commonResponse(res, 200, [], [], "");



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
 * Set Seller tagged RFQS
 * @param req 
 * @param res 
 * @returns 
 */
const getSellerTaggedRFQs = async (req: any, res: any) => {

    try {
        var data = extractTokenInfo('', req.headers)
        if(data?.status === 401){
            return res.send(401);
        }
        const seller_id = req.query?.seller_id
        if (seller_id > 0) {
            data.id = seller_id
        }
        const query = `SELECT srfq.pre_order_id,
         sum(pe.quantity) as total_order_quantity,
         srfq.createdAt as createdAt, 
         sum(slp.price) as total_order_value,
         GROUP_CONCAT(DISTINCT cat.category_name SEPARATOR ', ') as categories,
         pe.user_id as user_id,
         pe.address_id as address_id
         from tbl_rfq_seller_mappings srfq INNER JOIN tbl_product_enquiries_masters pe
         ON pe.id = srfq.rfq_id and srfq.seller_id = ${data?.id}
         INNER JOIN tbl_category_masters cat ON pe.category_id = cat.id
         INNER JOIN tbl_seller_linked_product_mappings slp ON slp.product_id = pe.product_id and slp.seller_id = ${data?.id}
         GROUP BY srfq.pre_order_id`
      
        const result = await db.sequelize.query(query)
       // return commonResponse(res, 200, result[0], [], "");
        if (!req.is_exportable)
            return commonResponse(res, 200, result[0], [], "");
        else
            return result[0]


    } catch (err: any) {

        //transaction.rollback()

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
 * Set Seller tagged child RFQS
 * @param req 
 * @param res 
 * @returns 
 */
const getSellerTaggedChildRFQs = async (req: any, res: any) => {

    try {
        const data = extractTokenInfo('', req.headers)
        // const seller_id = req.query?.seller_id
        // if (seller_id > 0) {
        //     data.id = seller_id
        // }
 
        if(data?.status === 401){
            return res.send(401);
        }

        const pre_order_id = req.query.pre_order_id || 0

        var conditions: any = {
            attributes: ['id', 'rfq_id', 'pre_order_id', 'remarks', 'createdAt'],
            include: [{
                model: db.tbl_product_enquiries_master,
                as: 'enquiry',
                include: [{
                    model: db.tbl_product_master,
                    attributes: ['id', 'product_name', 'uom_id'],
                    include: [{
                        attributes: ['id', 'name', 'symbol'],
                        model: db.tbl_uom_master,
                        as: 'uom'
                    }],
                    as: 'product'
                }, {
                    model: db.tbl_category_masters,
                    attributes: ['id', 'category_name'],
                    as: 'category'
                }]
            }]
        }

        conditions['where'] = (!req.is_exportable) ? {
            pre_order_id: pre_order_id,
            seller_id: data?.id
        } : {
            seller_id: data?.id
        }

        const result = await db.tbl_rfq_seller_mappings.findAll(conditions)

        if (result && !req.is_exportable) {
            return commonResponse(res, 200, result, [], "");
        }

        return result

        return commonResponse(res, 200, [], [], "");




    } catch (err: any) {

        //transaction.rollback()

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
 * Set Seller tagged RFQS
 * @param req 
 * @param res 
 * @returns 
 */
const getSellerTaggedRFQsProductWiseSummary = async (req: any, res: any) => {

    try {
        const data = extractTokenInfo('', req.headers)
        if(data?.status === 401){
            return res.send(401);
        }
        const seller_id = req.query?.seller_id
        if (seller_id > 0) {
            data.id = seller_id
        }
        const result = await db.sequelize.query(`SELECT pe.product_id, pi.product_name as product_name, sum(pe.quantity) as total_order_quantity, uom.symbol as unit
         from tbl_product_enquiries_masters pe JOIN tbl_rfq_seller_mappings rsp ON pe.id = rsp.rfq_id
         JOIN tbl_product_masters pi on pe.product_id = pi.id JOIN tbl_uom_masters uom
         ON uom.id = pi.uom_id
          WHERE rsp.seller_id = ${data?.id} GROUP BY pe.product_id`)

        if (result[0] && !req.is_exportable)
            return commonResponse(res, 200, result[0], [], "");
        else
            return result[0]

        return commonResponse(res, 200, [], [], "");


    } catch (err: any) {

        //transaction.rollback()

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



const importSellerProductPriceMappingData = async (req: any, res: any) => {
    try {
        const data = extractTokenInfo('', req.headers)
        const file = req.files
        // const isSeller = await db.tbl_user_masters.findOne({
        //     where:{
        //         member_id: data?.id,
        //         is_seller:1
        //     }
        // })
        // if(!isSeller){
        //     return commonResponse(res, 400, "User is not a seller", [], "");
        // }
        if (!file) {
            return commonResponse(res, 400, [], [], "");
        }
        const rows = await readXlsxFile(file['file']?.tempFilePath);
        cleanTmp()
        let product_prices: any = []
        rows.map((e: any, index: any) => {
            if (index > 0) {
                if (e[7]) {
                    if (e[7] > 0) {
                        product_prices.push({
                            id: e[0],
                            price: e[7]
                        })
                    }
                }
            }
        })

        if (product_prices.length && data?.id) {
            //var transaction: any = await db.sequelize.transaction()
            // await db.tbl_seller_linked_product_mappings.destroy({
            //     where: {
            //         seller_id: data?.id
            //     }
            // })

            product_prices.map(async (e: any) => {

                //await db.tbl_seller_linked_product_mappings.create()
                let dataValues = {
                    seller_id: data?.id,
                    product_id: e.id,
                    price: e.price,
                    shipping_cost: 0,
                    order: 1,
                    is_approved: 0
                }
                await upsert(db.tbl_seller_linked_product_mappings, dataValues, {
                    seller_id: data?.id,
                    product_id: e.id
                })
            })

            //await transaction.commit()
            return commonResponse(res, 200, [], [], "");
        }
        return commonResponse(res, 200, [], [], "");


    } catch (err: any) {

        //transaction.rollback()

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

const upsert = (model: any, values: any, condition: any) => {
    return model
        .findOne({ where: condition })
        .then(function (obj: any) {
            // update
            if (obj)
                return obj.update(values);
            // insert
            return model.create(values);
        })

    }
    

const sellerRoutes = {
    getProductList,
    setProductPrices,
    createOrUpdateSellerPrices,
    setSellerCategories,
    getSellerCategories,
    getSellerCategoriesWithServiceArea,
    getProductWiseSellers,
    getSellerTaggedRFQs,
    importSellerProductPriceMappingData,
    getSellerTaggedChildRFQs,
    getSellerTaggedRFQsProductWiseSummary,
}

export default sellerRoutes;
