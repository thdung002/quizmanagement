'use strict';
const Answer = require('../models/answer.model');

module.exports = {
    //create a new Answer
    addAnswer: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Answer = req.body || '';
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Answer.addAnswer(id,new_Answer, function (err, result) {
                if (err)
                     res.json({result:"fail",message:"Invalid input"});
                else  res.json({result:"ok",message: "Answer added successfully!", id: result});
            });
        }
    },
    //get all Answer
    getAnswer: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Answer.getAnswer(page,perpage,sort,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Answer get successfully!", data: result});
        })
    },
    //get 1 Answer by id
    getAnswerById: function (req, res) {
        Answer.getAnswerById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Answer get successfully!", data: result});
        })
    },
    //update Answer
    updateAnswerById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Answer.updateAnswerById(req.params.id, new Answer(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "Answer update successfully!", id: result});
            });
        }
    },
    //delete Answer
    deleteAnswerById: function (req, res) {
        Answer.deleteAnswerById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Answer delete successfully!", id: result});
        })
    },
    //check for login authenticate
    login:function(req,res){
        let loginName = req.body.loginName || '';
        let password = req.body.password || '';
        Answer.authenticate(loginName,password,function(err,result){
            if(err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Answer login successfully!", data: result});
        })
    }

};