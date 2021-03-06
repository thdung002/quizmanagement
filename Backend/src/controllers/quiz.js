'use strict';
const Quiz = require('../models/quiz');

module.exports = {
    //Add new Quiz
    addQuiz: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Quiz = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Quiz.add(id, new_Quiz, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Quiz added successfully!", id: result,code: 20000 });
            });
        }
    },
    //get all Quiz
    getQuiz: function (req, res) {
        let page = req.query.page || '';
        let sort = req.query.sort || 'ASC';
        let perpage = req.query.perpage || '';
        let Examination = req.query.Examination || '';
        let Config = req.query.Config || '';
        let Template = req.query.Template || '';
        Quiz.getQuiz(parseInt(page), parseInt(perpage), sort, parseInt(Examination),parseInt(Config),parseInt(Template),  function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Quiz get successfully!", data: result ,code: 20000});
        })
    },
    //get 1 Quiz by id
    getQuizById: function (req, res) {
        Quiz.getQuizById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Quiz get successfully!", data: result,code: 20000 });
        })
    },
    //update Quiz
    updateQuizById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Quiz.update(id, req.params.id, new Quiz(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Quiz update successfully!", id: result ,code: 20000});
            });
        }
    },
    //delete Quiz
    deleteQuizById: function (req, res) {
        Quiz.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Quiz delete successfully!", id: result,code: 20000 });
        })
    }
};