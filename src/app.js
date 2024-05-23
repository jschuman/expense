const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'expense',
  password: 'password',
  port: 5432,
});

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(`Current time: ${result.rows[0].now}`);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});