# AGENT.md

You are an expert Full Stack MERN engineer helping build a production-quality React Employee Management Dashboard for a technical assessment.

You write clean, maintainable, readable, and scalable code.

You prioritize:

- Readability
- Simplicity
- Reusable components
- Clean architecture
- REST API conventions
- Proper authentication and authorization
- Good UX
- Industry best practices
- Assessment requirements

Always prefer simple and understandable solutions over unnecessary abstractions.

---

# Project Overview

We are building a React-based Employee Management Dashboard as a MERN technical assessment.

The application must demonstrate:

- Authentication
- JWT token handling
- Protected routes
- Employee CRUD operations
- Search
- Filtering
- Pagination
- Analytics
- API integration
- Loading and error handling
- Responsive design

The application has an authenticated user flow.

After successful login, the user is redirected to the Employee Management Dashboard.

---

# Core User Flow

The application flow is:

```text
Login Page
    |
    v
Validate Email + Password
    |
    v
POST /api/auth/login
    |
    v
Backend validates credentials
    |
    v
Generate JWT
    |
    v
Store JWT in localStorage/sessionStorage
    |
    v
Navigate to /dashboard
    |
    v
Protected Dashboard
    |
    +--> Employee Listing
    |
    +--> Create Employee
    |
    +--> Edit Employee
    |
    +--> Delete Employee
    |
    +--> Search
    |
    +--> Department Filter
    |
    +--> Status Filter
    |
    +--> Pagination
    |
    +--> Analytics
    |
    v
Logout
    |
    v
Remove JWT
    |
    v
Redirect to Login
```

---

# Technology Stack

## Frontend

- React JS
- React Router DOM
- JavaScript
- Functional Components
- React Hooks

## HTTP Client

- Axios

Use Axios for communication between React and the Express backend.

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## State Management

Use React Context API where shared state is genuinely required.

Redux Toolkit is optional and must not be introduced unless it provides a clear benefit and is approved.

## Charts

Use Recharts for analytics visualization.

Alternative chart libraries such as Chart.js or ApexCharts should not be introduced unless explicitly approved.

## Styling

Use Tailwind CSS for the UI if Tailwind is already configured or explicitly selected.

Do not introduce Material UI, Ant Design, Bootstrap, or another design system without explicit approval.

---

# Mandatory Assessment Requirements

The following requirements are mandatory.

## 1. Authentication

The application must provide:

- Login page
- Email field
- Password field
- Client-side form validation
- Login API integration
- JWT token handling
- Token storage using localStorage or sessionStorage
- Redirect authenticated users to dashboard
- Logout functionality
- Protected dashboard route

Never allow unauthenticated users to access protected employee management pages.

---

## 2. Employee Listing

The dashboard must display employees in a table.

The employee table must contain:

- Employee Name
- Email
- Department
- Designation
- Status
- Joining Date
- Actions

Actions should include:

- Edit
- Delete

The table should have proper loading and empty states.

---

## 3. Create Employee

Provide an employee creation form.

Required employee information:

```text
name
email
department
designation
status
joiningDate
```

The form must:

- Validate required fields
- Validate email format
- Prevent invalid submissions
- Show useful validation errors
- Submit data to the backend
- Show loading state while saving
- Show API errors when creation fails
- Refresh/update the employee listing after successful creation

---

## 4. Edit Employee

Users must be able to edit an existing employee.

The edit flow should:

```text
Employee Table
    |
    v
Click Edit
    |
    v
Open Employee Form
    |
    v
Load Existing Employee Data
    |
    v
Modify Data
    |
    v
PUT /api/employees/:id
    |
    v
Update MongoDB
    |
    v
Refresh Employee Listing
```

Do not create a separate duplicated form when the existing employee form can be reused.

---

## 5. Delete Employee

Deleting an employee must require confirmation.

Flow:

```text
Click Delete
    |
    v
Confirmation Dialog
    |
    +---- Cancel ----> Close Dialog
    |
    +---- Confirm --> DELETE /api/employees/:id
                          |
                          v
                     MongoDB Update
                          |
                          v
                     Refresh Table
```

Never delete an employee immediately without confirmation.

---

# Search and Filtering

The dashboard must support:

## Search

Search by:

- Employee name
- Employee email

The search should be case-insensitive.

If debounced search is implemented, keep the implementation simple and readable.

Do not add a debounce library unless explicitly approved. Prefer a small custom implementation using React hooks when necessary.

## Department Filter

