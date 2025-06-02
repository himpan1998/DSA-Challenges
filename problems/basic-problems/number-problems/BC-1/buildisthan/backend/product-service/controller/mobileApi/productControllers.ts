import db from "../../models";
const { commonResponse } = require("@ssiltools/shared-files");
const { Sequelize, QueryTypes } = require('sequelize')
 
/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * Product Item find by categoryID
 */
const productsItemByCategoryId = async (req: any, res: any) => {
    try {
       
        const { category_id } = req.query || req.params || undefined;
        let conditions: any = category_id === undefined || category_id == '' ? {} : {
            where: {
                categories_id: category_id,
                 
            }
        }
        let data;

        conditions['attributes'] = ['id','product_name', 'short_description', 'full_description', 'sku', 'original_price', 'offered_price', 'available_start_date']

        conditions['include'] = [

            {
                model: db.tbl_product_images,
                as: 'images',
                attributes: ['image_url']
            }, {
                model: db.tbl_brand_masters,
                as: 'brand',
                attributes: ['id','brand_name']
            }, {
                model: db.tbl_uom_master,
                as: 'uom',
                attributes: ['name', 'symbol']
            }, {
                model: db.tbl_category_masters,
                as: 'category',
                attributes: ['id','category_name', 'category_image']
            }, {

                model: db.tbl_sub_categories_master,
                as: 'subcategory',
                attributes: ['sub_category_name'],
                include: [
                    {

                        model: db.tbl_sub_categories_master,
                        as: 'subSubCategory',
                        attributes: ['sub_category_name']


                    }
                ]
            }],

         
            data = await db.tbl_product_master.findAll(conditions)

        return commonResponse(res, 200, data, [], '', process.env.ENVIROMENT)

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
 * 
 * @param req 
 * @param res 
 * @returns 
 * get product item by product_id
 */
const productsDetailsById = async (req: any, res: any) => {
    try {

        const { product_id } = req.query || req.params || 0
        
        var conditions : any = {
            attributes: { exclude: ['is_active', 'deletedAt', 'createdAt', 'updatedAt','product_id'] },
            include: [
                {
                    model: db.tbl_category_masters,
                    as: 'category',
                    attributes: { exclude: ['is_active', 'deletedAt', 'createdAt', 'updatedAt'] }
    
                },
                
                {
                    model: db.tbl_brand_masters,
                    as: 'brand',
                    attributes: { exclude: ['is_active', 'deletedAt', 'createdAt', 'updatedAt'] }
    
                },
                {
                    model: db.tbl_uom_master,
                    as: 'uom',
                    attributes: { exclude: ['is_active', 'deletedAt', 'createdAt', 'updatedAt'] }
    
                },
                {
                    model:db.tbl_product_images,
                    as:'images',
                    attributes: { exclude: ['is_active',  'createdAt', 'updatedAt','id','product_id','image_type'] }
                }
               
            ]
        }
        
       product_id>0 ? conditions['where'] = {
            id: product_id
        } : null
         
        const data = await db.tbl_product_master.findOne(conditions,
           
        )
        return commonResponse(res, 200, data, [], "", process.env.ENVIROMENT)


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

const productItem = {
    productsItemByCategoryId,
    productsDetailsById
}

export default productItem;