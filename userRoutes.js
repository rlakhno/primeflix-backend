const express = require('express');
const router = express.Router();
const pool = require('./db'); // Import PostgreSQL pool

const bcrypt = require('bcryptjs');

// Signup endpoint
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.rows[0].password_hash);

    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch user details endpoint, update as needed
router.get('/user/:id', async (req, res) => {
  // Implement fetch user details logic
});

// Update user details endpoint, update as needed
router.put('/user/:id', async (req, res) => {
  // Implement update user details logic
});

// Delete user endpoint, update as needed
router.delete('/user/:id', async (req, res) => {
  // Implement delete user logic
});

module.exports = router;