Provide a department filter.

Example departments:

```text
Engineering
HR
Finance
Marketing
Sales
Operations
```

The actual available departments should be derived from the application's employee data or clearly defined project constants.

## Status Filter

Provide a status filter.

Minimum supported statuses:

```text
Active
Inactive
```

The filter implementation must match the actual employee status values stored in MongoDB.

## Combined Filters

Search, department, and status filters should work together.

Example:

```text
Search: John
Department: Engineering
Status: Active
```

The employee list should display only employees matching all active filter conditions.

---

# Pagination

Employee listing must support pagination.

The UI should provide:

- Current page
- Total pages
- Previous button
- Next button
- Page numbers when appropriate

Do not allow navigation to invalid pages.

If API-side pagination is implemented, use query parameters such as:

```text
GET /api/employees?page=1&limit=10
```

If client-side pagination is used, it must still provide a clean and reliable user experience.

For larger datasets, prefer API-side pagination.

---

# Analytics Dashboard

The dashboard must contain employee analytics.

Mandatory analytics:

## Summary Cards

- Total Employees
- Active Employees
- Inactive Employees

## Department-wise Count

Show the number of employees in each department.

Example:

```text
Engineering   20
HR             8
Finance        6
Marketing     10
```

Use a bar chart or another appropriate visualization.

## Monthly Joined Employees

Show the number of employees who joined each month.

Use a line or bar chart.

The calculation must be based on employee `joiningDate`.

## Employee Status Distribution

Show the distribution of employee statuses.

A pie/donut-style chart may be used if supported by the selected chart library.

Analytics must be derived from actual employee data.

Do not hardcode analytics values.

---

# Backend Architecture

Use a separate Node.js + Express backend.

The frontend and backend communicate using HTTP/JSON.

Architecture:

```text
React Frontend
      |
      | Axios / HTTP
      v
Express + Node.js API
      |
      | Mongoose
      v
MongoDB
```

React must never connect directly to MongoDB.

---

# Project Structure

Use a clear separation between frontend and backend.

Recommended structure:

```text
project-root/

frontend/
|
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── employees/
│   │   ├── analytics/
│   │   ├── layout/
│   │   └── common/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── employeeService.js
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils/
│   │
│   ├── constants/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


backend/
|
├── controllers/
│   ├── authController.js
│   └── employeeController.js
│
├── models/
│   ├── User.js
│   └── Employee.js
│
├── routes/
│   ├── authRoutes.js
│   └── employeeRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── config/
│   └── db.js
│
├── utils/
│
├── server.js
└── package.json
```

Do not create unnecessary folders or abstractions.

---

# Frontend Pages

## Login

Route:

```text
/login
```

Responsibilities:

- Display login form
- Validate email
- Validate password
- Call login API
- Store JWT
- Redirect to dashboard
- Display API errors
- Show loading state

## Dashboard

Route:

```text
/dashboard
```

Responsibilities:

- Display analytics
- Display employee table
- Search employees
- Filter employees
- Pagination
- Create employee
- Edit employee
- Delete employee
- Logout

The dashboard must be protected.

---

# Routing

Use React Router DOM.

Required routes:

```text
/login
/dashboard
```

Protected route behavior:

```text
User visits /dashboard
        |
        v
Check JWT
        |
   +----+----+
   |         |
 Token      No Token
   |         |
   v         v
Dashboard   /login
```

If a logged-in user visits `/login`, redirect them to `/dashboard` where appropriate.

Do not expose protected employee data to unauthenticated users.

---

# API Routes

Follow REST conventions.

## Authentication

```text
POST /api/auth/login
POST /api/auth/logout
```

If registration is required for development/setup, it may be implemented as:

```text
POST /api/auth/register
```

Do not add registration to the user-facing UI unless it is required by the project.

## Employees

```text
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

Optional query parameters:

```text
GET /api/employees?page=1&limit=10
GET /api/employees?search=john
GET /api/employees?department=Engineering
GET /api/employees?status=Active
```

Only implement query parameters that are actually needed by the selected architecture.

---

# API Response Format

Use a consistent JSON response structure.

Success:

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": []
}
```

Single resource:

```json
{
  "success": true,
  "message": "Employee fetched successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Unable to fetch employees"
}
```

For paginated responses:

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

Use appropriate HTTP status codes.

---

# Database Models

## User

Authentication user model:

```text
User
├── name
├── email
├── password
└── createdAt
```

Password must be hashed.

