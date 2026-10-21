# Spec Context — Task 2
**Generated:** 2026-09-18  |  **Framework:** Empty Project Default  |  **Tasks:** 2

## Gap Analysis Summary
This is a **Greenfield** project — the repository contains only a placeholder `README.md` from an "Empty Project Template" with no source code, dependencies, or prior architecture. The requirement is to build a "simple to-do application" supporting add, view, toggle-complete, and delete operations on to-do items, backed by persistent storage and a basic UI. Since no tech stack was mandated ("Empty Project Default") and none exists in the repo, the stack is selected fresh for simplicity: **Node.js + Express** for the backend/API layer, **better-sqlite3** for lightweight file-based persistence, and a **vanilla HTML/CSS/JS** static frontend served by Express. All requirements are classified as New Development — every file in this plan is newly created except the placeholder `README.md`, which is optionally updated at the end.

## Task Plan

### Module: Core Infrastructure

#### Feature: Project Scaffolding

**T-001: Scaffold Node.js/Express server with SQLite database initialization**
- **Description:** Create the foundational project skeleton for the to-do application from an empty repository. Set up `package.json` with dependencies (`express`, `better-sqlite3`, `dotenv`) and npm scripts (`start`, `dev`). Create the Express application entry point `src/server.js` that reads configuration from environment variables (via `dotenv`), serves static files from a `public/` directory, exposes a `GET /api/health` endpoint for smoke-testing, and listens on `PORT`. Create `src/db/db.js` which initializes a `better-sqlite3` connection to a file at path `DB_PATH`, and on startup runs a `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT (datetime('now')))` statement so the schema exists before any feature code runs. Create `.env.example` documenting `PORT` and `DB_PATH`, and a `.gitignore` excluding `node_modules/`, `.env`, and the generated `*.sqlite` database file. This task establishes the shared infrastructure (server bootstrap + DB connection) that the Todo CRUD feature (T-002) will build on top of.
- **Files to create:** package.json, src/server.js, src/db/db.js, .env.example, .gitignore
- **Files to modify:** None
- **Depends on:** None
- **Acceptance criteria:**
  - Running `npm install` succeeds and installs `express`, `better-sqlite3`, `dotenv`.
  - Running `npm start` launches the server without errors and it listens on the port defined by `PORT` (defaulting to 3000 if unset).
  - `GET /api/health` returns HTTP 200 with a JSON body indicating the server is up.
  - On server startup, the SQLite file at `DB_PATH` is created (if not already present) and contains a `todos` table with columns `id, text, completed, created_at`.
  - `.env.example` documents both `PORT` and `DB_PATH` with example values.
