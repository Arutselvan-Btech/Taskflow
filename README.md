# TaskFlow – Advanced MERN To-Do App

A full-stack To-Do List application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **JWT Authentication** — Register, login, protected routes
- **Full CRUD** — Create, read, update, delete tasks via REST API
- **Task Status Workflow** — Pending → In-Progress → Completed (click the checkbox to cycle)
- **Priority Levels** — Low, Medium, High with color indicators
- **Due Dates & Tags** — Per-task metadata with overdue highlighting
- **Filtering** — Filter by status, priority, or free-text search
- **Sorting** — Newest, oldest, due date, title, priority
- **Pagination** — Server-side, 10 per page (configurable)
- **Server-side Validation** — express-validator on every endpoint
- **Stats Dashboard** — Live counts and completion progress bar
- **Responsive UI** — Works on mobile and desktop

---

## Project Structure

```
todo-app/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT protect middleware
│   │   └── validate.js      # express-validator error handler
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/
    │   │   ├── FiltersBar.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── StatsBar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── context/AuthContext.jsx
    │   ├── hooks/useTasks.js
    │   ├── pages/
    │   │   ├── AuthPage.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    └── package.json
```

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env from example
cp .env.example .env
# Edit .env: set MONGODB_URI and JWT_SECRET

npm run dev   # starts on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start     # starts on http://localhost:3000
```

The React app proxies `/api` requests to `localhost:5000` automatically.

---

## REST API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login, receive JWT |
| GET | /api/auth/me | ✅ | Get current user |

### Tasks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/tasks | ✅ | List tasks (paginated, filtered, sorted) |
| GET | /api/tasks/stats | ✅ | Get task counts by status |
| GET | /api/tasks/:id | ✅ | Get single task |
| POST | /api/tasks | ✅ | Create task |
| PUT | /api/tasks/:id | ✅ | Update task |
| DELETE | /api/tasks/:id | ✅ | Delete task |

#### GET /api/tasks query params
| Param | Type | Example |
|-------|------|---------|
| status | string | `Pending`, `In-Progress`, `Completed` |
| priority | string | `Low`, `Medium`, `High` |
| search | string | `fix bug` |
| sortBy | string | `createdAt`, `dueDate`, `title`, `priority` |
| order | string | `asc`, `desc` |
| page | number | `1` |
| limit | number | `10` (max 50) |

---

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```
