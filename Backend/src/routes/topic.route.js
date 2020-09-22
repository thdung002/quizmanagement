const topicController =   require('../controllers/topic.controller');
module.exports = function (app) {
    app.get('/v1/topic/get/', topicController.getTopic);
    app.post('/v1/topic/add/', topicController.addTopic);
    app.get('/v1/topic/get/:id/', topicController.getTopicById);
    app.put('/v1/topic/update/:id/', topicController.updateTopicById);
    app.delete('/v1/topic/delete/:id/', topicController.deleteTopicById);
};