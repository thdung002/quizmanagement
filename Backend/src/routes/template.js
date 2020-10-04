const template =   require('../controllers/template');
module.exports = function (app) {
    app.get('/v1/template/getall', template.getTemplate);
    /**
     * @api {GET} /v1/template/getall Get All List
     * @apiVersion 1.0.0
     * @apiName get all template
     * @apiGroup Template
     * @apiPermission only Super administrator
     *
     * @apiDescription Get all Templates
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/template/getall
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

    app.post('/v1/template/add', template.addTemplate);
    /**
     * @api {POST} /v1/template/add Create One Template
     * @apiVersion 1.0.0
     * @apiName create template
     * @apiGroup Template
     * @apiPermission just administrator or super administrator
     *
     * @apiDescription Create Template by admin or moderator
     *
     * @apiParam {String} TemplateName name of the template
     * @apiParam {String} Description description about template
     * @apiParam {String} HeaderContent a long html content for head - get in examination
     * @apiParam {String} Quiz Quiz content
     * @apiParam {String} QuestionContent a long html content for question
     * @apiParam {String} AnswerContent a long html content for answer
     * @apiParam {String} FooterContent a long html for footer content
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/template/add
     *
     * @apiSuccess {String} id the ID of created Template
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": "ok",
     *       "message": "Template added successfully!",
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


    app.get('/v1/template/get/:id', template.getTemplateById);
    /**
     * @api {GET} /v1/template/get/:id Get One
     * @apiVersion 1.0.0
     * @apiName get one template by id
     * @apiGroup Template
     * @apiPermission Every type of user
     *
     * @apiDescription Get one Template
     *
     * @apiParam {string} id ID of question, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/v1/templates/get/2
     *
     * @apiSuccess {String} Id the ID of Template
     * @apiSuccess {Number} Question Id of question
     * @apiSuccess {String} Content Template content
     * @apiSuccess {String} CorrectTemplate Template for filling question
     * @apiSuccess {Number} IsCorrect correct Template for multiple choice, 1 is correct, 0 is fail
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message" "Template get successfully!"
     *          "data":{
     *              "ID": 1,
     *              "Question": 3,
     *              "Content": "This is Template B",
     *              "CorrectTemplate": "This is column 2",
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
    app.put('/v1/template/update/:id', template.updateTemplateById);
    /**
     * @api {PUT} /v1/template/update/:id Update One
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Template
     * @apiPermission Every type of user
     *
     * @apiDescription Update Template information
     *
     * @apiParam {Number} ID Id of Template where to update, on params
     * @apiParam {String} TemplateName name of the template
     * @apiParam {String} Description description about template
     * @apiParam {String} HeaderContent a long html content for head - get in examination
     * @apiParam {String} Quiz Quiz content
     * @apiParam {String} QuestionContent a long html content for question
     * @apiParam {String} AnswerContent a long html content for answer
     * @apiParam {String} FooterContent a long html for footer content
     * @apiParam {Number} accessID ID of current user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/template/update/2
     *
     * @apiSuccess {String} id the ID of updated Template
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result":"ok",
     *          "message":"Template update successfully!"
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

    app.delete('/v1/template/delete/:id', template.deleteTemplateById);
    /**
     * @api {DELETE} /v1/template/delete/:id Delete One
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Template
     * @apiPermission just admin Template
     *
     * @apiDescription delete Template
     *
     * @apiParam {String} id ID of Template, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:5000/v1/template/delete/7
     *
     * @apiSuccess {String} id Id of deleted Template
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "result": "ok",
     *          "message": "Template delete successfully!",
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