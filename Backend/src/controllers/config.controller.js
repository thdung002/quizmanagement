'use strict';
const Config = require('../models/config.model');
module.exports = {
    //get all config
    getConfig: function (req, res) {
        Config.getConfig(function (err, config) {
            if (err)
                res.send(err);
            console.log('res', config);
            res.send(config);
        })
    },


    //create a new config
    addConfig: function (req, res) {
        const new_config = new Config(req.body);
    //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Config.add(new_config, function (err, config) {
                if (err)
                    res.send(err);
                res.json({error: false, message: "Config added successfully!", data: config});
            });
        }
    },
    //get config by id
    getConfigById: function (req, res) {
        Config.getConfigById(req.params.id, function (err, config) {
            if (err)
                res.send(err);
            res.json(config);
        })
    },

    //upadte config
    updateConfigById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Config.update(req.params.id, new Config(req.body), function (err, config) {
                if (err)
                    res.send(err);
                res.json({error: false, message: 'Config successfully updated'});
            });
        }
    },
    //delete config
    deleteConfigById: function (req, res) {
        Config.deleteConfigById(req.params.id, function (err, config) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'Config successfully deleted'});
        })
    }
};