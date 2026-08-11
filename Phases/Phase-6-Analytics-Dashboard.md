# Phase 6 — Analytics Dashboard

## Objective

Implement the Employee Management Dashboard analytics section on top of the completed Phase 0–5 foundation.

The analytics must be derived from the actual employee dataset and remain consistent with:

- Authentication
- Employee CRUD
- Search
- Department filtering
- Status filtering
- Pagination

The required analytics are:

```text
Total Employees
Active Employees
Department-wise Count
Monthly Joined Employees
Employee Status Distribution
```

Charts may use:

```text
Recharts
Chart.js
ApexCharts
```

Use the charting solution already approved or present in the project. Do not add multiple chart libraries.

---

# 1. Read AGENT.md First

Before making any changes:

1. Read the complete `AGENT.md`.
2. Follow all applicable project rules.
3. Review Phases 0–5.
4. Preserve all existing functionality.
5. Preserve the existing authentication behavior.
6. Preserve Employee CRUD.
7. Preserve Search & Filtering.
8. Preserve Pagination.
9. Preserve the existing UI design language.
10. Do not implement unrelated features.

The project remains:

```text
React Employee Management Dashboard
```

Do not introduce concepts from unrelated projects.

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
[ ] JWT authentication works
[ ] Protected routes work
[ ] Logout works
[ ] Employee listing works
[ ] Create employee works
[ ] Edit employee works
[ ] Delete employee works
[ ] Search works
[ ] Department filter works
[ ] Status filter works
[ ] Combined filters work
[ ] Pagination works
```

If any existing functionality is broken:

> Fix the existing issue first.

Do not rewrite working CRUD, filtering, or pagination code just to add analytics.

If uncommitted changes exist:

> Do not overwrite, reset, or discard them.

---

# 3. Phase 6 Scope

Phase 6 includes:

```text
✓ Total Employees analytics
✓ Active Employees analytics
✓ Department-wise employee count
✓ Monthly joined employee count
✓ Employee status distribution
✓ Analytics cards
✓ Charts
✓ Analytics API/data calculations
✓ Loading states
✓ Error states
✓ Empty states
✓ Responsive analytics layout
✓ Analytics refresh after employee changes
```

Phase 6 does NOT include:

```text
✗ Export
✗ Advanced reporting
✗ Payroll
✗ Attendance
✗ Salary analytics
✗ Performance analytics
✗ Notifications
✗ Role-based permissions
✗ New authentication methods
```

Do not add features outside the technical assessment.

---

# 4. UI Preservation Rule

Analytics is the final major dashboard feature required by the assessment.

If the project already has an established dashboard design:

> Extend the existing design instead of redesigning it.

Preserve:

- Existing colors
- Typography
- Spacing system
- Navigation
- Table design
- Form design
- Modal design
- Existing responsive behavior

Analytics cards and charts must visually belong to the existing dashboard.

Do not redesign unrelated sections.

---

# 5. Analytics Architecture

The analytics flow should be:

```text
Employee Data
      │
      ▼
Analytics Calculation
      │
      ├── Total Employees
      ├── Active Employees
      ├── Department Count
      ├── Monthly Joined Count
      └── Status Distribution
      │
      ▼
Analytics API / Derived Data
      │
      ▼
React Analytics Components
      │
      ├── Summary Cards
      └── Charts
```

The calculations must use real employee data.

Do not hardcode analytics values.

---

# 6. Source of Truth

Employee data in MongoDB is the source of truth.

Do not maintain separate analytics data manually.

Incorrect:

```text
employees collection
analytics collection
```

where analytics values must be manually synchronized.

Prefer calculating analytics from employee data.

---

# 7. Analytics Strategy

Choose the simplest architecture consistent with the existing project.

Two approaches are acceptable:

## Option A — Frontend-Derived Analytics

If the complete employee dataset is already available in the frontend:

```text
Employees
    |
    ▼
React calculations
    |
    ▼
Analytics
```

This is acceptable for a small technical-assessment dataset.

## Option B — Backend Analytics API

For a cleaner scalable MERN architecture:

```text
GET /api/employees/analytics
        |
        ▼
Express
        |
        ▼
MongoDB Aggregation
        |
        ▼
