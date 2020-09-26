const userController = require('../controllers/user.controller');
module.exports = function (app) {
    app.get('/v1/user/getall', userController.getUser);
    /**
     * @api {GET} /v1/user/getall Get All List
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup User
     * @apiPermission only Super administrator
     *
     * @apiDescription Get all users
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/user/getall
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

    app.post('/v1/user/add', userController.addUser);
    /**
     * @api {POST} /v1/users/add Create One account
     * @apiVersion 1.0.0
     * @apiName createByAdmin
     * @apiGroup User
     * @apiPermission just administrator or super administrator
     *
     * @apiDescription Create user by admin or moderator
     *
     * @apiParam {string} Username a unique string with 6 <= length <= 64
     * @apiParam {String} password a string with 6 <= length <= 64
     * @apiParam {string} email unique email
     * @apiParam {Number} accessUserRole a role number of creator
     * @apiParam {Number} accessID an id of creator
     * @apiParam {String} Fullname a name of user
     * @apiParam {Number} Role a role of user(from 1 to 3) 1 is super admin, 2 is admin, 3 is teacher/normal user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/users/add
     *
     * @apiSuccess {String} id the ID of created user
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "User added successfully!",
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

    app.get('/v1/user/get/:id', userController.getUserById);
    /**
     * @api {GET} /v1/user/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup User
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get one user
     *
     * @apiParam {string} id ID of user, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/users/get/2
     *
     * @apiSuccess {String} id the ID of user
     * @apiSuccess {String} Username login name of user
     * @apiSuccess {String} Fullname display name of user
     * @apiSuccess {String} Email email of user
     * @apiSuccess {String} Role role of user
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "Id": 2,
     *              "Username": "dung",
     *              "Fullname": "THD",
     *              "Email": "thdung002@gmail.com",
     *              "Role": "1",
     *          },
     *          "result": "ok",
     *          "message" "User get successfully!"
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

    app.put('/v1/user/update/:id', userController.updateUserById);
    /**
     * @api {PUT} /v1/user/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup User
     * @apiPermission Every type of user
     *
     * @apiDescription Update user information
     *
     * @apiParam {String} id ID of user, on params
     * @apiParam {String} loginName login name of user
     * @apiParam {String} email email of user
     * @apiParam {String} firstName first name of user
     * @apiParam {String} lastName last name of user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/user/update/2
     *
     * @apiSuccess {String} id the ID of updated user
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"User update successfully!"
     *          "data":{
     *              "id": "2"
     *          },
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

    app.delete('/v1/user/delete/:id', userController.deleteUserById);
    /**
     * @api {DELETE} /v1/user/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup User
     * @apiPermission just admin user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription delete user
     *
     * @apiParam {String} id ID of user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/user/delete/7
     *
     * @apiSuccess {String} id Id of deleted user
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "User delete successfully!",
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

    app.post('/v1/user/login', userController.login);
    /**
     * @api {POST} /v1/user/login Login
     * @apiVersion 1.0.0
     * @apiName login
     * @apiGroup User
     * @apiPermission Every one
     *
     * @apiDescription login
     *
     * @apiParam {string} loginName a string with length <= 64
     * @apiParam {String} password a string with 4 < length < 64
     *
     * @apiExample Example usage:
     * curl -i http://localhost:500/v1/user/login
     *
     * @apiSuccess {object} data the user data
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data":{
     *          "Id":2,
     *          "Role": "1",
     *          "Username": "dung",
     *          "Fullname": "THD"
     *          "Email": "thdung002@gmail.com",
     *          "Password": "$2a$10$i/xSopS23baiJRcGRJgcteqJKhkYpV2VQSIaWemtCaRcRp8tR.3EW",
     *       },
     *       "result": "ok",
     *       "message":"User login successfully!"
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */

};