'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var Topic = function (topic) {
    this.Content = topic.Content;
    this.CreatedBy = topic.CreatedBy;
    this.UpdatedBy = topic.UpdatedBy;

};

//Add new Topic
Topic.add = function (accessID,newTop, result) {
    if (!Pieces.VariableBaseTypeChecking(newTopic.Content, 'string')
        || newAnswer.Content===null) {
        return result(1, 'invalid_Answer', 400, null, null);
    }else {
        try {
            let queryObj = {};
            queryObj.Content = newTopic.Content;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO Topic set ?", queryObj, function (err, res) {
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
//Get 1 answer by ID
Topic.getTopicById = function (id, result) {
    try {
        dbConn.query("Select * from Answer where question = ? ", parseInt(id), function (err, res) {
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
//Get all answer
Topic.getTopic = function (result) {
    if (page === 0)
        page = 1;
    if (perpage <= 0) {
        perpage = 5;
    }
    if (sort.length === 0) {
        sort = "ASC";
    }
    let type = typeof (sort);
    let offset = perpage * (page - 1);
    try {
        dbConn.query("SELECT COUNT(*) as total from Topic ", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from Topic ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
        return result(1, 'get_all_Topic_fail', 400, error, null);
    }
};
Topic.updateTopicById = function (id, topic, result) {
    dbConn.query("UPDATE topic SET Content=?,CreatedBy=?,UpdatedBy=? WHERE id = ?", [topic.Content, topic.CreatedBy, topic.UpdatedBy, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Topic.deleteTopicById = function (id, result) {
    dbConn.query("DELETE FROM topic WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Topic;