# Phase 5 — Pagination

## Objective

Implement pagination for the Employee Management Dashboard while preserving all completed functionality from Phases 0–4.

The goal is to prevent the employee table from displaying an unnecessarily large number of records at once and provide clear navigation between employee pages.

The expected flow is:

```text
MongoDB Employee Data
        │
        ▼
Search + Filters
        │
        ▼
Paginated Employee Results
        │
        ▼
Employee Table
        │
        ▼
Pagination Controls
```

Pagination must work correctly with the existing:

- Authentication
- Protected routes
- Employee CRUD
- Search
- Department filtering
- Status filtering

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow all applicable project rules.
3. Review Phases 0–4.
4. Preserve all existing functionality.
5. Preserve the existing UI design.
6. Do not introduce unnecessary dependencies.
7. Do not implement analytics yet.

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
[ ] Employee CRUD works
[ ] Search works
[ ] Department filter works
[ ] Status filter works
[ ] Combined filtering works
```

If any existing functionality is broken:

> Fix the existing issue first.

Do not rewrite working authentication, CRUD, or filtering logic just to add pagination.

If there are uncommitted changes:

> Do not overwrite, reset, or discard them.

---

# 3. Phase 5 Scope

Phase 5 includes:

```text
✓ Employee pagination
✓ Page navigation
✓ Previous/Next controls
✓ Current page indication
✓ Total page calculation
✓ Page boundary handling
✓ Pagination with search
✓ Pagination with department filter
✓ Pagination with status filter
✓ Pagination with combined filters
✓ CRUD compatibility
✓ Empty page handling
✓ Loading handling
✓ Responsive pagination
```

Phase 5 does NOT include:

```text
✗ Analytics
✗ Charts
✗ Monthly joining analytics
✗ Status distribution
✗ Department analytics
✗ Export
✗ Advanced sorting
```

Analytics belongs to Phase 6.

---

# 4. UI Preservation Rule

Pagination must fit into the existing dashboard design.

Do not unnecessarily change:

- Colors
- Typography
- Table styling
- Navigation
- Existing layout
- Existing form styling
- Existing modal styling
- Existing responsive behavior

Only add the pagination controls required for this phase.

Do not redesign the dashboard.

---

# 5. Pagination Architecture

There are two possible approaches:

## Client-Side Pagination

```text
GET /api/employees
        │
        ▼
All Employees
        │
        ▼
Search + Filters
        │
        ▼
Pagination
        │
        ▼
Current Page
        │
        ▼
Employee Table
```

## Server-Side Pagination

```text
Search + Filters + Page
          │
          ▼
GET /api/employees?page=1&limit=10
          │
          ▼
Express
          │
          ▼
MongoDB
          │
          ▼
Paginated Response
          │
          ▼
Employee Table
```

---

# 6. Preferred Approach

For the technical assessment, prefer the approach that is consistent with the existing Phase 4 architecture.

If Phase 4 uses client-side filtering and the dataset is small:

> Client-side pagination is acceptable.

If Phase 4 already uses server-side filtering:

> Prefer server-side pagination.

Do not rewrite the entire employee architecture solely to change pagination strategy.

---

# 7. Server-Side Pagination Recommendation

If the application already supports server-side filtering, the preferred API structure is:

```text
GET /api/employees?page=1&limit=10
```

Combined with filters:

```text
GET /api/employees?page=1&limit=10&search=john&department=Engineering&status=Active
```

The API should return:

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

Do not expose unnecessary database metadata.

---

# 8. Pagination Parameters

Use:

```text
page
limit
```

Recommended default:

```text
page = 1
limit = 10
```

The exact page size may be adjusted if the existing UI or assessment requires it.

Do not introduce an unnecessarily large default.

---

# 9. Validate Pagination Parameters

Backend pagination parameters must be validated.

Examples:

```text
page=0
page=-1
page=abc
limit=0
limit=-10
limit=abc
```

must not cause the server to crash.

Normalize invalid values to safe defaults or return an appropriate validation response.

Do not allow arbitrary excessive limits that could unnecessarily load the database.

---

# 10. Maximum Page Size

If using server-side pagination, establish a reasonable maximum page size.

For example:

```text
limit <= 100
```

The exact limit may follow the project's requirements.

Do not allow a request such as:

```text
?limit=1000000
```

to cause an unnecessarily large database query.

---

# 11. MongoDB Pagination

For server-side pagination, use an appropriate MongoDB/Mongoose approach.

Conceptually:

```text
page = 1
limit = 10

