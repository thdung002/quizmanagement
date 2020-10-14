'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var Topic = function (topic) {
    this.Content = topic.Content;
    this.CreatedBy = topic.CreatedBy;
    this.UpdatedBy = topic.UpdatedBy;

};
//Add new topic
Topic.add = function (accessID, newTopic, result) {
    if (!Pieces.VariableBaseTypeChecking(newTopic.Content, 'string')
        || newTopic.Content === null) {
        return result(1, 'Content null', 400, null, null);
    }
    else {
        try {
            let queryObj = {};
            queryObj.Content = newTopic.Content;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO topic set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, res.err);
                }
            });
        } catch (error) {
            result(1, 'create_Topic_fail', 400, error, null);
        }
    }
};
//Get 1 topic by ID
Topic.getTopicById = function (id, result) {
    try {
        dbConn.query("Select * from topic where id = ? and isDeleted = 0 ", parseInt(id), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else if (res.length === 0)
                result(1, 'No topic found', 403, err, null);
            else {
                result(null, res);
            }
        }
        );
    } catch (error) {
        return result(1, 'Get topic fail', 400, error, null);
    }
};
//Get all topic
Topic.getTopic = function (page, perpage, sort, result) {
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
        dbConn.query("SELECT COUNT(*) as total from topic where isDeleted = 0", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from topic ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
//Update Topic by id
Topic.update = function (accessID, id, Topic, result) {
    try {
        let queryObj = {};
        queryObj.Content = Topic.Content;
        queryObj.UpdatedBy = accessID;
        queryObj.Id = id;
        dbConn.query("UPDATE topic SET Content=?,UpdatedBy=? WHERE id = ?", [queryObj.Content, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                result(null, err);
            } else if (res.changedRows === 0)
                result(1, 'Nothing was updated', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_Topic_fail', 400, error, null);
    }
};
//Delete 1 topic by id
Topic.delete = function (id, result) {
    try {
        dbConn.query("UPDATE topic SET IsDeleted = 1 WHERE id = ? ", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if (res.affectedRows === 0)
                result(1, 'Topic_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Topic_fail', 400, error, null);
    }
};
module.exports = Topic;