Never store plain-text passwords.

---

# Employee

Employee model:

```text
Employee
├── name: String
├── email: String
├── department: String
├── designation: String
├── status: "Active" | "Inactive"
├── joiningDate: Date
├── createdAt: Date
└── updatedAt: Date
```

Use Mongoose.

Add appropriate validation and indexes where genuinely useful.

Employee email should be handled consistently and should not create accidental duplicate employee records.

---

# Authentication Rules

Use:

- JWT
- bcryptjs

Login flow:

```text
React
 |
 | email + password
 v
POST /api/auth/login
 |
 v
Express
 |
 | Find user
 v
MongoDB
 |
 v
Compare hashed password
 |
 v
Generate JWT
 |
 v
Return token
 |
 v
React stores token
```

JWT may be stored in:

```text
localStorage
```

or:

```text
sessionStorage
```

Use one approach consistently.

The assessment explicitly requires localStorage/sessionStorage token handling.

Never store:

- passwords
- database credentials
- JWT secrets
- private API keys

in frontend source code.

The JWT secret must remain on the backend.

---

# Axios Rules

Create a centralized Axios instance when it improves maintainability.

Example responsibility:

```text
services/api.js
```

The Axios instance may handle:

- Base URL
- Authorization header
- Common API configuration

Attach the JWT to protected API requests using:

```text
Authorization: Bearer <token>
```

Do not duplicate API URLs throughout components.

Keep API calls out of large UI components whenever practical.

---

# State Management

Use React state and Context API where sufficient.

Preferred approach:

```text
Local UI State
    |
    +--> useState
    |
    +--> useEffect

Shared Authentication State
    |
    +--> AuthContext
```

Do not introduce Redux just because it is available.

Redux Toolkit is optional for this assessment.

If Redux is introduced, explain why it is needed and keep the architecture simple.

---

# Loading States

Every asynchronous operation must have an appropriate loading state.

Examples:

```text
Loading employees...
Adding employee...
Updating employee...
Deleting employee...
Logging in...
```

Avoid making the application appear frozen while an API request is running.

Disable relevant submit/action buttons during operations when appropriate.

---

# Error Handling

Always handle API errors.

Frontend:

```js
try {
  // API request
} catch (error) {
  // Display useful error
}
```

Backend:

- Use proper try/catch handling
- Return meaningful error messages
- Use correct HTTP status codes
- Avoid exposing sensitive internal errors

Expected status codes include:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

Do not expose stack traces or secrets to the frontend.

---

# Empty States

The application must handle empty data gracefully.

Examples:

```text
No employees found.
```

When filters produce no results:

```text
No employees match your search or filters.
```

Do not display a broken or empty table without explanation.

---

# Form Validation

Validate employee forms before submitting.

Required validation:

```text
Name
Email
Department
Designation
Status
Joining Date
```

Validation should include:

- Required fields
- Valid email format
- Valid status
- Valid date
- Reasonable text input constraints

Keep validation messages simple and user-friendly.

A validation library is not mandatory.

Do not introduce React Hook Form or Zod unless explicitly approved.

---

# UI Rules

The UI should look like a professional employee/admin dashboard.

Prioritize:

- Clear hierarchy
- Readable tables
- Consistent spacing
- Good typography
- Clear actions
- Responsive layouts
- Accessible form controls
- Clear status indicators

Recommended dashboard sections:

```text
┌────────────────────────────────────────────┐
│ Header / Navigation                        │
├────────────────────────────────────────────┤
│ Analytics Cards                            │
├────────────────────────────────────────────┤
│ Charts                                     │
├────────────────────────────────────────────┤
│ Search | Department | Status | Add Employee│
├────────────────────────────────────────────┤
│ Employee Table                             │
├────────────────────────────────────────────┤
│ Pagination                                 │
└────────────────────────────────────────────┘
```

---

# Employee Table UI

The employee table should contain:

```text
Name
Email
Department
Designation
Status
Joining Date
Actions
```

Status should be visually distinguishable.

Example:

```text
Active      → positive status style
Inactive    → neutral/danger status style
```

Do not rely only on color to communicate status.

---

# Employee Form UI

Use the same reusable form component for:

```text
Create Employee
Edit Employee
```

The form should support:

```text
Name
Email
Department
Designation
Status
Joining Date
```

Buttons:

```text
Save Employee
Cancel
```

For edit mode, the primary action may be:

```text
Update Employee
```

---

# Delete Confirmation UI

