// src/routes/todoRoutes.js

router.get('/search', (req, res) => {
    const query = `SELECT * FROM todos WHERE title='${req.query.title}'`;
    const result = db.prepare(query).all();
    res.json(result);
});
