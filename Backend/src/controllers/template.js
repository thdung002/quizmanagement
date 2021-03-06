'use strict';
const Template = require('../models/template');

module.exports = {
    //create a new Template
    addTemplate: function (req, res) {
        let id = req.body.accessID || ' ';
        let new_Template = req.body || '';
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Template.add(id,new_Template, function (err, result) {
                if (err)
                    res.json({result:"fail",message:"Invalid input"});
                else  res.json({result:"ok",message: "Template added successfully!", id: result,code: 20000});
            });
        }
    },
    //get active template
    getActiveTemplate: function (req, res) {
        Template.getActiveTemplate(function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Template get successfully!", data: result,code: 20000});
        })
    },
    //get all Template
    getTemplate: function (req, res) {
        let page = req.query.page || '';
        let sort = req.query.sort || '';
        let perpage = req.query.perpage || '';
        let templatename = req.query.templatename ||'';
        Template.getTemplate(parseInt(page),parseInt(perpage),sort,templatename,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Template get successfully!", data: result,code: 20000});
        })
    },
    //get 1 Template by id
    getTemplateById: function (req, res) {
        Template.getTemplateById(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Template get successfully!", data: result,code: 20000});
        })
    },
    //update Template
    updateTemplateById: function (req, res) {
        let id = req.body.accessID;
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            Template.update(id,req.params.id, new Template(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "Template update successfully!", id: result,code: 20000},);
            });
        }
    },
    //delete Template
    deleteTemplateById: function (req, res) {
        Template.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "Template delete successfully!", id: result,code: 20000});
        })
    }
};