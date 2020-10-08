'use strict';
const Question = require('../models/question');
module.exports = {
    //Add new Question
    addQuestion: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Question = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Question.add(id, new_Question, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Question added successfully!", id: result });
            });
        }
    },
    //get all Question
    getQuestion: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Question.getQuestion(parseInt(page), parseInt(perpage), sort, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Question get successfully!", data: result });
        })
    },
    //get 1 Question by id
    getQuestionById: function (req, res) {
        Question.getQuestionById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Question get successfully!", data: result });
        })
    },
    //update Question
    updateQuestionById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Question.update(id, req.params.id, new Question(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Question update successfully!", id: result });
            });
        }
    },
    //delete Question
    deleteQuestionById: function (req, res) {
        Question.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Question delete successfully!", id: result });
        })
    }
};