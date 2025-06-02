// var mysql = require('mysql');
import mysql from 'mysql'
const MySQLEvents = require('@rodrigogs/mysql-events');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

config.database, config.username, config.password
const program = async () => {
  var connection = mysql.createConnection({
    host: "b2b-product-service-db",
    user: 'root',
    password: 'password'
  });
  
   const instance = new MySQLEvents(connection, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });
  
  await instance.start();

  instance.addTrigger({
    name: config.database,
    expression: '*',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event:any) => { // You will receive the events here
      console.log(event);
    },
  });
  
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events logs...'))
  .catch(console.error);

