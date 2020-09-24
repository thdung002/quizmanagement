'use strict';
var dbConn = require('./../../config/db.config');

var Answer = function (answer) {
    this.Question = answer.Question;
    this.Content = answer.Content;
    this.IsCorrect = answer.IsCorrect;
    this.CorrectAnswer = answer.CorrectAnswer;
    this.CreatedBy = answer.CreatedBy;
    this.UpdatedBy = answer.UpdatedBy;
};
//add answer
Answer.addAnswer = function (accessID, newAnswer, result) {
        try {
            let queryObj = {};
            queryObj.Question = newAnswer.Question;
            queryObj.Content = newAnswer.Content;
            queryObj.IsCorrect = newAnswer.IsCorrect;
            queryObj.CorrectAnswer = newAnswer.CorrectAnswer;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO answer set ?", queryObj, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            return result(1, 'add_answer_fail', 400, error, null);
        }
};
//get answer
Answer.getAnswerById = function (id, result) {
    try {
        dbConn.query("Select * from answer where id = ? ", id, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_answer_fail', 400, error, null);
    }
};

//get all Answer with pagination
Answer.getAnswer = function (page,result) {
    let perPage = 2;
    let sort = [];
    if (page ===0)
        page=1;
    if(perPage<=0)
    {
        perPage=2;
    }
    let offset = perPage * (page - 1);

    try {
        dbConn.query("SELECT COUNT(*) as total from ANSWER ", function(err, rows, feilds){
            if(err)
            {
                console.log("error: ", err);
                return result(err, null);
            }
            else{
                dbConn.query("Select * from ANSWER ORDER BY ID ASC limit ? offset ? ",[perPage,offset], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        // console.log('topic : ', res);
                        // result(null, res);
                        let pages = rows;
                        let output={
                            data: res,
                            pages:{
                                current: page,
                                prev: page - 1,
                                hasPrev: false,
                                next: (page + 1) > pages ? 0 : (page + 1),
                                hasNext: false,
                                total: pages
                            },
                            items:{
                                begin: ((page * perPage) - perPage) + 1,
                                end: page * perPage,
                                total: res.length
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
        return result(1, 'get_all_answer_fail', 400, error, null);
    }
};
//update answer by id
Answer.updateAnswerById = function (accessId, answerinfo, result) {
    try {
        let queryObj = {};
        queryObj.Content = answerinfo.Content;
        queryObj.IsCorrect = answerinfo.IsCorrect;
        queryObj.CorrectAnswer = answerinfo.CorrectAnswer;
        queryObj.UpdatedBy = accessId;
        queryObj.Id = accessId;
        dbConn.query("UPDATE answer SET Content=?,IsCorrect=?,CorrectAnswer=?,UpdatedBy=? WHERE id = ?", [queryObj.Content, queryObj.IsCorrect, queryObj.CorrectAnswer, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                 result(null, err);
            } else {
                 result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'update_answer_fail', 400, error, null);
    }
};
Answer.deleteAnswerById = function (id, result) {
    try {
        dbConn.query("DELETE FROM ANSWER WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'delete_answer_fail', 400, error, null);
    }
};
module.exports = Answer;