skip = (page - 1) * limit
```

Then:

```text
skip()
limit()
```

Use the total matching employee count to calculate:

```text
totalPages
```

Do not load every employee into memory just to paginate if server-side pagination is being used.

---

# 12. Stable Ordering

Pagination should use a predictable ordering.

Recommended:

```text
createdAt descending
```

or another clearly defined ordering consistent with the existing application.

The important requirement is that the ordering remains stable between page requests.

Do not randomly order employee records.

---

# 13. Total Count

For server-side pagination, calculate the total number of records matching the active filters.

Conceptually:

```text
Matching Employees
        │
        ▼
Total Count
        │
        ▼
Total Pages
```

Example:

```text
Total employees = 47
Limit = 10

Total pages = 5
```

Do not calculate total pages from the current page's result length alone.

---

# 14. Page Calculation

Use:

```text
totalPages = Math.ceil(total / limit)
```

Example:

```text
total = 50
limit = 10

totalPages = 5
```

If:

```text
total = 0
```

then the UI should handle the empty state cleanly.

Do not display:

```text
Page 1 of 0
```

as the only feedback.

---

# 15. Frontend Pagination State

Maintain only the state that is actually necessary.

Typical state:

```text
currentPage
pageSize
totalPages
totalEmployees
```

If server-side pagination is used, employee data represents the current page.

If client-side pagination is used, derive the current page from the filtered collection.

Do not create multiple duplicated employee collections unnecessarily.

---

# 16. Pagination with Search and Filters

Pagination must operate on the filtered dataset.

Correct order:

```text
All Employees
      │
      ▼
Search
      │
      ▼
Department Filter
      │
      ▼
Status Filter
      │
      ▼
Filtered Dataset
      │
      ▼
Pagination
      │
      ▼
Current Page
```

Do not paginate first and then filter only the current page.

That can produce incorrect results.

---

# 17. Server-Side Combined Query

If using server-side pagination:

```text
GET /api/employees
```

should support the combination:

```text
page
limit
search
department
status
```

Example:

```text
/api/employees?page=2&limit=10&search=john&department=Engineering&status=Active
```

The backend should:

1. Build the filter.
2. Count matching records.
3. Apply ordering.
4. Apply pagination.
5. Return current-page records.
6. Return pagination metadata.

---

# 18. Client-Side Pagination

If using client-side pagination:

```text
filteredEmployees
        │
        ▼
Calculate start index
        │
        ▼
Calculate end index
        │
        ▼
slice()
        │
        ▼
Current page employees
```

Conceptually:

```text
start = (currentPage - 1) * pageSize
end = start + pageSize
```

Do not mutate the original employee array.

---

# 19. Reset Page When Search Changes

When the active search/filter changes significantly, reset pagination to page 1.

Example:

```text
Current:
Page 5
Department: Engineering

Change Department:
HR

Result:
Page → 1
```

This prevents the user from landing on a page that no longer exists for the new filtered dataset.

---

# 20. Reset Page on Search

When the user changes the search term:

```text
Search changes
      |
      ▼
currentPage = 1
```

Do not leave the user on an old page number that may not exist for the new result set.

---

# 21. Reset Page on Department Filter

When the department changes:

```text
Department changes
      |
      ▼
