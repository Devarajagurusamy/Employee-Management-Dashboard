# Phase 0 — Project Setup

## Objective

Set up the initial MERN Employee Management Dashboard project structure and development environment **without implementing any business functionality**.

The goal of this phase is only to establish:

```text
React Frontend
      │
      │ Axios / HTTP
      ▼
Node.js + Express Backend
      │
      │ Mongoose
      ▼
MongoDB
```

At the end of Phase 0:

- Frontend should run successfully.
- Backend should run successfully.
- MongoDB connection should be configured.
- Frontend should be able to communicate with backend.
- Environment variables should be configured.
- Folder structure should be clean and ready for Phase 1.
- No authentication or employee functionality should be added yet.

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the entire `AGENT.md`.
2. Treat it as the highest-level project instruction.
3. Follow its technology stack, architecture, naming, security, dependency, and coding rules.
4. Do not introduce an alternative architecture without explicit approval.

The project must remain an **Employee Management Dashboard**.

Do not carry over any concepts from the previous e-commerce project.

For example, do not create:

```text
products/
cart/
orders/
payments/
wishlist/
product models/
```

Those concepts are not part of this project.

---

# 2. Existing Project Safety Rule

Before modifying anything, inspect the current project.

Determine:

```text
Is this a new project?
OR
Is there already an existing React/Node project?
```

### If it is a completely new project

Create the required project structure.

### If an existing project already contains code

**DO NOT overwrite, delete, or rewrite existing functionality.**

Before making changes:

- Inspect `package.json`
- Inspect existing source structure
- Inspect existing routes
- Inspect existing components
- Inspect existing configuration
- Inspect existing CSS
- Inspect existing environment configuration

Preserve existing functionality.

If the existing project already has a working setup, modify only what is necessary to satisfy Phase 0.

---

# 3. Do Not Change Existing UI

This rule is extremely important.

If an existing UI already exists:

> **Do not redesign it.**

Do not:

- Change colors
- Change typography
- Change spacing
- Change layouts
- Change buttons
- Change navigation
- Replace components
- Add dashboard styling
- Add animations
- Change responsive behavior

Phase 0 is a **technical setup phase**, not a UI redesign phase.

If UI changes are necessary for the project to run, make the **smallest possible change** and preserve the existing appearance.

---

# 4. Do Not Implement Future Features

Do NOT implement:

## Authentication

```text
Login
JWT
bcrypt
Protected routes
Logout
```

## Employee Management

```text
Employee model
Employee CRUD
Employee table
Create employee
Edit employee
Delete employee
```

## Search & Filtering

```text
Search
Department filter
Status filter
Debounced search
```

## Pagination

```text
Pagination UI
Pagination API
```

## Analytics

```text
Charts
Analytics cards
Department statistics
Monthly joining statistics
Status distribution
```

These belong to later phases.

Only prepare the architecture necessary for those features.

---

# 5. Create Frontend

If the project is new, create a React application.

Use:

```text
React JS
```

Do not use Next.js.

Do not introduce TypeScript unless the existing project already uses it or the user explicitly requests it.

The assessment specifically requires React JS.

---

# 6. Frontend Dependencies

Install only dependencies required for Phase 0.

Required/approved stack:

```text
react
react-dom
react-router-dom
axios
```

If Tailwind CSS is already selected/configured for the project, preserve it.

Do not install:

```text
Redux
React Hook Form
Zod
Chart.js
ApexCharts
Recharts
Material UI
Ant Design
Bootstrap
```

during Phase 0 unless the package is genuinely required by an existing project setup.

Those belong to later implementation stages.

---

# 7. Frontend Folder Structure

Prepare a clean structure.

Recommended:

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── employees/
│   │   ├── analytics/
│   │   ├── layout/
│   │   └── common/
│   │
│   ├── pages/
│   │
│   ├── context/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   ├── constants/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── package.json
└── ...
```

Do not create files containing fake functionality just to fill the directories.

Empty directories do not need to be committed if Git does not preserve them.

Create folders when they are actually needed.

---

# 8. Frontend Entry Point

Ensure the React application has a clean entry point.

Typical structure:

```text
main.jsx
    ↓
App.jsx
    ↓
