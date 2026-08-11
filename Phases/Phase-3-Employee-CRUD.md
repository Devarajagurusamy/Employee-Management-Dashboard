# Phase 3 — Employee CRUD

## Objective

Implement the complete Employee Management CRUD functionality on top of the working Phase 0, Phase 1, and Phase 2 foundation.

The goal of this phase is to make employee data fully manageable through the authenticated application:

```text
Authenticated User
        │
        ▼
Dashboard
        │
        ├── View Employees
        ├── Create Employee
        ├── Edit Employee
        └── Delete Employee
```

The backend must communicate with MongoDB through Mongoose, and the React frontend must communicate with the backend through Axios.

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow all project rules strictly.
3. Review the completed Phase 0, Phase 1, and Phase 2 implementation.
4. Preserve all existing functionality.
5. Preserve the existing authentication behavior.
6. Do not introduce unnecessary libraries.
7. Do not implement features belonging to later phases.

The project remains an:

```text
React Employee Management Dashboard
```

Do not introduce unrelated functionality.

---

# 2. Existing Functionality Safety Rule

Before modifying the project:

```bash
git status
```

Inspect the current working tree.

Verify:

```text
[ ] Frontend starts
[ ] Backend starts
[ ] MongoDB connects
[ ] /api/health works
[ ] Login works
[ ] JWT generation works
[ ] JWT verification works
[ ] Protected route works
[ ] Logout works
[ ] Existing UI is preserved
```

If any authentication functionality is broken:

> Fix the existing issue before adding CRUD functionality.

Do not work around a broken authentication implementation by duplicating authentication logic.

If uncommitted changes already exist:

> Do not overwrite, reset, or discard them.

---

# 3. Phase 3 Scope

Phase 3 includes:

```text
✓ Employee listing
✓ Get single employee
✓ Create employee
✓ Edit employee
✓ Delete employee
✓ Employee form
✓ Form validation
✓ Delete confirmation
✓ Loading states
✓ Error states
✓ Empty states
✓ Authenticated employee API access
✓ Frontend/backend CRUD integration
```

Phase 3 does NOT include:

```text
✗ Search
✗ Department filtering
✗ Status filtering
✗ Debounced search
✗ Pagination
✗ Analytics
✗ Charts
✗ Monthly joining statistics
✗ Status distribution charts
✗ Advanced dashboard analytics
```

Those belong to later phases.

---

# 4. UI Preservation Rule

Phase 3 requires employee UI functionality.

If the project already has employee-related UI:

> Preserve its existing visual design.

Do not unnecessarily change:

- Colors
- Typography
- Spacing
- Layout
- Existing navigation
- Existing components
- Existing responsive behavior

If an employee UI does not yet exist, create a clean, professional implementation consistent with the project's existing visual language.

Do not redesign unrelated pages.

---

# 5. Employee CRUD Architecture

The final flow should be:

```text
React Frontend
      │
      │ Axios + JWT
      ▼
Express API
      │
      ├── authMiddleware
      │
      ▼
Employee Controller
      │
      ▼
Mongoose
      │
      ▼
MongoDB
```

For every protected employee operation:

```text
Request
   ↓
JWT
   ↓
Authentication Middleware
   ↓
Controller
   ↓
Validation
   ↓
MongoDB
   ↓
Response
   ↓
React State
   ↓
UI
```

React must never communicate directly with MongoDB.

---

# 6. Employee API Endpoints

Implement these REST endpoints:

```text
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

All employee endpoints must require authentication.

Conceptually:

```text
/api/employees
        │
        ▼
authMiddleware
        │
        ▼
employeeController
```

Do not expose employee management endpoints publicly.

---

# 7. Protect Employee Routes

Apply the existing authentication middleware to employee routes.

Example architecture:

```text
employeeRoutes
      │
      ▼
authMiddleware
      │
      ▼
employeeController
```

Do not create a second JWT verification implementation.

Reuse the existing Phase 2 authentication middleware.

---

# 8. GET Employees

Implement:

```text
GET /api/employees
```

Purpose:

```text
Fetch all employees.
```

The response should follow the project's standard API format.

Example:

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": []
}
```

