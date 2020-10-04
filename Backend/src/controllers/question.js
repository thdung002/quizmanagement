'use strict';
const Question = require('../models/question');
module.exports = {
    //get all question
    getQuestion: function (req, res) {
        Question.getQuestion(function (err, question) {
            if (err)
                res.send(err);
            console.log('res', question);
            res.send(question);
        })
    },


    //create a new question
    addQuestion: function (req, res) {
        const new_question = new Question(req.body);
    //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Question.add(new_question, function (err, question) {
                if (err)
                    res.send(err);
                res.json({error: false, message: "Question added successfully!", data: question});
            });
        }
    },
    //get question by id
    getQuestionById: function (req, res) {
        Question.getQuestionById(req.params.id, function (err, question) {
            if (err)
                res.send(err);
            res.json(question);
        })
    },

    //upadte question
    updateQuestionById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Question.update(req.params.id, new Question(req.body), function (err, question) {
                if (err)
                    res.send(err);
                res.json({error: false, message: 'Question successfully updated'});
            });
        }
    },
    //delete question
    deleteQuestionById: function (req, res) {
        Question.deleteQuestionById(req.params.id, function (err, question) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'Question successfully deleted'});
        })
    }
};