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
    this.Description = exam.Description;
    this.IsDeleted = exam.IsDeleted;
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
            queryObj.Description = newExam.Description;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO examination set ?", queryObj, function (err, res) {
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
        dbConn.query("Select * from examination where id = ? and IsDeleted = 0", parseInt(id), function (err, res) {
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
//get Exam
Exam.getActiveExam = function (result) {
    try {
        dbConn.query("Select * from examination WHERE IsDeleted = 0", function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if (res.length === 0)
                    result(1, 'No Exam found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'Get question fail', 400, error, null);
    }
};

//get all Exam with pagination
Exam.getExam = function (page, perpage, sort,lecturer,semester, result) {
    if (page === 0|| isNaN(page))
        page = 1;
    if (perpage <= 0 || isNaN(perpage)) {
        perpage = 5;
    }
    if (sort.length === 0|| sort!=="DESC") {
        sort = "ASC";
    }
    let type = typeof (sort);
    let offset = perpage * (page - 1);
    if(lecturer.length !== 0 && semester.length !==0){
        try {
            dbConn.query(`SELECT COUNT(*) as total from examination WHERE Lecturer ='${lecturer}' and Semester ='${semester}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from examination WHERE Lecturer ='${lecturer}' and Semester ='${semester}' ORDER BY ID ${sort} limit ${perpage} offset ${offset}`, function (errs, res) {
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
                                    total: rows[0].total
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
    }
    else if(lecturer.length !==0)
    {
        try {
            dbConn.query(`SELECT COUNT(*) as total from examination WHERE Lecturer ='${lecturer}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from examination WHERE Lecturer ='${lecturer}' ORDER BY ID ${sort} limit ${perpage} offset ${offset}`, function (errs, res) {
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
                                    total: rows[0].total
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

    }
    else if(semester.length !==0)
    {
        try {
            dbConn.query(`SELECT COUNT(*) as total from examination WHERE Semester ='${semester}'`, function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from examination WHERE Semester ='${semester}' ORDER BY ID ${sort} limit ${perpage} offset ${offset}`, function (errs, res) {
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
                                    total: rows[0].total
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

    }
    else{
        try {
            dbConn.query("SELECT COUNT(*) as total from examination ", function (err, rows) {
                if (err) {
                    return result(err);
                } else {
                    dbConn.query(`Select * from examination ORDER BY ID ${sort} limit ${perpage} offset ${offset}`, function (errs, res) {
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
                                    total: rows[0].total
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
    }
};

//update Exam by id
Exam.update = function (accessId,id, Examinfo, result) {

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
        queryObj.Description = Examinfo.Description;
        queryObj.UpdatedBy = accessId;
        queryObj.Id = id;
        queryObj.IsDeleted = Examinfo.IsDeleted;
        dbConn.query("UPDATE examination SET Description=?,Duration=?,Semester=?,Notes=?,Department=?,Course=?,CourseCode=?,AcademicYear=?,Lecturer=?,UpdatedBy=?,IsDeleted=? WHERE id = ?",
            [queryObj.Description,queryObj.Duration, queryObj.Semester, queryObj.Notes,queryObj.Department,queryObj.Course,queryObj.CourseCode,
                queryObj.AcademicYear,queryObj.Lecturer, queryObj.UpdatedBy,queryObj.IsDeleted, queryObj.Id], function (err, res) {
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
        dbConn.query("UPDATE examination SET IsDeleted =1 WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows===0)
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
