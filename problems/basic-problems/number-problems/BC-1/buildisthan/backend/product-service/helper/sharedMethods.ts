import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from 'fs';
import axios from 'axios';
import FormData from "form-data";
import { Op } from "sequelize";
import db from '../models/index'
import logValidator from "../controller/validators/logs";
import moment from "moment";
import { transform } from "typescript";
import { isObject } from "util";
const enviroment = process.env.ENVIROMENT || "development";
const config = require("../config/config.json")[enviroment];
const { commonResponse } = require("@ssiltools/shared-files");
const ajv = new Ajv();
addFormats(ajv);
/**
 * Validate Input
 */
const validateInputs = (schema: any, body: any) => {
  const validate: any = ajv.compile(schema);
  const valid: any = validate(body);
  if (!valid) {
    return {
      status: 400,
      errors: validate?.errors
    }
  }

  return {
    status: 200,
    errors: ''
  }
}

const uploadImage = async (req: any, location: any, postName: any) => {
  let dbSaveFileName: any = "";
  let url = config.file_upload_service.URL + "/upload-file";
  try {
    var files: any = (req.files) ? req?.files[postName] : req;
    if (files?.tempFilePath) {
      const image: any = await fs.createReadStream(files?.tempFilePath);
      const formData: any = new FormData();
      formData.append("dir_path", `assets/${location}`);
      formData.append("file", image, files?.name);
      const resp = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dbSaveFileName = resp.data?.data?.Key;
      //fs.unlinkSync(files?.tempFilePath);


      cleanTmp()
      return dbSaveFileName;
    }

    return []

  } catch (er) {
    //console.log("image upload error", postName, er)
    return dbSaveFileName;
  }
};

const cleanTmp = () => {
  var folder = './tmp/';
  fs.readdir(folder, (err: any, files: any) => {

    if (err) throw err;

    for (const file of files) {

      //console.log(file + ' : File Deleted Successfully.');

      fs.unlinkSync(folder + file);

    }
  });
}

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

const generateOrderId = (rid: any) => {
  const prefix = "OD";
  const generatedSl = Date.now();
  const id = prefix + generatedSl + rid;
  return id;
};

/** Master data */
const tagMaster = async () => db.tbl_tag_masters.findAll({ attributes: ['id', 'type'], raw: true })
const collectionMaster = async () => db.tbl_collection_masters.findAll({ attributes: ['id', 'name'], raw: true })
const shippingMaster = async (product_id: any = 0) => db.tbl_product_shipping_details.findAll({ where: { product_id }, raw: true })
const brandMaster = async () => db.tbl_brand_masters.findAll({ attributes: ['id', 'brand_name'], raw: true })
/**
 * get isActive=0 or check web_api 
 * @param tableField 
 * @param isActive 
 * @returns 
 */
const getIsActiveData = (web_api: any, isActiveBoolValues: any) => {

  if (web_api === '0' || web_api === undefined) {
    return { is_active: isActiveBoolValues }
  }
  else {

    return { is_active: { [Op.in]: [1, 0] } }
  }
}

/**
 * getDateOrMonthOrYear
 * @param dateType 
 * @returns 
 */
const getDataByMonthWeekYear = (dateType: any,) => {
  const type = dateType === 'week' ? 1 : dateType === 'month' ? 2 : dateType === 'year' ? 3 : ''
  switch (type) {
    case 1:
      var date = new Date();
      // const sevenDays = date.setDate(date.getDate() - 7)
      const sevenDays = date.setDate(date.getDate() - 7)
      var utc = new Date(sevenDays).toJSON()?.slice(0, 10).replace(/-/g, '-');


      return utc

    case 2:
      var date = new Date();
      const month = date.setDate(date.getDate() - 30)
      var utc = new Date(month).toJSON()?.slice(0, 10).replace(/-/g, '-');
      return utc

    case 3:
      var date = new Date();
      const year = date.setDate(date.getDate() - 365)
      var utc = new Date(year).toJSON()?.slice(0, 10).replace(/-/g, '-');
      return utc
    default:
    //console.log('invalid input')
  }

}

const getLastWeekMonthYearData = (dateType: any, Lastdate: any) => {
  switch (dateType) {
    case 'week':

      var date = new Date(Lastdate);
      const sevenDays = date.setDate(date.getDate() - 7)
      var utc = new Date(sevenDays).toJSON()?.slice(0, 10).replace(/-/g, '-');
      return utc

    case 'month':
      var date = new Date(Lastdate);
      const month = date.setDate(date.getDate() - 30)
      var utc = new Date(month).toJSON()?.slice(0, 10).replace(/-/g, '-');
      return utc

    case 'year':
      var date = new Date(Lastdate);
      const year = date.setDate(date.getDate() - 365)
      var utc = new Date(year).toJSON()?.slice(0, 10).replace(/-/g, '-');
      return utc
    default:
    //console.log('invalid input')
  }

}

const offsetOrLimit = (take: any, skip: any) => {
  if (take) return { limit: +(take), offset: +(skip) }
}

const range = (data: any = [], start: any, stop: any, step: any) => {
  Array.from({ length: (stop - start) / step + 1 }, (_: any, i: any) => start + (i * step))
}