The confirmation dialog should clearly communicate:

- Which employee is being deleted
- That the action cannot be easily undone
- Cancel action
- Confirm delete action

Do not perform deletion before confirmation.

---

# Analytics Rules

Analytics must always be derived from actual employee data.

Do not hardcode:

```text
Total Employees = 100
Active Employees = 80
```

Instead calculate from API/database data.

Analytics should update after:

- Employee creation
- Employee update
- Employee deletion
- Data refresh

Use Recharts for visualization.

Recommended charts:

```text
Department-wise Count
        ↓
Bar Chart

Monthly Joined Employees
        ↓
Line / Bar Chart

Employee Status Distribution
        ↓
Pie / Donut Chart
```

Do not create charts that do not provide useful information.

---

# Responsive Design

The application MUST support:

- Mobile
- Tablet
- Desktop

Follow:

```text
Mobile
  ↓
Tablet
  ↓
Desktop
```

The employee table should remain usable on smaller screens.

If the table cannot reasonably fit on mobile, use a controlled horizontal table scroll rather than breaking the layout.

Forms should stack appropriately on small screens.

---

# Accessibility

Use:

- Semantic HTML
- Proper labels
- Keyboard-accessible buttons
- Visible focus states
- Accessible dialog controls
- Meaningful button labels
- Appropriate ARIA attributes when necessary

Do not use icons alone for important actions without accessible labels.

---

# Component Rules

Create reusable components when:

- A component is used more than once
- It represents a meaningful UI concept
- It keeps a page readable

Recommended components:

```text
ProtectedRoute
EmployeeTable
EmployeeForm
EmployeeModal
DeleteConfirmation
SearchBar
EmployeeFilters
Pagination
AnalyticsCard
DepartmentChart
MonthlyJoiningChart
StatusChart
Navbar
LoadingState
EmptyState
ErrorState
```

Do not create tiny one-time components without a meaningful reason.

---

# Service Layer Rules

Keep API logic separate from UI logic.

Recommended:

```text
services/
├── api.js
├── authService.js
└── employeeService.js
```

Example responsibilities:

```text
authService
├── login()
└── logout()

employeeService
├── getEmployees()
├── getEmployee()
├── createEmployee()
├── updateEmployee()
└── deleteEmployee()
```

Components should not contain large blocks of Axios configuration.

---

# Code Quality

Always:

- Use JavaScript consistently
- Use functional components
- Use async/await
- Use descriptive names
- Keep functions small
- Keep components focused
- Separate API logic from UI logic
- Avoid duplicated code
- Handle loading/error states
- Follow REST conventions
- Keep business logic readable

Avoid:

- Unnecessary abstractions
- Deeply nested logic
- Huge components
- Generic factories without a real need
- Premature optimization
- Duplicate API functions
- Hardcoded production data

---

# Environment Variables

Keep secrets and environment-specific configuration in `.env`.

Backend examples:

```text
PORT=5000
MONGODB_URI=
JWT_SECRET=
```

Frontend example:

```text
VITE_API_URL=
```

If the project uses Create React App instead of Vite, use the appropriate frontend environment variable convention.

Never hardcode:

- MongoDB connection strings
- JWT secrets
- API secrets
- Credentials
- Tokens

Never commit `.env` files containing secrets.

---

# CORS

Because the frontend and backend may run separately during development, configure CORS correctly on the Express server.

Example development architecture:

```text
React
localhost:5173
      |
      | HTTP
      v
Express
localhost:5000
      |
      v
MongoDB
```

Do not use `*` for production CORS when a specific frontend origin can be configured.

---

# Development Ports

Recommended:

```text
Frontend: 5173
Backend: 5000
```

If the project uses different ports, use the actual project configuration rather than changing ports unnecessarily.

---

# MongoDB Rules

Use:

```text
MongoDB + Mongoose
```

Do not switch to:

- PostgreSQL
- Prisma
- MySQL
- Firebase
- Supabase

unless explicitly requested.

Use a reusable database connection.

Avoid reconnecting unnecessarily for every request.

Keep Mongoose schemas simple and readable.

---

# API Security Rules

Protected employee routes must verify the JWT.

Flow:

```text
Request
   |
   v
Authorization Header
   |
   v
JWT Middleware
   |
   +---- Invalid/Missing ----> 401
   |
   v
Verify Token
   |
   v
Controller
   |
   v
MongoDB
```

Never trust user identity supplied directly in request body when it can be obtained from the verified JWT.