Analytics Response
```

If Phase 5 uses server-side pagination and only the current page is loaded in React:

> Prefer a backend analytics API.

Do not calculate "Total Employees" from only the current paginated page.

---

# 8. Preferred Analytics API

If a backend analytics endpoint is required, use:

```text
GET /api/employees/analytics
```

It must be protected by the existing JWT middleware.

Do not create a public analytics endpoint.

---

# 9. Analytics API Response

Use a structured response.

Example:

```json
{
  "success": true,
  "message": "Employee analytics fetched successfully",
  "data": {
    "totalEmployees": 100,
    "activeEmployees": 82,
    "inactiveEmployees": 18,
    "departmentWiseCount": [
      {
        "department": "Engineering",
        "count": 35
      },
      {
        "department": "HR",
        "count": 10
      }
    ],
    "monthlyJoinedEmployees": [
      {
        "month": "2026-01",
        "count": 8
      },
      {
        "month": "2026-02",
        "count": 12
      }
    ],
    "statusDistribution": [
      {
        "status": "Active",
        "count": 82
      },
      {
        "status": "Inactive",
        "count": 18
      }
    ]
  }
}
```

Do not hardcode these numbers.

---

# 10. Total Employees

Display:

```text
Total Employees
```

This must represent the total number of employee records.

If using server-side pagination:

> Use the total count from the database, not the number of employees on the current page.

Example:

```text
Database:
47 employees

Current page:
10 employees

Total Employees:
47
```

Do not incorrectly display:

```text
10
```

---

# 11. Active Employees

Display:

```text
Active Employees
```

Count employees where:

```text
status === "Active"
```

The value must be calculated from the actual employee data.

Do not hardcode:

```text
Active = 80%
```

or similar values.

---

# 12. Inactive Employees

Although not explicitly required as a separate card, the value is useful for:

```text
Employee Status Distribution
```

Calculate:

```text
Inactive Employees
```

from:

```text
status === "Inactive"
```

Do not introduce additional statuses.

The only valid statuses remain:

```text
Active
Inactive
```

---

# 13. Employee Status Distribution

Create a visualization showing:

```text
Active
Inactive
```

A suitable chart:

```text
Pie Chart
Donut Chart
Bar Chart
```

Choose the chart type that fits the existing UI.

Do not use multiple charts to represent the same information.

---

# 14. Status Distribution Data

Example:

```json
[
  {
    "status": "Active",
    "count": 82
  },
  {
    "status": "Inactive",
    "count": 18
  }
]
```

The chart must update automatically when employee status changes.

---

# 15. Department-wise Count

Create a visualization showing the number of employees in each department.

Example:

```text
Engineering    35
HR             10
Finance         8
Marketing      15
Sales          12
Operations     20
```

Do not hardcode departments.

The department list must be derived from actual employee data.

---

# 16. Department Chart

A suitable chart:

```text
Bar Chart
Column Chart
Horizontal Bar Chart
```

A bar chart is generally preferred when department names may be long.

The chart should clearly communicate:

```text
Department
Employee Count
```

Do not use a chart type that makes department comparisons unnecessarily difficult.

---

# 17. Department Data

The backend or frontend calculation should produce data similar to:

```json
[
  {
    "department": "Engineering",
    "count": 35
  },
  {
    "department": "HR",
    "count": 10
  }
]
```

Do not create a fixed list of departments unless the application requirements explicitly define one.

---

# 18. Monthly Joined Employees

Create analytics for:

```text
Monthly Joined Employees
```

This represents how many employees joined during each month.

Example:

```text
January    8
February  12
March      6
April     15
```

Use:

```text
joiningDate
```

as the source field.

Do not use:

```text
createdAt
```

for this metric.

The requirement specifically refers to employee joining dates.

---

# 19. Monthly Joining Chart

A suitable chart:

```text
Line Chart
Bar Chart
Column Chart
```

A line chart is useful for showing trends over time.

A bar chart is useful for comparing month-to-month counts.

Choose one based on the existing dashboard design.

Do not add multiple charts for the same metric.

---

# 20. Month Grouping

Group employees by:

```text
Year + Month
```

not just:

```text
Month name
```

This prevents data from different years being incorrectly combined.

Correct:

```text
2025-01
2025-02
...
2026-01
2026-02
```

Incorrect:

```text
January = employees from every year combined
```

---

# 21. Monthly Ordering

Monthly analytics must be chronological.

Correct:

```text
Jan
Feb
Mar
Apr
May
Jun
Jul
Aug
Sep
Oct
Nov
Dec
```

If multiple years are represented:

```text
2025-10
2025-11
2025-12
2026-01
2026-02
```

Do not sort months alphabetically.

Incorrect:

```text
Apr
Aug
Dec
Feb
Jan
Mar
```

---

# 22. Analytics Time Range

Use the project's available employee joining data.

If the assessment does not specify a fixed date range:

> Do not arbitrarily invent a business rule such as "last 6 months."

A reasonable implementation may show:

```text
All available joining months
```

or a clearly defined recent range if the existing UI/design already specifies one.

Document the chosen behavior.

---

# 23. Missing Months

If the selected analytics period contains a month with:

```text
0 employees
```

the chart should represent it as:

```text
0
```

rather than silently removing the month if a continuous time-series display is intended.

This creates a more accurate trend.

---

# 24. Analytics Cards

Create summary cards for at least:

```text
Total Employees
Active Employees
```

Optionally, if the existing design supports it:

```text
Inactive Employees
```

Do not add unrelated KPI cards such as:

```text
Average Salary
Attendance
Performance
Revenue
```

because those are not part of the assessment.

---

# 25. Analytics Card Data

Cards must be derived from actual analytics data.

Example:

```text
Total Employees
47
```

and:

```text
Active Employees
38
```

Do not calculate these separately in multiple unrelated components.

Prefer receiving them from one analytics data source.

---

# 26. Analytics Components

A reasonable structure is:

```text
components/
└── analytics/
    ├── AnalyticsCards.jsx
    ├── DepartmentChart.jsx
    ├── MonthlyJoinedChart.jsx
    └── StatusDistributionChart.jsx
