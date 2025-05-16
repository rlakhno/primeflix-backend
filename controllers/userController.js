const pool = require('../db/pool');

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *',
      [firstname, lastname, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
