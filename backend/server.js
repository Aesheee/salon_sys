
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'system'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.post('/register', (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const query = `INSERT INTO customer_info (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(query, [firstName, lastName, username, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ userId: result.insertId });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body; // Get username and password from the request body

  const query = `SELECT * FROM customer_info WHERE username = ? AND password = ?`;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      const user = results[0];
      return res.json({ userId: user.id }); // Send userId from database back to frontend
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.get('/services/:category', (req, res) => {
  const category = req.params.category;
  const query = `
    SELECT s.services_id, s.services_name, s.price 
    FROM services_info s
    JOIN services_category c ON s.services_categoryID = c.services_categoryID
    WHERE c.service_categoryName = ?`;
  
  db.query(query, [category], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/services', (req, res) => {
  const sql = 'SELECT * FROM services_info';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.post('/transactions', (req, res) => {
  const { userId, serviceId, total } = req.body;
  const query = `INSERT INTO transactions (user_id, services_id, total, status) VALUES (?, ?, ?, ?)`;
  
  db.query(query, [userId, serviceId, total, 'Confirmed'], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ recordID: result.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});