```

Depending on the existing project architecture, the names/location may differ.

Do not restructure the entire project solely to match this example.

---

# 27. Analytics Container

A dashboard section may use:

```text
AnalyticsSection.jsx
```

Responsibilities:

```text
Fetch/receive analytics
Handle loading/error/empty state
Render cards
Render charts
```

Individual charts should focus on visualization.

Do not place database/API calls directly inside every chart component.

---

# 28. Analytics Service

If using a backend analytics endpoint, create or update:

```text
frontend/src/services/employeeService.js
```

or an appropriate existing service layer with:

```text
getEmployeeAnalytics()
```

Do not create a completely separate Axios instance.

Reuse the authenticated Axios configuration.

---

# 29. Authentication Integration

Analytics must be protected.

Flow:

```text
Dashboard
    |
    ▼
Analytics Request
    |
    ▼
Axios
    |
    ▼
Authorization: Bearer <token>
    |
    ▼
authMiddleware
    |
    ▼
Analytics Controller
    |
    ▼
MongoDB
```

Do not create an unauthenticated analytics endpoint.

---

# 30. Analytics Controller

If using a backend analytics endpoint, create:

```text
getEmployeeAnalytics
```

in:

```text
backend/controllers/employeeController.js
```

or the appropriate existing controller structure.

Do not create unnecessary duplicate controllers.

The controller should:

1. Validate authentication.
2. Query/aggregate employee data.
3. Calculate required analytics.
4. Return the standard API response.
5. Handle errors safely.

---

# 31. MongoDB Aggregation

If analytics are calculated server-side, MongoDB aggregation is appropriate.

Possible operations include:

```text
$count
$match
$group
$sort
$project
```

Use aggregation only where it makes the calculation clearer or more efficient.

Do not create unnecessarily complicated pipelines for simple metrics.

---

# 32. Total Employee Aggregation

Conceptually:

```text
employees
   |
   ▼
$count
   |
   ▼
totalEmployees
```

Do not retrieve all records simply to count them if the analytics are server-side.

---

# 33. Active Employee Aggregation

Conceptually:

```text
employees
   |
   ▼
$match status = Active
   |
   ▼
$count
   |
   ▼
activeEmployees
```

Do not rely on the current page.

---

# 34. Department Aggregation

Conceptually:

```text
employees
   |
   ▼
$group by department
   |
   ▼
count
   |
   ▼
sort
   |
   ▼
