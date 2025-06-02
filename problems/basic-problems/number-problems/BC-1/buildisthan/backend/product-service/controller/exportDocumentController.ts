import userSerivceDB from "../remote/user.service";
import productRoutes from "./productController";
import sellerRoutes from "./sellerController";

const excel = require("exceljs");
/**
 * export db data to excel
 * @param req 
 * @param res 
 * @returns 
 */
const exportSellerRfqReport = async (req: any, res: any) => {
  try {
    let workbook = new excel.Workbook();
    let order_level_worksheet = workbook.addWorksheet("Order Level Summary");
    let sku_level_worksheet = workbook.addWorksheet("SKU Wise Summary");

    order_level_worksheet.columns = [
      { header: "Order ID", key: "pre_order_id", width: 35 },
      { header: "Order Creation Date", key: "creation_date", width: 25 },
      { header: "Request ID", key: "request_id", width: 30 },
      { header: "SKU ID", key: "sku_id", width: 30 },
      { header: "Category", key: "category", width: 30 },
      { header: "Product Name", key: "product_name", width: 45 },
      { header: "Buyer Name", key: "user_name", width: 35 },
      { header: "Buyer Pin Code", key: "pincode", width: 15 },
      { header: "Buyer Address", key: "address", width: 45 },
      { header: "Buyer Contact No", key: "mobile_no", width: 20 },
    ];

    sku_level_worksheet.columns = [
      { header: "SKU Name", key: "product_name", width: 50 },
      {
        header: "Total Order Quantity",
        key: "total_order_quantity",
        width: 25,
      },
      { header: "Unit", key: "unit", width: 10 },
    ];

    // Add Array Rows
    req.is_exportable = true;
    const responseOfSummary =
      await sellerRoutes.getSellerTaggedRFQsProductWiseSummary(req, res);
    const responseOfOrders = await sellerRoutes.getSellerTaggedChildRFQs(
      req,
      res
    );
   

    let orders: any = [];
    const address_ids = responseOfOrders
      ?.map((e: any) => e.enquiry.address_id)
      .join(",");

    const userAddressInfo = await userSerivceDB.query(
      `SELECT id, address, pincode, mobile_no from tbl_user_address_masters WHERE id in (${address_ids})`
    );

    responseOfOrders.map((each: any) => {
      orders.push({
        pre_order_id: each.pre_order_id,
        sku_id: each.enquiry.sku_id,
        product_name: each.enquiry.product.product_name,
        category: each.enquiry.category.category_name,
        request_id: each.enquiry.request_id,
        pincode: userAddressInfo[0]
          ? userAddressInfo[0]
              .filter((e: any) => e.id === each.enquiry.address_id)
              .map((e: any) => e.pincode)[0]
          : "N/A",
        address: userAddressInfo[0]
          ? userAddressInfo[0]
              .filter((e: any) => e.id === each.enquiry.address_id)
              .map((e: any) => e.address)[0]
          : "N/A",
        mobile_no: userAddressInfo[0]
          ? userAddressInfo[0]
              .filter((e: any) => e.id === each.enquiry.address_id)
              .map((e: any) => e.mobile_no)[0]
          : "N/A",
        user_name: each.enquiry.user_name,
        creation_date: each.enquiry.createdAt,
      });
    });
    order_level_worksheet.addRows(orders);
    sku_level_worksheet.addRows(responseOfSummary);

    // res is a Stream object
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "rfq_report.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (err: any) {
    return res.status(500).send(JSON.stringify(err));
  }
};

const exportDocuments = {
  exportSellerRfqReport,
};

export default exportDocuments;
