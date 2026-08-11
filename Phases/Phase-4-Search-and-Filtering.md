# Phase 4 — Search & Filtering

## Objective

Implement employee search and filtering on top of the completed Phase 0–3 foundation.

The goal of this phase is to allow authenticated users to quickly find employees using:

```text
Search by:
- Employee name
- Employee email

Filter by:
- Department
- Status
```

Search and filters must work together.

Example:

```text
Search: john
Department: Engineering
Status: Active
```

The result must contain only employees matching all active criteria.

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow all applicable project rules.
3. Review Phase 0, Phase 1, Phase 2, and Phase 3.
4. Preserve all existing functionality.
5. Preserve authentication.
6. Preserve Employee CRUD.
7. Preserve the existing UI style.
8. Do not implement features belonging to later phases.

The project remains:

```text
React Employee Management Dashboard
```

Do not introduce unrelated functionality.

---

# 2. Existing Functionality Safety Rule

Before modifying anything:

```bash
git status
```

Verify:

```text
[ ] Frontend starts
[ ] Backend starts
[ ] MongoDB connects
[ ] /api/health works
[ ] Login works
[ ] Protected routes work
[ ] Logout works
[ ] Employee listing works
[ ] Create employee works
[ ] Edit employee works
[ ] Delete employee works
[ ] Delete confirmation works
```

If any existing functionality is broken:

> Fix the existing issue first.

Do not rewrite working CRUD or authentication logic just to implement search/filtering.

If there are uncommitted changes:

> Do not overwrite, reset, or discard them.

---

# 3. Phase 4 Scope

Phase 4 includes:

```text
✓ Search by employee name
✓ Search by employee email
✓ Department filter
✓ Status filter
✓ Combined search + filters
✓ Search/filter reset
✓ Loading handling
✓ Empty search results
✓ API error handling
✓ Optional debounced search
✓ Clean filter state management
```

Phase 4 does NOT include:

```text
✗ Pagination
✗ Analytics
✗ Charts
✗ Monthly joining analytics
✗ Status distribution charts
✗ Export
✗ Sorting unless already present
```

Pagination belongs to Phase 5.

Analytics belongs to Phase 6.

---

# 4. UI Preservation Rule

This phase adds search/filter controls, but they must fit the existing UI.

If the project already has a search/filter interface:

> Preserve its existing visual language and improve only the required functionality.

Do not unnecessarily change:

- Colors
- Typography
- Spacing
- Buttons
- Table styling
- Navigation
- Layout
- Modal styling
- Responsive behavior

Do not redesign the dashboard.

Only add the controls required for this phase.

---

# 5. Search Requirements

Search must support:

```text
Employee Name
Employee Email
```

Search must be:

```text
Case-insensitive
```

Examples:

```text
john
John
JOHN
```

should match:

```text
John Doe
```

Likewise:

```text
gmail.com
```

should be able to match an employee email containing that text.

---

# 6. Search Behavior

Search should generally be partial-match based.

For example:

```text
Search:
"dev"
```

may match:

```text
Developer
DevOps Engineer
Senior Developer
```

Do not require the user to type the complete name or email.

---

# 7. Search Input

Provide a clear search input.

Recommended placeholder:

```text
Search by name or email...
```

The search control should:

- Accept text input.
- Update the employee results.
- Allow clearing.
- Work with department/status filters.
- Not break existing CRUD actions.

Do not create multiple search fields for name and email.

A single search field is sufficient.

---

# 8. Department Filter

Provide a department filter.

The filter must allow users to select:

```text
All Departments
```

and available departments.

Example:

```text
All Departments
Engineering
HR
Finance
Marketing
Sales
Operations
```

Do not hardcode departments if the project already has a reliable source for department values.

Prefer deriving available department options from:

- Existing project constants, or
- Employee data

depending on the chosen architecture.

Do not create duplicate department definitions in multiple files.

---

# 9. Status Filter

Provide:

```text
All Statuses
Active
Inactive
```

The values must match the Employee model exactly:

```text
Active
Inactive
```

Do not introduce additional statuses.

---

# 10. Combined Filtering

Search, department, and status must work together.

Example:

```text
Search: john
Department: Engineering
Status: Active
```

The result should satisfy:

