const { Router } = require('express');
const cors = require('cors');

const TasksController = require('./app/controllers/TasksController');

var corsOptions = {
  origin: '*',
}

const routes = Router();

routes.get('/tasks', cors(corsOptions), TasksController.index);
routes.post('/tasks', cors(corsOptions), TasksController.store);
routes.put('/tasks/:id', cors(corsOptions), TasksController.update);
routes.get('/tasks/:id', cors(corsOptions), TasksController.show);
routes.delete('/tasks/:id', cors(corsOptions), TasksController.delete);

routes.post('/tasks/password', cors(corsOptions), TasksController.checkManagerPassword);
routes.post('/tasks/email/:email', cors(corsOptions), TasksController.isValidEmail);
routes.post('/tasks/complete/:id', cors(corsOptions), TasksController.completeTask);
routes.post('/tasks/redo', cors(corsOptions), TasksController.redoTask);


module.exports = routes;