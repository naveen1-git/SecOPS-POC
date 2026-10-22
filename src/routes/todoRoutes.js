const express = require('express');
const router = express.Router();
const db = require('../database/db');

// INTENTIONALLY VULNERABLE - FOR SONARQUBE TESTING ONLY
router.get('/search', (req, res) => {
    const query =
        `SELECT * FROM todos WHERE title = '${req.query.title}'`;

    const result = db.prepare(query).all();

    res.json(result);
});

module.exports = router;