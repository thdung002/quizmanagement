const questiontopicController =   require('../controllers/questiontopic');
module.exports = function (app) {
    app.get('/v1/questiontopic/get/', questiontopicController.getQuestiontopic);
    app.post('/v1/questiontopic/add/', questiontopicController.addQuestiontopic);
    app.get('/v1/questiontopic/get/:id/', questiontopicController.getQuestiontopicById);
    app.put('/v1/questiontopic/update/:id/', questiontopicController.updateQuestiontopicById);
    app.delete('/v1/questiontopic/delete/:id/', questiontopicController.deleteQuestiontopicById);
};