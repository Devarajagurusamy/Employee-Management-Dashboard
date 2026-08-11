# Phase 2 — Authentication & Protected Routes

## Objective

Implement the complete authentication flow for the Employee Management Dashboard.

Phase 2 builds on the backend foundation from Phase 1 and adds:

```text
Login Page
     |
     v
Form Validation
     |
     v
POST /api/auth/login
     |
     v
Express Authentication
     |
     v
MongoDB User
     |
     v
bcrypt Password Verification
     |
     v
JWT Generation
     |
     v
React Token Storage
     |
     v
Protected Dashboard Route
     |
     v
Authenticated Dashboard Access
```

The goal of this phase is to make authentication fully functional while preserving all existing Phase 0 and Phase 1 functionality.

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow every applicable rule.
3. Review the Phase 0 and Phase 1 implementations.
4. Preserve existing functionality.
5. Do not redesign existing UI.
6. Do not introduce unnecessary libraries.
7. Do not implement features belonging to later phases.

The project remains:

```text
React Employee Management Dashboard
```

Do not introduce unrelated functionality.

---

# 2. Existing Functionality Safety Rule

Before modifying the project:

```text
git status
```

Inspect the current working tree.

Verify:

```text
[ ] Frontend runs
[ ] Backend runs
[ ] MongoDB connects
[ ] /api/health works
[ ] Phase 1 models load
[ ] Existing routes work
[ ] Existing UI is preserved
```

If there are uncommitted changes:

> Do not overwrite, reset, or discard them.

Only modify files required for authentication.

---

# 3. UI Preservation Rule

Authentication is the first phase that requires a meaningful frontend feature.

However, if a login UI already exists:

> **Do not redesign it.**

Preserve:

- Existing colors
- Typography
- Spacing
- Layout
- Buttons
- Form styling
- Responsive behavior
- Existing components

If no login page exists yet, create the minimum professional login interface required by the assessment.

Do not redesign unrelated pages.

Do not create the complete employee dashboard UI yet.

---

# 4. Phase 2 Scope

Phase 2 includes:

```text
✓ User authentication
✓ Login API
✓ Email/password validation
✓ bcrypt password verification
✓ JWT generation
✓ JWT token handling
✓ Token storage
✓ Auth context/state
✓ React login flow
✓ Protected route
✓ Authenticated redirect
✓ Logout
✓ Invalid/expired token handling
✓ Authentication error handling
```

Phase 2 does NOT include:

```text
✗ Employee CRUD
✗ Employee table
✗ Employee create/edit/delete UI
✗ Search
✗ Department filtering
✗ Status filtering
✗ Pagination
✗ Analytics
✗ Charts
✗ Employee dashboard redesign
```

Those belong to later phases.

---

# 5. Authentication Architecture

The final Phase 2 authentication flow should be:

```text
                     LOGIN FLOW

┌───────────────────┐
│   Login Page      │
│                   │
│ Email             │
│ Password          │
└─────────┬─────────┘
          │
          │ Submit
          ▼
┌───────────────────┐
│ Client Validation │
└─────────┬─────────┘
          │
       Valid?
       /     \
     No       Yes
     |         |
     v         v
Show Error   Axios
               |
               v
      POST /api/auth/login
               |
               v
      ┌──────────────────┐
      │ Express Backend  │
      └────────┬─────────┘
               │
               v
      Find User by Email
               │
               v
       MongoDB / Mongoose
               │
               v
       bcrypt.compare()
               │
          Valid password?
           /          \
         No            Yes
         |              |
         v              v
   401 Response     Generate JWT
                        |
                        v
                  Return Token
                        |
                        v
                React Auth State
                        |
                        v
              Store Token
                        |
                        v
                 /dashboard
```

---

# 6. Authentication API

Implement:

```text
POST /api/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Successful response should follow the project's standard response format.

Example:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
}
```

Do not return:

```text
password
hashed password
JWT secret
database credentials
```

in the response.

---

# 7. Login Controller

Implement the login logic in:

```text
backend/controllers/authController.js
```

The controller should:

1. Read email and password.
2. Validate that both are present.
3. Normalize the email.
4. Find the user by email.
5. Handle a missing user.
6. Compare the supplied password with the stored hash.
7. Generate a JWT after successful verification.
8. Return a safe user object.
9. Return the token.
10. Handle unexpected errors safely.

