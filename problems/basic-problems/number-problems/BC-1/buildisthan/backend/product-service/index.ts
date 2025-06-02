import bodyParser from 'body-parser';
import Express from 'express';
const app = Express();
import cors from 'cors';
import router from './router/router';
import fileUpload from 'express-fileupload';
import extractLimiters from './middleware/extractLimiters';
import executeScripts from './schedulers/product_area_mappings/index';
import db from './models';
import logController from './controller/logController';
import extractUserInfo from './middleware/extractUserInfo';
import { filterChangedValues, logUpdateChanges } from './helper/sharedMethods';
// import { logUpdateChanges } from './helper/sharedMethods';
const apiPrefix: any = process.env.API_URL || '/api/v1';
require('dotenv').config();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp',
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(
  cors({
    origin: '*',
  })
);
app.use(extractUserInfo)
app.use(extractLimiters);
app.use(apiPrefix, [router.router, router.mobileApiRouter]);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Product Service.</h1>")
});

app.listen(PORT, async () => {
  console.log('Product Server Runing Port.11..' + PORT);
//  const f =  filterChangedValues(db.tbl_product_items, {
//     "hsn_code":"blahalaa",
//     "bar_code":null,
//     "sap_code":"21232",
//     "stock_quantity":1900,
//     "id":1
//   }, "product")

  
  // const r = await logUpdateChanges({
  //   id: 1024,
  //   payload: { "bar_code": "BAR13233", "tag_id": [1, 2], "collection_id": [1, 2], "upload_images": { "frontURL": {}, "backURL": {} }, "averge_delivery_time": "10 days", "stock_quantity": "2000" },
  //   type: 'product',
  //   //should_update:"false"
  // })


});



/** Execute CRON Jobs */
// executeScripts()
/** Catch Unhandled Error and try to restart the container to prevent 502 proxy error */
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
