const PostgresStore = require('../utils/PostgresStore.js');

class TODO {
  static toSqlTable () {
    return ` 
        CREATE TABLE ${TODO.tableName}(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200),
        thing VARCHAR(200)
    )`;
  }

  static async create (TODOs) {
    await PostgresStore.pool.query({
      text: `INSERT INTO ${TODO.tableName}
          (name,
           thing) VALUES($1,$2)`,
      values: [TODOs.name,
        TODOs.thing]
    });
  }

  static async GetAll () {
    const result = await PostgresStore.client.query(`
      SELECT *
      FROM ${TODO.tableName}
      `);
    return result.rows;
  }

  static async DeleteById (id) {
    await PostgresStore.client.query({
      text: `DELETE FROM ${TODO.tableName}
             WHERE id = $1`,
      values: [id]
    });
  }
}

TODO.tableName = 'TODO';

module.exports = TODO
;
