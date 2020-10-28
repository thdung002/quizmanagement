const examController =   require('../controllers/examination');
module.exports = function (app) {
    app.get('/v1/exam/getall', examController.getExam);
    /**
     * @api {GET} /v1/exam/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Exam
     * @apiPermission only Super administrator
     *
     * @apiDescription Get all Exams
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     * @apiParam {String} lecturer get exam by lecturer
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/exam/getall
     *
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccess {Object[]} data the list of data
     * @apiSuccess {Object} items {begin, end, total}
     * @apiSuccess {Object} pages {current, prev, hasPrev, next, hasNext, total}
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": ""

     *       "data": [...],
     *       "items": {"begin": 1, "end": 3, "total": 2},
     *       "pages": {"current": 1, "prev": 0, "hasPrev": false, "next": 2, "hasNext": true, "total": 4},
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */

    app.post('/v1/exam/add', examController.addExam);
    /**
     * @api {POST} /v1/exam/add Create One account
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup Exam
     * @apiPermission All user
     *
     * @apiDescription Create Exam by all user
     *
     * @apiParam {String} Duration time of the exam
     * @apiParam {String} Semester Semester time of the exam
     * @apiParam {String} Notes notes of lecturer for the exam
     * @apiParam {String} Department Department name
     * @apiParam {String} Course course name
     * @apiParam {String} CourseCode course code of course
     * @apiParam {String} AcademicYear year of the exam
     * @apiParam {String} Lecturer lecturer name
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/exam/add
     *
     * @apiSuccess {String} id the ID of created Exam
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "Exam added successfully!",
     *       "id": 9
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "Invalid input",
     *     }
     */


    app.get('/v1/exam/get/:id', examController.getExamById);
    /**
     * @api {GET} /v1/exam/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Exam
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one Exam
     *
     * @apiParam {string} id ID of question, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/exams/get/2
     *
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccess {Object[]} data the list of data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "Exam get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Question": 3,
     *              "Content": "This is Exam B",
     *              "CorrectExam": "This is column 2",
     *              ...
     *          },
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/v1/exam/getactive', examController.getActive);
    /**
     * @api {GET} /v1/exam/getactive
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Exam
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one Exam
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/exams/getactive
     *
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccess {Object[]} data the list of data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "Exam get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Question": 3,
     *              "Content": "This is Exam B",
     *              "CorrectExam": "This is column 2",
     *              ...
     *          },
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.put('/v1/exam/update/:id', examController.updateExamById);
    /**
     * @api {PUT} /v1/exam/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Exam
     * @apiPermission Every type of user
     *
     * @apiDescription Update Exam information
     *
     * @apiParam {Number} ID Id of Exam, on params
     * @apiParam {String} Duration Time of Exam
     * @apiParam {String} Semester Semester of Exam
     * @apiParam {String} Notes Note of lecturer for exam
     * @apiParam {String} Department Department of exam
     * @apiParam {String} Course Course name of exam
     * @apiParam {String} Coursecode Code of course
     * @apiParam {String} AcademicYear Year of exam
     * @apiParam {String} Lecturer Name of lecturer
     * @apiParam {String} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/exam/update/2
     *
     * @apiSuccess {String} id the ID of updated Exam
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Exam update successfully!"
     *          "id": "1"
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */

    app.delete('/v1/exam/delete/:id', examController.deleteExamById);
    /**
     * @api {DELETE} /v1/exam/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Exam
     * @apiPermission just admin Exam
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription delete Exam
     *
     * @apiParam {String} id ID of Exam
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/exam/delete/7
     *
     * @apiSuccess {String} id Id of deleted Exam
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Exam delete successfully!",
     *          "id": "2"
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */


};