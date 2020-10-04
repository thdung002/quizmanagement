const quizController =   require('../controllers/quiz.controller');
module.exports = function (app) {
    app.get('/v1/quiz/getall', quizController.getQuiz);
    /**
     * @api {GET} /v1/quiz/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Quiz
     * @apiPermission only Super administrator
     *
     * @apiDescription Get all quizs
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quiz/getall
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

    app.post('/v1/quiz/add', quizController.addQuiz);
    /**
     * @api {POST} /v1/quiz/add Create One quiz
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup Quiz
     * @apiPermission just administrator or super administrator
     *
     * @apiDescription Create quiz by admin or moderator
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quiz/add
     *
     * @apiSuccess {String} id the ID of created quiz
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "quiz added successfully!",
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


    app.get('/v1/quiz/get/:id', quizController.getQuizById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Quiz
     * @apiPermission Every type of answer
     *
     * @apiDescription Get one quiz
     *
     * @apiParam {string} id ID of examination, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/quiz/get/2
     *
     * @apiSuccess {String} Id the ID of Examination
     * @apiSuccess {Number} Examination Id of Examination
     * @apiSuccess {Number} Config Id of Config
     * @apiSuccess {Number} Template Id of Template
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "quiz get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Examination": 3,
     *              "Config": "1",
     *              "Template": "1",
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
    app.put('/v1/quiz/update/:id', quizController.updateQuizById);
    /**
     * @api {PUT} /v1/quiz/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Quiz
     * @apiPermission Every type of Quiz
     *
     * @apiDescription Update Quiz information
     *
     * @apiParam {Number} ID Id of Quiz where to update, on params
     * @apiSuccess {Number} Examination Id of Examination
     * @apiSuccess {Number} Config Id of Config
     * @apiSuccess {Number} Template Id of Template
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quiz/update/2
     *
     * @apiSuccess {Number} id the ID of updated Quiz
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Quiz update successfully!"
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

    app.delete('/v1/quiz/delete/:id', quizController.deleteQuizById);
    /**
     * @api {DELETE} /v1/quiz/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Quiz
     * @apiPermission just admin Quiz
     *
     * @apiDescription delete Quiz
     *
     * @apiParam {Number} id ID of Quiz
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/Quiz/delete/7
     *
     * @apiSuccess {Number} id Id of deleted Quiz
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Quiz delete successfully!",
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