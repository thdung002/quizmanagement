'use strict';
const QuizContent = require('../models/quizcontent.model');

module.exports = {
    //create a new QuizContent
    addQuizContent: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_QuizContent = req.body || '';
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            QuizContent.add(id,new_QuizContent, function (err, result) {
                if (err)
                    res.json({result:"fail",message:"Invalid input"});
                else  res.json({result:"ok",message: "QuizContent added successfully!", id: result});
            });
        }
    },
    //get all QuizContent
    getQuizContent: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        QuizContent.getQuizContent(parseInt(page),parseInt(perpage),sort,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "QuizContent get successfully!", data: result});
        })
    },
    //get 1 QuizContent by id
    getQuizContentById: function (req, res) {
        QuizContent.getQuizContentById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "QuizContent get successfully!", data: result});
        })
    },
    //update QuizContent
    updateQuizContentById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            QuizContent.update(id,req.params.id, new QuizContent(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "QuizContent update successfully!", id: result});
            });
        }
    },
    //delete QuizContent
    deleteQuizContentById: function (req, res) {
        QuizContent.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "QuizContent delete successfully!", id: result});
        })
    }
};