'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : 'quizmanagement.ccd3ylv1pufy.ap-northeast-2.rds.amazonaws.com',
  port     : '3306',
  user     : 'dung',
  password : 'dung1234',
  database : 'quiz_management'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
