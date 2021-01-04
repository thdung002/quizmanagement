'use strict';
var MySql = require('sync-mysql');

var connection = new MySql({
    host     : 'quizmanagement.ccd3ylv1pufy.ap-northeast-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'dung',
    password : 'dung1234',
    database : 'quiz_management',
    timeout: 15000
});
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');
const { response } = require('express');

var Quiz = function (quiz) {
    this.Examination = quiz.Examination;
    this.Config = quiz.Config;
    this.Template = quiz.Template;
    this.Code = quiz.Code;
    this.CreatedBy = quiz.CreatedBy;
    this.UpdatedBy = quiz.UpdatedBy;
    this.IsDeleted = quiz.IsDeleted;
};

var quizID;

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
            let checkQuizCode = connection.query(`SELECT COUNT(*) as total from quiz where Examination = '${newQuiz.Examination}' and Config = '${newQuiz.Config}' and Template = '${newQuiz.Template}' `);
            let queryObj = {};
            queryObj.Examination = newQuiz.Examination;
            queryObj.Config = newQuiz.Config;
            queryObj.Template = newQuiz.Template;
            queryObj.Code = checkQuizCode[0].total;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO quiz set ?", queryObj, function (err, res) {
                quizID = res.insertId;
                res.quizcode = checkQuizCode[0].total + 1;
                console.log(res)
                if (err) {
                    result(err, null);
                } else {
                    dbConn.query("SELECT * FROM config where ID = ?", parseInt(queryObj.Config), function (err, res) {
                        var nq1 = res[0].NumberQuestionLevel1;
                        dbConn.query(`SELECT * FROM question where level = ${1} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq1}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq2 = res[0].NumberQuestionLevel2;
                        dbConn.query(`SELECT * FROM question where level = ${2} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq2}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq3 = res[0].NumberQuestionLevel3;
                        dbConn.query(`SELECT * FROM question where level = ${3} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq3}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq4 = res[0].NumberQuestionLevel4;
                        dbConn.query(`SELECT * FROM question where level = ${4} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq4}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq5 = res[0].NumberQuestionLevel5;
                        dbConn.query(`SELECT * FROM question where level = ${5} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq5}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq6 = res[0].NumberQuestionLevel6;
                        dbConn.query(`SELECT * FROM question where level = ${6} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq6}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq7 = res[0].NumberQuestionLevel7;
                        dbConn.query(`SELECT * FROM question where level = ${7} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq7}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq8 = res[0].NumberQuestionLevel8;
                        dbConn.query(`SELECT * FROM question where level = ${8} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq8}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq9 = res[0].NumberQuestionLevel9;
                        dbConn.query(`SELECT * FROM question where level = ${9} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq9}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                        var nq10 = res[0].NumberQuestionLevel10;
                        dbConn.query(`SELECT * FROM question where level = ${10} and IsDeleted = 0 ORDER BY RAND() LIMIT ${nq10}`,function (err, res) {
                            let questionObject = {};
                                questionObject.Quiz = quizID;
                                questionObject.CreatedBy = accessID;
                                questionObject.QuestionID = 0;
                            for (var j = 0; j < res.length; j++) {
                                questionObject.QuestionID = res[j].ID;
                                dbConn.query("INSERT INTO quizcontent set ?", questionObject);
                            }
                        });
                    });
                    result(null, res);
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
            } else if (res.length === 0)
                result(1, 'No quiz found', 403, err, null);
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
Quiz.getQuiz = function (page, perpage, sort, Examination, Config, Template, result) {
    if (page === 0 || isNaN(page))
        page = 1;
    if (perpage <= 0 || isNaN(perpage)) {
        perpage = 10;
    }
    if (sort.length === 0) {
        sort = "ASC";
    }
    let offset = perpage * (page - 1);
    if (!isNaN(Examination) && !isNaN(Config) && !isNaN(Template)) {
        try {
            dbConn.query("SELECT COUNT(*) as total from quiz where Examination = '${Examination}' and Config = '${Config}' and Template = '${Template}'", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Examination = '${Examination}' and Config = '${Config}' and Template = '${Template}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Examination) && !isNaN(Config)) {
        try {
            dbConn.query("SELECT COUNT(*) as total from quiz where Examination = '${Examination}' and Config = '${Config}'", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Examination = '${Examination}' and Config = '${Config}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Config) && !isNaN(Template)) {
        try {
            dbConn.query("SELECT COUNT(*) as total from quiz where Config = '${Config}' and Template = '${Template}'", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Config = '${Config}' and Template = '${Template}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Examination) && !isNaN(Template)) {
        try {
            dbConn.query("SELECT COUNT(*) as total from quiz where Examination = '${Examination}' and Template = '${Template}'", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Examination = '${Examination}' and Template = '${Template}' ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Examination)) {
        try {
            dbConn.query(`SELECT COUNT(*) as total from quiz where Examination = '${Examination}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Examination = '${Examination}'  ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Config)) {
        try {
            dbConn.query(`SELECT COUNT(*) as total from quiz where Config = '${Config}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Config = '${Config}'  ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else if (!isNaN(Template)) {
        try {
            dbConn.query(`SELECT COUNT(*) as total from quiz where Template = '${Template}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz where Template = '${Template}'  ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_Quiz_fail', 400, error, null);
        }
    }
    else {
        try {
            dbConn.query("SELECT COUNT(*) as total from quiz", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from quiz ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
            return result(1, 'get_all_quiz', 400, error, null);
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
        dbConn.query("UPDATE quiz SET Examination=?,Config=?,Template=?,Code=?, UpdatedBy=?, isDeleted=? WHERE id = ?", [queryObj.Examination, queryObj.Config, queryObj.Template, queryObj.Code, queryObj.UpdatedBy, queryObj.Id, queryObj.IsDeleted], function (err, res) {
            if (err) {
                result(null, err);
            } else if (res.changedRows === 0)
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
            } else if (res.affectedRows === 0)
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