# Phase 1 — Backend Foundation

## Objective

Build the backend data foundation for the MERN Employee Management Dashboard.

Phase 1 must establish:

```text
React Frontend
      │
      │ HTTP / Axios
      ▼
Node.js + Express Backend
      │
      ├── Routes
      ├── Controllers
      ├── Middleware
      │
      ▼
Mongoose
      │
      ▼
MongoDB
      │
      ├── Users
      └── Employees
```

At the end of this phase, the backend should have a clean foundation for authentication and employee management.

**Do not implement the complete authentication flow or employee CRUD functionality in this phase.**

---

# 1. Read and Follow AGENT.md

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow all project rules strictly.
3. Preserve the existing Phase 0 implementation.
4. Do not change the project's approved technology stack.
5. Do not introduce unnecessary libraries.
6. Do not introduce unrelated features.
7. Do not redesign the UI.

The project is an:

```text
Employee Management Dashboard
```

Do not introduce concepts from unrelated projects such as:

```text
Products
Cart
Orders
Payments
Wishlist
E-commerce
```

---

# 2. Existing Functionality Safety Rule

Before making changes, inspect the current project.

Verify:

```text
Frontend
Backend
MongoDB connection
/api/health
React Router
Axios configuration
Environment configuration
```

If something already works:

> Preserve it.

Do not:

- Delete working files
- Rewrite working components unnecessarily
- Change existing routes unnecessarily
- Change existing API behavior unnecessarily
- Change environment configuration unnecessarily
- Replace working dependencies
- Reset existing code

If a change is required, make the smallest possible change.

---

# 3. UI Preservation Rule

**Phase 1 is a backend foundation phase.**

Do not change the existing frontend UI.

Do not:

- Redesign pages
- Change colors
- Change typography
- Change spacing
- Change layout
- Add dashboard cards
- Add employee tables
- Add charts
- Add employee forms
- Add sidebar redesigns
- Add animations
- Change responsive behavior

The only frontend changes allowed are minimal technical changes required to verify backend communication or maintain the existing application structure.

---

# 4. Phase 1 Scope

Phase 1 includes:

```text
✓ User model
✓ Employee model
✓ Mongoose validation
✓ Database model foundation
✓ Controller structure
✓ Route structure
✓ Error-handling foundation
✓ API response conventions
✓ Basic backend validation
✓ Backend architecture preparation
✓ Database verification
```

Phase 1 does NOT include:

```text
✗ Login UI
✗ Login functionality
✗ JWT generation
✗ JWT verification
✗ Protected routes
✗ Logout
✗ localStorage/sessionStorage authentication
✗ Employee CRUD UI
✗ Complete employee CRUD API behavior
✗ Search
✗ Filters
✗ Pagination
✗ Analytics
✗ Recharts
✗ Dashboard redesign
```

These belong to later phases.

---

# 5. Verify Phase 0 Before Starting

Before implementing Phase 1, verify:

```text
[ ] Frontend starts successfully
[ ] Backend starts successfully
[ ] MongoDB connection works
[ ] GET /api/health works
[ ] Frontend can communicate with backend
[ ] No existing functionality is broken
```

If any Phase 0 requirement is broken, fix that issue first.

Do not continue by building new functionality on top of a broken foundation.

---

# 6. Backend Folder Structure

