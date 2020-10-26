const questionController =   require('../controllers/question');
module.exports = function (app) {
    app.get('/v1/question/getall', questionController.getQuestion);
    /**
     * @api {GET} /v1/question/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup question
     *
     * @apiDescription Get all questions
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *@apiParam {String} content Content of question to get
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/question/getall
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
     *    "message": "question get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "Content": 1,
     *                "Level": 1,
     *                "Type": 1,
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
    app.get('/v1/question/getactive', questionController.getActive);
    /**
     * @api {GET} /v1/question/getactive Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup question
     *
     * @apiDescription Get all questions
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/question/getactive
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *    "result": "ok",
     *    "message": "question get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "Content": 1,
     *                "Level": 1,
     *                "Type": 1,
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-22T06:12:51.000Z",
     *                "UpdatedBy": null,
     *                "UpdatedAt": "2020-10-06T02:00:18.000Z"
     *            }
     *        ],
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

    app.post('/v1/question/add', questionController.addQuestion);
    /**
     * @api {POST} /v1/question/add Create One question
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup question
     * 
     * @apiDescription Create question by admin or moderator
     *
     * @apiParam {String} Content Content of the question (N/A)
     * @apiParam {Number} Level Level of the question (N/A)
     * @apiParam {String} Type Template of the question(N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/question/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "question added successfully!",
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


    app.get('/v1/question/get/:id', questionController.getQuestionById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup question
     * 
     * @apiDescription Get one question
     *
     * @apiParam {Number} Id the ID of Examination
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/question/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "question get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Content": 3,
     *              "Level": "1",
     *              "Type": "1",
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
    app.put('/v1/question/update/:id', questionController.updateQuestionById);
    /**
     * @api {PUT} /v1/question/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup question
     *
     * @apiDescription Update question information
     *
     * @apiParam {Number} ID Id of question where to update, on params
     * @apiParam {String} Content Content of the question
     * @apiParam {Number} Level Level of the question
     * @apiParam {String} Type Template of the question
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/question/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Question update successfully!"
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

    app.delete('/v1/question/delete/:id', questionController.deleteQuestionById);
    /**
     * @api {DELETE} /v1/question/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup question
     *
     * @apiDescription delete question
     *
     * @apiParam {Number} id ID of question
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/cuiz/delete/7
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted question
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Question delete successfully!",
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