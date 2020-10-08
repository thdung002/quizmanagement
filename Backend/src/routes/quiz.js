const quizController =   require('../controllers/quiz');
module.exports = function (app) {
    app.get('/v1/quiz/getall', quizController.getQuiz);
    /**
     * @api {GET} /v1/quiz/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Quiz
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
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * @apiSuccess {Object} pages {current, prev, hasPrev, next, hasNext, total}
     * @apiSuccess {Object} items {begin, end, total}
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *    "result": "ok",
     *    "message": "Quiz get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "Examination": 1,
     *                "Config": 1,
     *                "Template": 1,
     *                "Code": 1,
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-22T06:12:51.000Z",
     *                "UpdatedBy": null,
     *                "UpdatedAt": "2020-10-06T02:00:18.000Z"
     *            }
     *        ],
     *        "pages": {
     *            "current": 1,
     *            "prev": 0,
     *            "hasPrev": false,
     *            "next": 2,
     *            "hasNext": true,
     *            "total": 2
     *        },
     *        "items": {
     *            "begin": 1,
     *            "end": 1,
     *            "total": 1
     *        }
     *    }
     *}
     *
     * @apiError result sucess or fail
     * @apiError message from server
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
     * 
     * @apiDescription Create quiz by admin or moderator
     *
     * @apiParam {Number} Examination Examination of the quiz (N/A)
     * @apiParam {Number} Config Config of the quiz (N/A)
     * @apiParam {Number} Template Template of the quiz(N/A)
     * @apiParam {Number} Code Code of the quiz(N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quiz/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "quiz added successfully!",
     *       "id": 9
     *     }
     *
     * @apiError result sucess or fail
     * @apiError message from server
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
     * 
     * @apiDescription Get one quiz
     *
     * @apiParam {Number} Id the ID of Examination
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/quiz/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
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
     * @apiError result sucess or fail
     * @apiError message from server
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
     *
     * @apiDescription Update Quiz information
     *
     * @apiParam {Number} ID Id of Quiz where to update, on params
     * @apiParam {Number} Examination Id Examination of Quiz
     * @apiParam {Number} Config Id config of Quiz
     * @apiParam {Number} Template Id of Quiz
     * @apiParam {Number} Code Id Code of Quiz
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/quiz/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Quiz update successfully!"
     *          "id": "1"
     *     }
     *
     * @apiError result sucess or fail
     * @apiError message from server
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
     *
     * @apiDescription delete Quiz
     *
     * @apiParam {Number} id ID of Quiz
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/cuiz/delete/7
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted Quiz
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Quiz delete successfully!",
     *          "id": "2"
     *     }
     *
     * @apiError result sucess or fail
     * @apiError message from server
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
};