```text
Name/email matches "john"
AND
Department = Engineering
AND
Status = Active
```

Do not treat filters as independent result replacements.

---

# 11. Filter Reset

Provide a simple way to clear active filters.

For example:

```text
Clear Filters
```

When cleared:

```text
Search → empty
Department → All Departments
Status → All Statuses
```

The complete employee list should be restored.

Do not reload the entire page just to reset filters.

---

# 12. Client-Side vs Server-Side Filtering

Choose the simplest appropriate architecture.

Because this is a technical assessment and the initial dataset is expected to be manageable, client-side filtering is acceptable.

Client-side flow:

```text
GET /api/employees
        |
        v
Employee State
        |
        v
Search
        +
Department Filter
        +
Status Filter
        |
        v
Filtered Employees
        |
        v
Employee Table
```

Server-side filtering is also acceptable if the existing architecture already supports it.

Do not rewrite the entire CRUD API merely to introduce server-side filtering.

---

# 13. Preferred Initial Approach

If Phase 3 currently fetches the complete employee collection, prefer client-side filtering unless there is a clear reason to change.

This keeps the implementation simple:

```text
Backend:
GET /api/employees

Frontend:
Search + Filter
```

Do not introduce complex MongoDB query logic without a genuine need.

---

# 14. Server-Side Filtering Alternative

If the existing project is already designed for server-side filtering, the API may support:

```text
GET /api/employees?search=john
GET /api/employees?department=Engineering
GET /api/employees?status=Active
```

Combined:

```text
GET /api/employees?search=john&department=Engineering&status=Active
```

If this approach is used:

- Keep query parameters optional.
- Ignore empty filters.
- Normalize input appropriately.
- Prevent malformed queries from crashing the server.
- Preserve the existing API response format.

Do not implement pagination in these requests yet.

---

# 15. Do Not Duplicate API Endpoints

Do not create:

```text
/api/employees/search
/api/employees/filter
/api/employees/department
/api/employees/status
```

unless explicitly required.

Prefer extending the existing:

```text
GET /api/employees
```

endpoint when server-side filtering is selected.

---

# 16. Search State

Keep search state separate from authentication state.

For example:

```text
searchTerm
selectedDepartment
selectedStatus
```

Do not put these values in:

```text
AuthContext
```

Authentication and employee filtering are separate concerns.

---

# 17. Filtered Data Flow

The preferred frontend flow is:

```text
All Employees
      |
      ▼
Search
      |
      ▼
Department Filter
      |
      ▼
Status Filter
      |
      ▼
Filtered Employees
      |
      ▼
Employee Table
```

Keep the original employee collection available.

Do not permanently overwrite the source employee data with filtered results if it makes clearing filters difficult.

Prefer:

```text
employees
```

as the source collection and:

```text
filteredEmployees
```

as derived data.

---

# 18. Avoid Duplicate State

Do not maintain multiple independent copies of the same employee dataset unnecessarily.

Avoid:

```text
employees
filteredEmployees
searchedEmployees
departmentEmployees
statusEmployees
```

as separate mutable states.

Prefer:

```text
employees
searchTerm
department
status
```

and derive the displayed result.

---

# 19. Client-Side Filtering Logic

If using client-side filtering:

```text
const filteredEmployees = employees.filter(...)
```

The logic should:

1. Normalize the search term.
2. Match name OR email.
3. Apply department condition when selected.
4. Apply status condition when selected.
5. Return the matching employees.

Conceptually:

```text
Match Search
    AND
Match Department
    AND
Match Status
```

---

# 20. Search Normalization

Normalize both the search term and searchable employee fields.

For example:

```text
searchTerm.toLowerCase()
```

and compare against:

```text
employee.name.toLowerCase()
employee.email.toLowerCase()
```

Handle whitespace appropriately.

A search such as:

```text
" john "
```

should behave sensibly.

---

# 21. Empty Search Result

If search/filter conditions produce no employees:

Display:

```text
No employees match your search or filters.
```

Do not display:

```text
No employees found.
```

if employees exist but are simply excluded by active filters.

This distinction improves UX.

---

# 22. Empty Database vs Empty Filter Result

Handle these separately.

### No employees exist at all

```text
No employees found.
```

### Employees exist but current filters match nothing

```text
No employees match your search or filters.
```