Use the following structure unless the existing project already has a valid equivalent:

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── employeeController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Employee.js
│
├── routes/
│   ├── authRoutes.js
│   └── employeeRoutes.js
│
├── utils/
│
├── server.js
├── .env
├── .env.example
└── package.json
```

Do not create unnecessary architectural layers.

Avoid introducing:

```text
repositories/
factories/
adapters/
providers/
services/
interfaces/
```

unless the existing project already uses them or there is a clear requirement.

The goal is simple, readable architecture.

---

# 7. User Model

Create:

```text
backend/models/User.js
```

The model should support the authentication functionality that will be implemented in Phase 2.

Use:

```text
User
├── name
├── email
├── password
└── createdAt
```

Recommended schema:

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

## Validation

### Name

- Required
- Trim whitespace
- String

### Email

- Required
- Unique
- Lowercase
- Trim whitespace
- Valid email format

### Password

- Required
- String

Never store a plain-text password for an actual user account.

---

# 8. Password Handling

Phase 1 must prepare the model for secure authentication.

The authentication flow itself belongs to Phase 2.

Do not implement:

```text
Login
Password comparison
JWT generation
JWT verification
Logout
```

yet.

Do not expose passwords in API responses when user endpoints are eventually implemented.

The password field should be protected appropriately when querying users if that approach is compatible with the implementation.

---

# 9. Employee Model

Create:

```text
backend/models/Employee.js
```

Use the following structure:

```text
Employee
├── name
├── email
├── department
├── designation
├── status
├── joiningDate
├── createdAt
└── updatedAt
```

Recommended schema:

```js
{
  name: String,
  email: String,
  department: String,
  designation: String,
  status: String,
  joiningDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

Use Mongoose timestamps where appropriate.

---

# 10. Employee Field Validation

The Employee model must validate all required fields.

## Name

```text
Required
String
Trimmed
```

## Email

```text
Required
String
Trimmed
Lowercase
Valid email format
```

## Department

```text
Required
String
Trimmed
```

## Designation

```text
Required
String
Trimmed
```

## Status

Only these values are valid:

```text
Active
Inactive
```

Do not silently accept arbitrary values.

## Joining Date

```text
Required
Valid Date
```

---

# 11. Employee Email Uniqueness

Employee email should be handled consistently.

Prevent accidental duplicate employee records.

If a unique MongoDB index is used:

- Configure it correctly.
- Handle duplicate-key errors in the backend.
- Return a clean API error.
- Never expose raw MongoDB error details to the client.

A duplicate employee email should eventually return a suitable status such as:

```text
409 Conflict
```

Do not implement the full create/update employee API yet; only prepare the model and error-handling foundation.

---

# 12. Timestamps

Use Mongoose timestamps for the Employee model where appropriate.

The model should automatically maintain:

```text
createdAt
updatedAt
```

Do not manually set these values in every future controller unless there is a specific reason.

---

# 13. User Timestamps

The User model should also maintain creation time.

Use:

```text
createdAt
```

or Mongoose timestamps where appropriate.

Keep the model simple.

Do not add unrelated fields such as:

```text
role
avatar
address
phone
salary
permissions
```

unless they are explicitly required by the assessment.

---

# 14. Authentication Route Structure

Create:

```text
backend/routes/authRoutes.js
```

The planned authentication API is:

```text
POST /api/auth/login
```

Registration is optional for this assessment and should not be exposed in the user-facing application unless explicitly required.

At Phase 1:

> Establish the route/controller structure only.

Do not implement login yet.

Do not generate JWTs yet.

---

# 15. Employee Route Structure

Create:

```text
backend/routes/employeeRoutes.js
```

The planned REST endpoints are:

```text
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

At Phase 1:

> Establish the route structure without implementing the complete CRUD business logic.

The actual CRUD implementation belongs to the Employee CRUD phase.

---

# 16. Controller Structure

Create:

```text
backend/controllers/authController.js
backend/controllers/employeeController.js
```

Keep controllers focused on HTTP-level responsibilities.

Eventually:

```text
authController
├── login
└── optional register
```

and:

```text
employeeController
├── getEmployees
├── getEmployee
├── createEmployee
├── updateEmployee
└── deleteEmployee
```

For Phase 1, do not implement all of these operations.

Prepare the files and architecture without adding fake business behavior.

---

# 17. Route Mounting

The Express server should be structured so routes can be mounted cleanly.

Conceptually:

```text
server.js
    │
    ├── /api/health
    │
    ├── /api/auth
    │      └── authRoutes
    │
    └── /api/employees
           └── employeeRoutes
```

Do not duplicate route prefixes.

Prefer:

```text
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
```

rather than repeating `/api/auth` and `/api/employees` inside every route definition.

---

# 18. Authentication Middleware Preparation

Create:

```text
backend/middleware/authMiddleware.js
```

This file is intended for Phase 2 JWT protection.

During Phase 1:

- Establish the file/location.
- Do not implement JWT verification.
- Do not apply it to employee routes yet.
- Do not block API requests with authentication yet.

The actual authentication middleware will be implemented in Phase 2.

---

# 19. Error Middleware

Create:

```text
backend/middleware/errorMiddleware.js
```

Establish a centralized error-handling pattern.

The goal is to prevent every controller from implementing completely different error responses.

Use a consistent format:

```json
{
  "success": false,
  "message": "Error message"
}
```

Do not expose:

- Stack traces
- MongoDB connection strings
- JWT secrets
- Passwords
- Internal implementation details

to API consumers.

---

# 20. API Response Convention

Use a consistent response structure.

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Operation failed"
}
```

For future paginated employee responses:

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

Do not implement pagination in Phase 1.

This structure is only being established for consistency.

---

# 21. HTTP Status Code Convention

Use standard HTTP status codes.

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

Phase 1 should prepare the application to use these consistently.

Do not return `200` for every error.

---

# 22. Database Connection

Preserve the existing Phase 0 MongoDB connection.

Use:

```text
backend/config/db.js
```

The connection should:

- Read `MONGODB_URI` from environment variables.
- Connect through Mongoose.
- Handle connection failures.
- Avoid unnecessary reconnection logic.
- Keep database configuration separate from business logic.

Do not switch to:

```text
Prisma
PostgreSQL
MySQL
Firebase
Supabase
```

The required database is MongoDB.

---

# 23. MongoDB Collections

Do not manually create collections in MongoDB.

Once the models are ready, MongoDB/Mongoose can create collections when documents are eventually inserted.

Expected future collections:

```text
users
employees
```

Do not insert fake employee records unless explicitly requested for testing.

Do not create fake production users.

---

# 24. Environment Variables

Preserve the existing Phase 0 environment configuration.

Backend:

```text
PORT=5000
MONGODB_URI=
JWT_SECRET=
```

Frontend:

```text
VITE_API_URL=http://localhost:5000/api
```

Use the actual variable convention of the existing frontend tooling.

Never hardcode:

```text
MongoDB URI
Database password
JWT secret
API keys
Tokens
```

Do not commit `.env`.

---

# 25. Dependency Rules

Do not install packages unless necessary.

The approved backend foundation is:

```text
express
mongoose
cors
dotenv
```

Authentication dependencies:

```text
jsonwebtoken
bcryptjs
```

are part of the project stack but should only be used when implementing authentication.

Do not install additional validation, ORM, database, or architecture libraries without explicit approval.

---

# 26. Validation Library Rule

Do not add:

```text
Joi
Yup
Zod
express-validator
Joi alternatives
```

for Phase 1 unless explicitly approved.

Mongoose schema validation is sufficient for the database model foundation.

If later API-level validation requires an additional library, explain:

1. Why it is needed.
2. Alternatives.
3. Impact.
4. Maintenance considerations.

Then ask for approval.

---

# 27. No Frontend Business Logic

Do not add frontend employee logic in Phase 1.

Do not create:

```text
EmployeeTable.jsx
EmployeeForm.jsx
DeleteModal.jsx
AnalyticsCard.jsx
SearchBar.jsx
Pagination.jsx
```

unless they already exist and must be preserved.

Those components belong to later phases.

---

# 28. No UI Changes

Again, this phase must not change the UI.

If you need to test the API from the frontend:

- Use the smallest possible technical test.
- Do not redesign the page.
- Do not add permanent dashboard UI.
- Remove temporary testing code after verification if it is not part of the intended architecture.

The existing UI must look and behave the same after Phase 1.

---

# 29. API Health Check Preservation

Do not remove or break:

```text
GET /api/health
```

It should continue returning:

```json
{
  "success": true,
  "message": "API is running"
}
```

If the health endpoint already exists, preserve it.

---

# 30. Database Model Verification

After creating the models, verify that:

```text
User model loads successfully
Employee model loads successfully
```

Do not create real employee records merely to prove the model loads.

A successful server startup and model import/registration are sufficient for this phase.

---

# 31. Error Handling Verification

Verify that the backend can handle basic errors without crashing.

Test situations such as:

```text
Invalid route
Malformed request
Database connection failure
Invalid model data
```

The backend should return a JSON error response where appropriate.

The server should not expose internal secrets.

---

# 32. Server Stability

The server must remain stable when:

- MongoDB is unavailable.
- An invalid route is requested.
- A malformed request reaches the API.
- A controller encounters an error.

Do not allow one request error to crash the entire Node.js process.

---

# 33. Code Quality Rules

Always:

- Use functional/simple JavaScript.
- Use async/await where appropriate.
- Use descriptive names.
- Keep controllers focused.
- Keep models simple.
- Keep database logic in the database/config layer.
- Keep routes focused on routing.
- Keep middleware focused on middleware responsibilities.
- Avoid duplicate code.
- Avoid unnecessary abstractions.

Do not create huge `server.js` files.

---

# 34. Testing Checklist

Before completing Phase 1, verify:

## Backend

```text
[ ] Express starts successfully
[ ] MongoDB connects
[ ] /api/health still works
[ ] Routes are mounted correctly
[ ] User model loads
[ ] Employee model loads
[ ] Mongoose validation works
[ ] Employee status accepts only Active/Inactive
[ ] Required employee fields are enforced
[ ] Email validation works
[ ] Duplicate email handling is prepared
[ ] Centralized error middleware is configured
```

## Frontend

```text
[ ] Frontend still starts
[ ] Existing UI is unchanged
[ ] Existing routes still work
[ ] Axios configuration still works
[ ] No unnecessary frontend dependencies were added
```

## Safety

```text
[ ] No existing functionality was removed
[ ] No unrelated functionality was added
[ ] No e-commerce functionality was added
[ ] No secrets were committed
[ ] No unnecessary packages were installed
```

---

# 35. Manual API Verification

Verify the backend endpoints that are actually implemented in Phase 1.

At minimum:

```text
GET /api/health
```

If route placeholders are created, verify that they are mounted correctly without pretending that CRUD functionality is complete.

Do not claim employee CRUD is working until it is implemented in the dedicated CRUD phase.

---

# 36. Git Safety

Before making changes:

```bash
git status
```

Inspect existing changes.

If uncommitted work exists:

> Do not overwrite, reset, or discard it.

After Phase 1:

```bash
git status
```

Review every changed file.

Check that:

```text
.env
```

and other secret files are ignored.

Do not create a commit unless explicitly requested.

---

# 37. Phase 1 Completion Criteria

Phase 1 is complete when the backend foundation looks like:

```text
                    BACKEND

              ┌───────────────┐
              │   Express     │
              │    Server     │
              └───────┬───────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
     Routes       Middleware    Controllers
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                  Mongoose
                      │
                      ▼
                  MongoDB
                      │
             ┌────────┴────────┐
             ▼                 ▼
           Users           Employees
```

The application is now ready for Phase 2.

---

# 38. Do Not Proceed to Phase 2 Automatically

After completing Phase 1, stop.

Report:

### 1. Files created

Example:

```text
backend/models/User.js
backend/models/Employee.js
backend/controllers/...
backend/routes/...
backend/middleware/...
```

### 2. Files modified

List every modified file.

### 3. Dependencies added

List only newly installed packages.

### 4. Database status

Report:

```text
MongoDB connected successfully
```

or explain the exact error.

### 5. Model verification

Report:

```text
User model: OK
Employee model: OK
```

### 6. API verification

Report:

```text
GET /api/health: PASS
```

and any other endpoint actually tested.

### 7. UI verification

Confirm:

```text
Existing UI preserved
```

### 8. Issues

List any remaining issues.

Then stop.

**Do not start Phase 2 until explicitly instructed.**

---

# Final Phase 1 Principle

The purpose of Phase 1 is to create a **stable backend foundation**, not to rush into functionality.

Prefer:

```text
Simple
Readable
Stable
Maintainable
Secure
Assessment-compliant
```

over:

```text
Over-engineered
Highly abstract
Unnecessary
Experimental
```

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
