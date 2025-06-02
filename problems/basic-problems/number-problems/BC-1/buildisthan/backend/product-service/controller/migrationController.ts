import db from '../models/index'
const readXlsxFile = require('read-excel-file/node')
const { commonResponse } = require("@ssiltools/shared-files");
import fs from 'fs';
import axios from 'axios';
import FormData from "form-data";
import { Op, Sequelize } from 'sequelize';
const enviroment = process.env.ENVIROMENT || "development";
const config = require("../config/config.json")[enviroment];

/**
 * product db migrations
 * @param req 
 * @param res 
 * @returns 
 */
const downloadFile = async (path : any) => {
    const fileName = path.split('/').pop()
    return axios({
        method: "get",
        url: path,
        responseType: "stream"
    }).then(function (response) {
        let path = `${fileName}`
        console.log('rrr', response.data.buffer)
        response.data.pipe(fs.createWriteStream('./tmp/'+path));
        return path;
    });
}

const migrateProducts = async (req : any, res : any) => {
    try{
        var productDetails : any = []
        const rows = await readXlsxFile('tmp/ProductImagesSetup.xlsx');
        let len = rows.length-1
        for(var i = 1; i < 3; i++){
            console.log('product', rows[i])
            const path = await downloadFile(rows[i][1])
            console.log('path found', path)
            // var cat = rows[i][10]?.split(',')           
            // var subcat = rows[i][10];
            
            // cat = cat ? cat[1]  : cat
            // let catFilter=cat?.split(':')
                  
            // var brand_name = rows[i][7];
            // const category = await db.tbl_category_masters.findOne({
            //     where:{
            //         category_name:{
            //             // [Op.like]: '%'+catFilter?.['0']+'%'||'%'+'PVC' +'%',  
            //             // [Op.like]: '%'+'PVC' +'%',            
            //             [Op.or]: [                            
                                                  
            //                 Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category_name')), 'LIKE',  '%'+'PVC' +'%'),                       
            //                 Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('category_name')), 'LIKE', '%'+catFilter?.['0']+'%'),
            //             ],  
                              
            //         }
            //     },
            //     raw: true,
            // })
            // const subcategory = await db.tbl_sub_categories.findOne({
            //     where:{
            //         sub_category_name:{
            //             [Op.like]: '%'+subcat+'%'
            //         }
            //     }
            // })
            // const brand = await db.tbl_brand_masters.findOne({
            //     where:{
            //         brand_name:{
            //             [Op.like]: '%'+brand_name+'%'
            //         }
                    
            //     }
            // })
        
            // if(category?.id && brand?.id){
            //     productDetails.push({
            //         product_name: rows[i][1],
            //         categories_id: category.id,
            //         brand_id: brand.id,
            //         sub_categories_id:subcategory?.id || 0,
            //         uom_id:1,
            //         short_description: rows[i][3],
            //         full_description: rows[i][3] + ', '+rows[i][rows[i].length-8],
            //         original_price: rows[i][4],
            //         sku: rows[i][8],
            //         stock_quantity:1000,
            //         offered_price:rows[i][4],
            //         available_start_date:'2022-01-01',
            //         is_active:1,
            //         product_type:'simple',
            //         is_shown_in_home_page:1,
            //         tax_category_id:1,
            //         is_tax_exempted:0,
            //         hsn_code:'N/A',
            //         disable_buy_button:0,
            //         bar_code:rows[i][0],
            //         product_image_url: rows[i][rows[i].length-3]
            //     })
            // }
        }
    //         productDetails.map(async (each : any) => {
    //         const { product_image_url } = each
    //         delete each.product_image_url
    //         const id = await db.tbl_product_items.create(each);
    //         await db.tbl_product_images.create({
    //             product_id: id.id,
    //             image_type:1,
    //             image_url: product_image_url
    //         })
    //    })
            
           return commonResponse(res, 200, productDetails, [])
    }catch(err : any) {
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



// const updateImages = ()
/*
et url = config.file_upload_service.URL + "/upload-file";
const image: any = await fs.createReadStream(files?.tempFilePath);
      const formData: any = new FormData();
      formData.append("dir_path", `assets/${location}`);
      formData.append("file", image, files?.name);
      const resp = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });*/

const migrationRoutes = {
    migrateProducts
}

export default migrationRoutes