'use strict';
var dbConn = require('../../config/db.config');
var Question = function(question){
  this.Content     = question.Content;
  this.Level     = question.Level;
  this.Type     = question.Type;
  this.CreatedBy   = question.CreatedBy;
  this.UpdatedBy   = question.UpdatedBy;

};
Question.add = function (newTop, result) {
dbConn.query("INSERT INTO question set ?", newTop, function (err, res) {
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
Question.getQuestionById = function (id, result) {
dbConn.query("Select * from question where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Question.getQuestion = function (result) {
dbConn.query("Select * from question", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('question : ', res);
  result(null, res);
}
});
};
Question.updateQuestionById = function(id, question, result){
dbConn.query("UPDATE question SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [question.Content,question.Level,question.Type,question.CreatedBy,question.UpdatedBy, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Question.deleteQuestionById = function(id, result){
dbConn.query("DELETE FROM question WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Question;