const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'f0vbXr0DPCm7gV5c',
  database: 'task_manager',

}); 

module.exports = mySqlPool;