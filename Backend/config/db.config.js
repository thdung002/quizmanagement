'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : '14.186.50.153',
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