currentPage = 1
```

Then fetch/recalculate the filtered data.

---

# 22. Reset Page on Status Filter

When the status changes:

```text
Status changes
      |
      ▼
currentPage = 1
```

Then fetch/recalculate the filtered data.

---

# 23. Clear Filters

When the user clicks:

```text
Clear Filters
```

reset:

```text
searchTerm
department
status
currentPage
```

to their default values.

Example:

```text
Search = ""
Department = All Departments
Status = All Statuses
Page = 1
```

---

# 24. Previous Button

The Previous button should be disabled when:

```text
currentPage === 1
```

Do not allow navigation to:

```text
page 0
page -1
```

---

# 25. Next Button

The Next button should be disabled when:

```text
currentPage === totalPages
```

Do not allow navigation beyond the last page.

---

# 26. Page Numbers

Page numbers may be displayed.

For a small number of pages:

```text
1 2 3 4 5
```

For many pages, a compact structure may be used:

```text
1 2 3 ... 10
```

Do not create an overly complex pagination component for a simple assessment.

---

# 27. Current Page Indicator

Clearly indicate the current page.

Example:

```text
1  2  [3]  4  5
```

The visual treatment should remain consistent with the existing UI.

Do not rely only on color to communicate the active page.

---

# 28. Pagination Information

Optionally display:

```text
Showing 11–20 of 47 employees
```

This is useful for understanding the current page.

If implemented, calculate it correctly.

For example:

```text
Page = 2
Limit = 10
Total = 47

Showing 11–20 of 47 employees
```

For the last page:

```text
Page = 5
Limit = 10
Total = 47

Showing 41–47 of 47 employees
```

Do not display incorrect ranges.

---

# 29. Empty Dataset

If there are no employees:

```text
No employees found.
```

Do not display unnecessary pagination controls.

For:

```text
total = 0
```

pagination should be hidden or disabled appropriately.

---

# 30. Empty Filter Result

If employees exist but the current search/filter combination produces no results:

```text
No employees match your search or filters.
```

Do not display misleading pagination such as:

```text
Page 1 of 0
```

Provide a way to clear filters.

---

# 31. Page Becomes Invalid After Delete

Important edge case:

```text
Page 5 of 5
```

User deletes the last employee on that page.

Now:

```text
Only 4 pages remain
```

The application must detect that:

```text
currentPage > totalPages
```

and move to the last valid page.

Example:

```text
currentPage = 5
totalPages = 4

→ currentPage = 4
```

Do not leave the user on an empty invalid page.

---

# 32. Page Becomes Invalid After Filter Change

If a filter/search operation reduces the available pages:

```text
Before:
Page 5 of 5

After filter:
Page 2 of 2
```

The application should automatically move to:

```text
Page 1
```

when the filter changes, as required by the reset rules.

---

# 33. Create Employee Compatibility

After creating an employee:

- Preserve the existing CRUD behavior.
- Update/re-fetch employee data.
- Keep pagination consistent.
- Ensure the new employee appears according to the existing ordering and filters.

Do not force the user to manually refresh the browser.

---

# 34. Edit Employee Compatibility

After editing an employee:

- Update/re-fetch employee data.
- Preserve current pagination where possible.
- Reapply current search/filter conditions.
- If the employee no longer matches the active filter, it should disappear naturally.

Do not reset all filters unnecessarily.

---

# 35. Delete Employee Compatibility

After deleting an employee:

- Update/re-fetch the employee data.
- Recalculate total records/pages.
- Keep current filters.
- Move to the last valid page if necessary.

Do not reset search/filter state unnecessarily.

---

# 36. Search + Pagination

Search and pagination must work together.

Example:

```text
Search: john
```

Then:

```text
Page 1
Page 2
...
```

Only employees matching:

```text
name/email contains "john"
```

should be included in pagination.

Do not paginate the unfiltered dataset first.

---

# 37. Department + Pagination

Example:

```text
Department: Engineering
```

Pagination must apply only to Engineering employees.

Do not include employees from other departments in the total count or pages.

---

# 38. Status + Pagination

Example:

```text
Status: Active
```

Pagination must apply only to Active employees.

---

# 39. Combined Search + Filters + Pagination

This is the most important integration test.

Example:

```text
Search: john
Department: Engineering
Status: Active
Page: 2
Limit: 10
```

The backend/frontend should produce:

```text
Matching employees
        ↓
