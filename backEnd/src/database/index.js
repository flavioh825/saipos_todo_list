const mysql = require('mysql2');

class Database {
  constructor() {
    this.init()
  }

  init() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'saipos_test'
    });
  }
}

module.exports = Database;