React Router
```

For Phase 0, only establish routing infrastructure.

Do not build the complete application routing yet.

---

# 9. React Router Setup

React Router DOM is mandatory for the assessment.

Install/configure:

```text
react-router-dom
```

At this stage, establish the basic routing foundation.

Example conceptual structure:

```text
BrowserRouter
      │
      ▼
Routes
      │
      ├── /
      │
      └── /login
```

Do not implement:

```text
ProtectedRoute
AuthContext
JWT checking
Dashboard authentication
```

yet.

Those belong to the Authentication phase.

---

# 10. Axios Setup

Create a centralized API configuration.

Recommended:

```text
src/services/api.js
```

The purpose is to prevent API URLs from being duplicated throughout the application.

Configure Axios using the backend URL from an environment variable.

Conceptually:

```text
React
  │
  ▼
Axios instance
  │
  ▼
Backend API URL
```

Do not implement JWT Authorization headers yet because authentication has not been implemented.

---

# 11. Environment Variables

Create environment configuration.

For the frontend, use the environment variable convention appropriate for the selected React tooling.

For Vite:

```text
VITE_API_URL=http://localhost:5000/api
```

For Create React App:

```text
REACT_APP_API_URL=http://localhost:5000/api
```

Do not assume the tooling if the existing project already has one.

Backend:

```text
PORT=5000
MONGODB_URI=
JWT_SECRET=
```

Even though `JWT_SECRET` will not be used until the authentication phase, the backend environment structure can be prepared.

Never hardcode secrets.

---

# 12. `.env.example`

Create an example environment file.

Frontend example:

```text
VITE_API_URL=http://localhost:5000/api
```

Backend example:

```text
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The actual `.env` must not be committed.

Ensure `.gitignore` contains:

```text
.env
.env.local
.env.*.local
```

Do not expose actual MongoDB credentials.

---

# 13. Backend Setup

Create the Node.js backend.

Structure:

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── server.js
├── .env
├── .env.example
└── package.json
```

Do not create unnecessary files.

---

# 14. Backend Dependencies

For Phase 0, install only what is required for the server foundation.

Required:

```text
express
mongoose
cors
dotenv
```

You may prepare the authentication dependency if the project setup requires it:

```text
jsonwebtoken
bcryptjs
```

But do not implement authentication yet.

Do not install unnecessary libraries.

---

# 15. Express Server

Create the Express server.

The server should:

1. Load environment variables.
2. Create the Express application.
3. Enable JSON parsing.
4. Configure CORS.
5. Establish MongoDB connection.
6. Register a basic health-check endpoint.
7. Start listening on the configured port.

Conceptually:

```text
server.js

    ↓
dotenv
    ↓
Express
    ↓
Middleware
    ↓
CORS
    ↓
MongoDB
    ↓
Routes
    ↓
Server
```

---

# 16. Health Check Endpoint

Create a simple endpoint:

```text
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "API is running"
}
```

This endpoint exists only to verify that frontend/backend communication works.

Do not create employee APIs yet.

---

# 17. MongoDB Connection

Create:

```text
backend/config/db.js
```

Responsibilities:

- Connect to MongoDB using Mongoose.
- Read connection string from environment variables.
- Handle connection errors.
- Avoid unnecessary repeated connections.

Conceptually:

```text
Express
   │
   ▼
db.js
   │
   ▼
Mongoose
   │
   ▼
MongoDB
```

Do not create:

```text
Employee schema
User schema
```

yet.

Those belong to Phase 1.

---

# 18. CORS Configuration

Because frontend and backend will run separately during development, configure CORS.

Development architecture:

```text
React
localhost:5173
      │
      │ HTTP
      ▼
Express
localhost:5000
      │
      ▼
MongoDB
```

Configure the backend to accept requests from the actual frontend development origin.

Avoid blindly using:

```text
origin: "*"
```

especially when credentials/authentication will eventually be introduced.

Use an environment-based origin where practical.

---

# 19. Frontend ↔ Backend Test

After both applications are running:

```text
React
localhost:5173
      │
      │ Axios
      ▼
Express
localhost:5000
      │
      ▼
GET /api/health
```

The frontend should be able to call:

```text
/api/health
```

and receive:

```json
{
  "success": true,
  "message": "API is running"
}
```

This confirms:

```text
React
  ↓
