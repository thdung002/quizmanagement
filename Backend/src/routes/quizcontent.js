const quizcontentController =   require('../controllers/quizcontent');
module.exports = function (app) {
    app.get('/v1/quizcontent/getall', quizcontentController.getQuizContent);
    /**
     * @api {GET} /v1/quizcontent/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup quizcontent
     * @apiPermission all user
     *
     * @apiDescription Get all quiz
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quizcontent/getall
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

    app.post('/v1/quizcontent/add', quizcontentController.addQuizContent);
    /**
     * @api {POST} /v1/quizcontent/add Create One Quiz content
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup quizcontent
     * @apiPermission all user
     *
     * @apiDescription Create quizcontent by all user
     * @apiParam {Number} Quiz Id of quiz
     * @apiParam {Number} QuestionID id of question
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quizcontent/add
     *
     * @apiSuccess {String} id the ID of created quizcontent
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "quizcontent added successfully!",
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


    app.get('/v1/quizcontent/get/:id', quizcontentController.getQuizContentById);
    /**
     * @api {GET} /v1/quizcontent/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup quizcontent
     * @apiPermission Every type of quizcontent
     *
     * @apiDescription Get one quizcontent
     *
     * @apiParam {string} id ID of quiz, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/quiz/get/2
     *
     * @apiSuccess {String} Id the ID of quizcontent
     * @apiSuccess {Number} QuestionID Id of question
     * @apiSuccess {String} Quiz id of quiz
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "quizcontent get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "QuestionID": 3,
     *              "Quiz": 1,
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
    app.put('/v1/quizcontent/update/:id', quizcontentController.updateQuizContentById);
    /**
     * @api {PUT} /v1/quizcontent/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup quizcontent
     * @apiPermission Every type of quizcontent
     *
     * @apiDescription Update quizcontent information
     *
     * @apiParam {Number} ID Id of quizcontent where to update, on params
     * @apiParam {String} Quiz id of quiz
     * @apiParam {String} QuestionID  Id of question
     * @apiParam {String} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quizcontent/update/2
     *
     * @apiSuccess {String} id the ID of updated quizcontent
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"quizcontent update successfully!"
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

    app.delete('/v1/quizcontent/delete/:id', quizcontentController.deleteQuizContentById);
    /**
     * @api {DELETE} /v1/quizcontent/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup quizcontent
     * @apiPermission just admin quizcontent
     *
     * @apiDescription delete quizcontent
     *
     * @apiParam {String} id ID of quizcontent
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quizcontent/delete/7
     *
     * @apiSuccess {String} id Id of deleted quizcontent
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "quizcontent delete successfully!",
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