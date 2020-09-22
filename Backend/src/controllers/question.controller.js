'use strict';
const Questiontopic = require('../models/questiontopic.model');
module.exports = {
    //get all questiontopic
    getQuestiontopic: function (req, res) {
        Questiontopic.getQuestiontopic(function (err, questiontopic) {
            if (err)
                res.send(err);
            console.log('res', questiontopic);
            res.send(questiontopic);
        })
    },


    //create a new questiontopic
    addQuestiontopic: function (req, res) {
        const new_questiontopic = new Questiontopic(req.body);
    //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Questiontopic.add(new_questiontopic, function (err, questiontopic) {
                if (err)
                    res.send(err);
                res.json({error: false, message: "Questiontopic added successfully!", data: questiontopic});
            });
        }
    },
    //get questiontopic by id
    getQuestiontopicById: function (req, res) {
        Questiontopic.getQuestiontopicById(req.params.id, function (err, questiontopic) {
            if (err)
                res.send(err);
            res.json(questiontopic);
        })
    },

    //upadte questiontopic
    updateQuestiontopicById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Questiontopic.update(req.params.id, new Questiontopic(req.body), function (err, questiontopic) {
                if (err)
                    res.send(err);
                res.json({error: false, message: 'Questiontopic successfully updated'});
            });
        }
    },
    //delete questiontopic
    deleteQuestiontopicById: function (req, res) {
        Questiontopic.deleteQuestiontopicById(req.params.id, function (err, questiontopic) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'Questiontopic successfully deleted'});
        })
    }
};