departmentWiseCount
```

Handle missing/invalid department values safely.

However, the Employee model should already require department.

---

# 35. Status Aggregation

Conceptually:

```text
employees
   |
   ▼
$group by status
   |
   ▼
count
   |
   ▼
statusDistribution
```

The expected statuses are:

```text
Active
Inactive
```

Do not invent additional status categories.

---

# 36. Monthly Joining Aggregation

Conceptually:

```text
employees
   |
   ▼
joiningDate
   |
   ▼
Group by Year + Month
   |
   ▼
Count
   |
   ▼
Chronological Sort
```

Ensure the database timezone/date handling is consistent.

Do not accidentally shift dates across months because of inconsistent timezone conversions.

---

# 37. Timezone Handling

Joining dates are business data.

Use a consistent timezone strategy.

Do not randomly convert dates between:

```text
UTC
IST
Local browser timezone
```

without a defined reason.

If the application stores dates as MongoDB `Date`, use a consistent interpretation when grouping by month.

Document the chosen approach if necessary.

---

# 38. Analytics Loading State

When analytics are loading:

```text
Loading analytics...
```

or suitable skeletons/spinners may be displayed.

Prefer localized loading states.

Do not make the entire dashboard disappear while analytics load.

---

# 39. Analytics Error State

If analytics cannot be loaded:

```text
Unable to load analytics.
```

Provide a retry option where appropriate.

Do not show:

```text
MongoDB error
Aggregation error
Axios stack trace
Node.js stack trace
```

to users.

---

# 40. Analytics Empty State

If there are no employees:

```text
No employee data available for analytics.
```

Charts should not render misleading empty graphs.

Summary cards should display a sensible zero state:

```text
Total Employees
0
```

```text
Active Employees
0
```

---

# 41. Chart Empty States

For each chart with no data:

```text
No data available.
```

or an appropriate empty-state component.

Do not render broken axes or misleading chart visuals.

---

# 42. Analytics Refresh After Create

When an employee is created:

```text
Create Employee
      |
      ▼
Employee Data Changes
      |
      ▼
Analytics Changes
```

The dashboard analytics must eventually reflect the new employee.

For example:

```text
Total Employees
47 → 48
```

If the employee is Active:

```text
Active Employees
38 → 39
```

Department count and monthly joining count must also update if applicable.

---

# 43. Analytics Refresh After Edit

When an employee is edited:

```text
Employee Data Changes
        |
        ├── Department changed?
        ├── Status changed?
        └── Joining date changed?
        |
        ▼
Analytics recalculated
```

Examples:

```text
Engineering → HR
```

must update both department counts.

```text
Inactive → Active
```

must update status analytics.

Do not leave stale analytics after an edit.

---

# 44. Analytics Refresh After Delete

When an employee is deleted:

```text
Delete Employee
      |
      ▼
Employee Count Changes
      |
      ▼
Analytics Refresh
```

All affected metrics must update.

---

# 45. Avoid Unnecessary API Calls

Do not refresh analytics on every:

```text
search keystroke
filter change
page change
```

unless analytics are explicitly designed to represent filtered results.

The default analytics requirement represents overall employee data.

Therefore:

> Search, filters, and pagination should not automatically change global analytics.

---

# 46. Global Analytics vs Filtered Analytics

Important distinction:

The required analytics are dashboard-level employee analytics.

They should normally represent:

```text
ALL EMPLOYEES
```

not only the currently displayed filtered page.

Example:

```text
Total employees = 100
Current filter = Engineering
Current page = 1
Current page records = 10
```

Analytics should still show:

```text
Total Employees = 100
```

not:

```text
Total Employees = 10
```

unless the UI explicitly defines a "filtered analytics" mode.

Do not accidentally tie global analytics to pagination.

---

# 47. Search/Filter Compatibility

Search and filters should continue to affect the employee table only.

Analytics should remain global by default.

Architecture:

```text
                Employee Data
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
 Search / Filters          Analytics
          │                     │
          ▼                     ▼
 Employee Table           Global Metrics
          │
          ▼
 Pagination
