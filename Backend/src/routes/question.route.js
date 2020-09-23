const questionController =   require('../controllers/question.controller');
module.exports = function (app) {
    app.get('/v1/question/get/', questionController.getQuestion);
    app.post('/v1/question/add/', questionController.addQuestion);
    app.get('/v1/question/get/:id/', questionController.getQuestionById);
    app.put('/v1/question/update/:id/', questionController.updateQuestionById);
    app.delete('/v1/question/delete/:id/', questionController.deleteQuestionById);
};