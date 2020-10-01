'use strict';
var dbConn = require('./../../config/db.config');
var Quiz = function(quiz){
  this.Examination     = quiz.Examination;
  this.Config     = quiz.Config;
  this.Template     = quiz.Template;
  this.Code     = quiz.Code;
  this.CreatedBy   = quiz.CreatedBy;
  this.UpdatedBy   = quiz.UpdatedBy;
};
Quiz.add = function (newTop, result) {
dbConn.query("INSERT INTO quiz set ?", newTop, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Quiz.getQuizById = function (id, result) {
dbConn.query("Select * from quiz where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Quiz.getQuiz = function (result) {
dbConn.query("Select * from quiz", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('quiz : ', res);
  result(null, res);
}
});
};
Quiz.updateQuizById = function(id, quiz, result){
dbConn.query("UPDATE quiz SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [quiz.Examination, quiz.Config, quiz.Template, quiz.Code, quiz.CreatedBy, quiz.UpdatedBy, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Quiz.deleteQuizById = function(id, result){
dbConn.query("DELETE FROM quiz WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Quiz;