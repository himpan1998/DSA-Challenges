import Ajv from "ajv";
import db from "../../models";
import productValidators from "../validators/product";
const ajv = new Ajv();
const { commonResponse } = require("@ssiltools/shared-files");
import { uploadImage} from "../../helper/sharedMethods";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * create product item rating by user
 */
const create = async (req: any, res: any) => {
    const files = req.files;
    try {
         // product rating image
         
         let cc = "";
         if(files){
           if (files["rating_image"]) {
             cc = await uploadImage(files["rating_image"], "product-rating-images", "rating_image");
           }
         }
        const data = await db.tbl_product_ratings_master.create(req.body).then((result:any) =>{
            return commonResponse(res,200,result,"Product Item Rating created successfully")
        })
        if(data){
            const ratingImageBody={
                
            }
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

}

const productItemRatingRoutes = {
    create

}

export default productItemRatingRoutes;