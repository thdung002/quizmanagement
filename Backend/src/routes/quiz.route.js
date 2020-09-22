const quizController =   require('../controllers/quiz.controller');
module.exports = function (app) {
    app.get('/v1/quiz/get/', quizController.getQuiz);
    app.post('/v1/quiz/add/', quizController.addQuiz);
    app.get('/v1/quiz/get/:id/', quizController.getQuizById);
    app.put('/v1/quiz/update/:id/', quizController.updateQuizById);
    app.delete('/v1/quiz/delete/:id/', quizController.deleteQuizById);
};