Do not put authentication logic directly inside the route file.

---

# 8. User Lookup

Find users using their normalized email.

Example conceptual flow:

```text
Input Email
     |
     v
Trim
     |
     v
Lowercase
     |
     v
User.findOne({ email })
```

If the user does not exist:

Return:

```text
401 Unauthorized
```

Use a generic authentication message such as:

```text
Invalid email or password
```

Do not reveal whether the email exists.

---

# 9. Password Verification

Use:

```text
bcryptjs
```

The password flow must be:

```text
Plain Password
      |
      v
bcrypt.compare()
      |
      v
Stored Password Hash
```

Never compare passwords manually.

Never:

```text
password === storedPassword
```

Never store plain-text passwords.

---

# 10. JWT Generation

Use:

```text
jsonwebtoken
```

Generate a JWT only after:

```text
User exists
+
Password is correct
```

The token should contain only the minimum useful identity information.

Recommended payload:

```json
{
  "userId": "USER_ID"
}
```

Do not put sensitive information inside the JWT.

Do not put:

```text
password
password hash
MongoDB URI
JWT secret
```

inside the payload.

---

# 11. JWT Secret

Use the backend environment variable:

```text
JWT_SECRET=
```

Never hardcode the secret.

Never expose the secret to React.

Never use:

```text
VITE_JWT_SECRET
REACT_APP_JWT_SECRET
NEXT_PUBLIC_JWT_SECRET
```

The JWT secret must remain server-side.

---

# 12. JWT Expiration

Configure a reasonable JWT expiration.

For example:

```text
1d
```

or another appropriate duration.

Do not create tokens that never expire unless explicitly required.

Keep the expiration value configurable where practical.

The frontend must be prepared to handle an expired token.

---

# 13. Token Storage

The technical assessment explicitly requires token handling using:

```text
localStorage
```

or:

```text
sessionStorage
```

Choose one approach and use it consistently.

Recommended for this assessment:

```text
localStorage
```

Store:

```text
authToken
```

Do not store:

```text
password
JWT_SECRET
MongoDB URI
```

Do not duplicate the token in multiple storage systems.

---

# 14. Token Storage Flow

After successful login:

```text
Login API Success
       |
       v
Extract token
       |
       v
localStorage.setItem(...)
       |
       v
Update Auth State
       |
       v
Navigate /dashboard
```

On logout:

```text
Logout
  |
  v
Remove authToken
  |
  v
Clear auth state
  |
  v
Navigate /login
```

---

# 15. Axios Authorization

Update the centralized Axios configuration so authenticated requests can include:

```text
Authorization: Bearer <token>
```

The token must be read from the chosen storage.

Conceptually:

```text
React API Request
       |
       v
Axios
       |
       v
Read authToken
       |
       v
Authorization Header
       |
       v
Express
```

Do not duplicate this logic across every component.

Keep it in the centralized API layer or a small approved Axios interceptor.

Do not overengineer it.

---

# 16. Authentication Middleware

Implement:

```text
backend/middleware/authMiddleware.js
```

The middleware should:

1. Read the `Authorization` header.
2. Verify the `Bearer` format.
3. Extract the token.
4. Verify the JWT using `JWT_SECRET`.
5. Read the user identity from the token.
6. Attach authenticated user information to the request.
7. Continue to the next middleware/controller.

Conceptually:

```text
Request
   |
   v
Authorization Header
   |
   v
Bearer Token
   |
   v
jwt.verify()
   |
   +---- Invalid ----> 401
   |
   v
req.user
   |
   v
Controller
```

---

# 17. Invalid Token Handling

Return:

```text
401 Unauthorized
```

for:

- Missing token
- Malformed token
- Invalid token
- Expired token

Use a consistent response:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Do not expose internal JWT errors to the frontend.

Do not return the JWT secret or stack trace.

---

# 18. Protect Employee Routes

The employee routes are intended to be protected.

However, Phase 2 should not implement employee CRUD functionality.

Prepare the route architecture so the future employee endpoints can use:

```text
authMiddleware
```

Do not create fake employee CRUD operations just to test the middleware.

Authentication middleware can be verified with a minimal protected test endpoint if necessary, but remove temporary testing code unless it is useful to the final architecture.

---

# 19. Auth Context

Create:

```text
frontend/src/context/AuthContext.jsx
```

