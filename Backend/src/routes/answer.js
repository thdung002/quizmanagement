const answerController =   require('../controllers/answer');
module.exports = function (app) {
    app.get('/v1/answer/getall', answerController.getAnswer);
    /**
     * @api {GET} /v1/answer/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Answer
     * @apiPermission All user
     *
     * @apiDescription Get all answers
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     * @apiParam {String} Content content for sort
     * @apiParam {number} IsCorrect correct answer
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/answer/getall
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
    app.get('/v1/answer/getactive', answerController.getActive);
    /**
     * @api {GET} /v1/answer/getactive Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Answer
     * @apiPermission All user
     * @apiDescription Get all answers
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/answer/getall
     *
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccess {Object[]} data the list of data
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": ""
     *       "data": [...],
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

    app.post('/v1/answer/add', answerController.addAnswer);
    /**
     * @api {POST} /v1/answer/add Create One answer
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup Answer
     * @apiPermission just administrator or super administrator
     *
     * @apiDescription Create answer by admin or moderator
     *
     * @apiParam {Number} Question question id of question
     * @apiParam {String} Content answer content
     * @apiParam {Number} IsCorrect 1 is correct, 0 is false. Not using when it is match question
     * @apiParam {String} CorrectAnswer Using for only fill type question - if not using put null

     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/answer/add
     *
     * @apiSuccess {String} id the ID of created answer
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "answer added successfully!",
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


    app.get('/v1/answer/get/:id', answerController.getAnswerById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Answer
     * @apiPermission every type of user
     *
     * @apiDescription Get one answer
     *
     * @apiParam {string} id ID of question, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/answers/get/2
     *
     * @apiSuccess {String} Id the ID of answer
     * @apiSuccess {Number} Question Id of question
     * @apiSuccess {String} Content answer content
     * @apiSuccess {String} CorrectAnswer Answer for filling question
     * @apiSuccess {Number} IsCorrect correct answer for multiple choice, 1 is correct, 0 is fail
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "answer get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Question": 3,
     *              "Content": "This is answer B",
     *              "CorrectAnswer": "This is column 2",
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
    app.put('/v1/answer/update/:id', answerController.updateAnswerById);
    /**
     * @api {PUT} /v1/answer/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Answer
     * @apiPermission every type of user
     *
     * @apiDescription Update Answer information
     *
     * @apiParam {Number} ID Id of Answer where to update, on params
     * @apiParam {String} Content Content of answer
     * @apiParam {String} CorrectAnwser  Correct Answer
     * @apiParam {String} IsCorrect Correct value 1 or 0
     * @apiParam {String} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/Answer/update/2
     *
     * @apiSuccess {String} id the ID of updated Answer
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Answer update successfully!"
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

    app.delete('/v1/answer/delete/:id', answerController.deleteAnswerById);
    /**
     * @api {DELETE} /v1/Answer/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Answer
     * @apiPermission just admin Answer
     *
     * @apiDescription delete Answer
     *
     * @apiParam {String} id ID of Answer
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/Answer/delete/7
     *
     * @apiSuccess {String} id Id of deleted Answer
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Answer delete successfully!",
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