Do not add search/filter/pagination query parameters in this phase.

Those belong to later phases.

---

# 9. GET Single Employee

Implement:

```text
GET /api/employees/:id
```

Purpose:

```text
Fetch one employee by MongoDB ObjectId.
```

If the ID is invalid:

```text
400 Bad Request
```

or an appropriate validation response.

If the ID is valid but the employee does not exist:

```text
404 Not Found
```

Example:

```json
{
  "success": false,
  "message": "Employee not found"
}
```

Do not expose raw MongoDB/Mongoose errors.

---

# 10. POST Create Employee

Implement:

```text
POST /api/employees
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "designation": "Software Developer",
  "status": "Active",
  "joiningDate": "2026-01-15"
}
```

Flow:

```text
React Form
    |
    ▼
Client Validation
    |
    ▼
POST /api/employees
    |
    ▼
JWT Middleware
    |
    ▼
Controller
    |
    ▼
Mongoose Validation
    |
    ▼
MongoDB
    |
    ▼
201 Created
    |
    ▼
React Updates Employee List
```

---

# 11. Create Employee Validation

Validate on both:

```text
Frontend
Backend
```

Never rely only on frontend validation.

Required fields:

```text
name
email
department
designation
status
joiningDate
```

Validation:

### Name

```text
Required
Trimmed
```

### Email

```text
Required
Valid email
Normalized/lowercase
```

### Department

```text
Required
Trimmed
```

### Designation

```text
Required
Trimmed
```

### Status

Allowed:

```text
Active
Inactive
```

### Joining Date

```text
Required
Valid date
```

---

# 12. POST Response

Successful creation should return:

```text
201 Created
```

Example:

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "designation": "Software Developer",
    "status": "Active",
    "joiningDate": "2026-01-15"
  }
}
```

Do not return unnecessary internal database information.

---

# 13. Duplicate Employee Email

If an employee email already exists:

```text
409 Conflict
```

Example:

```json
{
  "success": false,
  "message": "Employee with this email already exists"
}
```

Do not expose:

```text
MongoServerError
E11000
collection names
database internals
```

to the user.

---

# 14. PUT Update Employee

Implement:

```text
PUT /api/employees/:id
```

The update flow:

```text
Employee Table
      |
      ▼
Click Edit
      |
      ▼
Load Employee
      |
      ▼
Populate Form
      |
      ▼
Modify Data
      |
      ▼
Client Validation
      |
      ▼
PUT /api/employees/:id
      |
      ▼
JWT Middleware
      |
      ▼
Controller
      |
      ▼
Mongoose
      |
      ▼
MongoDB
      |
      ▼
Updated Employee
      |
      ▼
Refresh Employee List
```

---

# 15. Update Validation

The same employee validation rules must apply during update.

Validate:

```text
name
email
department
designation
status
joiningDate
```

Do not allow invalid status values.

Do not allow invalid email values.

Do not silently ignore invalid data.

---

# 16. Employee ID Validation

Before querying MongoDB with:

```text
/api/employees/:id
```

validate the ID.

Handle:

```text
Invalid ObjectId
```

without allowing the backend to crash.

Example:

```text
GET /api/employees/invalid-id
```

should return a clean API error.

Do not expose raw Mongoose CastError details.

---

# 17. DELETE Employee

Implement:

```text
DELETE /api/employees/:id
```

Delete flow:

```text
Employee Table
      |
      ▼
Click Delete
      |
      ▼
Confirmation Dialog
      |
      ├── Cancel
      │     ↓
      │   Close
      │
      └── Confirm
            |
            ▼
      DELETE /api/employees/:id
            |
            ▼
      JWT Middleware
            |
            ▼
      Controller
            |
            ▼
         MongoDB
            |
            ▼
      Success Response
            |
            ▼
      Update Employee List
```

---

# 18. Delete Confirmation

Never delete immediately when the user clicks the delete button.

Show a confirmation dialog.

The dialog should communicate:

```text
Are you sure you want to delete this employee?
```

It should provide:

```text
Cancel
Delete
```

The delete action should only happen after explicit confirmation.

---

# 19. Delete Response

Successful deletion:

```text
200 OK
```

Example:

```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

