const typeController =   require('../controllers/type');
module.exports = function (app) {
    app.get('/v1/type/getall', typeController.getType);
    /**
     * @api {GET} /v1/type/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup type
     *
     * @apiDescription Get all types
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/type/getall
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
     *    "message": "type get successfully!",
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

    app.post('/v1/type/add', typeController.addType);
    /**
     * @api {POST} /v1/type/add Create One Type
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup type
     * 
     * @apiDescription Create type by admin or moderator
     *
     * @apiParam {String} Content Content of the type (N/A)
     * @apiParam {Number} Level Level of the type (N/A)
     * @apiParam {String} Type Template of the type(N/A)
     * @apiParam {Number} accessID ID of current user(N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/type/add
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item created
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "type added successfully!",
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


    app.get('/v1/type/get/:id', typeController.getTypeById);
    /**
     * @api {GET} /v1/answer/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup type
     * 
     * @apiDescription Get one type
     *
     * @apiParam {Number} Id the ID of Examination
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/type/get/2
     *
     * @apiSuccess {String} result sucess or fail
     * @apiSuccess {String} message from server
     * @apiSuccess {Object[]} data the list of data
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "type get successfully!"
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
    app.put('/v1/type/update/:id', typeController.updateTypeById);
    /**
     * @api {PUT} /v1/type/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup type
     *
     * @apiDescription Update type information
     *
     * @apiParam {Number} ID Id of type where to update, on params
     * @apiParam {String} Content Content of the type
     * @apiParam {Number} Level Level of the type
     * @apiParam {String} Type Template of the type
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/type/update/2
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess id of item updated
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"type update successfully!"
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

    app.delete('/v1/type/delete/:id', typeController.deleteTypeById);
    /**
     * @api {DELETE} /v1/type/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup type
     *
     * @apiDescription delete type
     *
     * @apiParam {Number} id ID of type
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/cuiz/delete/7
     *
     * @apiSuccess result sucess or fail
     * @apiSuccess message from server
     * @apiSuccess {Number} id Id of deleted type
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Type delete successfully!",
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