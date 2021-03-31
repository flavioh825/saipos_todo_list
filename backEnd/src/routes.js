const { Router } = require('express');

const TasksController = require('./app/controllers/TasksController');

const routes = Router();

routes.get('/tasks', TasksController.index);
routes.post('/tasks', TasksController.store);
routes.put('/tasks/:id', TasksController.update);
routes.get('/tasks/:id', TasksController.show);
routes.delete('/tasks/:id', TasksController.delete);

routes.post('/tasks/password', TasksController.checkManagerPassword);
routes.post('/tasks/email/:email', TasksController.isValidEmail);
routes.post('/tasks/complete/:id', TasksController.completeTask);
routes.post('/tasks/redo', TasksController.redoTask);


module.exports = routes;