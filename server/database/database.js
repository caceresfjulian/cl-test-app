const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'bLnlVj@*SlcF',
  database: 'database_images'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  }
  if (connection) connection.release();
  console.log('DB conectada');
  return; 
})

//To use promises instead of callbacks
pool.query = promisify(pool.query);

module.exports = pool; 