const paginationOffsetAndLimit = async (_offSet: any, _limit: any) => {
  let pag = { offset: +_offSet, limit: +_limit }
  return pag
}

const searchArray = (nameKey: any, myArray: any) => {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
}
/**
 * check duplicate before insert 
 * @param res 
 * @param tableName 
 * @param whereTableFieldName 
 * @returns 
 */
const isExists = async (res: any, tableName: any, whereTableFieldName: any) => {
  try {
    const duplicate = await tableName.findOne({
      where: whereTableFieldName
    })
    // //console.log('ddddd',duplicate)
    return duplicate?.dataValues


  } catch (err: any) {
    return commonResponse(res, 500, err.message, []);

  }
}


/**
 * Create Log and Update Model
 * @param req 
 * @param res 
 * @returns 
 */

const logUpdateChanges = async (payload: any) => {
  var transaction: any = payload?.transaction || await db.sequelize.transaction();
  try {
    const isValid = validateInputs(logValidator, payload);
    if (isValid.status === 400)
      return isValid.errors

    const id = payload.id || 0
    const payloadData = payload.payload
    const should_update = payload.should_update || false
    const created_by = payload.created_by || 1
    const type = payload.type || 'product'
    const logs = await logDataSet(payloadData, id, type, created_by);
    return logs;
  } catch (err: any) {
    //await transaction.rollback()
    //console.log('err in log', err)
    return err
  }
}

/**
* Get Log Data for Collection and Bulk Insert
* @param payloadData + attributes
* @param id 
* @param ENTITY 
* @param created_by 
* @returns 
*/
const resolveValue = async (type: any, value: any) => {
  var response: any = ""
  if (type.includes('tag')) {

    let tags = await tagMaster()
    response = tags.find((e: any) => e.id === value)
    return response.type
  }

  if (type.includes('collection')) {
    let collection = await collectionMaster()
    response = collection.find((e: any) => e.id === value)
    return response.name
  }

  if (type.includes('brand')) {
    let brand = await brandMaster()
    response = brand.find((e: any) => e.id === value)
    return response.brand_name
  }
  return false
}
const filterChangedValues = async (entity: any, attributesVal: any, payload: any, idVal: any, keyAttr: any = "id") => {
  const data = await entity.findOne({
    attributes: attributesVal,
    where: {
      [keyAttr]: idVal
    }, raw: true
  })
  var changedValues: any = {}
  console.log('ddddsdsddsds', data)
  if(data !== null){
    for (var key in data) {
      if (payload[key] != data[key] && payload[key] !== '' && payload[key] !== null && payload[key] !== undefined && payload[key] !== 'undefined') {
        changedValues[key] = payload[key]
      }
    }
  } else {
    for(var i=0; i < attributesVal.length; i++){
      
      let key = attributesVal[i]
      changedValues[key] = payload[key]
      console.log('cccwd', changedValues[key])
    }
  }
  console.log('changed values', changedValues, payload)
  return changedValues

}


const prepareLogs = async (attributes: any, payloadData: any, ENTITY: any, id: any, created_by: any, key: any = "id") => {

  try {
    var createBulkLog = []
    var conditions: any = {
      where: {}
    }
    conditions['attributes'] = attributes
    conditions['where'][key] = id
    conditions['raw'] = true
    const keyValues = await ENTITY.findOne(conditions)
    if (keyValues) {
      for (var i = 0; i < attributes.length; i++) {
        const key = attributes[i]
        const current_value = keyValues[key]
        const is_array_value = Array.isArray(payloadData[key]) ? true : false
        if (is_array_value === true) {
          let to_val = payloadData[key]
          for (var j = 0; j < to_val.length; j++) {
            let each = to_val[j]
            if (current_value !== each) {
              if (await resolveValue(key, each)) {
                each = await resolveValue(key, each)
              }
              createBulkLog.push({
                product_id: id,
                field: key,
                from_value: current_value,
                to_value: each,
                created_by
              })
            }
          }
        } else {

          if (current_value != payloadData[key]) {
            if (payloadData[key] !== null && payloadData[key] !== undefined && payloadData[key] !== 'null' && payloadData[key] !== 'undefined') {
              createBulkLog.push({
                product_id: id,
                field: key,
                from_value: current_value,
                to_value: payloadData[key],
                created_by
              })
            }
          }
        }
      };
    } else {
      // new entry
      for (var i = 0; i < attributes.length; i++) {
        const key = attributes[i]
        const is_array_value = Array.isArray(payloadData[key]) ? true : false
        if (is_array_value === true) {
          let to_val = payloadData[key]

          for (var j = 0; j < to_val.length; j++) {
            let each = to_val[j]
            if (await resolveValue(key, each)) {
              each = await resolveValue(key, each)
            }
            if (payloadData[key] !== null && payloadData[key] !== undefined && payloadData[key] !== 'null' && payloadData[key] !== 'undefined') {
              createBulkLog.push({
                product_id: id,
                field: key,
                from_value: null,
                to_value: each,
                created_by
              })
            }
          }
        } else {
          if (payloadData[key] !== null && payloadData[key] !== undefined && payloadData[key] !== 'null' && payloadData[key] !== 'undefined') {
            createBulkLog.push({
              product_id: id,
              field: key,
              from_value: null,
              to_value: payloadData[key],
              created_by
            })
          }
        }
      }
    }

    return createBulkLog;

  } catch (err: any) {
    return ["ERROR in PREPARING LOG" + err?.message]
  }
}

