import e from "express";
import moment from "moment";
import { Op } from "sequelize";
import {getDataByMonthWeekYear,getLastWeekMonthYearData} from "../helper/sharedMethods";
const { Sequelize, QueryTypes } = require("sequelize");
import db from "../models/index";
const { commonResponse } = require("@ssiltools/shared-files");
import userSerivceDB from "../remote/user.service";
/**
 * Dashboard API Router Endpoint
 * @param req 
 * @param res 
 * @returns 
 */
const dashboardGetData = async (req: any, res: any) => {
    const methodType = req.params.type
   
    switch (methodType) {
        case 'get-seller-location':
            getSalerLocationByHigherRevenueAndOrder(req, res)
            break;
        case 'get-return-summary':
            returnSummary(req, res)
            break;
        case 'get-sales-overview':
            salesOverview(req, res)
            break;
        case 'get-sales-order-overview':
            salesOrderOverview(req, res)
            break;
        case 'get-view-all-orders':
            getAllOrder(req, res)
            break;
        case "get-top-buyers":
            topBuyers(req, res);
            break;
        case "get-top-products":
            topProducts(req, res);
              break;
        case "get-orders-status":
            ordersStatus(req, res);
            break;
        case "get-payment-status":
                paymentStatus(req, res);
                break;
        default:
            return commonResponse(
                res,
                500,
                [],
                "Invalid URL endpoint! 🤦‍♂️",
                "",
                process.env.ENVIROMENT
            );
          
    }
}
/**
 * get Seller Locatoin by Revenues&Order
 * @param req 
 * @param res 
 * @returns 
 */
