'use strict';
var dbConn = require('./../../config/db.config');
var Topic = function(topic){
  this.Content     = topic.Content;
  this.CreatedBy   = topic.CreatedBy;
  this.UpdatedBy   = topic.UpdatedBy;

};
Topic.add = function (newTop, result) {
dbConn.query("INSERT INTO topic set ?", newTop, function (err, res) {
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
Topic.getTopicById = function (id, result) {
dbConn.query("Select * from topic where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Topic.getTopic = function (result) {
dbConn.query("Select * from topic", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('topic : ', res);
  result(null, res);
}
});
};
Topic.updateTopicById = function(id, topic, result){
dbConn.query("UPDATE topic SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [topic.Content,topic.CreatedBy,topic.UpdatedBy, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Topic.deleteTopicById = function(id, result){
dbConn.query("DELETE FROM topic WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Topic;