The UI should make it easy to clear filters.

---

# 23. Search Loading Behavior

If using client-side filtering:

> Do not show an API loading state for every keystroke.

Filtering local state should feel immediate.

If using server-side filtering:

```text
Searching...
```

may be shown while the API request is running.

Do not make the interface appear frozen.

---

# 24. Debounced Search

Debounced search is an optional bonus requirement from the assessment.

If client-side filtering is used:

> Debouncing is not required.

Filtering local data is already inexpensive for the expected assessment dataset.

If server-side search is used:

> A debounce may be appropriate.

Recommended behavior:

```text
User types
   |
   ▼
Wait briefly
   |
   ▼
No new keystroke?
   |
   ▼
Send API request
```

---

# 25. Debounce Implementation Rule

Do not install a debounce library just for this.

If debouncing is needed, prefer a small React hook or `useEffect`-based implementation.

Example conceptual approach:

```text
searchInput
     |
     ▼
useEffect
     |
     ▼
setTimeout
     |
     ▼
Update search term
```

Always clear the timeout when the dependency changes/unmounts.

Avoid unnecessary complexity.

---

# 26. Search Performance

Do not prematurely optimize.

For a normal technical-assessment dataset:

```text
Array.filter()
```

is sufficient.

Do not introduce:

```text
Web Workers
WebSockets
Complex indexing
External search engines
```

for this feature.

---

# 27. Employee Service

If client-side filtering is used, the existing service remains:

```text
employeeService.getEmployees()
```

No new search endpoint is required.

If server-side filtering is selected, extend the existing method:

```text
getEmployees(params)
```

rather than creating separate service methods such as:

```text
searchEmployees()
filterEmployees()
getEmployeesByDepartment()
```

Keep the service layer simple.

---

# 28. API Query Construction

If server-side filtering is used, do not manually concatenate unsafe query strings.

Prefer a structured query parameter approach.

Conceptually:

```text
params:
{
  search,
  department,
  status
}
```

Only include active filters.

Avoid requests such as:

```text
?search=&department=&status=
```

when the filters are empty.

---

# 29. Backend Search Logic

If server-side search is implemented, search should match:

```text
name
OR
email
```

Use a MongoDB query appropriate for the project's requirements.

The query must be:

```text
Case-insensitive
Partial-match
```

Do not expose MongoDB query operators directly to the client.

Do not allow arbitrary MongoDB filters from user input.

---

# 30. Backend Department Filter

If server-side filtering is used:

```text
department=Engineering
```

should match the exact stored department value.

Do not use arbitrary MongoDB expressions supplied directly by the client.

Validate/normalize the filter value where appropriate.

---

# 31. Backend Status Filter

If server-side filtering is used:

```text
status=Active
```

must match the allowed Employee status values.

Only:

```text
Active
Inactive
```

are valid.

If an invalid status is supplied, return an appropriate validation response rather than silently producing unexpected behavior.

---

# 32. Filter URL State

Do not add URL query-state synchronization unless there is a clear requirement.

For this phase, local React state is sufficient.

Do not introduce URL state libraries.

---

# 33. Employee CRUD Compatibility

Search/filtering must not break:

```text
Create Employee
Edit Employee
Delete Employee
```

After a successful CRUD operation:

```text
Employee State
      |
      ▼
Search/Filters
      |
      ▼
Updated Results
```

Example:

If an employee is created while:

```text
Department = Engineering
Status = Active
```

the new employee should appear only if it satisfies the active filters.

---

# 34. Edit Compatibility

After editing an employee:

- Update the employee data.
- Recalculate the filtered result.
- If the employee no longer matches the active filters, it should disappear from the displayed results.
- Do not treat this as an error.

Example:

```text
Current filter:
Department = Engineering

Employee department changed:
Engineering → HR

Result:
Employee no longer appears.
```

This is expected behavior.

---

# 35. Delete Compatibility

After deleting an employee:

- Remove it from the source employee state.
- Recalculate filtered results.
- Keep current search/filter state intact.

Do not reset all filters after deletion unless explicitly required.

---

# 36. Create Compatibility

After creating an employee:

- Update/re-fetch employee data according to the existing CRUD architecture.
- Preserve the current search/filter state where appropriate.
- Recalculate displayed results.

