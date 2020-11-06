'use strict';
const User = require('../models/user');

module.exports = {
    //create a new user
    addUser: function (req, res) {
        let role = req.body.accessUserRole || '';
        let id = req.body.accessID || ' ';
        let new_user = req.body || '';
        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            User.add(id,role,new_user, function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "User added successfully!", id: result, code: 20000});
            });
        }
    },
    //get all user
    getUser: function (req, res) {
        let page = req.query.page || '';
        let sort = req.query.sort || '';
        let perpage = req.query.perpage || '';
        let username=req.query.username || '';
        let role = req.query.role ||'';
        User.getUser(parseInt(page),parseInt(perpage),sort,username,role,function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "User get successfully!", data: result, code: 20000});
        })
    },
    //get 1 user by id
    getUserById: function (req, res) {
        User.getUserById(req.params.id, function (err, result) {
            if (err)
                return res.status(404).json({result:"fail",message:"Invalid input",code: 50008});
            else return res.json({result:"ok",message: "User get successfully!", data: result, code: 20000});
        })
    },
    //update user
    updateUserById: function (req, res) {
        let id = req.body.accessID;
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            User.update(id,req.params.id, new User(req.body), function (err, result) {
                if (err)
                    return res.json({result:"fail",message:"Invalid input"});
                else return res.json({result:"ok",message: "User update successfully!", id: result, code: 20000});
            });
        }
    },
    //delete user
    deleteUserById: function (req, res) {
        User.delete(req.params.id, function (err, result) {
            if (err)
                return res.json({result:"fail",message:"Invalid input"});
            else return res.json({result:"ok",message: "User delete successfully!", id: result, code: 20000});
        })
    },
    //check for login authenticate
    login:function(req,res){
        let username = req.body.username || '';
        let password = req.body.password || '';
        User.authenticate(username,password,function(err,result){
            console.log(result);
            if(err)
                return res.json({result:"fail",message:"Invalid input", code: 60204});
            else return res.json({result:"ok",message: "User login successfully!", data: result, code: 20000 });
        })
    },
    logout:function(req,res) {
        return res.json({message:"ok", code: 20000});
    }
};