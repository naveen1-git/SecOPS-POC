const todoModel = require('../models/todoModel');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

function listTodos() {
  return todoModel.getAll();
}

function getTodo(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new ValidationError('Invalid todo id');
  }
  const todo = todoModel.getById(numericId);
  if (!todo) {
    throw new NotFoundError(`Todo with id ${id} not found`);
  }
  return todo;
}

function createTodo(text) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new ValidationError('Text is required and cannot be empty');
  }
  return todoModel.create(text.trim());
}

function toggleTodo(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new ValidationError('Invalid todo id');
  }
  const updated = todoModel.toggleComplete(numericId);
  if (!updated) {
    throw new NotFoundError(`Todo with id ${id} not found`);
  }
  return updated;
}

function deleteTodo(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new ValidationError('Invalid todo id');
  }
  const removed = todoModel.remove(numericId);
  if (!removed) {
    throw new NotFoundError(`Todo with id ${id} not found`);
  }
  return true;
}

module.exports = {
  listTodos,
  getTodo,
  createTodo,
  toggleTodo,
  deleteTodo,
  ValidationError,
  NotFoundError,
};
