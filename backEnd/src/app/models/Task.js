const db = require('../../database');

class Task {

  async get() {
    const conn = await db.connect();
    let sql = `SELECT id, description, owner, email, completed, done FROM tasks`;

    return await conn.query(sql);
  }

  async getById(id) {
    const conn = await db.connect();
    let sql = `SELECT id, description, owner, email, completed, done 
      FROM tasks WHERE id=? LIMIT 1`;

    return await conn.query(sql, id);
  }

  async insert(value) {
    const conn = await db.connect();

    let values = [ 
      value.description, 
      value.owner, 
      value.email,
    ];

    let sql = `INSERT INTO tasks (description, owner, email) VALUES (?,?,?);`;

    return await conn.query(sql, values);
  }

  async update(value, id) {
    const conn = await db.connect();

    let values = [ 
      value.description, 
      value.owner, 
      value.email,
      value.completed,
      value.done,
      id
    ];

    let sql = `UPDATE tasks SET description=?, owner=?, email=?, completed=?, done=?
      WHERE id=?;`;

    return await conn.query(sql, values);
  }

  async destroy(id) {
    const conn = await db.connect();

    let sql = `DELETE FROM tasks WHERE id=?`;

    return await conn.query(sql, id);
  }

  async markAsComplete(completed, done, id) {
    const conn = await db.connect();
    let values = [completed, done, id];
    let sql = `UPDATE tasks SET completed=?, done=? WHERE id=?;`;

    return await conn.query(sql, values);
  }

  async markAsPending(id) {
    const conn = await db.connect();
    let values = [null, id];
    let sql = `UPDATE tasks SET done=? WHERE id=?;`;

    return await conn.query(sql, values);
  }
}

module.exports = new Task();