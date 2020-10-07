'use strict';
var dbConn = require('../../config/db.config');
const Pieces = require('../utils/Pieces');

var Question = function(question){
  this.Content     = question.Content;
  this.Level     = question.Level;
  this.Type     = question.Type;
  this.CreatedBy   = question.CreatedBy;
  this.UpdatedBy   = question.UpdatedBy;

};
//Add new question
Question.add = function (accessID, newQuestion, result) {
  if (!Pieces.VariableBaseTypeChecking(newQuestion.Content, 'string') || newQuestion.Content === null) {
    return result(1, 'Examination null', 400, null, null);
  }
  else if (!Pieces.VariableBaseTypeChecking(newQuestion.Level, 'string') || newQuestion.Level === null) {
    return result(1, 'Config null', 400, null, null);
  }
  else if (!Pieces.VariableBaseTypeChecking(newQuestion.Type, 'string') || newQuestion.Type === null) {
    return result(1, 'Template null', 400, null, null);
  }
  else {
    try {
      let queryObj = {};
      queryObj.Content = newQuestion.Content;
      queryObj.Level = newQuestion.Level;
      queryObj.Type = newQuestion.Type;
      queryObj.CreatedBy = accessID;
      dbConn.query("INSERT INTO question set ?", queryObj, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.err);
        }
      });
    } catch (error) {
      result(1, 'create_Question_fail', 400, error, null);
    }
  }
};
//Get Question by id
Question.getQuestionById = function (id, result) {
  try {
      dbConn.query("Select * from question where id = ? ", parseInt(id), function (err, res) {
              if (err) {
                  console.log("error: ", err);
                  result(err, null);
              } else if(res.length === 0)
                  result (1, 'No question found', 403, err, null);
              else {
                  result(null, res);
              }
          }
      );
  } catch (error) {
      return result(1, 'Get question fail', 400, error, null);
  }
};
//Get all Question with pagination
Question.getQuestion = function (page, perpage, sort, result) {
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
      dbConn.query("SELECT COUNT(*) as total from question ", function (err, rows) {
          if (err) {
              return result(err);
          } else {
              dbConn.query(`Select * from question ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
                              total: pages
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

//Update Question by id
Question.update = function (id,accessID, Question, result) {
  try {
      let queryObj = {};
      queryObj.Content = Question.Content;
      queryObj.Level = Question.Level;
      queryObj.Type = Question.Type;
      queryObj.UpdatedBy = accessID;
      queryObj.id = id;
      dbConn.query("UPDATE question SET Content=?,Level=?,Type=?,UpdatedBy=? WHERE id = ?", [queryObj.Content, queryObj.Level, queryObj.Type, queryObj.UpdatedBy, queryObj.id], function (err, res) {
          if (err) {
              result(null, err);
          } else if(res.changedRows === 0)
              result(1, 'Nothing was updated', 403, err, null);
          else {
              result(null, queryObj.Id);
          }
      });
  } catch (error) {
      return result(1, 'update_question_fail', 400, error, null);
  }
};
//Delete 1 question by id
Question.delete = function (id, result) {
  try {
      dbConn.query("DELETE FROM question WHERE id = ?", [id], function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(null, err);
          } else if(res.affectedRows===0)
              result(1, 'Question_not_found', 403, err, null);
          else {
              result(null, id);
          }
      });
  } catch (error) {
      return result(1, 'delete_Question_fail', 400, error, null);
  }
};
module.exports= Question;