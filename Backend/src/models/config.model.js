'use strict';
var dbConn = require('../../config/db.config');
var Config = function(config){
  this.NumberQuestionLevel1     = config.NumberQuestionLevel1;
  this.NumberQuestionLevel2     = config.NumberQuestionLevel2;
  this.NumberQuestionLevel3     = config.NumberQuestionLevel3;
  this.NumberQuestionLevel4     = config.NumberQuestionLevel4;
  this.NumberQuestionLevel5     = config.NumberQuestionLevel5;
  this.NumberQuestionLevel6     = config.NumberQuestionLevel6;
  this.NumberQuestionLevel7     = config.NumberQuestionLevel7;
  this.NumberQuestionLevel8     = config.NumberQuestionLevel8;
  this.NumberQuestionLevel9     = config.NumberQuestionLevel9;
  this.NumberQuestionLevel10     = config.NumberQuestionLevel10;
  this.TotalQuestion     = config.TotalQuestion;
  this.CreatedBy   = config.CreatedBy;
  this.UpdatedBy   = config.UpdatedBy;
};
Config.add = function (newTop, result) {
dbConn.query("INSERT INTO config set ?", newTop, function (err, res) {
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
Config.getConfigById = function (id, result) {
dbConn.query("Select * from config where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Config.getConfig = function (result) {
dbConn.query("Select * from config", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('config : ', res);
  result(null, res);
}
});
};
Config.updateConfigById = function(id, config, result){
dbConn.query("UPDATE config SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [config.NumberQuestionLevel1,config.NumberQuestionLevel2,config.NumberQuestionLevel3,config.NumberQuestionLevel4,config.NumberQuestionLevel5,config.NumberQuestionLevel6,config.NumberQuestionLevel7,config.NumberQuestionLevel8,config.NumberQuestionLevel9,config.NumberQuestionLevell0,config.TotalQuestion,config.CreatedBy,config.UpdatedBy, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Config.deleteConfigById = function(id, result){
dbConn.query("DELETE FROM config WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Config;