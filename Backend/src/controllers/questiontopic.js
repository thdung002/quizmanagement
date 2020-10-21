'use strict';
const Questiontopic = require('../models/questiontopic');

module.exports = {
    //Add new Questiontopic
    addQuestiontopic: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Questiontopic = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Questiontopic.add(id, new_Questiontopic, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Questiontopic added successfully!", id: result ,code: 20000});
            });
        }
    },
    //get all Questiontopic
    getQuestiontopic: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Questiontopic.getQuestiontopic(parseInt(page), parseInt(perpage), sort, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Questiontopic get successfully!", data: result,code: 20000 });
        })
    },
    //get 1 Questiontopic by id
    getQuestiontopicById: function (req, res) {
        Questiontopic.getQuestiontopicById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Questiontopic get successfully!", data: result ,code: 20000});
        })
    },
    //update Questiontopic
    updateQuestiontopicById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Questiontopic.update(id, req.params.id, new Questiontopic(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Questiontopic update successfully!", id: result,code: 20000 });
            });
        }
    },
    //delete Questiontopic
    deleteQuestiontopicById: function (req, res) {
        Questiontopic.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Questiontopic delete successfully!", id: result,code: 20000 });
        })
    }
};