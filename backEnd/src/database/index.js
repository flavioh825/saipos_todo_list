const mysql = require('mysql2/promise');

class Database {

  async connect(){
    if(global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'saipos_test',
      password: ""
    });

    console.log("MySQL connected!");
    
    global.connection = connection;
    return connection;
  }
}

module.exports = new Database();