---

# Search and Filter Architecture

Search/filter logic may be implemented:

## Client-side

Suitable for a small assessment dataset.

```text
Fetch employees
      |
      v
React state
      |
      v
Search + Filter
      |
      v
Pagination
      |
      v
Display
```

## Server-side

Preferred for larger datasets.

```text
Search / Filter / Pagination
            |
            v
GET /api/employees?... 
            |
            v
Express
            |
            v
MongoDB Query
            |
            v
Paginated Response
```

Choose the simplest approach appropriate for the project.

Do not implement complex server-side filtering unless it is actually required.

---

# Assessment Priority

Implement features in this order:

```text
1. Project Setup
        ↓
2. Backend + MongoDB Connection
        ↓
3. User Authentication
        ↓
4. JWT Middleware
        ↓
5. React Router + Protected Route
        ↓
6. Employee Model
        ↓
7. Employee CRUD APIs
        ↓
8. Employee Table
        ↓
9. Create/Edit Employee
        ↓
10. Delete + Confirmation
        ↓
11. Search + Filters
        ↓
12. Pagination
        ↓
13. Analytics
        ↓
14. Loading/Error/Empty States
        ↓
15. Responsive UI
        ↓
16. Testing and Final Cleanup
```

Do not spend excessive time on visual polish before the core functionality works.

---

# Testing Checklist

Before considering the project complete, verify:

## Authentication

- Login with valid credentials
- Login with invalid credentials
- Empty email validation
- Empty password validation
- Token is stored correctly
- Dashboard is protected
- Logout removes token
- Dashboard cannot be accessed after logout

## Employee CRUD

- Create employee
- View employees
- Edit employee
- Delete employee
- Cancel delete
- Confirm delete
- Invalid employee data is rejected

## Search

- Search by name
- Search by email
- Case-insensitive search
- No-result state

## Filters

- Department filter
- Status filter
- Combined search + filters
- Reset filters

## Pagination

- Next page
- Previous page
- First page
- Last page
- Empty page handling

## Analytics

- Total employee count
- Active count
- Inactive count
- Department count
- Monthly joining count
- Status distribution
- Analytics update after CRUD

## API

- Loading states
- Error states
- Correct status codes
- JWT validation
- Invalid employee ID handling

## Responsive UI

- Mobile
- Tablet
- Desktop

---

# Error and Edge Cases

Handle at least:

- Invalid login
- Expired/invalid JWT
- Backend unavailable
- MongoDB unavailable
- Employee not found
- Duplicate employee email
- Empty employee list
- Search returns no result
- Invalid page number
- Failed create
- Failed update
- Failed delete

Never leave the UI in a broken loading state after an API failure.

---

# New Feature / Library Rule

DO NOT implement:

- New features
- New libraries
- New architectural patterns
- New design systems
- Alternative backend/database approaches

without explicit user permission if they are outside this assessment.

If a significantly better approach is identified:

1. Explain why it is better.
2. Explain advantages.
3. Explain disadvantages.
4. Explain impact on the current architecture.
5. Ask for approval.

Use the existing assessment stack whenever possible.

---

# Library Installation Rule

Before installing any package that is not already part of the selected stack:

1. Explain why the package is needed.
2. Mention a reasonable alternative if one exists.
3. Consider bundle size and maintenance.
4. Ask for permission before adding it.

Preferred libraries for this assessment:

```text
react
react-router-dom
axios
express
mongoose
jsonwebtoken
bcryptjs
recharts
```

Tailwind CSS may be used if selected for the UI.

Do not add a second library for functionality already covered by the selected stack.

---

# Version Stability Rule

Always prefer:

- Stable versions
- Well-supported packages
- Official documentation
- Compatible versions

Avoid:

- Alpha packages
- Beta packages
- Experimental APIs
- Deprecated APIs
- Unmaintained tutorials

Before changing package versions:

1. Check compatibility.
2. Understand the impact.
3. Avoid unnecessary dependency upgrades.

Never upgrade dependencies simply for the sake of upgrading them.

---

# Simplicity Rule

Always prefer:

```text
Simple code
```

over:

```text
Smart code
```

Prefer:

- Small functions
- Clear variable names
- Explicit logic
- Straightforward conditionals
- Simple API services

Avoid:

- Clever abstractions
- Generic factories
- Deeply nested code
- Unnecessary custom hooks
- Premature optimization

Build the simplest working version first.

Refactor only when:

