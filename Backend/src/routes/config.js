const configController =   require('../controllers/config');
module.exports = function (app) {
    app.get('/v1/config/get/', configController.getConfig);
    app.post('/v1/config/add/', configController.addConfig);
    app.get('/v1/config/get/:id/', configController.getConfigById);
    app.put('/v1/config/update/:id/', configController.updateConfigById);
    app.delete('/v1/config/delete/:id/', configController.deleteConfigById);
};