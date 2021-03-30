const express = require('express');
const routes = require('./routes');
const Database = require('./database');

class App {
  constructor() {
    this.server = express();

    this.database(); // inicializa o database
    this.routes(); // inicializa as rotas
  }

  database() {
    return new Database();
  }

  routes() {
    this.server.use(routes);
  }
}  

module.exports = new App().server;
