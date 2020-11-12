'use strict';
var dbConn = require('../../config/db.config');
const Pieces = require('../utils/Pieces');

var Config = function (config) {
  this.NumberQuestionLevel1 = config.NumberQuestionLevel1;
  this.NumberQuestionLevel2 = config.NumberQuestionLevel2;
  this.NumberQuestionLevel3 = config.NumberQuestionLevel3;
  this.NumberQuestionLevel4 = config.NumberQuestionLevel4;
  this.NumberQuestionLevel5 = config.NumberQuestionLevel5;
  this.NumberQuestionLevel6 = config.NumberQuestionLevel6;
  this.NumberQuestionLevel7 = config.NumberQuestionLevel7;
  this.NumberQuestionLevel8 = config.NumberQuestionLevel8;
  this.NumberQuestionLevel9 = config.NumberQuestionLevel9;
  this.NumberQuestionLevel10 = config.NumberQuestionLevel10;
  this.TotalQuestion = config.TotalQuestion;
  this.CreatedBy = config.CreatedBy;
  this.UpdatedBy = config.UpdatedBy;
  this.IsDeleted = config.IsDeleted;
};
//Add new config
Config.add = function (accessID, newConfig, result) {
    try {
      let queryObj = {};
      queryObj.NumberQuestionLevel1 = newConfig.NumberQuestionLevel1;
      queryObj.NumberQuestionLevel2 = newConfig.NumberQuestionLevel2;
      queryObj.NumberQuestionLevel3 = newConfig.NumberQuestionLevel3;
      queryObj.NumberQuestionLevel4 = newConfig.NumberQuestionLevel4;
      queryObj.NumberQuestionLevel5 = newConfig.NumberQuestionLevel5;
      queryObj.NumberQuestionLevel6 = newConfig.NumberQuestionLevel6;
      queryObj.NumberQuestionLevel7 = newConfig.NumberQuestionLevel7;
      queryObj.NumberQuestionLevel8 = newConfig.NumberQuestionLevel8;
      queryObj.NumberQuestionLevel9 = newConfig.NumberQuestionLevel9;
      queryObj.NumberQuestionLevel10 = newConfig.NumberQuestionLevel10;
      queryObj.TotalQuestion = newConfig.TotalQuestion;
      queryObj.CreatedBy = accessID;
      dbConn.query("INSERT INTO config set ?", queryObj, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.err);
        }
      });
    } catch (error) {
      result(1, 'create_Config_fail', 400, error, null);
    }
};
//Get Config by ID
Config.getConfigById = function (id, result) {
  try {
      dbConn.query("Select * from config where id = ? and IsDeleted = 0 ", parseInt(id), function (err, res) {
              if (err) {
                  result(err, null);
              } else if(res.length === 0)
                  result (1, 'No config found', 403, err, null);
              else {
                  result(null, res);
              }
          }
      );
  } catch (error) {
      return result(1, 'Get config fail', 400, error, null);
  }
};
//Get active config
Config.getActiveConfig = function (result) {
    try {
        dbConn.query("Select * from config WHERE IsDeleted = 0", function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if (res.length === 0)
                    result(1, 'No config found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'Get config fail', 400, error, null);
    }
};
//get all Config with pagination
Config.getConfig = function (page, perpage, sort, result) {
  if (page === 0 || isNaN(page))
      page = 1;
  if (perpage <= 0 || isNaN(perpage)) {
      perpage = 10;
  }
  if (sort.length === 0) {
      sort = "ASC";
  }
  let offset = perpage * (page - 1);
  try {
      dbConn.query("SELECT COUNT(*) as total from config where IsDeleted = 0  ", function (err, rows) {
          if (err) {
              return result(err);
          } else {
              dbConn.query(`Select * from config ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
                  if (errs) {
                      console.log("error in query db: ", errs);
                      return result(errs);
                  } else {
                      let pages = Math.ceil(rows[0].total / perpage);
                      let output = {
                          data: res,
                          pages: {
                              current: page,
                              prev: page - 1,
                              hasPrev: false,
                              next: (page + 1) > pages ? 0 : (page + 1),
                              hasNext: false,
                              total: rows[0].total

                          },
                          items: {
                              begin: ((page * perpage) - perpage) + 1,
                              end: page * perpage,
                              total: parseInt(res.length)
                          }
                      };
                      output.pages.hasNext = (output.pages.next !== 0);
                      output.pages.hasPrev = (output.pages.prev !== 0);
                      return result(null, output);
                  }
              });
          }
      })
  } catch (error) {
      return result(1, 'get_all_Config_fail', 400, error, null);
  }
};

//Update Config by id
Config.update = function (accessID, id, Config, result) {
  try {
      let queryObj = {};
      queryObj.NumberQuestionLevel1 = Config.NumberQuestionLevel1;
      queryObj.NumberQuestionLevel2 = Config.NumberQuestionLevel2;
      queryObj.NumberQuestionLevel3 = Config.NumberQuestionLevel3;
      queryObj.NumberQuestionLevel4 = Config.NumberQuestionLevel4;
      queryObj.NumberQuestionLevel5 = Config.NumberQuestionLevel5;
      queryObj.NumberQuestionLevel6 = Config.NumberQuestionLevel6;
      queryObj.NumberQuestionLevel7 = Config.NumberQuestionLevel7;
      queryObj.NumberQuestionLevel8 = Config.NumberQuestionLevel8;
      queryObj.NumberQuestionLevel9 = Config.NumberQuestionLevel9;
      queryObj.NumberQuestionLevel10 = Config.NumberQuestionLevel10;
      queryObj.TotalQuestion = Config.TotalQuestion;
      queryObj.IsDeleted = parseInt(Config.IsDeleted);
      queryObj.UpdatedBy = accessID;
      queryObj.Id = id;
      dbConn.query("UPDATE config SET NumberQuestionLevel1=?,NumberQuestionLevel2=?,NumberQuestionLevel3=?,NumberQuestionLevel4=?,NumberQuestionLevel5=?,NumberQuestionLevel6=?,NumberQuestionLevel7=?,NumberQuestionLevel8=?,NumberQuestionLevel9=?,NumberQuestionLevel10=?,TotalQuestion=?, UpdatedBy=?, IsDeleted=? WHERE id = ?", [queryObj.NumberQuestionLevel1,queryObj.NumberQuestionLevel2,queryObj.NumberQuestionLevel3,queryObj.NumberQuestionLevel4,queryObj.NumberQuestionLevel5,queryObj.NumberQuestionLevel6,queryObj.NumberQuestionLevel7,queryObj.NumberQuestionLevel8,queryObj.NumberQuestionLevel9,queryObj.NumberQuestionLevel10,queryObj.TotalQuestion, queryObj.UpdatedBy,queryObj.IsDeleted, queryObj.Id], function (err, res) {
          if (err) {
              result(null, err);
          } else if(res.changedRows === 0)
              result(1, 'Nothing was updated', 403, err, null);
          else {
              result(null, queryObj.Id);
          }
      });
  } catch (error) {
      return result(1, 'update_Config_fail', 400, error, null);
  }
};
//Delete 1 config by id
Config.delete = function (id, result) {
  try {
      dbConn.query("UPDATE config SET IsDeleted = 1 WHERE id = ? ", [id], function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(null, err);
          } else if(res.affectedRows===0)
              result(1, 'Config_not_found', 403, err, null);
          else {
              result(null, id);
          }
      });
  } catch (error) {
      return result(1, 'delete_Config_fail', 400, error, null);
  }
};
module.exports = Config;