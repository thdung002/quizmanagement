'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : '113.162.190.123',
  port     : '28128',
  user     : 'dung',
  password : '123456',
  database : 'quiz_management'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