Axios
  ↓
CORS
  ↓
Express
```

is working.

---

# 20. MongoDB Connection Test

Start the backend.

Verify that the console clearly indicates whether MongoDB connected successfully.

Expected conceptual output:

```text
MongoDB connected
Server running on port 5000
```

Do not expose:

- MongoDB URI
- Password
- JWT secret
- Sensitive connection details

in logs.

---

# 21. NPM Scripts

Frontend should have a development command.

Example:

```text
npm run dev
```

Backend should have:

```text
npm run dev
```

and:

```text
npm start
```

Use the appropriate commands based on the chosen backend setup.

Do not introduce a process manager or additional tooling just for Phase 0.

---

# 22. Root-Level Structure

If appropriate, the final project should resemble:

```text
employee-management-dashboard/
│
├── frontend/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── AGENT.md
```

If the existing project already has a different valid structure, **do not restructure it unnecessarily**.

Preserve the existing architecture unless it conflicts with the assessment requirements.

---

# 23. No UI Redesign

During Phase 0:

### Do not:

- Create dashboard cards
- Create employee tables
- Create charts
- Create sidebar
- Create navbar redesign
- Create employee forms
- Change theme
- Change colors
- Add animations
- Add new visual design system

If a basic placeholder page is required for testing, keep it minimal and temporary.

Do not spend time making it visually polished.

UI implementation comes later.

---

# 24. No Business Logic

Do not create business logic such as:

```text
calculate employee statistics
filter employees
paginate employees
create employee
update employee
delete employee
authenticate user
```

Phase 0 is only infrastructure.

---

# 25. No Database Collections Yet

MongoDB should only be verified as a connection.

Do not create:

```text
users
employees
```

collections manually.

Schemas/models will be introduced in Phase 1.

---

# 26. Git Safety

Before making changes:

```text
git status
```

Inspect the current working tree.

If there are existing uncommitted changes:

**Do not overwrite or discard them.**

After Phase 0:

```text
git status
```

Review every changed file.

Do not commit:

```text
.env
```

or any secret credentials.

---

# 27. Verification Checklist

Phase 0 is complete only when all of the following work.

## Frontend

```text
[ ] React starts successfully
[ ] No compilation errors
[ ] No console errors caused by setup
[ ] React Router is configured
[ ] Axios is configured
[ ] Environment variable works
```

## Backend

```text
[ ] Express starts successfully
[ ] No startup errors
[ ] Environment variables load
[ ] MongoDB connects
[ ] CORS is configured
[ ] /api/health works
```

## Communication

```text
[ ] Frontend can call backend
[ ] Axios request succeeds
[ ] CORS does not block request
[ ] JSON response is received
```

## Project Quality

```text
[ ] Folder structure is clean
[ ] No unnecessary packages
[ ] No secrets committed
[ ] Existing functionality preserved
[ ] Existing UI preserved
[ ] No unrelated features added
[ ] No e-commerce functionality remains/is introduced
```

---

# 28. Phase 0 Completion Criteria

The final state should be:

```text
                    PHASE 0

                 ┌───────────┐
                 │  React    │
                 │ Frontend  │
                 └─────┬─────┘
                       │
                    Axios
                       │
                       ▼
                 ┌───────────┐
                 │ Express   │
                 │ Backend   │
                 └─────┬─────┘
                       │
                  Mongoose
                       │
                       ▼
                 ┌───────────┐
                 │ MongoDB   │
                 └───────────┘
```

Only the infrastructure is complete.

The next phase will add:

```text
Phase 1
   ↓
Backend Foundation
   ↓
User + Employee Models
   ↓
REST API Foundation
   ↓
Database-level validation
```

---

# Important Agent Instruction

**Do not proceed to Phase 1 automatically.**

After completing Phase 0:

1. Report what was created/changed.
2. Report the installed dependencies.
3. Report the frontend and backend URLs.
4. Report MongoDB connection status.
5. Report the `/api/health` test result.
6. Report any issues.
7. Stop and wait for explicit instructions to begin Phase 1.

**Do not implement anything beyond Phase 0.**

This keeps the project controlled and ensures that **existing functionality and UI are never accidentally changed while we build the assessment incrementally.**
