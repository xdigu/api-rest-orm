
const routes = require('express').Router();
const userController = require('./controllers/user');
const addressController = require('./controllers/address');


routes.get('/users', userController.index);
routes.get('/users/:user_id', userController.getUser);
routes.post('/users', userController.storage);
routes.put('/users/:user_id', userController.updateUser);
routes.delete('/users/:user_id', userController.deleteUser);

routes.get('/users/:user_id/addresses', addressController.index);
routes.post('/users/:user_id/addresses', addressController.store);
routes.put('/users/:user_id/addresses/:address_id', addressController.updateAdress);
routes.delete('/users/:user_id/addresses/:address_id', addressController.deleteAdress);


module.exports = routes;
