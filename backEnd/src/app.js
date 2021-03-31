const express = require('express');
const routes = require('./routes');
const Database = require('./database');

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.routes(); // inicializa as rotas
  }

  routes() {
    this.server.use('/api/v1', routes); // rotas a partir de /api/v1
  }
}  

module.exports = new App();