If the employee does not exist:

```text
404 Not Found
```

---

# 20. Employee Controller Responsibilities

Implement the employee controller in:

```text
backend/controllers/employeeController.js
```

Expected controller methods:

```text
getEmployees
getEmployee
createEmployee
updateEmployee
deleteEmployee
```

Keep controllers readable.

Each controller should generally:

```text
1. Read request data
2. Validate input
3. Query/update MongoDB
4. Handle expected errors
5. Return standard response
```

Do not put unrelated business logic inside controllers.

---

# 21. Service Layer Rule

Do not introduce a service layer just because the application has controllers.

For this assessment, direct Mongoose usage inside controllers is acceptable if it remains readable.

Only introduce:

```text
services/
```

if there is genuine duplicated business logic or a clear architectural need.

Do not overengineer.

---

# 22. Employee Table

Create or update the employee listing UI.

The table must display:

```text
Employee Name
Email
Department
Designation
Status
Joining Date
Actions
```

Actions:

```text
Edit
Delete
```

Do not add:

```text
Search
Filter
Pagination
```

yet.

Those belong to later phases.

---

# 23. Employee Table Loading State

When fetching employees:

```text
Loading employees...
```

or an appropriate loading indicator should be displayed.

Do not leave an empty table while the API request is still loading.

After the request finishes:

```text
Loading → Data
```

or:

```text
Loading → Empty
```

or:

```text
Loading → Error
```

---

# 24. Employee Empty State

If the API returns no employees:

```text
No employees found.
```

Provide an appropriate action such as:

```text
Add Employee
```

if the UI design supports it.

Do not show a broken/empty table with no explanation.

---

# 25. Employee API Error State

If fetching employees fails:

```text
Unable to load employees.
```

Provide a retry action where appropriate.

Do not display raw Axios errors.

Do not display stack traces.

---

# 26. Employee Form

Create a reusable employee form.

Use the same form for:

```text
Create Employee
Edit Employee
```

Do not create two separate duplicated forms unless the existing architecture requires it.

Fields:

```text
Name
Email
Department
Designation
Status
Joining Date
```

---

# 27. Create Employee UI

The create flow:

```text
Click Add Employee
        |
        ▼
Employee Form
        |
        ▼
Enter Details
        |
        ▼
Validate
        |
        ▼
POST API
        |
        ▼
Success
        |
        ▼
Close Form
        |
        ▼
Update Employee List
```

The UI should clearly indicate:

```text
Add Employee
```

and:

```text
Cancel
```

---

# 28. Edit Employee UI

The edit flow:

```text
Employee Table
      |
      ▼
Edit
      |
      ▼
Load Existing Employee
      |
      ▼
Populate Form
      |
      ▼
Modify
      |
      ▼
Update
      |
      ▼
PUT API
      |
      ▼
Success
      |
      ▼
Update Table
```

Do not make the user manually re-enter unchanged information.

---

# 29. Form Validation UI

Display validation messages near the relevant field.

Examples:

```text
Name is required.
Enter a valid email address.
Department is required.
Designation is required.
Status is required.
Joining date is required.
```

Keep messages concise and understandable.

Do not use technical database terminology.

---

# 30. Form Loading State

During create/update:

```text
Saving...
```

or:

```text
Updating...
```

The form submission button should be disabled while the request is active to prevent duplicate requests.

If the API fails:

```text
Stop loading
Keep user input
Display error
```

Do not clear the form on failure.

---

# 31. Form Success Behavior

After successful creation:

```text
Close form
Refresh/update employee list
Show success feedback
```

After successful update:

```text
Close form
Refresh/update employee list
Show success feedback
```

Do not require a full page reload if a clean state update is possible.

---

# 32. Employee State

Employee data should be managed independently from authentication state.

Do not put employees inside:

```text
AuthContext
```

Authentication state:

```text
AuthContext
```

Employee state:

```text
Dashboard / Employee components
```

Keep responsibilities separate.

---

# 33. API Service

Use the existing centralized Axios configuration.

Create or update:

```text
frontend/src/services/employeeService.js
```

Responsibilities:

```text
getEmployees()
getEmployee(id)
createEmployee(data)
updateEmployee(id, data)
deleteEmployee(id)
```

