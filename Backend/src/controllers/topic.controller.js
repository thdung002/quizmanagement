'use strict';
const Topic = require('../models/topic.model');

module.exports = {
    //get all toppic
    getTopic: function (req, res) {
        Topic.getTopic(function (err, topic) {
            if (err)
                res.send(err);
            console.log('res', topic);
            res.send(topic);
        })
    },


    //create a new topic
    addTopic: function (req, res) {
        const new_topic = new Topic(req.body);
    //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Topic.addTopic(new_topic, function (err, topic) {
                if (err)
                    res.send(err);
                res.json({ message: "Topic added successfully!", data: topic});
            });
        }
    },
    //get topic by id
    getTopicById: function (req, res) {
        Topic.getTopicById(req.params.id, function (err, topic) {
            if (err)
                res.send(err);
            res.json(topic);
        })
    },

    //upadte topic
    updateTopicById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Topic.update(req.params.id, new Topic(req.body), function (err, topic) {
                if (err)
                    res.send(err);
                res.json({ message: 'Topic successfully updated'});
            });
        }
    },
    //delete topic
    deleteTopicById: function (req, res) {
        Topic.deleteTopicById(req.params.id, function (err, topic) {
            if (err)
                res.send(err);
            res.json({ message: 'Topic successfully deleted'});
        })
    }
};