const logDataSet = async (payloadData: any, id: any, type: any, created_by: any, filterValues: any = true) => {
  var createBulkLog: any = []
  const MODELINFO: any = await getModelAndAttributes(type);
  const attributes = Object.keys(payloadData)
  switch (type) {
    case 'product':
      var payload1 = await filterChangedValues(MODELINFO.master.db, MODELINFO.master.attributes, payloadData, id)
      var payload2 = await filterChangedValues(MODELINFO.mapped.tag.db, MODELINFO.mapped.tag.attributes, payloadData, id, "product_id")
      var payload3 = await filterChangedValues(MODELINFO.mapped.collection.db, MODELINFO.mapped.collection.attributes, payloadData, id, "product_id")
      var payload4 = await filterChangedValues(MODELINFO.mapped.shipping.db, MODELINFO.mapped.shipping.attributes, payloadData, id, "product_id")
      console.log('pay2', payload1, payload2, payload3, payload4)
      payloadData = { ...payload1, ...payload2, ...payload3, ...payload4 }
      console.log('loggable payload', payloadData)
      const prepareLogsObject = await prepareProductLogs(MODELINFO, attributes);
      for (const key in prepareLogsObject) {
        if (prepareLogsObject[key].attributes.length > 0) {
          const merged_logs: any = await prepareLogs(prepareLogsObject[key].attributes, payloadData, prepareLogsObject[key].model, id, created_by, prepareLogsObject[key].key)
          if (merged_logs.length > 0) {
            merged_logs.map((eachLog: any) => {
              createBulkLog.push(eachLog)
            })
          }
        }
      }
      break;

    case 'user':
      console.log('prepare user log methods')
      break;

    default:

  }

  await MODELINFO.log.db.bulkCreate(createBulkLog)
  return createBulkLog
}


const prepareProductLogs = async (MODELINFO: any, attributes: any) => {

  const masterAttributes = MODELINFO.master.attributes
  const masterMatchedAttributes = attributes.filter((element: any) => masterAttributes.includes(element));
  const collectionAttributes = MODELINFO.mapped.collection.attributes
  const collectionMatchedAttibutes = attributes.filter((element: any) => collectionAttributes.includes(element));
  const tagAttributes = MODELINFO.mapped.tag.attributes
  const tagMatchedAttibutes = attributes.filter((element: any) => tagAttributes.includes(element));
  const shippingAttributes = MODELINFO.mapped.shipping.attributes
  const shippingMatchedAttributes = attributes.filter((element: any) => shippingAttributes.includes(element));
  const prepareLogsObject: any = {
    "master": {
      "attributes": masterMatchedAttributes,
      "model": MODELINFO.master.db,
      "key": "id"
    },
    "collection": {
      "attributes": collectionMatchedAttibutes,
      "model": MODELINFO.mapped.collection.db,
      "key": "product_id"
    },
    "tags": {
      "attributes": tagMatchedAttibutes,
      "model": MODELINFO.mapped.tag.db,
      "key": "product_id"
    },
    "shipping": {
      "attributes": shippingMatchedAttributes,
      "model": MODELINFO.mapped.shipping.db,
      "key": "product_id"
    }
  }

  return prepareLogsObject
}

/**
* Map Entity
* @param model 
* @returns 
*/
const getModelAndAttributes = async (model: any) => {

  var resultModel: any = {}
  switch (model) {
    case 'product':
      resultModel.master = { db: db.tbl_product_items, attributes: ["categories_id", "brand_id", "uom_id", "product_name", "full_description", "tax_category_id", "hsn_code", "bar_code", "business_category", "front_image", "back_image", "is_active"] };
      resultModel.mapped = {
        shipping: { db: db.tbl_product_shipping_details, attributes: ["is_shipping", "weight", "height", "width", "length", "is_free_shipping", "averge_delivery_time", "additional_shipping_charges"] },
        tag: { db: db.tbl_product_tag_mapping, attributes: ["tag_id"] },
        collection: { db: db.tbl_product_collection_mappings, attributes: ["collection_id"] }
      };
      resultModel.log = { db: db.tbl_product_logs_mappings, attributes: [] };
      break;

    default:
      resultModel.master = db.tbl_product_master;
      resultModel.logEntity = db.tbl_product_logs_mappings;
  }

  return resultModel
}

export {
  validateInputs,
  uploadImage,
  cleanTmp,
  zeroPad,
  generateOrderId,
  getIsActiveData,
  getDataByMonthWeekYear,
  range,
  getLastWeekMonthYearData,
  offsetOrLimit,
  paginationOffsetAndLimit,
  searchArray,
  isExists,
  getModelAndAttributes,
  logUpdateChanges,
  filterChangedValues
}