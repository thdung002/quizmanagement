'use strict';
const Exam = require('../models/examination');

module.exports = {
    //create a new Exam
    addExam: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Exam = req.body || '';
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Exam.add(id,new_Exam, function (err, result) {
                if (err)
                    res.json({result:"fail",message:"Invalid input"});
                else  res.json({result:"ok",message: "Exam added successfully!", id: result});
            });
        }
    },
    //get all Exam
    getExam: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Exam.getExam(parseInt(page),parseInt(perpage),sort,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam get successfully!", data: result});
        })
    },
    //get 1 Exam by id
    getExamById: function (req, res) {
        Exam.getExamById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam get successfully!", data: result});
        })
    },
    //update Exam
    updateExamById: function (req, res) {
        let id = req.body.accessID;
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Exam.update(id,req.params.id, new Exam(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "Exam update successfully!", id: result});
            });
        }
    },
    //delete Exam
    deleteExamById: function (req, res) {
        Exam.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam delete successfully!", id: result});
        })
    }

};