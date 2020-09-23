'use strict';
const User = require('../models/user.model');

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
            User.addUser(id,role,new_user, function (err, result) {
                if (err)
                    res.send(err);
                res.json({message: "User added successfully!", data: result});
            });
        }
    },
    //get all user
    getUser: function (req, res) {
        User.getUser(function (err, result) {
            if (err)
                res.send(err);
            console.log('result', result);
            res.send(result);
        })
    },
    //get 1 user by id
    getUserById: function (req, res) {
        User.getUserById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    },
    //update user
    updateUserById: function (req, res) {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({error: true, message: 'Please provide all required field'});
        } else {
            User.updateUserById(req.params.id, new User(req.body), function (err, result) {
                if (err)
                    res.send(err);
                res.json({ result});
            });
        }
    },
    //delete user
    deleteUserById: function (req, res) {
        User.deleteUserById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json({error: false, result});
        })
    },
    //check for login authenticate
    login:function(req,res){
        let loginName = req.body.loginName || '';
        let password = req.body.password || '';
        User.authenticate(loginName,password,function(err,result){
            if(err)
                res.send(err);
            res.json({result});
        })
    }

};