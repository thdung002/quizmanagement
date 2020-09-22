'use strict';
var dbConn = require('./../../config/db.config');
var Topic = function (topic) {
    this.Content = topic.Content;
    this.CreatedBy = topic.CreatedBy;
    this.UpdatedBy = topic.UpdatedBy;

};

Topic.addTopic = function (newTop, result) {
    try {
        dbConn.query("INSERT INTO topic set ?", newTop, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    } catch (error) {
        return result(1, 'add_topic_fail', 400, error, null);
    }
};
Topic.getTopicById = function (id, result) {
    try {
        dbConn.query("Select * from topic where id = ? ", id, function (err, res) {
            try {

            } catch (error) {
                return error;
            }
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'get_one_topic_fail', 400, error, null);
    }
};
Topic.getTopic = function (result) {
    try {
        dbConn.query("Select * from topic", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log('topic : ', res);
                result(null, res);
            }
        });

    } catch (error) {
        return result(1, 'get_all_topic_fail', 400, error, null);
    }
};
Topic.updateTopicById = function (id, topic, result) {
    try {
        dbConn.query("UPDATE topic SET Content=?,UpdatedBy=? WHERE id = ?", [topic.Content, topic.UpdatedBy, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });

    } catch (error) {
        return result(1, 'update_topic_fail', 400, error, null);
    }
};
Topic.deleteTopicById = function (id, result) {
    try {
        dbConn.query("DELETE FROM topic WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'delete_topic_fail', 400, error, null);
    }
};
module.exports = Topic;