Do not automatically clear filters simply because an employee was created.

---

# 37. Filter Component

If the dashboard architecture supports reusable components, a component such as:

```text
EmployeeFilters.jsx
```

may contain:

```text
Search Input
Department Select
Status Select
Clear Filters
```

Do not split every individual control into a separate component without a real need.

---

# 38. Search Component

A separate:

```text
SearchBar.jsx
```

is optional.

Only create it if it improves readability/reusability.

Do not create tiny one-use abstractions unnecessarily.

---

# 39. Filter UX

The user should be able to understand active filters easily.

Example:

```text
Search: John
Department: Engineering
Status: Active
```

The controls should clearly show their current values.

Do not hide active filter state.

---

# 40. Accessibility

Search/filter controls must have:

- Proper labels
- Keyboard accessibility
- Clear focus states
- Meaningful placeholder text
- Accessible select controls

Do not rely on placeholder text alone as the only label.

---

# 41. Responsive Design

The search/filter controls must work on:

```text
Mobile
Tablet
Desktop
```

On small screens, controls may stack:

```text
Search
Department
Status
Clear Filters
```

Do not break the existing employee table layout.

If the table already uses horizontal scrolling on mobile, preserve that behavior.

---

# 42. No Pagination Yet

Do not implement pagination in Phase 4.

Do not add:

```text
page
limit
totalPages
Previous
Next
Page numbers
```

The complete filtered employee collection should remain available.

Pagination belongs to Phase 5.

---

# 43. No Analytics Yet

Do not implement:

```text
Total Employees
Active Employees
Department charts
Monthly joining charts
Status distribution
Recharts
```

Analytics belongs to Phase 6.

---

# 44. Error Handling

If server-side filtering is used and the request fails:

```text
Unable to filter employees.
```

or another appropriate user-friendly message.

Do not replace existing employee data with an empty array just because a filter request failed.

Prefer retaining the last known valid data where appropriate.

---

# 45. Loading State

If server-side filtering is used:

```text
Filtering employees...
```

may be shown.

If client-side filtering is used:

> No API loading state is required.

Do not display unnecessary loading indicators for synchronous local filtering.

---

# 46. Dependency Rules

Do not install:

```text
lodash
use-debounce
react-table
TanStack Table
search libraries
filtering libraries
```

just to implement this phase.

A simple React implementation is sufficient.

If an existing dependency already provides debounce functionality, it may be reused.

---

# 47. Security Rules

Search/filter values must not bypass authentication.

Employee filtering remains protected by the existing JWT middleware when server-side filtering is used.

Do not create a public employee search endpoint.

Do not allow clients to query arbitrary MongoDB fields or operators.

---

# 48. Testing Checklist

## Search

```text
[ ] Search by full name
[ ] Search by partial name
[ ] Search by full email
[ ] Search by partial email
[ ] Search is case-insensitive
[ ] Leading/trailing spaces behave correctly
[ ] Empty search restores all employees
```

## Department Filter

```text
[ ] All Departments
[ ] Engineering
[ ] HR
[ ] Finance
[ ] Other configured departments
[ ] Correct employees appear
[ ] Clearing department restores results
```

## Status Filter

```text
[ ] All Statuses
[ ] Active
[ ] Inactive
[ ] Correct employees appear
[ ] Clearing status restores results
```

## Combined Filters

```text
[ ] Search + Department
[ ] Search + Status
[ ] Department + Status
[ ] Search + Department + Status
```

## Empty States

```text
[ ] No employees in database
[ ] No search result
[ ] No filter result
[ ] Clear filters works
```

---

# 49. CRUD Regression Testing

After implementing search/filtering, verify:

```text
[ ] Create employee still works
[ ] Edit employee still works
[ ] Delete employee still works
[ ] Delete confirmation still works
[ ] Employee validation still works
[ ] Duplicate email handling still works
```

Also verify:

```text
[ ] Created employee appears if it matches filters
[ ] Edited employee moves in/out of filtered results correctly
[ ] Deleted employee disappears correctly
```

---

# 50. Authentication Regression Testing

Verify:

```text
[ ] Login still works
[ ] JWT still works
[ ] Protected dashboard still works
[ ] Employee API remains protected
[ ] Invalid token still returns 401
[ ] Logout still works
```

