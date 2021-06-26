const routes = require('express').Router();
const authMiddleware = require('./app/middlewares/auth')
const SessionController = require('./app/controllers/SessionController');
const RegisterController = require('./app/controllers/RegisterController');

// Definição de rotas

routes.post('/register', RegisterController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send()
})

module.exports = routes;