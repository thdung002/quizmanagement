'use strict';
const Type = require('../models/type');

module.exports = {
    //Add new Type
    addType: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Type = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Type.add(id, new_Type, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Type added successfully!", id: result });
            });
        }
    },
    //get all Type
    getType: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Type.getType(parseInt(page), parseInt(perpage), sort, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Type get successfully!", data: result });
        })
    },
    //get 1 Type by id
    getTypeById: function (req, res) {
        Type.getTypeById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Type get successfully!", data: result });
        })
    },
    //update Type
    updateTypeById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Type.update(id, req.params.id, new Type(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Type update successfully!", id: result });
            });
        }
    },
    //delete Type
    deleteTypeById: function (req, res) {
        Type.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Type delete successfully!", id: result });
        })
    }
};