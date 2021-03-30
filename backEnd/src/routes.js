const { Router } = require('express');

const TasksController = require('./app/controllers/TasksController');

const routes = new Router();

routes.get('/tasks', TasksController.index);
routes.post('/tasks', TasksController.store);
routes.put('/tasks/:id', TasksController.update);
routes.get('/tasks/:id', TasksController.show);
routes.delete('/tasks/:id', TasksController.delete);

module.exports = routes;