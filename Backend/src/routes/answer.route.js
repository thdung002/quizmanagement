const answerController =   require('../controllers/answer.controller');
module.exports = function (app) {
    app.get('/v1/answer/getall/:page', answerController.getAnswer);
    app.post('/v1/answer/add', answerController.addAnswer);
    app.get('/v1/answer/get/:id', answerController.getAnswerById);
    app.put('/v1/answer/update/:id', answerController.updateAnswerById);
    app.delete('/v1/answer/delete/:id', answerController.deleteAnswerById);
};