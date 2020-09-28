'use strict';
var dbConn = require('./../../config/db.config');

const BCrypt = require('bcryptjs');
const Validator = require('validator');
const Pieces = require('../utils/Pieces');

var User = function (user) {
    this.Username = user.Username;
    this.Password = user.Password;
    this.Fullname = user.Fullname;
    this.Role = user.Role;
    this.CreatedBy = user.CreatedBy;
    this.UpdatedBy = user.UpdatedBy;
    this.Email = user.Email;
};
//add user
User.add = function (accessID, accessRole, newUser, result) {
    if (accessRole === 2) {
        return result(1, 'invalid_user_permission', 422, 'You dont have permission to create account', null);
    } else if (!Pieces.VariableBaseTypeChecking(newUser.Username, 'string')
        || !Validator.isAlphanumeric(newUser.Username)
        || !Validator.isLowercase(newUser.Username)
        || !Validator.isLength(newUser.Username, {min: 4, max: 128})) {
        return result(1, 'invalid_user_login_name', 400, 'login name should be alphanumeric, lowercase and length 4-128', null);
    } else if (!Pieces.VariableBaseTypeChecking(newUser.Password, 'string')) {
        return result(1, 'invalid_user_password', 400, 'password is not a string', null);
    } else if (!Pieces.VariableBaseTypeChecking(newUser.Email, 'string')
        || !Validator.isEmail(newUser.Email)) {
        return result(1, 'invalid_user_email', 400, 'email is incorrect format', null);
    } else if (newUser.Role > 3 || newUser.Role <= 0) {
        return result(1, 'invalid_role', 400, 'Role is not have. Only role 1, 2 ,3 ', null);
    } else {
        try {
            let queryObj = {};
            queryObj.Password = BCrypt.hashSync(newUser.Password, 10);
            queryObj.Username = newUser.Username;
            queryObj.Fullname = newUser.Fullname;
            queryObj.Role = newUser.Role;
            queryObj.CreatedBy = accessID;
            queryObj.Email = newUser.Email;
            dbConn.query("INSERT INTO user set ?", queryObj, function (err, res) {
                if (err) {
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
        dbConn.query("Select Id, Username, Fullname, Email, Role from user where id = ? ", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if(res.length === 0)
                    result (1, 'user_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_user_fail', 400, error, null);
    }
};
//get all user with pagination
User.getUser = function (page, perpage, sort, result) {
    if (page === 0)
        page = 1;
    if (perpage <= 0) {
        perpage = 5;
    }
    if (sort.length === 0) {
        sort = "ASC";
    }
    let type = typeof (sort);
    let offset = perpage * (page - 1);
    try {
        dbConn.query("SELECT COUNT(*) as total from USER ", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select Username, Fullname, Role, CreatedBy, CreatedAt, UpdatedBy, UpdatedAt from user ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
                    if (errs) {
                        console.log("error in query db: ", errs);
                        return result(errs);
                    } else {
                        // console.log('topic : ', res);
                        // result(null, res);
                        let pages = Math.ceil(rows[0].total / perpage);
                        let output = {
                            data: res,
                            pages: {
                                current: page,
                                prev: page - 1,
                                hasPrev: false,
                                next: (page + 1) > pages ? 0 : (page + 1),
                                hasNext: false,
                                total: pages
                            },
                            items: {
                                begin: ((page * perpage) - perpage) + 1,
                                end: page * perpage,
                                total: parseInt(res.length)
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

//update user by id
User.update = function (id,accessId, userinfo, result) {
    try {
        let queryObj = {};
        queryObj.Password = BCrypt.hashSync(userinfo.Password, 10);
        queryObj.Fullname = userinfo.Fullname;
        queryObj.Role = userinfo.Role;
        queryObj.UpdatedBy = id;
        queryObj.Id = accessId;
        queryObj.Email = userinfo.Email;
        dbConn.query("UPDATE user SET Password=?,Fullname=?,Role=?,UpdatedBy=?, Email=? WHERE id = ?", [queryObj.Password, queryObj.Fullname, queryObj.Role, queryObj.UpdatedBy,queryObj.Email, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows === 0)
            result(1, 'user_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_user_fail', 400, error, null);
    }
};
User.delete = function (id, result) {
    try {
        dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.affectedRows===0)
                result(1, 'user_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_user_fail', 400, error, null);
    }
};
User.authenticate = function (loginName, password, result) {
    try {
        if (!Pieces.VariableBaseTypeChecking(loginName, 'string')) {
            return result(1, 'invalid_user_login_name', 422, 'login name is not a string', null);
        } else if (!Pieces.VariableBaseTypeChecking(password, 'string')) {
            return result(1, 'invalid_user_password', 422, 'password is not a string', null);
        }
        else {


            dbConn.query("SELECT Id, Role, Username, Password, Email, Fullname from user where Username= ?", loginName, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else if(res.length === 0)
                    return result(1, 'user_not_found', 403, err, null);
                else {
                    let passwordDb = res[0].Password;
                    BCrypt.compare(password, passwordDb, function (error, isTrue) {
                        if (isTrue === true) {
                            return result(null, res);
                        } else {
                            return result(1, 'wrong_password', 402, error, null);
                        }
                    });

                }
            });
        }
    } catch (errors) {
        return result(1, 'authenticate_user_fail', 400, errors, null);
    }
};
module.exports = User;

