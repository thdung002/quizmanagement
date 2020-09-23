'use strict';
var dbConn = require('../../config/db.config');
var Questiontopic = function(questiontopic){
  this.Question     = questiontopic.Question;
  this.Topic     = questiontopic.Topic;
  this.CreatedBy   = questiontopic.CreatedBy;
  this.UpdatedBy   = questiontopic.UpdatedBy;

};
Questiontopic.add = function (newTop, result) {
dbConn.query("INSERT INTO questiontopic set ?", newTop, function (err, res) {
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
Questiontopic.getQuestiontopicById = function (id, result) {
dbConn.query("Select * from questiontopic where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Questiontopic.getQuestiontopic = function (result) {
dbConn.query("Select * from questiontopic", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('questiontopic : ', res);
  result(null, res);
}
});
};
Questiontopic.updateQuestiontopicById = function(id, questiontopic, result){
dbConn.query("UPDATE questiontopic SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [questiontopic.Question,questiontopic.Topic,questiontopic.CreatedBy,questiontopic.UpdatedBy, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Questiontopic.deleteQuestiontopicById = function(id, result){
dbConn.query("DELETE FROM questiontopic WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Questiontopic;