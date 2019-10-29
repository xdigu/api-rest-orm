
const routes = require('express').Router();
const userController = require('./controllers/user');
const addressController = require('./controllers/address');


routes.get('/users', userController.index);
routes.get('/users/:user_id', userController.getUser);
routes.post('/users', userController.storage);

routes.get('/users/:user_id/addresses', addressController.index);
routes.post('/users/:user_id/addresses', addressController.store);


module.exports = routes;
