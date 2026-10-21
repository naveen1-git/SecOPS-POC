require('dotenv').config();
const path = require('path');
const express = require('express');

// Initializing the DB module ensures the todos table exists before
// any feature routes (mounted in later tasks) attempt to use it.
require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is up' });
});

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