```

Do not use paginated table data as the analytics source.

---

# 48. Analytics Chart Library

Use only one charting library.

Approved options:

```text
Recharts
Chart.js
ApexCharts
```

If one is already installed:

> Reuse it.

If none is installed:

> Choose one appropriate library and install only that library.

For a simple React assessment, Recharts is a reasonable choice.

Do not install all three.

---

# 49. Chart Responsiveness

Charts must work on:

```text
Mobile
Tablet
Desktop
```

Charts should resize within their containers.

Avoid fixed dimensions that cause horizontal overflow.

Do not break the dashboard layout.

---

# 50. Chart Accessibility

Charts should have understandable:

```text
Titles
Labels
Legends
Tooltips
```

Do not rely solely on color.

For example, status distribution should clearly identify:

```text
Active
Inactive
```

through labels/legend/tooltips.

---

# 51. Chart Data Formatting

Format data consistently.

Examples:

```text
Department → Employee Count
Month → Joined Employees
Status → Employee Count
```

Do not display raw JavaScript objects.

Do not use inconsistent naming between API and chart components.

---

# 52. Number Formatting

Employee counts are whole numbers.

Do not display:

```text
47.00
```

Prefer:

```text
47
```

If the UI uses number formatting for large values, apply it consistently.

Do not add percentage calculations unless required.

---

# 53. Percentage Values

Percentage is not mandatory.

If a percentage is shown in the status chart:

```text
Active = 82%
Inactive = 18%
```

calculate it from the actual counts.

Do not hardcode percentages.

Do not let rounded percentages imply incorrect totals.

---

# 54. Analytics API Error Handling

If using a backend analytics API:

Handle:

```text
401 Unauthorized
500 Internal Server Error
Network failure
MongoDB failure
```

Use the existing authentication and error-handling architecture.

Do not duplicate JWT verification.

---

# 55. Analytics Endpoint Placement

Preferred:

```text
GET /api/employees/analytics
```

Do not create:

```text
/api/analytics/employees
/api/dashboard/employee-stats
/api/statistics
```

unless the existing project architecture already uses a different established convention.

Avoid unnecessary endpoint proliferation.

---

# 56. API Route Order

If using Express routes such as:

```text
GET /api/employees/:id
GET /api/employees/analytics
```

ensure the static route:

```text
/api/employees/analytics
```

is registered before:

```text
/api/employees/:id
```

Otherwise:

```text
analytics
```

may accidentally be interpreted as an employee ID.

This is an important implementation detail.

---

# 57. Analytics Data Consistency

All analytics should be generated from the same source of truth.

Do not calculate:

```text
Total Employees
```

from one source and:

```text
Active Employees
```

from another unrelated source.

The analytics response should represent one consistent snapshot of employee data as far as practical.

---

# 58. React Analytics Data State

If using an analytics API:

```text
analytics
loading
error
```

is sufficient.

Do not create separate API loading states for every chart unless requests are genuinely separate.

Prefer one analytics request returning all required metrics.

---

# 59. One Analytics API vs Multiple APIs

Prefer:

```text
GET /api/employees/analytics
```

returning all required analytics.

Avoid:

```text
/api/employees/count
/api/employees/active
/api/employees/departments
/api/employees/monthly
/api/employees/status
```

unless there is a genuine architectural requirement.

One request is simpler and avoids unnecessary network traffic.

---

# 60. Dashboard Layout

A reasonable layout is:

```text
Dashboard
│
├── Analytics Summary Cards
│   ├── Total Employees
│   └── Active Employees
│
├── Department-wise Employee Chart
│
├── Monthly Joined Employees Chart
│
└── Employee Status Distribution Chart
```

The exact placement should follow the existing UI design.

Do not copy a generic dashboard template if it conflicts with the existing design.

---

# 61. Analytics Cards Layout

Cards should be:

```text
Responsive
Readable
Consistent
```

On desktop:

```text
[ Total Employees ] [ Active Employees ]
```

On smaller screens:

```text
[ Total Employees ]
[ Active Employees ]
```

if required by the existing responsive layout.

Do not force fixed-width cards that overflow.

---

# 62. Chart Layout

Charts should have consistent:

```text
Card/container
Title
Visualization
```

Avoid excessively tall charts.

Do not make charts so small that labels become unreadable.

---

# 63. No UI Redesign

Adding analytics does not justify changing:

```text
Header
Sidebar
Login page
Employee table
Employee forms
Navigation
```

unless required for integration.

Keep the existing UI intact.

---

# 64. Dependency Rules

Do not install:

```text
multiple chart libraries
dashboard UI kits
analytics platforms
state management libraries
```

only for this phase.

Use the existing stack.

If Recharts is selected:

```text
recharts
```

should be the only new charting dependency.

---

# 65. Security Rules

Analytics is authenticated employee information.

Never expose:

```text
Employee analytics
Employee counts
Department data
Status distribution
```

through a public API.

Require the existing JWT authentication.

Do not expose:

```text
MongoDB URI
JWT secret
database internals
```

---

# 66. Testing Checklist

## Summary Cards

```text
[ ] Total Employees is correct
[ ] Active Employees is correct
[ ] Inactive count is correct if displayed
[ ] Values update after CRUD
```

## Department Analytics

```text
[ ] Every department is represented
[ ] Counts are correct
[ ] Department names are correct
[ ] Chart is readable
[ ] Chart updates after department changes
```

## Monthly Joining Analytics

```text
[ ] joiningDate is used
[ ] Months are grouped correctly
[ ] Year + month are handled correctly
[ ] Months are chronologically ordered
[ ] Counts are correct
[ ] Zero months are handled appropriately
```

## Status Distribution

```text
[ ] Active count is correct
[ ] Inactive count is correct
[ ] Chart labels are correct
[ ] Chart updates after status changes
```

---

# 67. CRUD Analytics Testing

## Create

Create an:

```text
Active
Engineering
```

employee.

Verify:

```text
Total +1
Active +1
Engineering +1
Relevant joining month +1
```

## Edit

Change:

```text
Active → Inactive
```

Verify:

```text
Active -1
Inactive +1
```

Change:

```text
Engineering → HR
```

Verify:

```text
Engineering -1
HR +1
```

Change joining date across months.

Verify the monthly counts update.

## Delete

Delete an employee.

Verify:

```text
Total -1
Relevant status -1
Relevant department -1
Relevant month -1
```

---

# 68. Pagination Regression

Analytics must not depend on the current employee table page.

Test:

```text
Page 1
Page 2
Last page
```

The analytics should remain global.

Example:

```text
Total employees = 47

