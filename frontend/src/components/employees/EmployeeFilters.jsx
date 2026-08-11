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
}) {
  return (
    <div style={styles.container}>
      <div style={styles.filterGroup}>
        {/* Search Input */}
        <div style={{ ...styles.inputWrapper, flex: '2 1 240px' }}>
          <label htmlFor="employee-search" style={styles.label}>
            Search
          </label>
          <input
            id="employee-search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            style={styles.input}
          />
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
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    padding: '1.25rem',
    borderRadius: '8px',
    border: '1px solid #333',
    marginBottom: '1.25rem',
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
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  select: {
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '0.65rem 1rem',
    backgroundColor: '#333',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s',
  },
};

export default EmployeeFilters;
