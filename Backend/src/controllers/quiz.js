'use strict';
const Quiz = require('../models/quiz');
module.exports = {
    //get all toppic
    getQuiz: function (req, res) {
        Quiz.getQuiz(function (err, quiz) {
            if (err)
                res.send(err);
            console.log('res', quiz);
            res.send(quiz);
        })
    },
    //create a new quiz
    addQuiz: function (req, res) {
        const new_quiz = new Quiz(req.body);
    //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Quiz.add(new_quiz, function (err, quiz) {
                if (err)
                    res.send(err);
                res.json({error: false, message: "Quiz added successfully!", data: quiz});
            });
        }
    },
    //get quiz by id
    getQuizById: function (req, res) {
        Quiz.getQuizById(req.params.id, function (err, quiz) {
            if (err)
                res.send(err);
            res.json(quiz);
        })
    },

    //upadte quiz
    updateQuizById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Quiz.update(req.params.id, new Quiz(req.body), function (err, quiz) {
                if (err)
                    res.send(err);
                res.json({error: false, message: 'Quiz successfully updated'});
            });
        }
    },
    //delete quiz
    deleteQuizById: function (req, res) {
        Quiz.deleteQuizById(req.params.id, function (err, quiz) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'Quiz successfully deleted'});
        })
    }
};