Do not weaken authentication to make search/filter requests work.

---

# 51. Phase 0 Regression Testing

Verify:

```text
[ ] Frontend starts
[ ] Backend starts
[ ] MongoDB connects
[ ] /api/health works
[ ] Axios configuration works
[ ] Existing routing works
```

---

# 52. Git Safety

Before implementation:

```bash
git status
```

After implementation:

```bash
git status
```

Review every changed file.

Do not use destructive commands:

```bash
git reset --hard
git clean -fd
```

Do not discard existing work.

Do not commit:

```text
.env
```

or sensitive credentials.

---

# 53. Code Quality Rules

Always:

- Keep filtering logic readable.
- Keep authentication separate from filtering.
- Keep employee API logic in `employeeService`.
- Avoid duplicated filtering conditions.
- Use descriptive variable names.
- Keep components focused.
- Preserve existing CRUD behavior.
- Prefer derived data over duplicated mutable state.
- Avoid unnecessary abstractions.

Do not create complex filtering utilities for simple requirements.

---

# 54. Recommended State Structure

A simple client-side implementation can use:

```text
employees
searchTerm
selectedDepartment
selectedStatus
```

Then derive:

```text
filteredEmployees
```

from those values.

Conceptually:

```text
employees
   │
   ├── searchTerm
   │
   ├── selectedDepartment
   │
   └── selectedStatus
          │
          ▼
   filteredEmployees
          │
          ▼
   EmployeeTable
```

Do not store `filteredEmployees` as independent mutable state unless there is a specific reason.

---

# 55. Phase 4 Completion Criteria

Phase 4 is complete when:

```text
✓ Search by name works
✓ Search by email works
✓ Search is case-insensitive
✓ Department filter works
✓ Status filter works
✓ Search and filters work together
✓ Filters can be cleared
✓ Empty results are handled
✓ Existing CRUD still works
✓ Authentication still works
✓ Responsive controls work
✓ No pagination was added
✓ No analytics were added
```

The final flow should be:

```text
              Employee Data
                    │
                    ▼
             ┌─────────────┐
             │   Search    │
             │ Name/Email  │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │ Department  │
             │   Filter    │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   Status    │
             │   Filter    │
             └──────┬──────┘
                    │
                    ▼
          ┌─────────────────────┐
          │ Filtered Employees  │
          └──────────┬──────────┘
                     │
                     ▼
              Employee Table
```

---

# 56. Do Not Proceed to Phase 5 Automatically

After completing Phase 4, stop.

Report:

## 1. Files Created

List all newly created files.

## 2. Files Modified

List all modified files.

## 3. Search Implementation

Report:

```text
Search by name: PASS/FAIL
Search by email: PASS/FAIL
Case-insensitive: PASS/FAIL
```

## 4. Filters

Report:

```text
Department filter: PASS/FAIL
Status filter: PASS/FAIL
Combined filters: PASS/FAIL
Clear filters: PASS/FAIL
```

## 5. Architecture

Report:

```text
Client-side filtering / Server-side filtering
```

If server-side filtering was selected, list the query parameters implemented.

## 6. UX

Report:

```text
Empty result state: PASS/FAIL
Loading state: PASS/FAIL
Error state: PASS/FAIL
Responsive controls: PASS/FAIL
```

## 7. Regression

Confirm:

```text
Phase 0 preserved: YES/NO
Phase 1 preserved: YES/NO
Phase 2 preserved: YES/NO
Phase 3 preserved: YES/NO
Existing UI preserved: YES/NO
```

## 8. Issues

List any remaining problems.

Then stop.

**Do not start Phase 5 until explicitly instructed.**

---

# Final Phase 4 Principle

The goal is to make employee discovery fast and intuitive without complicating the architecture.

Prefer:

```text
Simple
Fast
Readable
Composable
Maintainable
```

over:

```text
Over-engineered
Library-heavy
Duplicated
Prematurely optimized
```

For a normal technical-assessment dataset, client-side filtering is preferred when the existing architecture already fetches the complete employee collection.

---

# Strict Phase Boundary

**Phase 4 ends after Search & Filtering are fully functional.**

Do not implement:

```text
Pagination
Analytics
Charts
Monthly joining statistics
Status distribution
```

These belong to future phases.

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
