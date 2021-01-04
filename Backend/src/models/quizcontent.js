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
    let res = connection.query(`SELECT qz.ID as quizcontentID, QuestionID,qs.Type as Type, qs.Content as Question, a.Content as Answer, CorrectAnswer  FROM quiz_management.quizcontent qz JOIN quiz_management.question qs ON qz.QuestionID = qs.ID left join answer a on qs.ID = a.Question WHERE quiz = ${idquiz} ORDER BY QuestionID`);  
    let data = [];
    let index = -1;
    let indexA = 0;
    let check = 0;
    let alphabet = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ', 'H. ', 'I. ']
    for(let i = 0;i < res.length; i++){
        // data[index].Answer.push(res[i].Answer);
        if(check != res[i].QuestionID){
            indexA = 0;
            data.push({});
            index++;
            data[index].Question = index + 1 + '. ' + res[i].Question;
            data[index].Type = res[i].Type;
            check = res[i].QuestionID;
            data[index].Answer = [];
            data[index].CorrectAnswer = [];
        }
        data[index].Answer.push(alphabet[indexA] + res[i].Answer);
        data[index].CorrectAnswer.push(res[i].CorrectAnswer);
        indexA++;
    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    data.forEach(element => {
        element.CorrectAnswer = shuffle(element.CorrectAnswer);
    });
    return result(null, data);
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
