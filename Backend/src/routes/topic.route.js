const express = require('express')
const router = express.Router()
const topicController =   require('../controllers/topic.controller');
router.get('/', topicController.findAll);
router.post('/', topicController.create);
router.get('/:id', topicController.findById);
router.put('/:id', topicController.update);
router.delete('/:id', topicController.delete);
module.exports = router;