The Auth Context should provide authentication state to the React application.

It should manage:

```text
user
token/authenticated state
loading
login()
logout()
```

Keep the context focused.

Do not put employee state into `AuthContext`.

---

# 20. Authentication State

The frontend should be able to determine:

```text
Is the user authenticated?
Who is the current user?
Is authentication state being initialized?
```

Conceptually:

```text
AuthContext
    |
    ├── user
    ├── isAuthenticated
    ├── loading
    ├── login()
    └── logout()
```

Do not create a global state system unnecessarily.

Context API is sufficient for authentication.

---

# 21. Restore Authentication on Refresh

When the browser refreshes:

```text
Browser Refresh
      |
      v
AuthContext initializes
      |
      v
Read authToken
      |
      v
Token exists?
   /       \
 No         Yes
 |           |
 v           v
Logged Out  Restore Auth State
```

The application should not immediately treat a user as logged out merely because React state was reset during refresh.

If a user object is not stored, the application may decode only non-sensitive identity information from the token for UI state, or use a future `/api/auth/me` endpoint if that is part of the approved architecture.

Do not add unnecessary authentication APIs just to solve this if a simpler solution is sufficient.

---

# 22. Login Page

Create or preserve:

```text
frontend/src/pages/Login.jsx
```

Route:

```text
/login
```

Required fields:

```text
Email
Password
```

Required behavior:

```text
Submit
   |
   v
Validate
   |
   v
Login API
   |
   v
Store token
   |
   v
Update auth state
   |
   v
Navigate /dashboard
```

---

# 23. Login Validation

Validate on the frontend before making the API request.

Email:

```text
Required
Valid email format
```

Password:

```text
Required
```

Do not submit obviously invalid forms to the backend.

Backend validation remains mandatory even if frontend validation exists.

Never trust frontend validation alone.

---

# 24. Login Loading State

During login:

```text
Logging in...
```

The submit button should:

- Show a loading state.
- Prevent duplicate submissions.
- Remain accessible.

After success:

```text
Navigate to /dashboard
```

After failure:

```text
Stop loading
Show error
```

Do not leave the form permanently disabled after an API failure.

---

# 25. Login Error Handling

Handle:

```text
Invalid email/password
Backend unavailable
Network error
Server error
Validation error
```

Display a user-friendly message.

Example:

```text
Invalid email or password.
```

Avoid exposing:

```text
Axios stack trace
MongoDB error
JWT error
Node.js stack trace
```

to users.

---

# 26. Protected Route

Create:

```text
frontend/src/routes/ProtectedRoute.jsx
```

Purpose:

```text
Prevent unauthenticated users from accessing /dashboard.
```

Flow:

```text
User requests /dashboard
          |
          v
ProtectedRoute
          |
          v
Authenticated?
      /       \
    No         Yes
    |           |
    v           v
/login       Dashboard
```

---

# 27. Protected Route Loading State

While authentication state is being initialized:

```text
Checking authentication...
```

Do not immediately redirect to `/login` before the authentication state has finished initializing.

This prevents unnecessary redirect flickering after a page refresh.

---

# 28. Dashboard Placeholder

If the dashboard page does not already exist, create only a minimal placeholder:

```text
/dashboard
```

It should confirm that authentication and protected routing are working.

Example conceptual content:

```text
Employee Management Dashboard
Welcome, [User Name]
```

Do not build:

- Employee table
- Analytics
- Search
- Filters
- Pagination
- CRUD UI

Those belong to later phases.

If a dashboard already exists, **do not redesign it**.

---

# 29. Route Configuration

The routing should conceptually become:

```text
BrowserRouter
      |
      ├── /login
      │
      └── /dashboard
              |
              ▼
       ProtectedRoute
              |
              ▼
          Dashboard
```

Unauthenticated:

```text
/dashboard → /login
```

Authenticated:

```text
/login → /dashboard
```

where appropriate.

---

# 30. Authenticated User Visiting Login

If a valid authentication state already exists and the user visits:

```text
/login
```

redirect them to:

```text
/dashboard
```

Do not create a redirect loop.

---

# 31. Logout

Implement logout through `AuthContext`.

Logout must:

1. Remove the stored token.
2. Clear the current user.
3. Clear authentication state.
4. Navigate to `/login`.

Flow:

