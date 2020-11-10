'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var Quiz = function (quiz) {
  this.Examination = quiz.Examination;
  this.Config = quiz.Config;
  this.Template = quiz.Template;
  this.Code = quiz.Code;
  this.CreatedBy = quiz.CreatedBy;
  this.UpdatedBy = quiz.UpdatedBy;
  this.IsDeleted = question.IsDeleted;
};

//Add new quiz
Quiz.add = function (accessID, newQuiz, result) {
  if (!Pieces.VariableBaseTypeChecking(newQuiz.Examination, 'string')
    || newQuiz.Examination === null) {
    return result(1, 'Examination null', 400, null, null);
  }
  else if (!Pieces.VariableBaseTypeChecking(newQuiz.Config, 'string') || newQuiz.Config === null) {
    return result(1, 'Config null', 400, null, null);
  }
  else if (!Pieces.VariableBaseTypeChecking(newQuiz.Template, 'string') || newQuiz.Template === null) {
    return result(1, 'Template null', 400, null, null);
  }
  else {
    try {
      let queryObj = {};
      queryObj.Examination = newQuiz.Examination;
      queryObj.Config = newQuiz.Config;
      queryObj.Template = newQuiz.Template;
      queryObj.Code = newQuiz.Code;
      queryObj.CreatedBy = accessID;
      dbConn.query("INSERT INTO quiz set ?", queryObj, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.err);
        }
      });
    } catch (error) {
      result(1, 'create_Quiz_fail', 400, error, null);
    }
  }
};
//Get Quiz by id
Quiz.getQuizById = function (id, result) {
  try {
      dbConn.query("Select * from quiz where ID = ? and isDeleted = 0", parseInt(id), function (err, res) {
              if (err) {
                  console.log("error: ", err);
                  result(err, null);
              } else if(res.length === 0)
                  result (1, 'No quiz found', 403, err, null);
              else {
                  result(null, res);
              }
          }
      );
  } catch (error) {
      return result(1, 'Get quiz fail', 400, error, null);
  }
};
//get all Quiz with pagination
Quiz.getQuiz = function (page, perpage, sort, result) {
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
  if (!isNaN(Examination) !==0 && !isNaN(Config) !==0 && !isNaN(Template)) {
    try {
        dbConn.query("SELECT COUNT(*) as total from question where Examination = '${Examination}' and Config = '${Config}' and Template = '${Template}'", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select *,Content from question where MATCH(Content) AGAINST('${content}') and type = '${type}' and level = '${level}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (content.length !==0 && type.length !==0) {
    try {
        dbConn.query("SELECT COUNT(*) as total from question where MATCH(Content) AGAINST('${content}') and type = '${type}'", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select *,Content from question where MATCH(Content) AGAINST('${content}') and type = '${type}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (content.length !==0 && !isNaN(level)) {
    try {
        dbConn.query("SELECT COUNT(*) as total from question where MATCH(Content) AGAINST('${content}') and level = '${level}'", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select *. Content from question where MATCH(Content) AGAINST('${content}') and level = '${level}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (type.length !==0 && !isNaN(level)) {
    try {
        dbConn.query("SELECT COUNT(*) as total from question where type = '${type}' and level = '${level}'", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from question where type = '${type}' and level = '${level}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (content.length !==0) {
    try {
        dbConn.query(`SELECT COUNT(*) as total from question where MATCH(Content) AGAINST('${content}')`, function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select *,Content from question where MATCH(Content) AGAINST('${content}')  ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (type.length !==0) {
    try {
        dbConn.query(`SELECT COUNT(*) as total from question`, function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from question where type = '${type}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else if (!isNaN(level)) {
    try {
        dbConn.query("SELECT COUNT(*) as total from question", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from question where level = '${level}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
}
else {
    try {
        dbConn.query("SELECT COUNT(*) as total from question", function (err, rows) {
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
}
};

//Update Quiz by id
Quiz.update = function (accessId, id, Quiz, result) {
  try {
      let queryObj = {};
      queryObj.Examination = Quiz.Examination;
      queryObj.Config = Quiz.Config;
      queryObj.Template = Quiz.Template;
      queryObj.Code = Quiz.Code;
      queryObj.UpdatedBy = accessId;
      queryObj.Id = id;
      queryObj.IsDeleted = Quiz.IsDeleted;
      dbConn.query("UPDATE quiz SET Examination=?,Config=?,Template=?,Code=?, UpdatedBy=?, isDeleted=? WHERE id = ?", [queryObj.Examination, queryObj.Config, queryObj.Template,queryObj.Code, queryObj.UpdatedBy, queryObj.Id,queryObj.IsDeleted], function (err, res) {
          if (err) {
              result(null, err);
          } else if(res.changedRows === 0)
              result(1, 'Nothing was updated', 403, err, null);
          else {
              result(null, queryObj.Id);
          }
      });
  } catch (error) {
      return result(1, 'update_Quiz_fail', 400, error, null);
  }
};
//Delete 1 quiz by id
Quiz.delete = function (id, result) {
  try {
      dbConn.query("UPDATE quiz SET IsDeleted = 1 WHERE id = ? ", [id], function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(null, err);
          } else if(res.affectedRows===0)
              result(1, 'Quiz_not_found', 403, err, null);
          else {
              result(null, id);
          }
      });
  } catch (error) {
      return result(1, 'delete_Quiz_fail', 400, error, null);
  }
};



module.exports = Quiz;