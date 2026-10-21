# System Architecture

## Backend
- **Framework**: Express.js (`src/server.js`)
- **Routing**: Modular routes (`src/routes/todoRoutes.js`)
- **Business Logic**: Service layer (`src/services/todoService.js`)
- **Data Layer**: Database models and connections (`src/models/todoModel.js`, `src/db/db.js`)

## Frontend
- Static web client hosted in `public/` (`index.html`, `about.html`, `app.js`, `style.css`).
- Communicates with the Express API via REST requests.