const getSalerLocationByHigherRevenueAndOrder = async (req: any, res: any) => {
    try {
        let buyersList: any = []
        const getRfq = `SELECT rfq.request_id,rfq.seller_price,rfq.seller_quantity,prdEnq.user_id  FROM tbl_rfq_seller_mappings AS rfq JOIN tbl_product_enquiries_masters as prdEnq ON rfq.request_id = prdEnq.request_id where (seller_approved=1 and buyer_approved=1) GROUP By prdEnq.user_id ORDER BY rfq.seller_quantity DESC;`
        const existing = await db.sequelize.query(getRfq, { type: QueryTypes.SELECT });
        existing.map((currentSellerId: any, currentIndex: any) => {
            buyersList.push(currentSellerId)

        })
        let buyerIds: any = []
        buyersList.map((bid: any) => {
            buyerIds.push(bid.user_id)
        })
        const districts = await userSerivceDB.query(
            `
            SELECT id,district_name FROM tbl_district_masters where state_id = 2
            `,
            Sequelize.QueryTypes.SELECT
        );
    
        if(buyerIds.length===0){
            return commonResponse(
                res,
                400,
                [],
                [],
                "No buyer found"
            );
    
        }
        const districtsArr = await userSerivceDB.query(
            `
            SELECT tbl_user_address_masters.district_id, tbl_user_address_masters.user_id from tbl_user_address_masters WHERE tbl_user_address_masters.user_id in (${buyerIds}) order by tbl_user_address_masters.district_id asc
            `,
            Sequelize.QueryTypes.SELECT
        );

        var modifiedList: any = []
        buyersList.map((ebl: any) => {
            modifiedList.push({
                user_id: ebl.user_id,
                seller_price: ebl.seller_price,
                seller_quantuty: ebl.seller_quantity,
                district_id: districtsArr[0].filter((eda: any) => eda.user_id === ebl.user_id).map((e: any) => e.district_id)[0]
            })
        })
        let finalList: any = []
        districts[0].map((eachDistrict: any) => {
            let eachDistrictData = {
                district_id: eachDistrict.id,
                district_name: eachDistrict.district_name,
                sales: modifiedList.filter((e: any) => e.district_id === eachDistrict.id).reduce((total: any, next: any) => {
                    return +(total) + (next.seller_price);
                }, 0),
                orders: modifiedList.filter((c: any) => c.district_id === eachDistrict.id).length
            }
            finalList.push(eachDistrictData)
        })


        return commonResponse(
            res,
            200,
            finalList,
            [],
            ""
        );

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
 * return ordered list summary
 * @param req 
 * @param res 
 * @returns 
 */
const returnSummary = async (req: any, res: any) => {
    try {
        let returnSummaryList=[{
            orderReturn: '0',
            returnPending: '0',
            orderCancelled: '0',
            orderRefund: '0',
            AuthorizedReturn: '0'
        }]
        return commonResponse(
            res,
            200,
            returnSummaryList,
            [],
            ""
        );

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
 * salesOverview
 * @param req 
 * @param res 
 * @returns 
 */
const salesOverview = async (req: any, res: any) => {
    try {
        const getData = req.query.getdata
        const week = getDataByMonthWeekYear(getData)       
        var currentDate = moment().format("YYYY-MM-DD");
    
        let result= await getRfqData(week,currentDate)
        
        //last week or Month or Year Amount Data
        let DateArray:any=[]
        result.map((e:any)=>{
            DateArray=[e.createdAt?.slice(0, 10)]
        })
       

        let lastDate = getLastWeekMonthYearData('week',DateArray)
        let lastDbDate=moment().format("YYYY-MM-DD")
        
        let lastDataAmoun= await getRfqData(lastDate,lastDbDate)
     
       
        const data: any = [{
            label: result.map((e: any) => {
                let fullYear = e.createdAt = e.createdAt?.slice(0, 10)
                let levelData = getData === 'week' ? new Date(fullYear).getUTCDate() : getData === 'month' ? new Date(fullYear).getUTCMonth()+1 : getData === 'year' ? new Date(fullYear).getUTCMonth() + 1 : ''
                return levelData
            }),
            data: result.map((e: any) => {
                let amount = e.admin_price
                return amount
            }),
            total: result.filter((e: any) => e.admin_price).reduce((total: any, next: any) => {
                return +(total) + (next.admin_price);
            }, 0),
            lastWeekOrMonth: lastDataAmoun.filter((e: any) => e.admin_price).reduce((total: any, next: any) => {
                return +(total) + (next.admin_price);
            }, 0),
        }]
        return commonResponse(
            res,
            200,
            data,
            [],
            ""
        );

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
 * salesOrderOrverview 
 * @param req 
 * @param res 
 * @returns 
 */
const salesOrderOverview=async(req:any,res:any)=>{
    try {
        const getData = req.query.getdata
        const week = getDataByMonthWeekYear(getData)
        var currentDate = moment().format("YYYY-MM-DD");        
        let result= await getRfqData(week,currentDate)         
        //last week or Month or Year Amount Data        
        console.log('resu 7days',week)
        let DateArray:any=[]
        result.map((e:any)=>{
            DateArray=[e.createdAt?.slice(0, 10)] 
        })
         
        let lastDate = getLastWeekMonthYearData('week',DateArray)         
        // let lastDbDate=new Date(DateArray).toJSON()?.slice(0,10).replace(/-/g,'-');  
        let lastDbDate= moment(DateArray).format("YYYY-MM-DD");    
       
        //get rfq data from function
        let lastDataAmoun= await getRfqData(lastDate,lastDbDate)  

        const data: any = [{
            label: result.map((e: any) => {
                let fullYear = e.createdAt = e.createdAt.slice(0, 10)
                let levelData = getData === 'week' ? new Date(fullYear).getUTCDate() : getData === 'month' ? new Date(fullYear).getUTCMonth()+1 : getData === 'year' ? new Date(fullYear).getUTCFullYear() : ''
                return levelData
            }),
            
            data: result.map((e: any) => {
                let order = e.seller_quantity
                return order
            }),
            total: result.filter((e: any) => e.seller_quantity).reduce((total: any, next: any) => {
                return +(total) + (next.seller_quantity);
            }, 0),
            lastWeekOrMonth: lastDataAmoun.filter((e: any) => e.seller_quantity).reduce((total: any, next: any) => {
                return +(total) + (next.seller_quantity);
            }, 0),
        }]
       
        return commonResponse(
            res,
            200,
            data,
            [],
            ""
        );

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
 * getAllOrder
 * @param req 
 * @param res 
 * @returns 
 */
const getAllOrder=async(req:any,res:any)=>{
    try {
      
        const getRfqQueryStr = `SELECT GROUP_CONCAT (pi.product_name) as product_names, pe.request_id as request_id,pe.createdAt as createdAt,sum(pe.price) as total_order_value from tbl_product_enquiries_masters pe JOIN tbl_product_masters pi ON pi.id = pe.product_id group by pe.request_id`;
        
        
        const getAllRqfData = await db.sequelize.query(getRfqQueryStr, { type: QueryTypes.SELECT });     
        

        const getAllOrderData=getAllRqfData.map((e:any)=>{
            return {productNames:e.product_names,requestId:e.request_id,createdAt:e.createdAt,total_order_value:e.total_order_value!=null?e.total_order_value:'0',orderStatus:'Open',shippingStatus:'In Transit',paymentType:'Pending | COD'}
        })
      
        
        const viewAllOrder:any=[]         
        for(let ordIndex of getAllOrderData ){            
            viewAllOrder.push(ordIndex)
        }
    
      return commonResponse(
        res,
        200,
        viewAllOrder,
        [],
        ""
    );
    } catch (err:any) {
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
//function - between date wise show data 
const getRfqData=async(lastDate:any,lastDbDate:any)=>{
    let dataQuery = `SELECT * FROM tbl_rfq_seller_mappings WHERE ((DATE(createdAt) BETWEEN '${lastDate}' AND '${lastDbDate}') AND (seller_approved=1 and buyer_approved=1))`
    return  await db.sequelize.query(dataQuery, { type: QueryTypes.SELECT });
}


/**
 * get top-Buyers
 * @param req
 * @param res
 * @returns
 */

const topBuyers = async (req: any, res: any) => {
    try {
     const output= `(SELECT rfqm.totalPrice AS TotalOrderRevenue,prdEnq.user_id FROM 
          (SELECT request_id,SUM(seller_price * seller_quantity) totalPrice FROM tbl_rfq_seller_mappings WHERE(seller_approved=1 AND buyer_approved=1) GROUP BY request_id) rfqm , (SELECT DISTINCT(user_id),request_id FROM tbl_product_enquiries_masters GROUP BY request_id) 
          prdEnq WHERE rfqm.request_id = prdEnq.request_id ORDER BY TotalOrderRevenue DESC)`;
    const result = await db.sequelize.query(output, {type: QueryTypes.SELECT});
  
      const buyerInfo = await userSerivceDB.query(
        `SELECT id ,CONCAT(first_name,' ',last_name) AS "CustomerName" ,email AS Email FROM tbl_user_masters WHERE is_seller=0`
      ); 
  
      // create new array
      var newarr : any = [];
      result.map((data : any):any => {
          newarr.push({
               "customerName": buyerInfo[0]?.filter((e:any) => e.id === data.user_id).map((e:any) => e.CustomerName)[0],
               "Email":buyerInfo[0]?.filter((e:any) => e.id === data.user_id).map((e:any) => e.Email)[0],
               "TotalOrderRevenue":data.TotalOrderRevenue
          })
      })
      return commonResponse(res, 200, newarr);
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
   * get top-Products
   * @param req
   * @param res
   * @returns
   */
  
  const topProducts= async (req: any, res: any) => {
    try {
      const  product=`(SELECT p.product_name as productName, i.image_url as image,SUM( DISTINCT s.seller_price * s.seller_quantity) AS TotalRevenue, COUNT(DISTINCT s.rfq_id ) AS NoOfOrders, SUM(DISTINCT e.quantity) AS itemsPurchased FROM tbl_rfq_seller_mappings s
       INNER JOIN tbl_product_enquiries_masters e ON s.rfq_id = e.id INNER JOIN tbl_product_masters p ON e.product_id = p.id INNER JOIN tbl_product_images i ON p.id = i.product_id WHERE s.buyer_approved = 1 AND s.seller_approved = 1 GROUP BY p.product_name ORDER BY TotalRevenue DESC)`;
      const result = await db.sequelize.query(product, {type: QueryTypes.SELECT});
      return commonResponse(res, 200, result);
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
 * get order-Summary include orderStatus and payment summary:
 * @param req
 * @param res
 * @returns
 */
  const ordersStatus= async (req: any, res: any) => {
    try {
    const orderDetails=`(SELECT 
        CASE WHEN tbl_rfq_seller_mappings.buyer_approved = 0 THEN 'Open'
             WHEN tbl_rfq_seller_mappings.buyer_approved = 1 AND tbl_rfq_seller_mappings.seller_approved = 0 THEN 'In process'
             WHEN tbl_rfq_seller_mappings.buyer_approved = 1 AND tbl_rfq_seller_mappings.seller_approved = 1 THEN 'Shipped'
        END AS OrderStatus,
        COUNT(*) AS Orders,
        SUM(tbl_rfq_seller_mappings.seller_price * tbl_rfq_seller_mappings.seller_quantity) AS Revenue
    FROM tbl_rfq_seller_mappings
    INNER JOIN tbl_product_enquiries_masters ON tbl_rfq_seller_mappings.rfq_id = tbl_product_enquiries_masters.id
    GROUP BY OrderStatus)`;
    const result = await db.sequelize.query(orderDetails, {type: QueryTypes.SELECT});
      return commonResponse(res, 200,result);
    } catch (erro:any) {
        return commonResponse(
            res,
            500,
            [],
            erro.message,
            "",
            process.env.ENVIROMENT
          );
    }
  };

  const paymentStatus= async (req: any, res: any) => {
    try {
    const paymenetDetails=`(SELECT 
        CASE WHEN tbl_rfq_seller_mappings.buyer_approved = 0 THEN 'OnHOLD'
        WHEN tbl_rfq_seller_mappings.buyer_approved = 1 AND tbl_rfq_seller_mappings.seller_approved = 0 THEN 'Pending'
             WHEN tbl_rfq_seller_mappings.buyer_approved = 1 AND tbl_rfq_seller_mappings.seller_approved = 1 THEN 'Paid'
        END AS PaymentStatus,
        COUNT(*) AS Orders,
        SUM(tbl_rfq_seller_mappings.seller_price * tbl_rfq_seller_mappings.seller_quantity) AS Revenue
    FROM tbl_rfq_seller_mappings
    INNER JOIN tbl_product_enquiries_masters ON tbl_rfq_seller_mappings.rfq_id = tbl_product_enquiries_masters.id
    GROUP BY PaymentStatus)`;
    const result = await db.sequelize.query(paymenetDetails, {type: QueryTypes.SELECT});
      return commonResponse(res, 200,result);
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



const salesByLocation = {
    dashboardGetData
};

export default salesByLocation;