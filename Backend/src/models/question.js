'use strict';
var dbConn = require('../../config/db.config');
const Pieces = require('../utils/Pieces');

var Question = function (question) {
    this.Content = question.Content;
    this.Level = question.Level;
    this.Type = question.Type;
    this.CreatedBy = question.CreatedBy;
    this.UpdatedBy = question.UpdatedBy;
    this.IsDeleted = question.IsDeleted;
};
//Add new question
Question.add = function (accessID, newQuestion, result) {
    if (!Pieces.VariableBaseTypeChecking(newQuestion.Content, 'string') || newQuestion.Content === null) {
        return result(1, 'Content null', 400, null, null);
    } else if (!Pieces.VariableBaseTypeChecking(newQuestion.Level, 'string') || newQuestion.Level === null) {
        return result(1, 'Level null', 400, null, null);
    } else if (!Pieces.VariableBaseTypeChecking(newQuestion.Type, 'string') || newQuestion.Type === null) {
        return result(1, 'Type null', 400, null, null);
    } else {
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
        dbConn.query("Select * from question where id = ? and IsDeleted = 0", parseInt(id), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else if (res.length === 0)
                result(1, 'No question found', 403, err, null);
            else {
                result(null, res);
            }
        }
        );
    } catch (error) {
        return result(1, 'Get question fail', 400, error, null);
    }
};

//Get active question
Question.getActive = function (result) {
    try {
        dbConn.query("Select * from question WHERE IsDeleted = 0", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else if (res.length === 0)
                result(1, 'No question found', 403, err, null);
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
Question.getQuestion = function (page, perpage, sort, content, type, level, result) {
    if (page === 0 || isNaN(page))
        page = 1;
    if (perpage <= 0 || isNaN(perpage)) {
        perpage = 10;
    }
    if (sort.length === 0) {
        sort = "ASC";
    }
    let offset = perpage * (page - 1);
    if (content.length !== 0 && type.length !== 0 && !isNaN(level)) {
        try {
            dbConn.query("SELECT COUNT(*) as total from question where MATCH(Content) AGAINST('${content}') and type = '${type}' and level = '${level}'", function (err, rows) {
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
    else if (content.length !== 0 && type.length !== 0) {
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
    else if (content.length !== 0 && !isNaN(level)) {
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
    else if (type.length !== 0 && !isNaN(level)) {
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
    else if (content.length !== 0) {
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
    else if (type.length !== 0) {
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

//Update Question by id
Question.update = function (accessID, id, Question, result) {
    try {
        let queryObj = {};
        queryObj.Content = Question.Content;
        queryObj.Level = Question.Level;
        queryObj.Type = Question.Type;
        queryObj.UpdatedBy = accessID;
        queryObj.id = id;
        queryObj.IsDeleted = Question.IsDeleted;
        dbConn.query("UPDATE question SET Content=?,Level=?,Type=?,UpdatedBy=?,IsDeleted=? WHERE id = ?", [queryObj.Content, queryObj.Level, queryObj.Type, queryObj.UpdatedBy, queryObj.IsDeleted, queryObj.id], function (err, res) {
            if (err) {
                result(null, err);
            } else if (res.changedRows === 0)
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
        dbConn.query("UPDATE question SET IsDeleted = 1 WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if (res.affectedRows === 0)
                result(1, 'Question_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Question_fail', 400, error, null);
    }
};

//get random question
Question.random = function (quantity, type, result) {
    try {
        dbConn.query(`SELECT ID FROM question where type =${type} and IsDeleted = 0 ORDER BY RAND() LIMIT ${quantity}`, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else if (res.length === 0)
                result(1, 'No question found', 403, err, null);
            else {
                result(null, res);
            }
        })
    }
    catch (error) {
        return result(1, 'get_random_fail', 400, error, null);
    }
};
module.exports = Question;