- Code is duplicated
- Complexity increases
- A component becomes difficult to maintain
- A reusable pattern genuinely appears

---

# Architecture Rule

Do not overengineer the technical assessment.

The goal is to demonstrate:

```text
React
+
React Router
+
Axios
+
Node
+
Express
+
MongoDB
+
Mongoose
+
JWT
+
CRUD
+
Analytics
```

A simple, working, readable solution is better than a highly abstract architecture.

---

# UI Consistency Rule

Maintain one consistent design system throughout the application.

Use consistent:

- Colors
- Typography
- Spacing
- Border radius
- Buttons
- Inputs
- Tables
- Modals
- Status badges
- Loading states
- Error messages

Do not randomly mix UI styles.

---

# Color and Styling Rules

If Tailwind CSS is used, prefer semantic utility classes and shared design tokens where available.

Do not repeatedly introduce arbitrary colors such as:

```text
bg-[#123456]
text-[#abcdef]
border-[#999999]
```

throughout the application without a design reason.

Use a restrained professional dashboard palette.

Recommended semantic roles:

```text
Background
Foreground
Primary
Secondary
Muted
Border
Success
Warning
Danger
```

Status colors should communicate state consistently.

---

# AI Usage

AI may be used for:

- Understanding React concepts
- API integration assistance
- Debugging
- Refactoring
- Tailwind generation
- Error analysis
- Code review
- Documentation assistance

AI-generated code must still be reviewed for:

- Correctness
- Security
- Readability
- Dependency compatibility
- Assessment requirements

Do not blindly copy generated code.

If requested, mention AI usage in the project README.

---

# Deployment

The application may be deployed with separate frontend and backend services.

Recommended architecture:

```text
React Frontend
      |
      | HTTPS API
      v
Express Backend
      |
      v
MongoDB Atlas
```

Possible deployment choices may include:

```text
Frontend:
Vercel / Netlify / similar React hosting

Backend:
Render / Railway / similar Node hosting

Database:
MongoDB Atlas
```

Do not change deployment providers without a reason.

Production configuration must include:

- Environment variables
- Correct CORS origin
- Production API URL
- MongoDB connection string
- JWT secret
- HTTPS where supported

---

# Final Assessment Goal

The completed application should demonstrate:

```text
✓ React JS
✓ Functional Components
✓ useState
✓ useEffect
✓ React Router DOM
✓ Axios
✓ JWT Authentication
✓ Protected Routes
✓ Node.js
✓ Express.js
✓ MongoDB
✓ Mongoose
✓ Employee CRUD
✓ Search
✓ Department Filter
✓ Status Filter
✓ Pagination
✓ Analytics Cards
✓ Department Analytics
✓ Monthly Joining Analytics
✓ Status Distribution
✓ Recharts
✓ Loading States
✓ Error Handling
✓ Empty States
✓ Responsive Design
✓ Clean Architecture
✓ Reusable Components
✓ Maintainable Code
```

---

# What NOT to Build

This is an employee management assessment.

Do NOT introduce unrelated features such as:

- E-commerce
- Products
- Shopping cart
- Orders
- Payments
- Product images
- Product inventory
- User shopping roles
- Wishlist
- Reviews
- Social features
- Real-time chat

Do not copy architecture or business logic from unrelated projects.

Every component, API, model, route, and UI section must serve the Employee Management Dashboard requirements.

---

# Bonus Features

The following are optional and should only be implemented after all mandatory requirements are complete:

- Context API
- Redux Toolkit
- Debounced search
- Advanced responsive UI
- Server-side filtering
- Server-side pagination
- Additional analytics
- Export employees to CSV
- Sorting

Do not implement bonus features at the expense of mandatory requirements.

Do not add bonus features automatically if they significantly increase complexity.

---

# Final Development Principle

Whenever there is a choice, choose:

✓ Simplicity
✓ Readability
✓ Stability
✓ Security
✓ Consistency
✓ Assessment compliance
✓ Maintainability

over:

✗ Cleverness
✗ Over-abstraction
✗ Experimental features
✗ Unnecessary dependencies
✗ Unrelated functionality
✗ Premature optimization

---

# Strict Rule

STRICTLY FOLLOW ALL RULES MENTIONED ABOVE.

If a requirement is unclear, stop and ask the user before making an architectural decision.

Do not silently change:

- Technology stack
- Database
- Authentication strategy
- API architecture
- Project structure
- Required functionality

unless explicitly requested or approved by the user.
