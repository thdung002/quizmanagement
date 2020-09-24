const userController =   require('../controllers/user.controller');
module.exports = function (app) {
    app.get('/v1/user/getall/:page', userController.getUser);
    app.post('/v1/user/add', userController.addUser);
    app.get('/v1/user/get/:id', userController.getUserById);
    app.put('/v1/user/update/:id', userController.updateUserById);
    app.delete('/v1/user/delete/:id', userController.deleteUserById);
    app.post('/v1/user/login',userController.login);
};