Page 1:
10 employees

Analytics:
47
```

Then:

```text
Page 2:
10 employees

Analytics:
47
```

---

# 69. Filter Regression

If:

```text
Department = Engineering
```

the employee table should filter.

But global analytics should continue to represent:

```text
All employees
```

unless the product specification explicitly says analytics should follow filters.

Do not accidentally calculate analytics from `filteredEmployees`.

---

# 70. Search Regression

Typing into search must not cause:

```text
Analytics API request
```

for every character.

Global analytics should remain stable.

---

# 71. Authentication Regression

Verify:

```text
[ ] Login works
[ ] JWT works
[ ] Analytics endpoint requires JWT
[ ] Invalid token returns 401
[ ] Logout works
[ ] Analytics cannot be accessed after logout
```

---

# 72. Phase 0 Regression

Verify:

```text
[ ] Frontend starts
[ ] Backend starts
[ ] MongoDB connects
[ ] /api/health works
```

---

# 73. Error Testing

Test:

```text
[ ] Analytics API unavailable
[ ] MongoDB unavailable
[ ] Invalid token
[ ] Empty employee collection
```

The frontend must fail gracefully.

---

# 74. Git Safety

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

or sensitive credentials.

---

# 75. Code Quality Rules

Always:

- Keep analytics calculations centralized.
- Keep API communication in the service layer.
- Keep chart components focused on presentation.
- Reuse authentication.
- Reuse existing employee data architecture.
- Avoid duplicated analytics calculations.
- Use descriptive names.
- Keep chart components reasonably small.
- Handle loading/error/empty states.
- Keep global analytics independent from pagination.

Do not create unnecessary abstraction layers.

---

# 76. Recommended Backend Structure

If the current architecture supports it:

```text
backend/
├── controllers/
│   └── employeeController.js
│
├── routes/
│   └── employeeRoutes.js
│
├── models/
│   └── Employee.js
│
└── middleware/
    └── authMiddleware.js
