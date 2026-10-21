const db = require('../db/db');

function rowToTodo(row) {
  if (!row) return null;
  return {
    id: row.id,
    text: row.text,
    completed: !!row.completed,
    created_at: row.created_at,
  };
}

function getAll() {
  const stmt = db.prepare('SELECT id, text, completed, created_at FROM todos ORDER BY id ASC');
  const rows = stmt.all();
  return rows.map(rowToTodo);
}

function getById(id) {
  const stmt = db.prepare('SELECT id, text, completed, created_at FROM todos WHERE id = ?');
  const row = stmt.get(id);
  return rowToTodo(row);
}

function create(text) {
  const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, 0)');
  const info = stmt.run(text);
  return getById(info.lastInsertRowid);
}

function toggleComplete(id) {
  const existing = getById(id);
  if (!existing) {
    return null;
  }
  const newCompleted = existing.completed ? 0 : 1;
  const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
  stmt.run(newCompleted, id);
  return getById(id);
}

function remove(id) {
  const existing = getById(id);
  if (!existing) {
    return false;
  }
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  stmt.run(id);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  toggleComplete,
  remove,
};