Apply all filters
        ↓
Calculate total
        ↓
Calculate total pages
        ↓
Return/display page 2
```

---

# 40. API Service

If server-side pagination is used, update:

```text
frontend/src/services/employeeService.js
```

so `getEmployees()` can accept parameters.

Conceptually:

```text
getEmployees({
  page,
  limit,
  search,
  department,
  status
})
```

Do not create separate methods such as:

```text
getEmployeesPage()
getFilteredEmployees()
getSearchEmployees()
getDepartmentEmployees()
```

Keep the API service simple.

---

# 41. API Query Parameters

Only send active parameters.

Example:

```text
?page=1&limit=10
```

If search is active:

```text
?page=1&limit=10&search=john
```

If department is active:

```text
?page=1&limit=10&department=Engineering
```

Do not send unnecessary empty parameters.

---

# 42. Backend Query Construction

If using server-side pagination and filtering:

```text
Request Query
      │
      ▼
Validate Params
      │
      ▼
Build MongoDB Filter
      │
      ▼
Count Matching Records
      │
      ▼
Apply Sort
      │
      ▼
Apply Skip + Limit
      │
      ▼
Return Data + Metadata
```

Do not allow arbitrary query operators from the client.

---

# 43. Backend Response

For server-side pagination:

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "totalPages": 5
  }
}
```

Keep the response consistent with the existing API conventions.

---

# 44. Loading State

When changing pages:

```text
Loading employees...
```

or an appropriate table loading state may be shown.

Do not make the entire dashboard disappear while only the employee table is loading.

Prefer localized loading behavior.

---

# 45. Prevent Duplicate Page Requests

If a page request is already running:

- Prevent duplicate page clicks where appropriate.
- Disable pagination controls temporarily if necessary.
- Avoid sending multiple identical requests unnecessarily.

Do not create complex request queues.

---

# 46. Race Conditions

If server-side pagination/filtering is used, consider the possibility of an older request finishing after a newer request.

The UI must not incorrectly display stale results.

Use the simplest reliable approach supported by the current architecture.

Do not introduce a state-management framework solely to solve this.

---

# 47. Responsive Pagination

Pagination must remain usable on:

```text
Mobile
Tablet
Desktop
```

On smaller screens:

- Avoid overflowing the viewport.
- Keep Previous/Next accessible.
- Use compact page numbers if necessary.

Do not redesign the entire dashboard.

---

# 48. Accessibility

Pagination controls must be accessible.

Use meaningful labels such as:

```text
Previous page
Next page
Go to page 2
```

Buttons should be keyboard accessible.

Disabled controls should be properly disabled, not merely visually muted.

Do not rely only on color to indicate the current page.

---

# 49. No Analytics Yet

Do not implement:

```text
Total Employees card
Active Employees card
Department charts
Monthly joining chart
Status distribution chart
Recharts
```

Analytics belongs to Phase 6.

---

# 50. No Export Yet

Do not implement:

```text
CSV export
Excel export
PDF export
```

These are not required in this phase.

---

# 51. No Advanced Sorting

Do not add:

```text
Name sorting
Date sorting
Department sorting
Status sorting
```

unless sorting already exists and must be preserved.

Sorting is not part of the mandatory pagination requirement.

---

# 52. Dependency Rules

Do not install:

```text
react-paginate
TanStack Table
React Table
pagination libraries
```

just to implement pagination.