- **Wiring:**
  - Imports from: None
  - Imported by: src/db/db.js (used by T-002's src/models/todoModel.js), src/server.js (extended by T-002 to mount todo routes)
  - API routes: GET /api/health
  - DB tables: todos (schema created here, used by T-002)
  - Env vars: PORT, DB_PATH

---

### Module: Todo Management

#### Feature: Todo CRUD

**T-002: Implement full to-do tracking — model, service, API endpoints, and UI**
- **Description:** Build the complete vertical slice for managing to-do items on top of the infrastructure from T-001. Create `src/models/todoModel.js` exposing functions (`getAll`, `create`, `toggleComplete`, `remove`) that execute prepared statements against the `todos` table via the shared connection in `src/db/db.js`. Create `src/services/todoService.js` wrapping the model with light validation (e.g., rejecting empty `text`). Create `src/routes/todoRoutes.js` defining an Express router with `GET /`, `POST /`, `PATCH /:id`, and `DELETE /:id` handlers that call the service layer and return JSON. Modify `src/server.js` (created in T-001) to import and mount this router at `/api/todos`. Create the frontend: `public/index.html` (a single page with an input + add button and a list container), `public/style.css` (minimal styling including a strikethrough/dimmed style for completed items), and `public/app.js` (vanilla JS using `fetch` to call the API — load the list on page load, POST new items, PATCH to toggle completion on checkbox click, DELETE on button click — and re-render the list without a full page reload). Optionally update the root `README.md` to briefly describe the new to-do application, how to configure `.env`, and how to run it (`npm install && npm start`).
- **Files to create:** src/models/todoModel.js, src/services/todoService.js, src/routes/todoRoutes.js, public/index.html, public/style.css, public/app.js
- **Files to modify:** src/server.js, README.md
- **Depends on:** T-001
- **Acceptance criteria:**
  - `POST /api/todos` with JSON body `{ "text": "Buy milk" }` returns HTTP 201 with the created todo object (`id`, `text`, `completed: false`, `created_at`), and the row is persisted in the SQLite `todos` table.
  - `POST /api/todos` with empty/missing `text` returns HTTP 400 with an error message.
  - `GET /api/todos` returns HTTP 200 with a JSON array of all persisted todo items, newest or insertion order.
  - `PATCH /api/todos/:id` toggles the `completed` field for the given id and returns HTTP 200 with the updated object; a non-existent id returns HTTP 404.
  - `DELETE /api/todos/:id` removes the row from the `todos` table and returns HTTP 204; a non-existent id returns HTTP 404.
  - Opening `public/index.html` in a browser (served by the Express static middleware) fetches and displays all existing todos on load.
  - Typing text and clicking "Add" calls `POST /api/todos` and the new item appears in the list without a full page reload.
  - Clicking a todo's checkbox calls `PATCH /api/todos/:id` and the UI immediately reflects the completed state (e.g., strikethrough styling).
  - Clicking a todo's delete button calls `DELETE /api/todos/:id` and the item is removed from the UI list immediately.
- **Wiring:**
  - Imports from: src/db/db.js (T-001), src/models/todoModel.js, src/services/todoService.js, src/routes/todoRoutes.js, src/server.js (T-001, modified here)
  - Imported by: src/server.js (mounts src/routes/todoRoutes.js)
  - API routes: GET /api/todos, POST /api/todos, PATCH /api/todos/:id, DELETE /api/todos/:id
  - DB tables: todos
  - Env vars: PORT (indirectly, via server), DB_PATH (indirectly, via db.js)

---

## Machine-Readable Task Plan

```json
{
  "modules": [
    {
      "module": "Core Infrastructure",
      "features": [
        {
          "feature": "Project Scaffolding",
          "tasks": [
            {
              "id": "T-001",
              "name": "Scaffold Node.js/Express server with SQLite database initialization",
              "description": "Create the foundational project skeleton: package.json with express, better-sqlite3, dotenv dependencies and start/dev scripts; src/server.js Express entry point serving static files from public/, exposing GET /api/health, and listening on PORT; src/db/db.js initializing a better-sqlite3 connection to DB_PATH and creating the todos table (id, text, completed, created_at) if it does not exist; .env.example documenting PORT and DB_PATH; .gitignore excluding node_modules, .env, and the sqlite db file. Establishes shared infrastructure for the Todo CRUD feature.",
              "files_to_create": ["package.json", "src/server.js", "src/db/db.js", ".env.example", ".gitignore"],
              "files_to_modify": [],
              "depends_on": [],
              "acceptance_criteria": [
                "npm install succeeds and installs express, better-sqlite3, dotenv",
                "npm start launches the server without errors listening on PORT (default 3000)",
                "GET /api/health returns HTTP 200 with a JSON status body",
                "SQLite file at DB_PATH is created on startup with a todos table containing id, text, completed, created_at columns",
                ".env.example documents PORT and DB_PATH with example values"
              ],
              "status": "pending",
              "wiring": {
                "imports_from": [],
                "imported_by": ["src/db/db.js", "src/server.js"],
                "api_routes": ["GET /api/health"],
                "db_tables": ["todos"],
                "env_vars": ["PORT", "DB_PATH"]
              }
            }
          ]
        }
      ]
    },
    {
      "module": "Todo Management",
      "features": [
        {
          "feature": "Todo CRUD",
          "tasks": [
            {
              "id": "T-002",
              "name": "Implement full to-do tracking — model, service, API endpoints, and UI",
              "description": "Build the complete vertical slice for to-do management: src/models/todoModel.js (getAll, create, toggleComplete, remove against the todos table); src/services/todoService.js wrapping the model with validation; src/routes/todoRoutes.js exposing GET/POST /api/todos and PATCH/DELETE /api/todos/:id; modify src/server.js to mount the router at /api/todos; public/index.html, public/style.css, public/app.js implementing a vanilla JS frontend that lists, adds, toggles, and deletes todos via fetch calls without full page reloads. Optionally update README.md with usage instructions.",
              "files_to_create": ["src/models/todoModel.js", "src/services/todoService.js", "src/routes/todoRoutes.js", "public/index.html", "public/style.css", "public/app.js"],
              "files_to_modify": ["src/server.js", "README.md"],
              "depends_on": ["T-001"],
              "acceptance_criteria": [
                "POST /api/todos with {text} returns 201 with created todo object and persists it in SQLite",
                "POST /api/todos with empty/missing text returns 400",
                "GET /api/todos returns 200 with an array of persisted todo items",
                "PATCH /api/todos/:id toggles completed and returns 200 with updated object; 404 for non-existent id",
                "DELETE /api/todos/:id removes the row and returns 204; 404 for non-existent id",
                "index.html loads and displays existing todos on page load via fetch",
                "Adding a todo via the UI form updates the list without a full page reload",
                "Toggling a todo's checkbox updates completed state visually (e.g., strikethrough) via PATCH",
                "Deleting a todo via the UI removes it from the list via DELETE"
              ],
              "status": "pending",
              "wiring": {
                "imports_from": ["src/db/db.js", "src/models/todoModel.js", "src/services/todoService.js", "src/routes/todoRoutes.js", "src/server.js"],
                "imported_by": ["src/server.js"],
                "api_routes": ["GET /api/todos", "POST /api/todos", "PATCH /api/todos/:id", "DELETE /api/todos/:id"],
                "db_tables": ["todos"],
                "env_vars": ["PORT", "DB_PATH"]
              }
            }
          ]
        }
      ]
    }
  ]
}
```
