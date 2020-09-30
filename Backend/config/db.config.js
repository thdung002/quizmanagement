'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : '113.172.223.236',
  port     : '28129',
  user     : 'dung',
  password : '123456',
  database : 'quiz_management'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