A simple custom React pagination component is sufficient.

If an existing approved library already provides pagination and is already part of the project, it may be reused.

Do not add a new UI library.

---

# 53. Recommended Component

A reusable component may be created:

```text
components/employees/Pagination.jsx
```

Responsibilities:

- Display page controls
- Handle page selection
- Disable invalid controls
- Display current page
- Remain reusable

Do not put API calls inside the pagination component.

The pagination component should communicate page changes to its parent.

---

# 54. Component Responsibility

Recommended structure:

```text
Dashboard
   │
   ├── EmployeeFilters
   │
   ├── EmployeeTable
   │
   └── Pagination
```

The parent/page manages:

```text
employee data
current page
filters
loading
errors
```

The pagination component manages only its UI interaction.

Do not put global authentication state inside Pagination.

---

# 55. Client-Side Pagination State Flow

If client-side:

```text
employees
    ↓
search/filter
    ↓
filteredEmployees
    ↓
currentPage
    ↓
paginatedEmployees
    ↓
EmployeeTable
```

---

# 56. Server-Side Pagination State Flow

If server-side:

```text
currentPage
pageSize
search
department
status
      │
      ▼
employeeService.getEmployees()
      │
      ▼
API
      │
      ▼
data + pagination
      │
      ▼
EmployeeTable
+
Pagination
```

---

# 57. Testing Checklist

## Basic Pagination

```text
[ ] Page 1 loads
[ ] Next works
[ ] Previous works
[ ] Last page works
[ ] First page works
[ ] Current page is indicated
[ ] Previous disabled on first page
[ ] Next disabled on last page
```

## Page Size

```text
[ ] Default limit works
[ ] Page calculations are correct
[ ] Total pages are correct
```

If page-size selection is not required, do not add it just for testing.

---

# 58. Search + Pagination Testing

```text
[ ] Search result paginates correctly
[ ] Search resets to page 1
[ ] Search total count is correct
[ ] Search total pages are correct
[ ] Clearing search restores pagination
```

---

# 59. Department + Pagination Testing

```text
[ ] Department result paginates correctly
[ ] Department change resets to page 1
[ ] Total count matches selected department
[ ] Clearing department restores pagination
```

---

# 60. Status + Pagination Testing

```text
[ ] Status result paginates correctly
[ ] Status change resets to page 1
[ ] Total count matches selected status
[ ] Clearing status restores pagination
```

---

# 61. Combined Filter Testing

Test:

```text
[ ] Search + Department + Pagination
[ ] Search + Status + Pagination
[ ] Department + Status + Pagination
[ ] Search + Department + Status + Pagination
```

Verify that:

```text
total
totalPages
currentPage
displayed employees
```

are all correct.

---

# 62. CRUD Regression Testing

## Create

```text
[ ] Create employee still works
[ ] New employee appears correctly
[ ] Pagination remains valid
```

## Edit

```text
[ ] Edit employee still works
[ ] Updated employee remains correctly positioned
[ ] Filters remain valid
```

## Delete

```text
[ ] Delete employee still works
[ ] Total count decreases
[ ] Total pages recalculate
[ ] Invalid last page is corrected
```

---

# 63. Authentication Regression Testing

Verify:

```text
[ ] Login works
[ ] JWT works
[ ] Protected employee API works
[ ] Invalid token returns 401
[ ] Logout works
[ ] Unauthenticated users cannot access employee data
```

Do not weaken authentication to simplify pagination.

---

# 64. Empty State Testing

Test:

```text
[ ] No employees
[ ] No filtered employees
[ ] No results on an invalid/stale page
```

The application should recover gracefully.

---

# 65. Page Boundary Testing

Test these cases:

```text
total = 0
total = 1
total = 9
total = 10
total = 11
total = 20
total = 21
```

With:

```text
limit = 10
```

Expected:

