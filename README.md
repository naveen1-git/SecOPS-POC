# To-Do App

A simple to-do application built with Node.js, Express, and SQLite (via `better-sqlite3`). It supports adding, viewing, toggling completion, and deleting to-do items, with a vanilla HTML/CSS/JS frontend served as static files.

## Features

- Add new to-do items
- View all to-do items
- Toggle completion status
- Delete to-do items
- Persistent storage via SQLite

## Configuration

Copy `.env.example` to `.env` and adjust values as needed:

```
PORT=3000
DB_PATH=./data/todos.sqlite
```

- `PORT` — the port the Express server listens on (defaults to `3000` if unset).
- `DB_PATH` — path to the SQLite database file (created automatically on first run).

## Running the app

```bash
npm install
npm start
```

For development with auto-restart on file changes:

```bash
npm run dev
```

Once running, open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | /api/health       | Health check                         |
| GET    | /api/todos        | List all todos                       |
| POST   | /api/todos        | Create a new todo (`{ "text": "..." }`) |
| PATCH  | /api/todos/:id    | Toggle completion status of a todo   |
| DELETE | /api/todos/:id    | Delete a todo                        |

## Project Structure

```
src/
  server.js           # Express app entry point
  db/db.js            # SQLite connection and schema setup
  models/todoModel.js # Data access layer
  services/todoService.js # Business logic / validation
  routes/todoRoutes.js    # Express routes for /api/todos
public/
  index.html          # Frontend markup
  style.css           # Frontend styling
  app.js              # Frontend logic (fetch-based)
```
###
Test line for scan1