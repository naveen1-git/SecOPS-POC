const express = require('express');
const todoService = require('../services/todoService');

const router = express.Router();

function handleError(err, res) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}

router.get('/', (req, res) => {
  try {
    const todos = todoService.listTodos();
    res.status(200).json(todos);
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/:id', (req, res) => {
  try {
    const todo = todoService.getTodo(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/', (req, res) => {
  try {
    const { text } = req.body || {};
    const todo = todoService.createTodo(text);
    res.status(201).json(todo);
  } catch (err) {
    handleError(err, res);
  }
});

router.patch('/:id', (req, res) => {
  try {
    const todo = todoService.toggleTodo(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/:id', (req, res) => {
  try {
    todoService.deleteTodo(req.params.id);
    res.status(204).send();
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
