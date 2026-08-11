import React from 'react';

function EmployeeFilters({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  departments,
  onClearFilters,
  hasActiveFilters,
  onAddEmployee,
}) {
  return (
    <div style={styles.container}>
      <div style={styles.filterGroup}>
        {/* Search Input */}
        <div style={{ ...styles.inputWrapper, flex: '2 1 240px' }}>
          <label htmlFor="employee-search" style={styles.label}>
            Search
          </label>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              id="employee-search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Department Filter */}
        <div style={{ ...styles.inputWrapper, flex: '1 1 180px' }}>
          <label htmlFor="department-filter" style={styles.label}>
            Department
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div style={{ ...styles.inputWrapper, flex: '1 1 150px' }}>
          <label htmlFor="status-filter" style={styles.label}>
            Status
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div style={{ ...styles.inputWrapper, flex: '0 0 auto', justifyContent: 'flex-end' }}>
            <label style={{ ...styles.label, visibility: 'hidden' }}>Clear</label>
            <button onClick={onClearFilters} style={styles.clearBtn} type="button">
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Employee Button (Prominent Action from reference design) */}
        {onAddEmployee && (
          <div style={{ ...styles.inputWrapper, flex: '0 0 auto', marginLeft: 'auto', justifyContent: 'flex-end' }}>
            <label style={{ ...styles.label, visibility: 'hidden' }}>Action</label>
            <button onClick={onAddEmployee} style={styles.addBtn} type="button">
              + Add Employee
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--bg-card)',
    padding: '1.25rem',
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
    marginBottom: '1.25rem',
    boxShadow: 'var(--card-shadow)',
  },
  filterGroup: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'left',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-input)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    padding: '0 0.85rem',
  },
  searchIcon: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginRight: '0.5rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.65rem 0',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
  },
  select: {
    padding: '0.65rem 0.85rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '0.65rem 1rem',
    backgroundColor: 'transparent',
    color: 'var(--accent-red)',
    border: '1px solid var(--accent-red)',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  addBtn: {
    padding: '0.65rem 1.25rem',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(21, 94, 239, 0.3)',
    whiteSpace: 'nowrap',
  },
};

export default EmployeeFilters;
