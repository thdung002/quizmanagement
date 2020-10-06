'use strict';
const Quiz = require('../models/quiz');

module.exports = {
    //Add new Quiz
    addQuiz: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Quiz = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Quiz.add(id,new_Quiz, function (err, result) {
                if (err)
                     res.json({result:"fail",message:"Invalid input"});
                else  res.json({result:"ok",message: "Quiz added successfully!", id: result});
            });
        }
    },
    //get all Quiz
    getQuiz: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Quiz.getQuiz(parseInt(page),parseInt(perpage),sort,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Quiz get successfully!", data: result});
        })
    },
    //get 1 Quiz by id
    getQuizById: function (req, res) {
        Quiz.getQuizById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Quiz get successfully!", data: result});
        })
    },
    //update Quiz
    updateQuizById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Quiz.update(id,req.params.id, new Quiz(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "Quiz update successfully!", id: result});
            });
        }
    },
    //delete Quiz
    deleteQuizById: function (req, res) {
        Quiz.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Quiz delete successfully!", id: result});
        })
    }
};