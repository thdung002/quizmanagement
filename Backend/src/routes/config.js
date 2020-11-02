const configController =   require('../controllers/config');
module.exports = function (app) {
    app.get('/v1/config/getall', configController.getConfig);
    /**
     * @api {GET} /v1/config/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Config
     *
     * @apiDescription Get all configs
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/config/getall
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
     *    "message": "Config get successfully!",
     *    "data": {
     *        "data": [
     *            {
     *                "ID": 1,
     *                "NumberQuestionLevel1": 1,
     *                "NumberQuestionLevel2": null,
     *                "NumberQuestionLevel3": null,
     *                "NumberQuestionLevel4": null,
     *                "NumberQuestionLevel5": null,
     *                "NumberQuestionLevel6": null,
     *                "NumberQuestionLevel7": null,
     *                "NumberQuestionLevel8": null,
     *                "NumberQuestionLevel9": null,
     *                "NumberQuestionLevel10": null,
     *                "TotalQuestion": 1,
     *                "CreatedBy": 1,
     *                "CreatedAt": "2020-09-22T06:04:57.000Z",
     *                "UpdatedBy": 1,
     *                "UpdatedAt": null
      *           }
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
    app.get('/v1/config/getactiveconfig', configController.getActiveConfig);
    /**
     * @api {GET} /v1/config/getactiveconfig Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Config
     * @apiPermission All user
     * @apiDescription Get all active config
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/config/getactiveconfig
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
    app.post('/v1/config/add', configController.addConfig);
    /**
     * @api {POST} /v1/config/add Create One config
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup Config
     *
     * @apiDescription Create config by admin or moderator
     *
     * @apiParam {Number} NumberQuestionLevel1-10 Total question of each level(N/A)
     * @apiParam {Number} Totalquestion Total question at all(N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/config/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "config added successfully!",
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


    app.get('/v1/config/get/:id', configController.getConfigById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Config
     *
     * @apiDescription Get one config
     *
     * @apiParam {Number} Id the ID of Config
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/config/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "config get successfully!"
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
    app.put('/v1/config/update/:id', configController.updateConfigById);
    /**
     * @api {PUT} /v1/config/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Config
     *
     * @apiDescription Update Config information
     *
     * @apiParam {Number} NumberQuestionLevel1-10 Total question of each level(N/A)
     * @apiParam {Number} Totalquestion Total question at all(N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/config/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Config update successfully!"
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

    app.delete('/v1/config/delete/:id', configController.deleteConfigById);
    /**
     * @api {DELETE} /v1/config/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Config
     *
     * @apiDescription delete Config
     *
     * @apiParam {Number} id ID of Config
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/config/delete/7
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted Config
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Config delete successfully!",
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