'use strict';
const Config = require('../models/config');

module.exports = {
    //Add new Config
    addConfig: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Config = req.body || '';
        //Handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Config.add(id, new_Config, function (err, result) {
                if (err)
                    res.json({ result: "fail", message: "Invalid input" });
                else res.json({ result: "ok", message: "Config added successfully!", id: result,code: 20000 });
            });
        }
    },
    //Get all
    getConfig: function (req, res) {
        let page = req.body.page || '';
        let sort = req.body.sort || '';
        let perpage = req.body.perpage || '';
        Config.getConfig(parseInt(page), parseInt(perpage), sort, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Config get successfully!", data: result ,code: 20000});
        })
    },
    //get Config by id
    getConfigById: function (req, res) {
        Config.getConfigById(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Config get successfully!", data: result,code: 20000 });
        })
    },
    //update Config
    updateConfigById: function (req, res) {
        let id = req.body.accessID;

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Config.update(id, req.params.id, new Config(req.body), function (err, result) {
                if (err)
                    return res.json({ result: "fail", message: "Invalid input" });
                else return res.json({ result: "ok", message: "Config update successfully!", id: result ,code: 20000});
            });
        }
    },
    //delete Config
    deleteConfigById: function (req, res) {
        Config.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({ result: "fail", message: "Invalid input" });
            else return res.json({ result: "ok", message: "Config delete successfully!", id: result,code: 20000 });
        })
    }
};