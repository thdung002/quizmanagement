'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var Answer = function (answer) {
    this.Question = answer.Question;
    this.Content = answer.Content;
    this.IsCorrect = answer.IsCorrect;
    this.CorrectAnswer = answer.CorrectAnswer;
    this.CreatedBy = answer.CreatedBy;
    this.UpdatedBy = answer.UpdatedBy;
};
//add Answer
Answer.add = function (accessID, newAnswer, result) {
     if (!Pieces.VariableBaseTypeChecking(newAnswer.Content, 'string')
        || newAnswer.Content===null) {
        return result(1, 'invalid_Answer', 400, null, null);
    }else {
        try {
            let queryObj = {};
            queryObj.Question = newAnswer.Question;
            queryObj.Content = newAnswer.Content;
            queryObj.IsCorrect = newAnswer.Content;
            queryObj.CorrectAnswer = newAnswer.CorrectAnswer;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO answer set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            result(1, 'create_Answer_fail', 400, error, null);
        }
    }
};
//get Answer
Answer.getAnswerById = function (id, result) {
    try {
        dbConn.query("Select * from answer where question = ? ", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if(res.length === 0)
                    result (1, 'Answer_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_Answer_fail', 400, error, null);
    }
};
//get all Answer with pagination
Answer.getAnswer = function (page, perpage, sort, result) {
    if (page === 0|| isNaN(page))
        page = 1;
    if (perpage <= 0 || isNaN(perpage)) {
        perpage = 5;
    }
    if (sort.length === 0|| sort!=="DESC") {
        sort = "ASC";
    }
    let type = typeof (sort);
    let offset = perpage * (page - 1);
    try {
        dbConn.query("SELECT COUNT(*) as total from answer ", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from answer ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
                    if (errs) {
                        console.log("error in query db: ", errs);
                        return result(errs);
                    } else {
                        // console.log('topic : ', res);
                        // result(null, res);
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
        return result(1, 'get_all_Answer_fail', 400, error, null);
    }
};

//update Answer by id
Answer.update = function (accessId,id, Answerinfo, result) {
    try {
        let queryObj = {};
        queryObj.Content = Answerinfo.Content;
        queryObj.IsCorrect = Answerinfo.IsCorrect;
        queryObj.CorrectAnswer = Answerinfo.CorrectAnswer;
        queryObj.UpdatedBy = accessId;
        queryObj.Id = id;
        dbConn.query("UPDATE answer SET Content=?,IsCorrect=?,CorrectAnswer=?,UpdatedBy=? WHERE id = ?", [queryObj.Content, queryObj.IsCorrect, queryObj.CorrectAnswer, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows === 0)
                result(1, 'Answer_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_Answer_fail', 400, error, null);
    }
};
Answer.delete = function (id, result) {
    try {
        dbConn.query("DELETE FROM answer WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.affectedRows===0)
                result(1, 'Answer_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Answer_fail', 400, error, null);
    }
};
module.exports = Answer;
