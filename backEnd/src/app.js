const express = require('express');
const routes = require('./routes');
const cors = require('cors');
class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.cors();
    this.routes(); // inicializa as rotas
  }

  routes() {
    this.server.use('/api/v1', routes); // rotas a partir de /api/v1
  }

  cors() {
    this.server.use(cors())
  }
}  

module.exports = new App();
