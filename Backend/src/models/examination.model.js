'use strict';
var dbConn = require('./../../config/db.config');
// const Pieces = require('../utils/Pieces');

var Exam = function (exam) {
    this.Duration = exam.Duration;
    this.Semester = exam.Semester;
    this.Notes = exam.Notes;
    this.Department = exam.Department;
    this.Course = exam.Course;
    this.CourseCode = exam.CourseCode;
    this.AcademicYear = exam.AcademicYear;
    this.Lecturer = exam.Lecturer;
    this.CreatedBy = exam.CreatedBy;
    this.UpdatedBy = exam.UpdatedBy;
};
//add Exam
Exam.add = function (accessID, newExam, result) {
        try {
            let queryObj = {};
            queryObj.Duration = newExam.Duration;
            queryObj.Semester = newExam.Semester;
            queryObj.Notes = newExam.Notes;
            queryObj.Department = newExam.Department;
            queryObj.Course = newExam.Course;
            queryObj.CourseCode = newExam.CourseCode;
            queryObj.AcademicYear = newExam.AcademicYear;
            queryObj.Lecturer = newExam.Lecturer;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO Examination set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            result(1, 'create_Exam_fail', 400, error, null);
        }
};
//get Exam
Exam.getExamById = function (id, result) {
    try {
        dbConn.query("Select * from Examination where question = ? ", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if(res.length === 0)
                    result (1, 'Exam_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_Exam_fail', 400, error, null);
    }
};
//get all Exam with pagination
Exam.getExam = function (page, perpage, sort, result) {
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
        dbConn.query("SELECT COUNT(*) as total from Examination ", function (err, rows) {
            if (err) {
                return result(err);
            } else {
                dbConn.query(`Select * from Examination ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
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
        return result(1, 'get_all_Exam_fail', 400, error, null);
    }
};

//update Exam by id
Exam.update = function (id,accessId, Examinfo, result) {
    try {
        let queryObj = {};
        queryObj.Duration = Examinfo.Duration;
        queryObj.Semester = Examinfo.Semester;
        queryObj.Notes = Examinfo.Notes;
        queryObj.Department = Examinfo.Department;
        queryObj.Course = Examinfo.Course;
        queryObj.CourseCode = Examinfo.CourseCode;
        queryObj.AcademicYear = Examinfo.AcademicYear;
        queryObj.Lecturer = Examinfo.Lecturer;
        queryObj.UpdatedBy = id;
        queryObj.Id = accessId;
        dbConn.query("UPDATE Examination SET Duration=?,Semester=?,Notes=?,Department=?,Course=?,CourseCode=?,AcademicYear=?,Lecturer=?,UpdatedBy=? WHERE id = ?",
            [queryObj.Duration, queryObj.Semester, queryObj.Notes,queryObj.Department,queryObj.Course,queryObj.CourseCode,
                queryObj.AcademicYear,queryObj.Lecturer, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows === 0)
                result(1, 'Exam_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_Exam_fail', 400, error, null);
    }
};
Exam.delete = function (id, result) {
    try {
        dbConn.query("DELETE FROM Examination WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.affectedRows===0)
                result(1, 'Exam_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Exam_fail', 400, error, null);
    }
};
module.exports = Exam;