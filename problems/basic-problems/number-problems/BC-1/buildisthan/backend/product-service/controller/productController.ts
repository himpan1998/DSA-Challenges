import Ajv from "ajv";
import db from "../models";
import productValidators from "./validators/product";
import { generateOrderId, logUpdateChanges, uploadImage } from "../helper/sharedMethods";
import userSerivceDB from "../remote/user.service";
import { Sequelize, Op, QueryTypes } from "sequelize";
import axios from "axios";
import moment from "moment";
const ajv = new Ajv();
const productEntity=db.tbl_product_master
const { commonResponse, extractTokenInfo } = require("@ssiltools/shared-files");

/**
 * Create a new product
 * @param req
 * @param res
 * @returns
 */
const create = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(productValidators.create);
    //Validation Check
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

    var data: any = req.body;
    const isDuplicate: any = await productEntity.findOne({
      where: {
        product_name: data.product_name,
      },
    });
    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }

    // sub category check
    data.sub_categories_id = !isNaN(data.sub_child_category_id)
      ? parseInt(data.sub_child_category_id)
      : parseInt(data.sub_categories_id);
    var transaction = await db.sequelize.transaction();
    const pictures = req.files;
    if (pictures) {
      let getURLS = await getImageURLs(pictures)
      data = {
        ...data,
        ...getURLS
      }
    }
    data.createdBy = req.user_id || 0
    const createdData = await productEntity.create(data, {
      transaction,
    });

    const collections = data?.collections?.split(',') || [];

    if (collections.length > 0) {
      const productCollectionMappingsData = [];

      for (var i = 0; i < collections.length; i++) {
        productCollectionMappingsData.push({
          product_id: createdData.id,
          collection_id: collections[i],
        });
      }
      const addCollections =
        await db.tbl_product_collection_mappings.bulkCreate(
          productCollectionMappingsData,
          { transaction }
        );
    }

    const tags = data?.tags?.split(',') || [];
    if (tags.length > 0) {
      const productTagMappingsData = [];

      for (var i = 0; i < tags.length; i++) {
        productTagMappingsData.push({
          product_id: createdData.id,
          tag_id: tags[i],
        });
      }
      const addTags = await db.tbl_product_tag_mapping.bulkCreate(
        productTagMappingsData,
        { transaction }
      );
    }

    const product_id = createdData?.id;
    // const specifications = JSON.parse(data?.specifications);
    // specifications.map(async (each: any) => {
    //   await db.tbl_product_specification_mappings.create({
    //     product_id: product_id,
    //     specification_id: each.specification_id,
    //     values: each.value,
    //   });
    // });


    // product shipping details

    let shippingInfo = {
      product_id: createdData.id,
      is_shipping: data.is_shipping,
      weight: data?.weight,
      length: data?.length,
      width: data?.width,
      height: data?.height,
      is_free_shipping: data?.is_free_shipping,
      additional_shipping_charges: data?.additional_shipping_charges,
      averge_delivery_time: data?.averge_delivery_time,
    };

    const shippingData = await db.tbl_product_shipping_master.create(
      shippingInfo,
      { transaction }
    );

    // SEO for product
    if (data?.page_name?.length > 0) {
      const seoData = {
        page_id: data?.page_id,
        product_id: createdData.id,
        page_name: data?.page_name,
        seo_description: data?.seo_description,
        seo_keywords: data?.seo_keywords,
        seo_title: data?.seo_title,
      };
      await db.tbl_seo_master.create(seoData, {
        transaction,
      });
    }

    await transaction.commit();

    return commonResponse(res, 200, { createdData }, []);
  } catch (err: any) {
    console.log('errrr in ', err)
    if (transaction) {
      await transaction.rollback();
    }
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
 * @author Ravi Ranjan Kumar
 * @param req
 * @param res
 * @returns
 */
const excelCreate = async (req: any, res: any) => {
  try {
    const rawProducts = req.body;
    let responsePayload = [];

    // throw error
    for (const rawProduct of rawProducts) {
      try {
        const isDuplicate = await productEntity.findOne({
          where: {
            product_name: rawProduct.product_name,
          },
          raw: true,
        });

        if (isDuplicate) {
          responsePayload.push({
            product: rawProduct?.product_name,
            success: false,
            message: "Product already exists with same name",
          });
          continue;
        }

        const validate = ajv.compile(productValidators.excelCreate);
        const valid = validate({ ...rawProduct });
        if (!valid) {
          responsePayload.push({
            product: rawProduct?.product_name,
            success: false,
            message: "Bad Data",
          });
          continue;
        }

        const createdData = await productEntity.create(rawProduct);

        responsePayload.push({
          product: rawProduct?.product_name,
          success: true,
          message: createdData.id,
        });
      } catch (error: any) {
        responsePayload.push({
          product: rawProduct?.product_name,
          success: false,
          message: "Bad/Invalid Data",
        });
      }
    }

    return commonResponse(
      res,
      201,
      { success: true, data: responsePayload },
      [],
      "Request processed successfully",
      process.env.ENVIROMENT
    );
  } catch (error: any) {
    return commonResponse(
      res,
      500,
      { success: false },
      [],
      "",
      process.env.ENVIROMENT
    );
  }
};

/**
 * @author Ravi Ranjan Kumar
 * @param req
 * @param res
 * @returns
 */
const excelUpdate = async (req: any, res: any) => {
  try {
    const products = req.body;
    let responsePayload = [];

    for (const product of products) {
      try {
        const {
          id,
          sub_categories_id,
          product_name,
          short_description,
          full_description,
          sku,
          original_price,
        } = product;

        if (!id) {
          responsePayload.push({
            product: product?.product_name,
            success: false,
            message: "Product Id missing",
          });
          continue;
        }

        const productMasterPayload = {
          sub_categories_id,
          product_name,
          short_description,
          full_description,
          sku,
          original_price,
        };

        const validate = ajv.compile(productValidators.excelUpdate);
        const valid = validate(productMasterPayload);

        if (!valid) {
          responsePayload.push({
            product: product?.id || product?.product_name,
            success: false,
            message: "Bad Data",
          });
          continue;
        }

        const updatedPRoduct = await productEntity.update(
          productMasterPayload,
          {
            where: { id },
          }
        );
        responsePayload.push({
          product: product?.id,
          success: updatedPRoduct[0] ? true : false,
          message: updatedPRoduct[0] ? "Updated" : "Not Updated",
        });
      } catch (error) {
        responsePayload.push({
          product: product?.id,
          success: false,
          message: "Bad/Invalid Data",
        });
      }
    }

    return commonResponse(
      res,
      201,
      { success: true, data: responsePayload },
      [],
      "Request processed successfully",
      process.env.ENVIROMENT
    );
  } catch (error) {
    return commonResponse(
      res,
      500,
      { success: false },
      [],
      "Internal server error",
      process.env.ENVIROMENT
    );
  }
};

/**
 * Create a new product
 * @param req
 * @param res
 * @returns
 */
const update = async (req: any, res: any) => {
  try {
    var data: any = req.body;
    const id = data.id;
    delete data.id;

    // sub category check
    data.sub_categories_id = !isNaN(data.sub_sub_categories_id)
      ? parseInt(data.sub_sub_categories_id)
      : parseInt(data.sub_categories_id);
    if (data?.sub_categories_id === 'NaN') {
      delete data?.sub_categories_id

    }
    delete data?.sub_sub_categories_id

    const pictures = req.files;
    if (pictures) {
      let getURLS = await getImageURLs(pictures)
      data = {
        ...data,
        ...getURLS
      }
    }
    const logPayload = {
      id,
      payload: data,
      type: 'product',
      filterChangedValues: true
    }
    /** Log Update Changes */
    const r = await logUpdateChanges(logPayload)
    console.log('response from log server', r)
    //return res.send('ok')
    var transaction = await db.sequelize.transaction();
    let shipping;
    let collection
    let tags;
    const updateData = await productEntity.update(data, {
      where: {
        id: id,
      },
      transaction,
    });

    let tagArr = data.tag_id.split(',');
    let colArr = data.collection_id.split(',');
    if (tagArr.length > 0) {
      await db.tbl_product_tag_mapping.destroy({
        where: {
          product_id: id
        },
        transaction
      })
      tagArr = tagArr.map((tag: any) => ({
        product_id: id,
        tag_id: tag
      }));
      tags = await db.tbl_product_tag_mapping.bulkCreate(tagArr, { transaction })
    }
    if (colArr.length > 0) {
      await db.tbl_product_collection_mappings.destroy({
        where: {
          product_id: id
        },
        transaction
      })
      colArr = colArr.map((collection: any) => ({
        product_id: id,
        collection_id: collection
      }));
      collection = await db.tbl_product_collection_mappings.bulkCreate(colArr, { transaction })
    }

    if (data?.is_shipping) {
      const hasShipping = await db.tbl_product_shipping_master.findOne({
        attributes: ['id'],
        where: {
          product_id: id
        }
      })
      if (hasShipping) {
        shipping = await db.tbl_product_shipping_master.update(data, {
          where: {
            is: hasShipping?.id
          },
          transaction
        })
      } else {
        shipping = await db.tbl_product_shipping_master.create(data, { transaction })
      }
    }
    await transaction.commit();

    return commonResponse(res, 200, { updateData }, []);
  } catch (err: any) {
    if (transaction) {
      await transaction.rollback();
    }
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

const getImageURLs = async (images: any) => {
  let imageUrl: any = {}
  for (var key in images) {

    let imgurl = await uploadImage(images[key],
      "b2b-product-images",
      "images"
    );
    imageUrl[key] = imgurl;
  }

  return imageUrl
}

/**
 * Get all products
 * @param req
 * @param res
 * @returns
 */
const getAll = async (req: any, res: any) => {
  try {
    // check user service -> pincode_area_master -> extract block_id
    // check product service tbl_product_availability_based_on_blocks -> where block_id = user pincode
    // only get product-ids ( put them inside below where condition as IN)
    const { user_pincode, product_name, start_date, end_date, brand_ids, category_ids, sub_category_ids, business_category, is_sap_created, is_active } = req.query;
   
    const _brand_ids = (brand_ids === undefined || brand_ids?.length <= 2) ? '' : {
      id: { [Op.in]: JSON.parse(brand_ids) }
    }
    const category = (category_ids === undefined || category_ids?.length <= 2) ? {} : {
      id: { [Op.in]: JSON.parse(category_ids) }
    }
    const subCategory = (sub_category_ids === undefined || sub_category_ids?.length <= 2) ? {} : {
      id: { [Op.in]: JSON.parse(sub_category_ids) }
    }

    let productIds: any = [];
    let categoryIds: any = [];

    if (user_pincode && user_pincode?.length > 0) {
      const getPincodeAreas = await userSerivceDB.query(
        `SELECT block_id FROM tbl_area_pincode_masters where pincode=${user_pincode} and block_id > 0`
      );

      const userBlockId = getPincodeAreas[0][0]?.block_id;
      const getProductIds = await db.sequelize.query(
        `SELECT DISTINCT product_id from tbl_product_block_mappings where block_id = '${userBlockId}'`
      );
      const getCategoryIds = await db.sequelize.query(
        `SELECT DISTINCT category_id from tbl_product_block_mappings where block_id = '${userBlockId}'`
      );

      productIds = getProductIds[0].map((e: any) => {
        return e.product_id;
      });
      categoryIds = getCategoryIds[0].map((e: any) => {
        return e.category_id;
      });
    }

    const skip = req.query.skip === undefined ? 0 : req.query.skip
    const take = req.query.take === undefined ? 10 : req.query.take
    const productFilterQuery = productFilter(product_name, start_date, end_date, is_sap_created, business_category, is_active)
    console.log('Product Filter Query:-', productFilterQuery)
    var conditions: any = {
      where: productFilterQuery,
      offset: skip, limit: take,
      order: [
        ['id', 'DESC']
      ],
      include: [
        {
          model: db.tbl_brand_masters,
          as: 'brand',
          where: _brand_ids,
          attributes: ['id', 'brand_name']
        },
        {
          model: db.tbl_sub_categories_master,
          as: 'subcategory',
          where: subCategory,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'is_active'] }
        },
        {
          model: db.tbl_uom_master,
          as: 'uom',
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'is_active'] }
        },
        "images",
        {
          model: db.tbl_category_masters,
          as: 'category',
          where: category,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        "shipping",
        {
          model: db.tbl_product_collection_mappings,
          as: "productCollection",
          attributes: ["id", "product_id", "collection_id"],
          include: [
            {
              model: db.tbl_collection_masters,
              as: "collection",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: db.tbl_product_tag_mapping,
          as: "productTag",
          attributes: ["id", "product_id", "tag_id"],
          include: [
            {
              model: db.tbl_tag_masters,
              as: "tag",
              attributes: ["id", "type", "description"],
            },
          ],
        },
        {
          model: db.tbl_product_specification_mappings,
          as: "productSpecification",
          attributes: ["id", "product_id", "specification_id", "value"],
          include: [
            {
              model: db.tbl_specification_masters,
              as: "specification",
              attributes: ["id", "name", "type", "description"],
            },
          ],
        },
      ],
      logging: false
    };

    const totalCount = await productEntity.count(conditions)

    if (req.query?.take) {
      conditions['limit'] = parseInt(req.query.take)
      conditions['offset'] = parseInt(req.query?.skip)
    }

    if (productIds.length > 0 && user_pincode?.length > 0) {
      conditions["where"] = {
        id: {
          [Op.in]: productIds,
        },
      };
      const categories = await db.tbl_category_masters.findAll({
        where: {
          id: {
            [Op.in]: categoryIds,
          },
        },
      });
      const result = await productEntity.findAll(conditions);
      return commonResponse(res, 200, { products: result, categories });
    } else if (user_pincode === undefined) {
      const result = await productEntity.findAll(conditions);
      return commonResponse(res, 200, { data: result, totalCount });
    }
    else (user_pincode && user_pincode?.length < 6)
    {
      return commonResponse(
        res,
        200,
        { isValidPincode: false },
        "",
        "Sorry! invalid pincode:-" + user_pincode
      );
    }
  } catch (err: any) {
    console.log('product err', err)
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

const productFilter = (productName: string, startDate: string, endDate: string, isSapCreated: string, businessCategory: string, is_active: string) => {
  const currentDate = moment(startDate).format("YYYY-MM-DD");
  const lastDate = moment(endDate).format("YYYY-MM-DD");

  const filterDate = startDate !== undefined && endDate !== undefined ? true : false
  const type = [productName, filterDate, isSapCreated, businessCategory, is_active]

  const where: any = []
  for (let switchCondition of type) {

    switch (switchCondition) {
      case productName:
        productName === undefined ? '' : where.push({ product_name: { [Op.startsWith]: productName } })
        break;

      case filterDate:
        if (filterDate === true) {
          where.push({
            createdAt: {
              [Op.between]: [`${currentDate} 00:00:00`, `${lastDate} 23:59:59`]
            }
          })
        }
        break;

      case isSapCreated:
        isSapCreated === 'true' ? where.push({ sap_code: { [Op.not]: null } }) : ''
        isSapCreated==='false'?where.push(
          { sap_code: { [Op.is]: null } }

        ):''
        break;

      case businessCategory:
        businessCategory === undefined ? '' : where.push({ business_category: +businessCategory })
        break

      case is_active:
        const isActiveValue = is_active === 'true' ? 1 : 0
        is_active === undefined ? '' : where.push({ is_active: isActiveValue })
        break
      default: ""
        break;
    }

  }
  // console.log('where',where)
  return where
}

/**
 * Get all products RFQs
 * @param req
 * @param res
 * @returns
 */
const getAllRFQs = async (req: any, res: any) => {
  const data = extractTokenInfo("", req.headers);
  var conditions = ``;
  if (req.query?.type) {
    conditions = modRFQConditions(req.query.type);
  }
  try {
    const dataset = await db.sequelize.query(conditions);
    return commonResponse(res, 200, dataset[0]);
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

const modRFQConditions = (type: any) => {
  let conditons = ``;
  switch (type) {
    case "tagged":
      conditons = `SELECT pe.id, pe.request_id, pe.product_id,pe.address_id, pe.user_id, GROUP_CONCAT(DISTINCT c.category_name  SEPARATOR ', ') as categories,
           rsp.rfq_id
           from tbl_product_enquiries_masters pe INNER JOIN tbl_rfq_seller_mappings rsp ON 
           pe.id = rsp.rfq_id INNER JOIN tbl_category_masters c ON pe.category_id = c.id GROUP BY pe.request_id`;
      break;

    case "seller_approved":
      conditons = `SELECT pe.id, pe.request_id, pe.product_id,pe.address_id, pe.user_id, GROUP_CONCAT(DISTINCT c.category_name  SEPARATOR ', ') as categories,
           rsp.rfq_id
           from tbl_product_enquiries_masters pe JOIN tbl_rfq_seller_mappings rsp ON 
           pe.id = rsp.rfq_id INNER JOIN tbl_category_masters c ON pe.category_id = c.id WHERE rsp.seller_approved = 1 GROUP BY pe.request_id`;
      break;

    default:
      conditons = `SELECT pe.id, pe.request_id, pe.product_id,pe.address_id, pe.user_id, GROUP_CONCAT(DISTINCT c.category_name  SEPARATOR ', ') as categories,
            rsp.rfq_id
            from tbl_product_enquiries_masters pe LEFT JOIN tbl_rfq_seller_mappings rsp ON 
            pe.id = rsp.rfq_id INNER JOIN tbl_category_masters c ON pe.category_id = c.id WHERE rsp.rfq_id IS NULL GROUP BY pe.request_id`;
  }

  return conditons;
};

/**
 * Get all categories a request contains
 * @param req
 * @param res
 * @returns
 */
const getCategoriesByRequestId = async (req: any, res: any) => {
  //const data = extractTokenInfo('', req.headers)
  if (!req.query?.id) {
    return commonResponse(res, 400, [], [], "Request ID not found");
  }
  var conditions: any = {
    attributes: ["category_id"],
    include: [
      {
        model: db.tbl_category_masters,
        as: "category",
        attributes: ["id", "category_name"],
      },
    ],
    group: "category_id",
  };

  var data = req.query.id;
  if (data) {
    conditions["where"] = {
      request_id: data,
    };
  }

  try {
    const dataset = await db.tbl_product_enquiries_master.findAll(conditions);
    let conditions2: any = {
      attributes: ["product_id"],
    };
    conditions2["where"] = {
      request_id: data,
    };
    const products = await db.tbl_product_enquiries_master.findAll(conditions2);

    const productIds = products.map((e: any) => e.product_id).join(",");
    const queryStr = `SELECT sum(original_price) as total_order_value from tbl_product_masters where id in (${productIds})`;

    const productPrices = await db.sequelize.query(queryStr);

    const categoryNames = dataset.map((e: any) => e.category?.category_name);
    const dataArr = {
      totalOrderValue: productPrices[0]
        ? productPrices[0][0]?.total_order_value
        : 0.0,
      categoryNames: categoryNames,
    };
    return commonResponse(res, 200, dataArr);
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
 * Get child skus of request
 * @param req
 * @param res
 * @returns
 */
const getChildSkus = async (req: any, res: any) => {
  const id = req.query.id || 0;
  var conditions: any = {
    attributes: [
      "id",
      "request_id",
      "sku_id",
      "product_id",
      "category_id",
      "quantity",
      "price",
      "comment",
    ],
    include: [
      {
        model: db.tbl_rfq_seller_mappings,
        attributes: { exclude: ["updatedAt"] },
        as: "taggedSellers",
      },
    ],
  };

  if (id) {
    conditions["where"] = {
      request_id: id,
    };
  }

  try {
    const dataset = await db.tbl_product_enquiries_master.findAll(conditions);

    return commonResponse(res, 200, dataset);
    //}

    return commonResponse(res, 401, []);
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
 * Get all products
 * @param req
 * @param res
 * @returns
 */
const getById = async (req: any, res: any) => {
  try {
    const id = req.query.id || 0;
    const result = await productEntity.findAll({
      where: {
        id: id,
      },
      include: [
       "uom",
       "brand",
       "shipping",
       "productTag",
       "productCollection",
       "seo_master",
        {
          model: db.tbl_sub_categories_master,
          as: "subcategory",
          include: [
            {
              model: db.tbl_category_masters,
              as: "category",
            },
            {
              model: db.tbl_sub_categories_master,
              as: "subSubCategory",
            },
          ],
        },
      ],
    });

    return commonResponse(res, 200, result);
  } catch (err: any) {
    console.log('hello)', err);
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
 * Update Product Status
 * @param req
 * @param res
 * @returns
 */
const tagRFQwithSeller = async (req: any, res: any) => {
  try {
    const { seller_id, rfq_id, request_id, admin_price, remarks } = req.body;
    const ifExists = await db.tbl_rfq_seller_mappings.findOne({
      where: {
        rfq_id: rfq_id,
      },
    });
    var result: any = [];
    if (ifExists) {
      if (ifExists.seller_approved !== 1) {
        seller_id.map(async (es: any) => {
          result = await db.tbl_rfq_seller_mappings.update(
            {
              admin_price,
              remarks,
            },
            {
              where: {
                rfq_id,
                seller_id: es,
              },
            }
          );
        });
      }
    } else {
      let orderId = generateOrderId(request_id);
      rfq_id?.map(async (e: any) => {
        seller_id.map(async (es: any) => {
          result = await db.tbl_rfq_seller_mappings.create({
            admin_price,
            remarks,
            seller_id: es,
            request_id: request_id,
            rfq_id: e,
            pre_order_id: orderId,
          });
        });
      });
    }

    return commonResponse(res, 200, result);
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

const pad = (n: any, width: any, z: any) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const findBestSellerForOrders = async (req: any, res: any) => {
  try {
    // request body
    // products array [1,2,4]
    // address id (user_id) -> extract pincode and lat long for buyer
    // buyer id
    // using pincode -> get which products available and put the product ids which was ordered  by buyer
    // avail products in that pincode area -> [1,2,3,4,5,6,7,8,9,76,57,142] -> Buyer Order -> [1,2,3,11,76]
    // which all sellers are selling those products [1,5,9,10]
    // find best distance to worst
    // and sort the best to worst distance array which low to high price
    /*
       -> if automated and sent to sellers -> [1,9,5]
       ================================================
        [1 -> 5 km -> 100 -> 1, 200 -> 2, 150 -> 3,
        9 -> ]
        */

    const userSerTable = await userSerivceDB.query(
      `SELECT * FROM tbl_user_address_masters`
    );

    for (let location of userSerTable) {
    }

    const userBlockId = userSerTable[0][0]?.block_id;

    const buyerLocation = [22.5808533, 88.4794771];

    const tataMedicalCenterS1 = `22.5770407,88.4888183|22.5761907,88.4346543|22.5950297,88.4520113`; // seller -1
    const nicoParkS2 = [22.5761907, 88.4346543]; // seller -2
    const motherWaxS3 = [22.5950297, 88.4520113]; // seller -3

    //  https://maps.googleapis.com/maps/api/distancematrix/json?origins=22.5808533,88.4794771&destinations=22.5770407,88.4888183|22.5761907,88.4346543&units=kilometers&key=AIzaSyC83z-jcSzQWBq2amtSWP4OWT_5x9G4xIQ

    // 22.5770407,88.4888183|22.5761907,88.4346543|22.5950297,88.4520113

    // var config = {
    //     method: 'get',
    //     url:`https://maps.googleapis.com/maps/api/distancematrix/json?origins=22.5808533,88.4794771&destinations=${tataMedicalCenterS1}&units=kilometers&key=AIzaSyC83z-jcSzQWBq2amtSWP4OWT_5x9G4xIQ`,
    //     headers: { }
    //   };

    //   axios(config)
    //   .then(function (response) {

    //     const filter=response.data.rows.sort((a:any,b:any)=>{return (a-b)})
    //     const jsonString=JSON.stringify(response.data.rows[0].elements)
    //     let sortable = [];
    //     
    //     // for(let i=0; i<jsonString.length; i++) {
    //     //      
    //     //     // sortable.push(JSON.parse(jsonString[i]))
    //     // }

    //     return commonResponse(res, 200,filter);
    //   })
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
 *
 * @param req
 * @param res
 * @returns
 * get seller distance
 */
const sortedSellers = async (request_id: any) => {
  var attributes = ["address_id", "product_id", "user_id"];
  const orderProductList = await db.tbl_product_enquiries_master.findAll({
    include: [
      {
        model: productEntity,
        as: "product",
        attributes: ["id", "product_name"],
      },
      {
        model: db.tbl_category_masters,
        as: "category",
        attributes: ["id", "category_name"],
      },
      {
        model: db.tbl_uom_master,
        as: "uom",
        attributes: ["id", "name", "symbol", "is_Active"],
      },
    ],
    where: {
      request_id: request_id,
      // attributes: attributes
    },
  });

  let productDetailsByUser = "";
  let buyersId = orderProductList[0]?.user_id;
  if (!buyersId) {
    return {
      message: "Buyer Id not found",
    };
  }
  const buyerInfo = await userSerivceDB.query(
    `SELECT first_name, last_name from tbl_user_masters where id = ${buyersId}`
  );
  const findBuyersBlock = await userSerivceDB.query(
    `SELECT block_id from  tbl_seller_selling_blocks_mappings where seller_id = ${buyersId}`
  );
  const buyers_block_id = findBuyersBlock[0]
    ? findBuyersBlock[0][0]["block_id"]
    : 0;

  if (buyerInfo[0].length === 0) {
    return {
      message: "No buyer info found",
    };
  }
  if (buyers_block_id === 0) {
    return {
      message: "Buyer block not found",
    };
  }

  //check seller selling block
  const findSellersInThatBlock = await userSerivceDB.query(
    `SELECT seller_id from  tbl_seller_selling_blocks_mappings where seller_id != '${buyersId}' and block_id = '${buyers_block_id}'`
  );

  const seller_IDS = findSellersInThatBlock[0].map((e: any) => e.seller_id);
  if (seller_IDS.length === 0) {
    return {
      message: "No sellers found",
    };
  }
  let userId = await userSerivceDB.query(
    `SELECT * FROM tbl_user_masters where member_id=${buyersId}`
  );
  let buyersProducts = orderProductList.map((e: any) => {
    productDetailsByUser = JSON.stringify(e);
    return e.product_id;
  });

  let buyersAddressId = orderProductList[0]?.address_id;
  let buyersAddress;

  if (userId) {
    buyersAddress = await userSerivceDB.query(
      `SELECT * FROM tbl_user_address_masters where id=${buyersAddressId}`
    );

    const sellersSellingProductsOrderedByBuyer: any =
      await db.tbl_seller_linked_product_mappings.findAll({
        where: {
          product_id: {
            [Op.in]: buyersProducts,
          },
          seller_id: {
            [Op.in]: seller_IDS,
          },
        },
        order: [["seller_id", "asc"]],
        limit: 25,
      });

    //** check */
    let sellerLocationLatLong: any = [];

    const seller_ids = sellersSellingProductsOrderedByBuyer
      .map((e: any) => e.seller_id)
      .join(",");

    if (!seller_ids) {
      return {
        message: "No sellers found",
      };
    }
    let sellersAddress = await userSerivceDB.query(
      `SELECT * FROM tbl_user_address_masters where user_id in (${seller_ids})`
    );
    let sellersInfo = await userSerivceDB.query(
      `select id, business_name, first_name,last_name, sap_id, phone_no from tbl_user_masters where id in (${seller_ids})`
    );
    // check ends here
    let locationMap = sellersAddress[0].map((e: any) => {
      return {
        seller_id: e.user_id,
        seller_meta: sellersInfo[0]?.filter(
          (seller_meta: any) => seller_meta?.id == e.user_id
        )[0],
        lat: e.lat,
        long: e.long,
      };
    });

    for (let location of locationMap) {
      sellerLocationLatLong.push(`${location["lat"]},${location["long"]}`);
    }

    const buyersLatLng = buyersAddress[0];
    const blat = buyersLatLng[0]["lat"];
    const blng = buyersLatLng[0]["long"];
    //google seller location
    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${blat},${blng}&destinations=${sellerLocationLatLong.join(
        "|"
      )}&units=kilometers&key=AIzaSyC83z-jcSzQWBq2amtSWP4OWT_5x9G4xIQ`,
      headers: {},
    };
    var sellerMeta: any = [];
    var buyersArea = {
      buyers_lat: blat,
      buyers_lng: blng,
      name: buyerInfo[0][0]?.first_name + " " + buyerInfo[0][0]?.last_name,
    };
    await axios(config).then(function (response) {
      const jsonObj = response.data.rows[0]?.elements;
      const addresses = response.data.destination_addresses;

      locationMap.map((eachSellerLoc: any, index: any) => {
        sellerMeta.push({
          seller_id: eachSellerLoc.seller_id,
          lat: eachSellerLoc.lat,
          lng: eachSellerLoc.long,
          seller_meta: eachSellerLoc.seller_meta,
          distance: jsonObj[index]["distance"],
          duration: jsonObj[index]["duration"],
          addresses: addresses[index],
        });
      });
    });

    const sortedList = sellerMeta.sort(compareAndSort);
    return {
      sortedList,
      buyersArea,
    };
  }
};

/**
 * findBestSeller RFQ
 * @param req 
 * @param res 
 * @returns 
 */
const findBestSellerForRFQ = async (req: any, res: any) => {
  try {
    const request_id = req.query.request_id ? req.query.request_id : 0;

    if (request_id === 0) {
      return commonResponse(res, 404, [], [], "Buyer Id not found");
    }
    const data: any = await sortedSellers(request_id);
    return commonResponse(res, 200, {
      sellersInfo: data.sortedList,
      buyersArea: data.buyersArea,
    });
  } catch (error: any) {
    return commonResponse(res, 500, [], error?.message);
  }
};

function compareAndSort(a: any, b: any) {
  if (a.distance["value"] < b.distance["value"]) {
    return -1;
  }
  if (a.distance["value"] > b.distance["value"]) {
    return 1;
  }
  return 0;
}

const productRoutes: any = {
  create,
  update,
  getById,
  getAllRFQs,
  tagRFQwithSeller,
  getAll,
  getChildSkus,
  getCategoriesByRequestId,
  findBestSellerForOrders,
  findBestSellerForRFQ,
  sortedSellers,
  excelCreate,
  excelUpdate,
};

export default productRoutes;
