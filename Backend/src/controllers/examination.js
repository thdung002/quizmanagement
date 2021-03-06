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
                else  res.json({result:"ok",message: "Exam added successfully!", id: result,code: 20000});
            });
        }
    },
    //get all Exam
    getExam: function (req, res) {
        let page = req.query.page || '';
        let sort = req.query.sort || '';
        let perpage = req.query.perpage || '';
        let lecturer = req.query.lecturer ||'';
        let semester = req.query.semester || '';
        Exam.getExam(parseInt(page),parseInt(perpage),sort,lecturer,semester,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam get successfully!", data: result,code: 20000});
        })
    },
    //get 1 Exam by id
    getExamById: function (req, res) {
        Exam.getExamById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam get successfully!", data: result,code: 20000});
        })
    },
    //get active Exam
    getActiveExam: function (req, res) {
        Exam.getActiveExam(function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Question get successfully!", data: result,code: 20000 });
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
                else return res.json({result:"ok",message: "Exam update successfully!", id: result,code: 20000});
            });
        }
    },
    //delete Exam
    deleteExamById: function (req, res) {
        Exam.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Exam delete successfully!", id: result,code: 20000});
        })
    }

};