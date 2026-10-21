const API_URL = '/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.textContent = '';
  errorMessage.hidden = true;
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleTodo(todo.id));

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = todo.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function renderTodos(todos) {
  list.innerHTML = '';
  if (!todos || todos.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No todos yet. Add one above!';
    list.appendChild(empty);
    return;
  }
  todos.forEach((todo) => {
    list.appendChild(createTodoElement(todo));
  });
}

async function loadTodos() {
  try {
    clearError();
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to load todos');
    }
    const todos = await response.json();
    renderTodos(todos);
  } catch (err) {
    showError(err.message);
  }
}

async function addTodo(text) {
  try {
    clearError();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to add todo');
    }
    await loadTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function toggleTodo(id) {
  try {
    clearError();
    const response = await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to update todo');
    }
    await loadTodos();
  } catch (err) {
    showError(err.message);
  }
}

async function deleteTodo(id) {
  try {
    clearError();
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to delete todo');
    }
    await loadTodos();
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    showError('Please enter some text');
    return;
  }
  addTodo(text);
  input.value = '';
});

document.addEventListener('DOMContentLoaded', loadTodos);
