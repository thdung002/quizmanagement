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
                else res.json({ result: "ok", message: "Topic added successfully!", id: result });
            });
        }
    },
    //Get all
    getTopic: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Topic.getTopic(parseInt(page), parseInt(perpage), sort, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic get successfully!", data: result });
        })
    },
    //get Topic by id
    getTopicById: function (req, res) {
        Topic.getTopicById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic get successfully!", data: result });
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
                else return res.json({ result: "ok", message: "Topic update successfully!", id: result });
            });
        }
    },
    //delete Topic
    deleteTopicById: function (req, res) {
        Topic.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Topic delete successfully!", id: result });
        })
    }
};