```text
0 → 0 pages / empty state
1 → 1 page
9 → 1 page
10 → 1 page
11 → 2 pages
20 → 2 pages
21 → 3 pages
```

---

# 66. Git Safety

Before implementation:

```bash
git status
```

After implementation:

```bash
git status
```

Review every changed file.

Do not use:

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

# 67. Code Quality Rules

Always:

- Keep pagination logic readable.
- Keep filtering logic separate from pagination logic.
- Reuse the existing employee service.
- Reuse existing authentication.
- Avoid duplicated employee state.
- Use descriptive names.
- Keep Pagination component focused.
- Keep API logic out of Pagination UI.
- Handle loading and errors.
- Handle page boundaries.

Do not create a complex pagination framework.

---

# 68. Phase 5 Completion Criteria

Phase 5 is complete when:

```text
✓ Employee pagination works
✓ Page navigation works
✓ Previous/Next work
✓ Current page is clear
✓ Page boundaries are handled
✓ Search works with pagination
✓ Department filter works with pagination
✓ Status filter works with pagination
✓ Combined filters work with pagination
✓ CRUD remains functional
✓ Deletion recalculates pages
✓ Empty states work
✓ Loading states work
✓ Responsive pagination works
✓ Authentication remains intact
```

The final flow should be:

```text
                    EMPLOYEES
                       │
                       ▼
              ┌────────────────┐
              │ Search / Filter│
              └───────┬────────┘
                      │
                      ▼
              Filtered Employees
                      │
                      ▼
               ┌─────────────┐
               │ Pagination  │
               └──────┬──────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Previous    Page 1 2 3    Next
                      │
                      ▼
                Employee Table
```

---

# 69. Do Not Proceed to Phase 6 Automatically

After completing Phase 5, stop.

Report:

## 1. Files Created

List all newly created files.

## 2. Files Modified

List all modified files.

## 3. Pagination Architecture

Report:

```text
Client-side / Server-side
```

Explain the choice briefly.

## 4. Pagination

Report:

```text
Page navigation: PASS/FAIL
Previous/Next: PASS/FAIL
Page boundaries: PASS/FAIL
Total count: PASS/FAIL
Total pages: PASS/FAIL
```

## 5. Search/Filter Integration

Report:

```text
Search + pagination: PASS/FAIL
Department + pagination: PASS/FAIL
Status + pagination: PASS/FAIL
Combined filters + pagination: PASS/FAIL
```

## 6. CRUD Regression

Report:

```text
Create: PASS/FAIL
Edit: PASS/FAIL
Delete: PASS/FAIL
```

## 7. UX

Report:

```text
Loading state: PASS/FAIL
Empty state: PASS/FAIL
Responsive pagination: PASS/FAIL
Accessibility: PASS/FAIL
```

## 8. Regression

Confirm:

```text
Phase 0 preserved: YES/NO
Phase 1 preserved: YES/NO
Phase 2 preserved: YES/NO
Phase 3 preserved: YES/NO
Phase 4 preserved: YES/NO
Existing UI preserved: YES/NO
```

## 9. Issues

List any remaining problems.

Then stop.

**Do not start Phase 6 until explicitly instructed.**

---

# Final Phase 5 Principle

The goal is to make employee navigation scalable and predictable without overengineering the application.

Prefer:

```text
Simple
Predictable
Accurate
Responsive
Maintainable
```

over:

```text
Complex
Library-heavy
Over-optimized
Duplicated
```

Pagination must always operate on the correct filtered dataset.

The most important rule is:

```text
Search + Filters
       ↓
Correct Dataset
       ↓
Pagination
```

not:

```text
Pagination
       ↓
Search + Filters
```

---

# Strict Phase Boundary

**Phase 5 ends after Pagination is fully functional with existing Search, Filters, CRUD, and Authentication.**

Do not implement:

```text
Analytics
Charts
Department analytics
Monthly joining analytics
Employee status distribution
```

These belong to Phase 6.

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