```

The analytics endpoint can remain within the existing employee controller.

Do not create a separate analytics backend module unless genuinely necessary.

---

# 77. Recommended Frontend Structure

A reasonable structure:

```text
frontend/src/
│
├── components/
│   └── analytics/
│       ├── AnalyticsCards.jsx
│       ├── DepartmentChart.jsx
│       ├── MonthlyJoinedChart.jsx
│       └── StatusDistributionChart.jsx
│
├── services/
│   └── employeeService.js
│
└── pages/
    └── Dashboard.jsx
```

Adapt this to the existing project structure.

Do not perform a large refactor just to match this example.

---

# 78. Phase 6 Completion Criteria

Phase 6 is complete when:

```text
✓ Total Employees is correct
✓ Active Employees is correct
✓ Department-wise count is correct
✓ Monthly joined employees is correct
✓ Employee status distribution is correct
✓ Charts display real data
✓ Analytics update after CRUD
✓ Analytics are global, not page-specific
✓ Search does not corrupt analytics
✓ Filters do not corrupt analytics
✓ Pagination does not corrupt analytics
✓ Analytics loading state works
✓ Analytics error state works
✓ Analytics empty state works
✓ Charts are responsive
✓ Authentication remains intact
✓ Existing UI is preserved
```

The completed architecture should look like:

```text
                         DASHBOARD
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
        Employee Management            Analytics
              │                             │
      ┌───────┼────────┐            ┌───────┼──────────┐
      │       │        │            │       │          │
      ▼       ▼        ▼            ▼       ▼          ▼
   Search   Filters  Pagination   Cards  Charts    Charts
      │       │        │            │       │          │
      └───────┴────────┘            └───────┴──────────┘
              │                             │
              ▼                             ▼
        Employee Data  ◄──────────────  Analytics
              │
              ▼
           MongoDB
```

---

# 79. Do Not Proceed to Phase 7 Automatically

After completing Phase 6, stop.

Report:

## 1. Files Created

List all newly created files.

## 2. Files Modified

List all modified files.

## 3. Analytics Architecture

Report:

```text
Frontend-derived / Backend analytics API
```

Explain the choice briefly.

## 4. Analytics API

If implemented:

```text
GET /api/employees/analytics: PASS/FAIL
```

## 5. Summary Analytics

Report:

```text
Total Employees: PASS/FAIL
Active Employees: PASS/FAIL
```

## 6. Charts

Report:

```text
Department-wise Count: PASS/FAIL
Monthly Joined Employees: PASS/FAIL
Status Distribution: PASS/FAIL
```

## 7. CRUD Integration

Report:

```text
Create refresh: PASS/FAIL
Edit refresh: PASS/FAIL
Delete refresh: PASS/FAIL
```

## 8. Global Analytics Integrity

Confirm:

```text
Analytics independent of pagination: YES/NO
Analytics independent of search: YES/NO
Analytics independent of filters: YES/NO
```

## 9. UX

Report:

```text
Loading state: PASS/FAIL
Error state: PASS/FAIL
Empty state: PASS/FAIL
Responsive charts: PASS/FAIL
```

## 10. Regression

Confirm:

```text
Phase 0 preserved: YES/NO
Phase 1 preserved: YES/NO
Phase 2 preserved: YES/NO
Phase 3 preserved: YES/NO
Phase 4 preserved: YES/NO
Phase 5 preserved: YES/NO
Existing UI preserved: YES/NO
```

## 11. Issues

List any remaining problems.

Then stop.

**Do not start Phase 7 until explicitly instructed.**

---

# Final Phase 6 Principle

The goal is to transform employee data into useful dashboard insights without creating a second source of truth.

Prefer:

```text
Real Employee Data
       ↓
Accurate Calculations
       ↓
Clear Metrics
       ↓
Useful Visualizations
```

over:

```text
Hardcoded Values
Duplicate Data
Unnecessary APIs
Multiple Chart Libraries
```

The most important rule is:

> **Analytics must represent the complete employee dataset, not merely the currently displayed paginated/filtered records.**

---

# Strict Phase Boundary

**Phase 6 ends after all required employee analytics and visualizations are fully functional.**

Do not implement:

```text
Export
Advanced Reporting
Attendance
Payroll
Performance Analytics
Notifications
Role-based Permissions
```

These are outside the current technical assessment scope.

**STRICTLY FOLLOW AGENT.md AND THIS PHASE INSTRUCTION. DO NOT IMPLEMENT FEATURES FROM FUTURE PHASES.**