Do not put Axios calls directly throughout multiple components.

---

# 34. Employee API Service Example Structure

Conceptually:

```text
employeeService
      │
      ├── getEmployees
      ├── getEmployee
      ├── createEmployee
      ├── updateEmployee
      └── deleteEmployee
```

The service should use the centralized Axios instance.

Do not create a second Axios configuration.

---

# 35. Authentication Integration

All employee API requests must use the authenticated Axios configuration.

Flow:

```text
Employee Request
      |
      ▼
Axios
      |
      ▼
Authorization: Bearer <token>
      |
      ▼
Express
      |
      ▼
authMiddleware
      |
      ▼
Employee Controller
```

Reuse the Phase 2 JWT implementation.

Do not create a separate employee authentication mechanism.

---

# 36. Unauthorized Employee Requests

If an employee API request returns:

```text
401 Unauthorized
```

the existing authentication handling should:

```text
Clear invalid authentication state
Remove token
Redirect to login
```

Do not create duplicate 401 handling in every employee component.

---

# 37. Dashboard Integration

The dashboard should now display the employee management functionality.

Conceptually:

```text
Dashboard
    |
    ├── Employee Section
    │
    ├── Add Employee
    │
    └── Employee Table
            |
            ├── Edit
            └── Delete
```

Do not add analytics yet.

---

# 38. Responsive Behavior

Maintain responsive behavior.

For smaller screens:

- Avoid breaking the page.
- Keep forms usable.
- Keep action buttons accessible.
- Allow horizontal scrolling for wide employee tables if necessary.

Do not redesign the entire responsive system during this phase.

---

# 39. Backend Error Handling

Use the centralized error middleware from Phase 1.

Handle:

```text
Invalid employee ID
Employee not found
Validation errors
Duplicate email
Database errors
Unexpected server errors
```

Return clean JSON responses.

Do not duplicate large error-handling blocks unnecessarily.

---

# 40. API Status Codes

Use appropriate status codes:

```text
GET employees
→ 200 OK

GET employee
→ 200 OK

Create employee
→ 201 Created

Update employee
→ 200 OK

Delete employee
→ 200 OK

Invalid input
→ 400 Bad Request

Unauthenticated
→ 401 Unauthorized

Employee not found
→ 404 Not Found

Duplicate email
→ 409 Conflict

Unexpected server error
→ 500 Internal Server Error
```

---

# 41. No Search or Filters Yet

Do not implement:

```text
Search by name
Search by email
Department filter
Status filter
Debounced search
```

Even if the employee table is already working.

These features belong to Phase 4.

Do not prematurely add query parameters such as:

```text
?search=
?department=
?status=
```

unless required by existing code compatibility.

---

# 42. No Pagination Yet

Do not implement:

```text
page
limit
totalPages
Previous
Next
Page numbers
```

Pagination belongs to a later phase.

For Phase 3:

```text
GET /api/employees
```

may return the employee collection directly.

---

# 43. No Analytics Yet

Do not implement:

```text
Total Employees card
Active Employees card
Department chart
Monthly joining chart
Status distribution
Recharts
```

Analytics belongs to a later phase.

Do not calculate analytics just because employee data is now available.

---

# 44. No Sorting Yet

Do not add employee table sorting unless it already exists and must be preserved.

Sorting is not a mandatory Phase 3 requirement.

Do not introduce additional table libraries.

---

# 45. Dependency Rules

Do not install new libraries unless absolutely necessary.

Use the existing stack:

```text
React
React Router DOM
Axios
Node.js
Express
MongoDB
Mongoose
JWT
bcryptjs
```

Do not install:

```text
React Hook Form
Formik
Zod
Yup
React Table
TanStack Table
Material UI
Ant Design
```

unless explicitly approved.

Simple controlled React forms are sufficient for this assessment.

---

# 46. No Database Replacement

Do not switch from:

```text
MongoDB + Mongoose
```

to another database or ORM.

Do not introduce:

```text
PostgreSQL
MySQL
Prisma
Firebase
Supabase
```

---

# 47. Security Rules

Employee APIs must be protected by JWT authentication.

Never:

