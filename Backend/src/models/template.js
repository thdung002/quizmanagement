'use strict';
var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var Template = function (template) {
    this.TemplateName = template.TemplateName;
    this.Description = template.Description;
    this.HeaderContent = template.HeaderContent;
    this.Quiz = template.Quiz;
    this.QuestionContent = template.QuestionContent;
    this.AnswerContent = template.AnswerContent;
    this.FooterContent = template.FooterContent;
    this.CreatedBy = template.CreatedBy;
    this.UpdatedBy = template.UpdatedBy;
    this.IsDeleted = template.IsDeleted;
};
//add Template
Template.add = function (accessID, newTemp, result) {
    if (!Pieces.VariableBaseTypeChecking(newTemp.TemplateName, 'string')
        || newTemp.TemplateName === null) {
        return result(1, 'invalid_template', 400, null, null);
    } else {
        try {
            let queryObj = {};
            queryObj.TemplateName = newTemp.TemplateName;
            queryObj.Description = newTemp.Description;
            queryObj.HeaderContent = newTemp.HeaderContent;
            queryObj.Quiz = newTemp.Quiz;
            queryObj.QuestionContent = newTemp.QuestionContent;
            queryObj.AnswerContent = newTemp.AnswerContent;
            queryObj.FooterContent = newTemp.FooterContent;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO template set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            result(1, 'create_template_fail', 400, error, null);
        }
    }
};
//get Template
Template.getTemplateById = function (id, result) {
    try {
        dbConn.query("Select * from template where id = ? and IsDeleted = 0", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if (res.length === 0)
                    result(1, 'Template_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_Template_fail', 400, error, null);
    }
};
//get all Template with pagination
Template.getTemplate = function (page, perpage, sort, result) {
    if (page === 0 || isNaN(page))
        page = 1;
    if (perpage <= 0 || isNaN(perpage)) {
        perpage = 5;
    }
    if (sort.length === 0 || sort !== "DESC") {
        sort = "ASC";
    }
    let type = typeof (sort);
    let offset = perpage * (page - 1);
    try {
        dbConn.query("SELECT COUNT(*) as total from template where IsDeleted = 0", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from template ORDER BY ID ${sort} limit ${perpage} offset ${offset} where IsDeleted = 0`, function (errs, res) {
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
        return result(1, 'get_all_Template_fail', 400, error, null);
    }
};

//update Template by id
Template.update = function (id, accessId, Templateinfo, result) {
    try {
        let queryObj = {};
        queryObj.TemplateName = Templateinfo.TemplateName;
        queryObj.Description = Templateinfo.Description;
        queryObj.HeaderContent = Templateinfo.HeaderContent;
        queryObj.Quiz = Templateinfo.Quiz;
        queryObj.QuestionContent = Templateinfo.QuestionContent;
        queryObj.AnswerContent = Templateinfo.AnswerContent;
        queryObj.FooterContent = Templateinfo.FooterContent;
        queryObj.UpdatedBy = id;
        queryObj.Id = accessId;
        dbConn.query("UPDATE template SET TemplateName=?,Description=?,HeaderContent=?,Quiz=?,QuestionContent=?,AnswerContent=?,FooterContent=?,UpdatedBy=? WHERE id = ? and IsDeleted = 0",
            [queryObj.TemplateName, queryObj.Description, queryObj.HeaderContent, queryObj.Quiz,queryObj.QuestionContent,queryObj.AnswerContent,queryObj.FooterContent, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if (res.changedRows === 0)
                result(1, 'Template_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_Template_fail', 400, error, null);
    }
};
Template.delete = function (id, result) {
    try {
        dbConn.query("UPDATE template set IsDeleted =1 WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if (res.affectedRows === 0)
                result(1, 'Template_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Template_fail', 400, error, null);
    }
};
module.exports = Template;
