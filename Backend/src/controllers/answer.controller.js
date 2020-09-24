'use strict';
const Answer = require('../models/Answer.model');
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
                    res.send(err);
                res.json({message: "Answer added successfully!", data: result});
            });
        }
    },
    //get all Answer
    getAnswer: function (req, res) {
        Answer.getAnswer(req.params.page,function (err, result) {
            if (err)
                res.send(err);
            console.log('result', result);
            res.send(result);
        })
    },
    //get 1 Answer by id
    getAnswerById: function (req, res) {
        Answer.getAnswerById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    },
    //update Answer
    updateAnswerById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Answer.updateAnswerById(req.params.id, new Answer(req.body), function (err, result) {
                if (err)
                    res.send(err);
                res.json({ result});
            });
        }
    },
    //delete Answer
    deleteAnswerById: function (req, res) {
        Answer.deleteAnswerById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json({error: false, result});
        })
    },
};