```text
Dashboard
   |
   v
Logout
   |
   ├── Remove authToken
   |
   ├── Clear user
   |
   └── Navigate /login
```

Do not merely navigate to `/login` while leaving the token in storage.

---

# 32. Backend Logout

Because JWT authentication is stateless and the assessment requires client-side token storage, logout can be handled by removing the client-side token.

Do not introduce:

```text
Redis
token blacklist
session database
Socket.io
```

for logout.

A server-side logout API is not required for this phase.

Keep the solution simple.

---

# 33. User Creation for Testing

The application needs at least one user for login testing.

If no registration feature is required by the assessment, use a controlled development setup to create a test user.

Possible approach:

```text
Temporary development seed
```

or an explicitly controlled registration endpoint used only during setup.

Any test user password must be hashed using:

```text
bcryptjs
```

Do not insert plain-text passwords into MongoDB.

Do not create a permanent public registration UI unless explicitly required.

Do not commit real credentials.

---

# 34. Test Credentials Safety

If development credentials are created:

- Use non-sensitive test credentials.
- Do not use a real personal password.
- Do not commit credentials to Git.
- Do not hardcode credentials in frontend code.
- Document only safe local-development instructions.

---

# 35. User Response Security

Whenever user information is returned from the backend, never return:

```text
password
password hash
JWT secret
```

Safe user object:

```json
{
  "id": "USER_ID",
  "name": "User Name",
  "email": "user@example.com"
}
```

---

# 36. Authentication Error Status Codes

Use:

```text
400 Bad Request
```

for invalid/missing login input.

Use:

```text
401 Unauthorized
```

for invalid credentials.

Use:

```text
500 Internal Server Error
```

for unexpected server errors.

Do not use:

```text
200 OK
```

for failed authentication.

---

# 37. API Response Format

Follow the project's existing API response convention.

Successful login:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
}
```

Failed login:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

Unauthorized request:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Do not expose internal error information.

---

# 38. Axios Error Handling

The frontend should handle Axios failures consistently.

Do not write large duplicated error-handling blocks in every component.

A small utility or centralized API configuration is acceptable if it keeps the code readable.

Do not introduce an error-handling framework.

---

# 39. 401 Handling

If a protected API request returns:

```text
401 Unauthorized
```

the frontend should:

```text
Remove invalid token
      |
      v
Clear auth state
      |
      v
Redirect to /login
```

Do not repeatedly retry an invalid token.

Do not create infinite redirects.

---

# 40. Security Rules

Never:

```text
Store passwords in localStorage
Store passwords in sessionStorage
Store JWT_SECRET in frontend
Expose MongoDB URI in frontend
Hardcode credentials
Log passwords
Log JWT secrets
Return password hashes
```

The JWT token may be stored in localStorage/sessionStorage because this is explicitly required by the technical assessment.

---

# 41. Dependency Rules

Do not install additional authentication libraries.

Use:

```text
jsonwebtoken
bcryptjs
```

for backend authentication.

Use:

```text
React Context API
Axios
React Router DOM
```

for the frontend authentication flow.

Do not add:

```text
Auth0
Firebase Authentication
Clerk
Supabase Auth
Passport
Redux
```

unless explicitly approved.

---

# 42. No UI Design Expansion

Phase 2 should not become a dashboard UI phase.

Do not add:

```text
Analytics cards
Employee table
Charts
Search bar
Filter controls
Pagination
Employee forms
```

Only create the minimum login/protected-route UI required for authentication.

---

# 43. Testing Checklist

## Backend Authentication

```text
[ ] Login endpoint exists
[ ] Missing email is rejected
[ ] Missing password is rejected
[ ] Invalid email format is rejected
[ ] Unknown user is rejected
[ ] Wrong password is rejected
[ ] Correct password succeeds
[ ] Password is verified using bcrypt
[ ] JWT is generated
[ ] JWT contains only required identity data
[ ] JWT secret comes from environment variables
[ ] Password is never returned
```

## JWT Middleware

```text
[ ] Missing token returns 401
[ ] Malformed token returns 401
[ ] Invalid token returns 401
[ ] Expired token returns 401
[ ] Valid token is accepted
[ ] req.user is populated correctly
```

## Frontend

```text
[ ] Login page works
[ ] Email validation works
[ ] Password validation works
[ ] Login loading state works
[ ] Login error state works
[ ] Successful login stores token
[ ] Successful login redirects to dashboard
[ ] Dashboard is protected
[ ] Refresh preserves authentication state
[ ] Unauthenticated dashboard access redirects to login
[ ] Authenticated login-page access redirects appropriately
[ ] Logout removes token
[ ] Logout clears auth state
[ ] Logout redirects to login
```

## Regression

```text
[ ] /api/health still works
[ ] MongoDB still connects
[ ] Phase 1 models still load
[ ] Existing frontend UI remains unchanged
[ ] Existing functionality remains intact
```

---

# 44. Manual Authentication Test Flow

Perform this exact test:

```text
1. Start MongoDB
        ↓
