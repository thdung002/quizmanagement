'use strict';
const Topic = require('../models/topic');

module.exports = {
    //Add new Topic
    addTopic: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Topic = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Topic.add(id, new_Topic, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Topic added successfully!", id: result,code: 20000 });
            });
        }
    },
    //Get all
    getTopic: function (req, res) {
        let page = req.query.page || '';
        let sort = req.query.sort || '';
        let perpage = req.query.perpage || '';
        let content = req.query.content || '';
        Topic.getTopic(parseInt(page), parseInt(perpage), sort, content, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic get successfully!", data: result,code: 20000 });
        })
    },
     //get active topic
     getActiveTopic: function (req, res) {
        Answer.getActiveTopic(function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Topic get successfully!", data: result,code: 20000});
        })
    },
    //get Topic by id
    getTopicById: function (req, res) {
        Topic.getTopicById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic get successfully!", data: result,code: 20000 });
        })
    },
    //update Topic
    updateTopicById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Topic.update(id, req.params.id, new Topic(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Topic update successfully!", id: result ,code: 20000});
            });
        }
    },
    //delete Topic
    deleteTopicById: function (req, res) {
        Topic.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic delete successfully!", id: result ,code: 20000});
        })
    }
};