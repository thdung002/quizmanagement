'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var QuizContent = function (quiz) {
    this.Quiz = quiz.Quiz;
    this.QuestionID = quiz.QuestionID;
    this.CreatedBy = quiz.CreatedBy;
    this.UpdatedBy = quiz.UpdatedBy;
};
//add QuizContent
QuizContent.add = function (accessID, newQuizContent, result) {

        try {
            let queryObj = {};
            queryObj.Quiz = newQuizContent.Quiz;
            queryObj.QuestionID = newQuizContent.QuestionID;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO quizcontent set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            result(1, 'create_Quiz_Content_fail', 400, error, null);
        }

};
//get QuizContent
QuizContent.getQuizContentById = function (id, result) {
    try {
        dbConn.query("Select * from QuizContent where id = ? ", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if(res.length === 0)
                    result (1, 'Quiz_Content_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_Quiz_Content_fail', 400, error, null);
    }
};
//get all QuizContent with pagination
QuizContent.getQuizContent = function (page, perpage, sort, result) {
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
        dbConn.query("SELECT COUNT(*) as total from QuizContent ", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from QuizContent ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
        return result(1, 'get_all_Quiz_Content_fail', 400, error, null);
    }
};

//update QuizContent by id
QuizContent.update = function (id,accessId, QuizContentinfo, result) {
    try {
        let queryObj = {};
        queryObj.Quiz = QuizContentinfo.Quiz;
        queryObj.QuestionID = QuizContentinfo.QuestionID;
        queryObj.UpdatedBy = id;
        queryObj.Id = accessId;
        dbConn.query("UPDATE QuizContent SET Quiz=?,QuestionID=?,UpdatedBy=? WHERE id = ?", [queryObj.Quiz, queryObj.QuestionID, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows === 0)
                result(1, 'Quiz_Content_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_QuizContent_fail', 400, error, null);
    }
};
QuizContent.delete = function (id, result) {
    try {
        dbConn.query("DELETE FROM QuizContent WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.affectedRows===0)
                result(1, 'Quiz_Content_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Quiz_Content_fail', 400, error, null);
    }
};
module.exports = QuizContent;
