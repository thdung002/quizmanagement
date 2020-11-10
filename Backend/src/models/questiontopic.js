'use strict';
var dbConn = require('../../config/db.config');
const Pieces = require('../utils/Pieces');

var Questiontopic = function(questiontopic){
  this.Question     = questiontopic.Question;
  this.Topic     = questiontopic.Topic;
  this.CreatedBy   = questiontopic.CreatedBy;
  this.UpdatedBy   = questiontopic.UpdatedBy;

};
//Add new questiontopic
Questiontopic.add = function (accessID, newQuestiontopic, result) {
  if (!Pieces.VariableBaseTypeChecking(newQuestiontopic.Question, 'string') || newQuestiontopic.Question === null) {
    return result(1, 'Question null', 400, null, null);
  }
  else if (!Pieces.VariableBaseTypeChecking(newQuestiontopic.Topic, 'string') || newQuestiontopic.Topic === null) {
    return result(1, 'Topic null', 400, null, null);
  }
  else {
    try {
      let queryObj = {};
      queryObj.Question = newQuestiontopic.Question;
      queryObj.Topic = newQuestiontopic.Topic;
      queryObj.CreatedBy = accessID;
      dbConn.query("INSERT INTO questiontopic set ?", queryObj, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.err);
        }
      });
    } catch (error) {
      result(1, 'create_Questiontopic_fail', 400, error, null);
    }
  }
};
//Get Question by id
Questiontopic.getQuestiontopicById = function (id, result) {
  try {
      dbConn.query("Select * from questiontopic where id = ? and  isDeleted = 0", parseInt(id), function (err, res) {
              if (err) {
                  console.log("error: ", err);
                  result(err, null);
              } else if(res.length === 0)
                  result (1, 'No question topic found', 403, err, null);
              else {
                  result(null, res);
              }
          }
      );
  } catch (error) {
      return result(1, 'Get question topic fail', 400, error, null);
  }
};
//Get all Questiontopic with pagination
Questiontopic.getQuestiontopic = function (page, perpage, sort, result) {
  if (page === 0 || isNaN(page))
      page = 1;
  if (perpage <= 0 || isNaN(perpage)) {
      perpage = 5;
  }
  if (sort.length === 0) {
      sort = "ASC";
  }
  let type = typeof (sort);
  let offset = perpage * (page - 1);
  try {
      dbConn.query("SELECT COUNT(*) as total from questiontopic where isDeleted = 0", function (err, rows) {
          if (err) {
              return result(err);
          } else {
              dbConn.query(`Select * from questiontopic ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
      return result(1, 'get_all_Question_fail', 400, error, null);
  }
};
//Update Questiontopic by id
Questiontopic.update = function (accessID, id, Questiontopic, result) {
  try {
      let queryObj = {};
      queryObj.Question = Questiontopic.Question;
      queryObj.Topic = Questiontopic.Topic;
      queryObj.UpdatedBy = accessID;
      queryObj.id = id;
      dbConn.query("UPDATE questiontopic SET Question=?,Topic=?,UpdatedBy=? WHERE id = ?", [queryObj.Question, queryObj.Topic,queryObj.UpdatedBy, queryObj.id], function (err, res) {
          if (err) {
              result(null, err);
          } else if(res.changedRows === 0)
              result(1, 'Nothing was updated', 403, err, null);
          else {
              result(null, queryObj.Id);
          }
      });
  } catch (error) {
      return result(1, 'update_questiontopic_fail', 400, error, null);
  }
};
//Delete 1 questiontopic by id
Questiontopic.delete = function (id, result) {
  try {
      dbConn.query("UPDATE answer SET IsDeleted = 1 WHERE id = ?", [id], function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(null, err);
          } else if(res.affectedRows===0)
              result(1, 'Questiontopic_not_found', 403, err, null);
          else {
              result(null, id);
          }
      });
  } catch (error) {
      return result(1, 'delete_Questiontopic_fail', 400, error, null);
  }
};
module.exports= Questiontopic;