const questiontopicController =   require('../controllers/questiontopic');
module.exports = function (app) {
    app.get('/v1/questiontopic/getall', questiontopicController.getQuestiontopic);
    /**
     * @api {GET} /v1/questiontopic/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup questiontopic
     *
     * @apiDescription Get all questiontopics
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/questiontopic/getall
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
     *    "message": "questiontopic get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "Question": 1,
     *                "Topic": 1,
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-22T06:12:51.000Z",
     *                "UpdatedBy": 1,
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

    app.post('/v1/questiontopic/add', questiontopicController.addQuestiontopic);
    /**
     * @api {POST} /v1/questiontopic/add Create One questiontopic
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup questiontopic
     * 
     * @apiDescription Create questiontopic by admin or moderator
     *
     * @apiParam {Number} Question Id question of the questiontopic (N/A)
     * @apiParam {Number} Topic Id topic of the questiontopic (N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/questiontopic/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "questiontopic added successfully!",
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


    app.get('/v1/questiontopic/get/:id', questiontopicController.getQuestiontopicById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup questiontopic
     * 
     * @apiDescription Get one questiontopic
     *
     * @apiParam {Number} Id the ID of Examination
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/questiontopic/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "questiontopic get successfully!"
     *          "data":{
     *                "ID": 1,
     *                "Question": 1,
     *                "Topic": 1,
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-22T06:12:51.000Z",
     *                "UpdatedBy": 1,
     *                "UpdatedAt": "2020-10-06T02:00:18.000Z"
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
    app.put('/v1/questiontopic/update/:id', questiontopicController.updateQuestiontopicById);
    /**
     * @api {PUT} /v1/questiontopic/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup questiontopic
     *
     * @apiDescription Update questiontopic information
     *
     * @apiParam {Number} ID Id of questiontopic where to update, on params
     * @apiParam {Number} Question Id question of the questiontopic (N/A)
     * @apiParam {Number} Topic Id topic of the questiontopic (N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/questiontopic/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"questiontopic update successfully!"
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

    app.delete('/v1/questiontopic/delete/:id', questiontopicController.deleteQuestiontopicById);
    /**
     * @api {DELETE} /v1/questiontopic/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup questiontopic
     *
     * @apiDescription delete questiontopic
     *
     * @apiParam {Number} id ID of questiontopic
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/cuiz/delete/7
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted questiontopic
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "questiontopic delete successfully!",
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