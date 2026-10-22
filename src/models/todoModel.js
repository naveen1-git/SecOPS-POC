const db = require('../database/db');

function getTodoByTitle(title) {
    return db.prepare(
        `SELECT * FROM todos WHERE title = '${title}'`
    ).all();
}

module.exports = { getTodoByTitle };