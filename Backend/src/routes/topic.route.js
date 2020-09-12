const topicController =   require('../controllers/topic.controller');
// const router = express.Router();
// router.get('/', topicController.findAll);
// router.post('/', topicController.create);
// router.get('/:id', topicController.findById);
// router.put('/:id', topicController.update);
// router.delete('/:id', topicController.delete);
// module.exports = router;
module.exports = function (app) {
    app.get('/v1/topic/get/', topicController.getTopic);
    app.post('/v1/topic/add/', topicController.addTopic);
    app.get('/v1/topic/get/:id/', topicController.getTopicById);
    app.put('/v1/topic/update/:id/', topicController.updateTopicById);
    app.delete('/v1/topic/delete/:id/', topicController.deleteTopicById);
};