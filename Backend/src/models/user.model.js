'use strict';
var dbConn = require('./../../config/db.config');
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
User.addUser = function (accessID, newUser, result) {
    if (accessID === 2) {
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
User.getUser = function (accessUserId,result) {
    try {
        dbConn.query("Select Username, Fullname, Role, CreatedBy, CreatedAt, UpdatedBy, UpdatedAt from user", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log('topic : ', res);
                result(null, res);
            }
        });
    } catch (error) {
        return result(1, 'get_all_user_fail', 400, error, null);
    }
};
User.updateUserById = function (id, userinfo, result) {
    try {
        let queryObj = {};
        queryObj.Password = BCrypt.hashSync(userinfo.Password, 10);
        queryObj.Username = userinfo.Username;
        queryObj.Fullname = userinfo.Fullname;
        queryObj.Role = userinfo.Role;
        queryObj.UpdatedBy = id;

        dbConn.query("UPDATE user SET Password=?,Fullname=?,Role=?,UpdatedBy=?, WHERE id = ?", [userinfo.Password, userinfo.Fullname, userinfo.Role, userinfo.UpdatedBy, id], function (err, res) {
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
        let where = { username: loginName };
        let attributes = ['Id', 'Username','Password', 'Fullname', 'Role'];
        User.findOne({
            where: where,
            attributes: attributes}).then( account=>{
            "use strict";
            if (account) {
                BCrypt.compare( password, account.Password, function (error, isTrue) {
                    if (isTrue === true) {
                        return result(null, null, 200, null, account);
                    } else {
                        return result(1, 'wrong_password', 422, null, null);
                    }
                });
            }
            else {
                return result(1, 'invalid_user', 404, null, null);
            }
        }).catch(function(error){
            "use strict";
            return result(1, 'find_one_user_fail', 400, error, null);

        })
        }
    catch(error){
        return result(1, 'authenticate_user_fail', 400, error, null);
    }
};
module.exports = User;