2. Start backend
        ↓
3. Start frontend
        ↓
4. Open /login
        ↓
5. Enter invalid credentials
        ↓
6. Confirm error appears
        ↓
7. Enter valid test credentials
        ↓
8. Confirm login succeeds
        ↓
9. Confirm token is stored
        ↓
10. Confirm redirect to /dashboard
        ↓
11. Refresh browser
        ↓
12. Confirm authenticated state remains
        ↓
13. Logout
        ↓
14. Confirm token is removed
        ↓
15. Confirm redirect to /login
        ↓
16. Manually visit /dashboard
        ↓
17. Confirm redirect to /login
```

---

# 45. Browser Storage Verification

Open browser developer tools:

```text
Application
   ↓
Local Storage
```

Verify:

```text
authToken
```

exists after successful login.

After logout:

```text
authToken
```

must no longer exist.

Do not store:

```text
password
JWT_SECRET
MONGODB_URI
```

---

# 46. Git Safety

Before implementation:

```bash
git status
```

After implementation:

```bash
git status
```

Review every changed file.

Do not:

```text
git reset --hard
git clean -fd
```

or perform destructive operations.

Do not discard existing work.

Do not commit `.env`.

Do not commit test credentials containing sensitive information.

---

# 47. Phase 2 Completion Criteria

Phase 2 is complete when this flow works:

```text
                 AUTHENTICATION

                  ┌──────────┐
                  │  Login   │
                  └────┬─────┘
                       │
                       ▼
                Validate Form
                       │
                       ▼
              POST /api/auth/login
                       │
                       ▼
              Find User in MongoDB
                       │
                       ▼
                 bcrypt.compare
                       │
                  Valid?
                  /    \
                No      Yes
                │        │
                ▼        ▼
             401       JWT
                         │
                         ▼
                  Return Token
                         │
                         ▼
                 Store authToken
                         │
                         ▼
                  AuthContext
                         │
                         ▼
                  /dashboard
                         │
                         ▼
                 ProtectedRoute
```

Logout:

```text
Dashboard
    |
    v
Logout
    |
    ├── Remove authToken
    |
    ├── Clear auth state
    |
    └── /login
```

---

# 48. Do Not Proceed to Phase 3 Automatically

After completing Phase 2, stop.

Report:

## 1. Files Created

List every newly created file.

## 2. Files Modified

List every modified file.

## 3. Dependencies Added

List only newly installed packages.

## 4. Authentication API

Report:

```text
POST /api/auth/login
```

and whether it passed testing.

## 5. JWT

Report:

```text
JWT generation: PASS/FAIL
JWT verification: PASS/FAIL
Token storage: PASS/FAIL
```

## 6. Protected Route

Report:

```text
Protected dashboard: PASS/FAIL
```

## 7. Logout

Report:

```text
Logout: PASS/FAIL
```

## 8. Regression

Confirm:

```text
Phase 0 preserved: YES/NO
Phase 1 preserved: YES/NO
Existing UI preserved: YES/NO
```

## 9. Issues

List any remaining problems.

Then stop.

**Do not start Phase 3 until explicitly instructed.**

---

# Final Phase 2 Principle

Authentication must be:

```text
Simple
Secure
Readable
Predictable
Maintainable
Assessment-compliant
```

Do not overengineer authentication.

Prefer:

```text
React
+
React Router
+
Context API
+
Axios
+
Express
+
Mongoose
+
bcryptjs
+
JWT
```

over unnecessary authentication platforms or complex state-management systems.

---

# Strict Phase Boundary

**Phase 2 ends after authentication is fully functional.**

Do not implement:

```text
Employee CRUD
Search
Filters
Pagination
Analytics
Charts
```

Those are future phases.

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
