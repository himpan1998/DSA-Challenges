import db from "../../models/index";
import productEnquireValidators from "../validators/productEnquire";
import Ajv from "ajv";
const ajv = new Ajv();
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");
const Enquire = db.tbl_product_enquiries_master;
import moment from 'moment';
import { generateOrderId, zeroPad } from "../../helper/sharedMethods";
import productController from '../productController';
/**
 * get list of all  product related enquire:
 * @param req
 * @param res
 * @returns
 */

const getProductEnquire = async (req: any, res: any) => {
  try {
    let whereCondition: any = {};
    //let id: any = req.query.id || req.params.id || null;
    const data = extractTokenInfo('', req.headers)
    if (data?.id != null) whereCondition.user_id = data?.member_master?.id;

    let lists: any = await Enquire.findAll({
      attributes: [
        "id",
        "request_id",
        "sku_id",
        "product_id",
        "category_id",
        "address_id",
        "user_id",
        "user_name",
        "quantity",
        "price",
        "comment",
        "createdAt"
      ],
      include: [
        {
          model: db.tbl_product_master,
          as: "product",
          attributes: ["id", "product_name"],
        },
        {
          model: db.tbl_category_masters,
          as: "category",
          attributes: ["id", "category_name"],
        },
        {
          model: db.tbl_business_gst_master,
          as: "businessGst",
          attributes: ["id", "gst_number", "business_name"]
        },
        {
          model: db.tbl_uom_master,
          as: "uom",
          attributes: ["id", "name", "symbol", "is_Active"]
        }
      ],
      where: whereCondition,
    });

    return commonResponse(res, 200, lists, [], process.env.ENVIROMENT);
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
 * create a new product related enquire:
 * @param req
 * @param res
 * @returns
 */
const createProductEnquire = async (req: any, res: any) => {
  try {
    const tokenData = extractTokenInfo('', req.headers)
    if (!tokenData) {
      return commonResponse(
        res,
        401,
        [],
        "No token found,",
        "",
        process.env.ENVIROMENT
      );
    }

    let data = {
      product_id: req.body?.product_id,
      category_id: req.body?.category_id,
      user_id: tokenData?.member_master.id,
      address_id: req.body.address_id,
      user_name: tokenData.member_master.username,
      order_quantity: req.body?.order_quantity,
      request_id: req.body?.request_id,
      sku_id: req.body?.sku_id,
      price: req.body?.price,
      comment: req.body?.comment,
      docket_id: "N/A"
    }

    let validate = ajv.compile(productEnquireValidators.productEnquire);
    let valid = validate(data);
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

    const insertdata = await Enquire.create(data);
    return commonResponse(res, 200, insertdata, [], "", process.env.ENVIROMENT);
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
};

/**
 * Generate RQ Nos
 * @param req 
 * @param res 
 * @returns 
 */
const generateRQNos = (last_request_id: number = 0, sku_index: number = 0) => {
  var request_id = last_request_id === 0 ? zeroPad(1, 10) : zeroPad(last_request_id + 1, 10);
  request_id = `BLDSTN_RQ_${request_id}`
  var sku_id = sku_index === 0 ? zeroPad(1, 10) : zeroPad(sku_index + 1, 10)
  sku_id = `${request_id}_SKU_${sku_id}`
  return {
    request_id,
    sku_id
  }
}

/**
 * create bulk Request
 * @param req 
 * @param res 
 * @returns 
 */
const createBulkRequest = async (req: any, res: any) => {
  try {

    let id = req.body.key || null;
    delete req.body.key;
    var transaction = await db.sequelize.transaction();
    const data = req.body.items
    var user_id = data[0].user_id;
    var bulkArr: any = [];
    var _last_request_id = await db.tbl_product_enquiries_master.findOne({
      attributes: ['request_id', 'user_id', 'createdAt'],
      order: [['id', 'desc']],
      limit: 1
    });
    var lastCreatedAt: any = _last_request_id ? moment(_last_request_id.createdAt) : null
    _last_request_id = _last_request_id ? parseInt(_last_request_id['request_id'].split("_")[2]) : 0
    if (lastCreatedAt !== null) {

      var currentTime: any = new Date()
      currentTime.setMinutes(currentTime.getMinutes() + 330);
      lastCreatedAt = new Date(lastCreatedAt)
      var seconds = (currentTime.getTime() - lastCreatedAt.getTime()) / 1000;
      var minutes = Math.floor(seconds / 60)
      const isRepeatUser = await db.tbl_product_enquiries_master.findAll({
        where: {
          user_id: user_id,
          product_id: data[0]?.product_id,
          address_id: data[0]?.address_id
        }
      })
      if (minutes < 60 && isRepeatUser.length > 0) {
        return res.status(429).json({
          message: 'Too many duplicate request from user ( same order )',
        });
      }
    }
    data.map((each: any, index: number) => {
      bulkArr.push({
        request_id: generateRQNos(_last_request_id).request_id,
        sku_id: generateRQNos(_last_request_id, index).sku_id,
        product_id: each.product_id,
        category_id: each.category_id,
        address_id: each.address_id,
        user_id: each.user_id,
        user_name: each.user_name,
        quantity: each.order_quantity || each.quantity,
        price: each.price,
        comment: each.comment
      })
    });
    await Enquire.bulkCreate(bulkArr, { transaction })
    if (bulkArr[0]) {
      await db.tbl_product_cart_master.destroy({
        where: {
          user_id: data[0].user_id,
          is_saved_for_later: false
        }
      }, { transaction })
    }

    await transaction.commit()
    
    var _last_request_id_find_sellers = await db.tbl_product_enquiries_master.findOne({
      attributes: ['request_id', 'id'],
      order: [['id', 'desc']],
      limit: 1
    });
    console.log('_last_request_id_find_sellers', _last_request_id_find_sellers, user_id, data[0].address_id)
    if(_last_request_id_find_sellers){
    var sortedSellers: any = await productController.sortedSellers(_last_request_id_find_sellers['request_id'])
    console.log('sorted sellers', sortedSellers)
    var seller_ids = sortedSellers?.sortedList?.map((ss: any) => ss.seller_id);
    let orderId = generateOrderId(_last_request_id_find_sellers['request_id']);
    let rfq_id: any = await db.tbl_product_enquiries_master.findAll({
      attributes: ['id'],
      order: [['id', 'asc']],
      where: {
        user_id: user_id,
        address_id: data[0]?.address_id
      }
    });

    let arr : any = []
    rfq_id?.map(async (e: any) => {
      seller_ids?.map(async (es: any) => {
          arr.push({
            admin_price: 0,
            remarks: "",
            seller_id: es,
            request_id: _last_request_id_find_sellers['request_id'],
            rfq_id: e['id'],
            pre_order_id: orderId,
          })
      })
    })
    await db.tbl_rfq_seller_mappings.bulkCreate(arr);
   
  }

    return commonResponse(res, 200, sortedSellers, [], "", process.env.ENVIROMENT);
  } catch (error: any) {
    transaction.rollback()
    console.log('errror', error)
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
 *  create web bulk request with check existing SKU and increase SKU ID ( need change )
 * @param req 
 * @param res 
 * @returns 
 */
const webCreateBulkRequest = async (req: any, res: any) => {
  try {
    let n = 1
    let id = req.body.key || null;
    delete req.body.key;
    let userData = req.body.items
    const productEnquire = req.body
    let sku_id_increment: number
    let reqIdIncrement: number
    await Enquire.findAll({
      order: [
        ['id', 'DESC']
      ],
    }).then((result: any) => {
      const data = result

      //RequestEnquireID--:-RQ-001        
      const rqIncre = data[0].request_id
      const rqGen = rqIncre.split("-")
      let getRE = rqGen[1]
      reqIdIncrement = +getRE + 1

      //SKU-ID--:-RQ-001-SKU-001
      const sku = data[0].sku_id
      const skiSpl = sku.split("-")
      const sku_id = skiSpl[3]
      sku_id_increment = +sku_id + 1

    })
    productEnquire.items.forEach(async (value: any) => {
      let encSKU = sku_id_increment++

      // String padding with zero      
      let REQ_ID = String(reqIdIncrement).padStart(3, '0'); // '009'
      let SKU_ID = String(encSKU).padStart(3, '0'); // '009'             

      //generate order RQ or SKU
      value.request_id = `RQ-${REQ_ID}`
      value.sku_id = `RQ-${REQ_ID}-SKU-${SKU_ID}`

      await Enquire.create(value).then(async (result: any) => {
        let data = result


        commonResponse(res, 200, data, [], "", process.env.ENVIROMENT);

        //delete cart items
        if (data) {
          db.tbl_product_cart_master.destroy({
            where: {
              user_id: data.dataValues.user_id,
              is_saved_for_later: 0
            }
          })
        }

      })

    });


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
 * get all Request Id
 * @param req 
 * @param res 
 * @returns 
 */
const getRequestEnquire = async (req: any, res: any) => {
  try {

    // const {enquire}=req.param.enquire
    await Enquire.findAll({
      include: [
        {
          model: db.tbl_category_masters,
          as: "category",
          attributes: ["id", "category_name"],
        },
      ],
    }).then((result: any) => {

      return commonResponse(res, 200, result, [], "", process.env.ENVIROMENT);
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

const productEnquireController = {
  getProductEnquire,
  createProductEnquire,
  createBulkRequest,
  getRequestEnquire,
  webCreateBulkRequest
};



export default productEnquireController;