```text
Allow unauthenticated CRUD
Trust user ID from request body for authentication
Return passwords
Return password hashes
Expose MongoDB credentials
Expose JWT secret
Log sensitive credentials
```

The authenticated user should come from:

```text
req.user
```

after JWT verification.

---

# 48. Data Integrity

When updating an employee:

- Do not accidentally overwrite fields with undefined values.
- Validate all required fields.
- Preserve the employee ID.
- Preserve timestamps appropriately.
- Handle duplicate email correctly.

When deleting:

- Delete only the requested employee.
- Do not delete related or unrelated records.
- Return a clear result.

---

# 49. API Testing

Test the employee APIs manually using a suitable API client or browser where applicable.

Required tests:

```text
GET /api/employees
GET /api/employees/:id
POST /api/employees
PUT /api/employees/:id
DELETE /api/employees/:id
```

Test both:

```text
Authenticated request
Unauthenticated request
```

Expected:

```text
Authenticated → Allowed
Unauthenticated → 401
```

---

# 50. CRUD Test Scenarios

## Create

Test:

```text
[ ] Valid employee
[ ] Missing name
[ ] Missing email
[ ] Invalid email
[ ] Missing department
[ ] Missing designation
[ ] Invalid status
[ ] Missing joining date
[ ] Duplicate email
```

## Read

Test:

```text
[ ] Get all employees
[ ] Get existing employee
[ ] Get non-existing employee
[ ] Invalid employee ID
```

## Update

Test:

```text
[ ] Update valid employee
[ ] Update invalid employee ID
[ ] Update non-existing employee
[ ] Invalid email
[ ] Invalid status
[ ] Duplicate email
```

## Delete

Test:

```text
[ ] Delete existing employee
[ ] Delete non-existing employee
[ ] Invalid employee ID
[ ] Cancel delete in UI
[ ] Confirm delete in UI
```

---

# 51. Frontend CRUD Test Flow

Perform this complete flow:

```text
1. Login
      ↓
2. Open Dashboard
      ↓
3. View Employee List
      ↓
4. Click Add Employee
      ↓
5. Submit invalid form
      ↓
6. Confirm validation errors
      ↓
7. Enter valid data
      ↓
8. Create Employee
      ↓
9. Confirm employee appears
      ↓
10. Click Edit
      ↓
11. Modify employee
      ↓
12. Save
      ↓
13. Confirm updated data
      ↓
14. Click Delete
      ↓
15. Cancel confirmation
      ↓
16. Confirm employee remains
      ↓
17. Click Delete again
      ↓
18. Confirm deletion
      ↓
19. Confirm employee disappears
```

---

# 52. Loading State Test

Verify loading states for:

```text
Employee fetch
Employee create
Employee update
Employee delete
```

Do not allow duplicate submissions.

Do not leave the UI permanently loading after an error.

---

# 53. Empty State Test

With zero employees:

```text
No employees found.
```

must be shown.

The application must remain usable.

---

# 54. Error State Test

Temporarily make the API unavailable and verify:

```text
Unable to load employees.
```

or an equivalent user-friendly message.

The application must not crash.

---

# 55. Regression Testing

After implementing CRUD, verify Phase 0 and Phase 2 again.

## Phase 0

```text
[ ] Frontend starts
[ ] Backend starts
[ ] MongoDB connects
[ ] /api/health works
```

## Phase 2

```text
[ ] Login works
[ ] JWT works
[ ] Token storage works
[ ] Protected dashboard works
[ ] Logout works
[ ] Invalid token handling works
```

Do not consider Phase 3 complete if authentication is broken.

---

# 56. UI Regression

Confirm:

```text
[ ] Existing login UI unchanged
[ ] Existing navigation unchanged
[ ] Existing styles preserved
[ ] Existing responsive behavior preserved
[ ] No unrelated UI changed
```

Only the new employee-management UI should be introduced/updated as required by this phase.

---

# 57. Git Safety

Before implementation:

```bash
git status
```

After implementation:

```bash
git status
```

Review every changed file.

Do not use destructive commands such as:

```bash
git reset --hard
git clean -fd
```

Do not discard existing work.

Do not commit:

```text
.env
```

