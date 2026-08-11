# Employee Management Dashboard

A modern, production-ready full-stack MERN application for organizational workforce management, built with React 18, Vite, Tailwind CSS, Node.js, Express, MongoDB Atlas, Mongoose, JWT Authentication, and Recharts.

---

## Key Features

- **Authentication & Security**:
  - Secure JWT authentication with BCrypt password hashing.
  - Protected API routes (`Authorization: Bearer <token>`).
  - Client-side session persistence and route guards (`ProtectedRoute`).

- **Employee CRUD Operations**:
  - Full Create, Read, Update, and Delete operations for employee records.
  - Reusable modal forms with real-time field validation and duplicate email protection (`409 Conflict`).
  - Confirmation modal dialogs for safe deletion.

- **Search, Filtering & Pagination**:
  - Case-insensitive search by employee name or email.
  - Multi-criteria filtering by Department and Employment Status (`Active` / `Inactive`).
  - Scalable pagination with range indicators and dynamic page calculation.

- **Global Analytics Dashboard**:
  - Real-time MongoDB aggregation metrics (`GET /api/employees/analytics`).
  - Summary KPI cards for Total Employees, Active Employees, and Inactive Employees.
  - Interactive Recharts visualizations:
    - **Department-wise Count** (Bar Chart)
    - **Monthly Joined Employees** (Smooth Area Trend Chart)
    - **Status Distribution** (Donut Pie Chart)
  - Analytics metrics remain global and independent of table search queries or active filters.

- **UI/UX & Accessibility**:
  - Clean Dual-Color High-Contrast design system supporting both **Light** and **Dark** themes.
  - Theme preference persistence via `localStorage`.
  - Smooth AOS (Animate On Scroll) animations and professional Lucide SVG icons.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, AOS Animations, Axios, React Router v6.
- **Backend**: Node.js, Express.js, MongoDB Atlas / Local MongoDB, Mongoose ODM, JSON Web Token (JWT), BCryptJS, CORS, Dotenv.

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/employee_dashboard?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Quick Start & Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### 1. Clone & Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables
Create `.env` files in both `backend/` and `frontend/` folders using `.env.example` as a template.

### 3. Start Development Servers

```bash
# Start backend server (Port 5000)
cd backend
npm run dev

# Start frontend server (Port 5173)
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Demo Test Credentials

- **Email**: `admin@example.com`
- **Password**: `password123`

---

## Production Build

```bash
# Build frontend production bundle
cd frontend
npm run build
```

The production assets will be compiled to `frontend/dist/`.

---

## API Reference

### Health & Auth
- `GET /api/health` — API health check status
- `POST /api/auth/login` — Authenticate user and receive JWT
- `POST /api/auth/register` — Register admin account
- `GET /api/auth/me` — Fetch authenticated user profile

### Employee Management & Analytics (Protected)
- `GET /api/employees` — Fetch all employee records
- `GET /api/employees/analytics` — Fetch global MongoDB analytics metrics
- `GET /api/employees/:id` — Fetch single employee by ID
- `POST /api/employees` — Create new employee record
- `PUT /api/employees/:id` — Update existing employee record
- `DELETE /api/employees/:id` — Delete employee record
