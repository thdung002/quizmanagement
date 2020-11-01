const topicController =   require('../controllers/topic');
module.exports = function (app) {
    app.get('/v1/topic/getall', topicController.getTopic);
    /**
     * @api {GET} /v1/topic/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Topic
     *
     * @apiDescription Get all topics
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/topic/getall
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
     *    "message": "Topic get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "Content": "hehe",
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-10T02:46:21.000Z",
     *                "UpdatedBy": 1,
     *                "UpdatedAt": "2020-09-11T03:01:53.000Z"
     *            }
     *        ],
     *        "pages": {
     *            "current": 1,
     *            "prev": 0,
     *            "hasPrev": false,
     *            "next": 2,
     *            "hasNext": true,
     *            "total": 5
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
    app.get('/v1/topic/getactivetopic', topicController.getActiveTopic);
    /**
     * @api {GET} /v1/topic/getactivetopic Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Topic
     * @apiPermission All user
     * @apiDescription Get all active topic
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/answer/getactivetopic
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
    app.post('/v1/topic/add', topicController.addTopic);
    /**
     * @api {POST} /v1/topic/add Create One topic
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup topic
     * 
     * @apiDescription Create topic by admin or moderator
     *
     * @apiParam {String} Content Content of the topic (N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/topic/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "Topic added successfully!",
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


    app.get('/v1/topic/get/:id', topicController.getTopicById);
    /**
     * @api {GET} /v1/topic/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup topic
     * 
     * @apiDescription Get one topic
     *
     * @apiParam {Number} Id the ID of Examination
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/topic/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "Topic get successfully!"
     *          "data":{
     *              "ID": 2,
     *              "Content": "testgfhgf",
     *              "CreatedBy": 1,
     *              "CreatedAt": "2020-09-10T02:49:34.000Z",
     *              "UpdatedBy": 1,
     *              "UpdatedAt": "2020-09-10T02:49:34.000Z"
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
    app.put('/v1/topic/update/:id', topicController.updateTopicById);
    /**
     * @api {PUT} /v1/topic/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup topic
     *
     * @apiDescription Update topic information
     *
     * @apiParam {Number} ID Id of Topic where to update, on params
     * @apiParam {Number} Content Content of topic
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/topic/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Topic update successfully!"
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

    app.delete('/v1/topic/delete/:id', topicController.deleteTopicById);
    /**
     * @api {DELETE} /v1/topic/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup topic
     *
     * @apiDescription delete topic
     *
     * @apiParam {Number} id ID of topic
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/topic/delete/6
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted topic
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Topic delete successfully!",
     *          "id": "6"
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