'use strict';
var MySql = require('sync-mysql');

var connection = new MySql({
    host     : 'quizmanagement.ccd3ylv1pufy.ap-northeast-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'dung',
    password : 'dung1234',
    database : 'quiz_management',
    timeout: 15000
});

var dbConn = require('./../../config/db.config');
const Pieces = require('../utils/Pieces');

var QuizContent = function (quiz) {
    this.Quiz = quiz.Quiz;
    this.QuestionID = quiz.QuestionID;
};
//add QuizContent
QuizContent.add = function (accessID, newQuizContent, result) {

        try {
            let queryObj = {};
            queryObj.Quiz = newQuizContent.Quiz;
            queryObj.QuestionID = newQuizContent.QuestionID;
            queryObj.CreatedBy = accessID;
            dbConn.query("INSERT INTO quizcontent set ?", queryObj, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
        } catch (error) {
            result(1, 'create_Quiz_Content_fail', 400, error, null);
        }

};
//get QuizContent
QuizContent.getQuizContentById = function (id, result) {
    try {
        dbConn.query("Select * from quizcontent where id = ? and IsDeleted = 0", parseInt(id), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else if(res.length === 0)
                    result (1, 'Quiz_Content_not_found', 403, err, null);
                else {
                    result(null, res);
                }
            }
        );
    } catch (error) {
        return result(1, 'get_one_Quiz_Content_fail', 400, error, null);
    }
};
//get all QuizContent with pagination
QuizContent.getQuizContent = function (idquiz, result) {
    dbConn.query(`Select * from quizcontent where Quiz = ${idquiz}`, function(err, res){
        // for(var i = 0; i < res.length; i++){
        //     var questionContent =  connection.query(`Select * from question where ID = ${res[i].QuestionID}`);
        //     res[i].Question = questionContent[0].Content;
        //     var answerContent =  connection.query(`Select Content from answer where Question = ${res[i].QuestionID}`);
        //     res[i].Answer = answerContent;
        // }
        dbConn.query(`Select * from question where ID = ${res[i].QuestionID}`, function (err, question){
            for(var i = 0;i < res.length; i++){
                res[i].Question = question[0].Content;
            }
        })
        dbConn.query(`Select Content from answer where Question = ${res[i].QuestionID}`, function (err, answer){
            for(var i = 0;i < res.length; i++){
                res[i].Question = answer;
            }
        })
    return result(null, res)    
    });
    
};

//update QuizContent by id
QuizContent.update = function (accessId,id, QuizContentinfo, result) {
    try {
        let queryObj = {};
        queryObj.Quiz = QuizContentinfo.Quiz;
        queryObj.QuestionID = QuizContentinfo.QuestionID;
        queryObj.UpdatedBy = accessId;
        queryObj.Id = id;
        dbConn.query("UPDATE quizcontent SET Quiz=?,QuestionID=?,UpdatedBy=? WHERE id = ? and IsDeleted = 0", [queryObj.Quiz, queryObj.QuestionID, queryObj.UpdatedBy, queryObj.Id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.changedRows === 0)
                result(1, 'Quiz_Content_not_found', 403, err, null);
            else {
                result(null, queryObj.Id);
            }
        });
    } catch (error) {
        return result(1, 'update_QuizContent_fail', 400, error, null);
    }
};
QuizContent.delete = function (id, result) {
    try {
        dbConn.query("UPDATE quizcontent set IsDeleted =1 WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else if(res.affectedRows===0)
                result(1, 'Quiz_Content_not_found', 403, err, null);
            else {
                result(null, id);
            }
        });
    } catch (error) {
        return result(1, 'delete_Quiz_Content_fail', 400, error, null);
    }
};


module.exports = QuizContent;