or any secret credentials.

---

# 58. Code Quality Rules

Always:

- Keep controllers focused.
- Keep API services separate from UI components.
- Reuse the existing Axios instance.
- Reuse the existing authentication middleware.
- Reuse the employee form for create/edit.
- Keep validation readable.
- Use descriptive names.
- Use async/await.
- Handle loading and errors.
- Avoid duplicated CRUD logic.
- Keep components reasonably small.

Do not create unnecessary abstractions.

---

# 59. Recommended Frontend Components

Only create components that are genuinely needed.

Recommended:

```text
components/
└── employees/
    ├── EmployeeTable.jsx
    ├── EmployeeForm.jsx
    └── DeleteConfirmation.jsx
```

Depending on the existing UI architecture, these may instead be organized differently.

Do not blindly restructure the project.

---

# 60. Recommended Employee State Flow

A simple flow is preferred:

```text
Dashboard
    |
    ▼
Employee state
    |
    ├── fetchEmployees()
    │
    ├── createEmployee()
    │
    ├── updateEmployee()
    │
    └── deleteEmployee()
```

The employee service handles API communication.

The page/component handles UI state.

Do not put employee state into AuthContext.

---

# 61. Phase 3 Completion Criteria

Phase 3 is complete when:

```text
✓ Authenticated user can view employees
✓ Authenticated user can create employees
✓ Authenticated user can edit employees
✓ Authenticated user can delete employees
✓ Delete requires confirmation
✓ Employee validation works
✓ Duplicate emails are handled
✓ Loading states work
✓ Error states work
✓ Empty state works
✓ Employee APIs are protected
✓ Existing authentication still works
✓ Existing UI is preserved
```

The resulting flow should be:

```text
                    DASHBOARD

              ┌─────────────────┐
              │ Employee List   │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Create         Edit        Delete
          │            │            │
          ▼            ▼            ▼
       POST API      PUT API     Confirmation
          │            │            │
          ▼            ▼            ▼
       MongoDB       MongoDB      DELETE API
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                Updated Employee
                     List
```

---

# 62. Do Not Proceed to Phase 4 Automatically

After completing Phase 3, stop.

Report:

## 1. Files Created

List all newly created files.

## 2. Files Modified

List all modified files.

## 3. Dependencies Added

List only newly installed dependencies.

## 4. Backend APIs

Report:

```text
GET /api/employees: PASS/FAIL
GET /api/employees/:id: PASS/FAIL
POST /api/employees: PASS/FAIL
PUT /api/employees/:id: PASS/FAIL
DELETE /api/employees/:id: PASS/FAIL
```

## 5. Authentication

Confirm:

```text
Employee routes protected: YES/NO
JWT verification working: YES/NO
```

## 6. Frontend CRUD

Report:

```text
Employee listing: PASS/FAIL
Create: PASS/FAIL
Edit: PASS/FAIL
Delete: PASS/FAIL
Delete confirmation: PASS/FAIL
```

## 7. UX

Report:

```text
Loading states: PASS/FAIL
Error states: PASS/FAIL
Empty state: PASS/FAIL
Validation: PASS/FAIL
```

## 8. Regression

Confirm:

```text
Phase 0 preserved: YES/NO
Phase 1 preserved: YES/NO
Phase 2 preserved: YES/NO
Existing UI preserved: YES/NO
```

## 9. Issues

List any remaining problems.

Then stop.

**Do not start Phase 4 until explicitly instructed.**

---

# Final Phase 3 Principle

The goal is to create a reliable employee-management CRUD foundation.

Prefer:

```text
Simple
Readable
Reusable
Secure
Maintainable
RESTful
Assessment-compliant
```

over:

```text
Over-engineered
Duplicated
Experimental
Unnecessary
```

The implementation should demonstrate that the developer understands:

```text
React
    +
Axios
    +
Express
    +
JWT
    +
Mongoose
    +
MongoDB
    =
Working Employee CRUD
```

---

# Strict Phase Boundary

**Phase 3 ends after Employee CRUD is fully functional.**

Do not implement:

```text
Search
Department filters
Status filters
Debounced search
Pagination
Analytics
Charts
```

These are future phases.

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
