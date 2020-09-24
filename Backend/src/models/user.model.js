'use strict';
var dbConn = require('./../../config/db.config');
const Sequelize = require('sequelize');

const BCrypt = require('bcryptjs');

var User = function (user) {
    this.Username = user.Username;
    this.Password = user.Password;
    this.Fullname = user.Fullname;
    this.Role = user.Role;
    this.CreatedBy = user.CreatedBy;
    this.UpdatedBy = user.UpdatedBy;
};
//add user
User.addUser = function (accessID,accessRole, newUser, result) {
    if (accessRole === 2) {
        console.log("You dont have permission to create account");
        return callback(1, 'invalid_user_permission', 422, 'You dont have permission to create account', null);
    } else {
        try {
            let queryObj = {};
            queryObj.Password = BCrypt.hashSync(newUser.Password, 10);
            queryObj.Username = newUser.Username;
            queryObj.Fullname = newUser.Fullname;
            queryObj.Role = newUser.Role;
            queryObj.CreatedBy = accessID;
            queryObj.UpdatedBy = accessID;

            dbConn.query("INSERT INTO user set ?", queryObj, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            return result(1, 'create_by_admin_user_fail', 400, error, null);
        }
    }
};
//get user
User.getUserById = function (id, result) {
    try {
        dbConn.query("Select Username, Fullname, Role, CreatedBy, CreatedAt, UpdatedBy, UpdatedAt from user where id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
        );
    } catch (error) {
        return result(1, 'get_one_user_fail', 400, error, null);
    }
};
User.getUser = function (page,result) {
    let perPage = 2;
    let sort = [];
    if (page ===0)
        page=1;
    if(perPage<=0)
    {
        perPage=2;
    }
    if(sort.length <= 0){
        sort.push(['updatedAt', 'DESC']);
    }
    let offset = perPage * (page - 1);

    try {
        dbConn.query("SELECT COUNT(*) as total from USER ", function(err, rows, feilds){
            if(err)
            {
                console.log("error: ", err);
                return result(err, null);
            }
            else{
                dbConn.query("Select Username, Fullname, Role, CreatedBy, CreatedAt, UpdatedBy, UpdatedAt from user ORDER BY ID  limit ? offset ? ",[perPage,offset], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        // console.log('topic : ', res);
                        // result(null, res);
                        let pages = rows;
                        let output={
                            data: res,
                            pages:{
                                current: page,
                                prev: page - 1,
                                hasPrev: false,
                                next: (page + 1) > pages ? 0 : (page + 1),
                                hasNext: false,
                                total: pages
                            },
                            items:{
                                begin: ((page * perPage) - perPage) + 1,
                                end: page * perPage,
                                total: res.length
                            }
                        };
                        output.pages.hasNext = (output.pages.next !== 0);
                        output.pages.hasPrev = (output.pages.prev !== 0);
                        return result(null, output);
                    }
                });
            }
        })
    } catch (error) {
        return result(1, 'get_all_user_fail', 400, error, null);
    }
};
User.updateUserById = function (accessId, userinfo, result) {
    try {
        let queryObj = {};
        queryObj.Password = BCrypt.hashSync(userinfo.Password, 10);
        queryObj.Fullname = userinfo.Fullname;
        queryObj.Role = userinfo.Role;
        queryObj.UpdatedBy = accessId;
        queryObj.Id = accessId;
        dbConn.query("UPDATE user SET Password=?,Fullname=?,Role=?,UpdatedBy=? WHERE id = ?", [queryObj.Password, queryObj.Fullname, queryObj.Role, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'update_user_fail', 400, error, null);
    }
};
User.deleteUserById = function (id, result) {
    try {
        dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'delete_user_fail', 400, error, null);
    }
};
User.authenticate = function(loginName,password,result){
    try{
        if(typeof loginName !== 'string' ){
            return result(1, 'invalid_user_login_name', 422, 'login name is not a string', null);
        }
        if(typeof password !== 'string' ){
            return result(1, 'invalid_user_password', 422, 'password is not a string', null);
        }
        dbConn.query("SELECT Username, Password from user where Username= ?",loginName,function(err,res)
        {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                let usernameDb = res[0].Username;
                let passwordDb= res[0].Password;
                BCrypt.compare(password, passwordDb, function (error, isTrue) {
                    if (isTrue === true) {
                        return result(null, 'connect_success', 200, null, res);
                    } else {
                        return result(null, 'wrong_password', 404, null, error);
                    }
                });

            }
            });
        }
    catch(error){
        return result(1, 'authenticate_user_fail', 400, error, null);
    }
};
module.exports = User;

