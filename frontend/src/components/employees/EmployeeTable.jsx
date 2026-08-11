import React from 'react';

function EmployeeTable({
  employees,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
  isFiltered,
  onClearFilters,
}) {
  if (loading) {
    return (
      <div style={styles.stateContainer}>
        <p style={styles.loadingText}>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.stateContainer}>
        <p style={styles.errorText}>{error}</p>
        {onRetry && (
          <button onClick={onRetry} style={styles.retryBtn}>
            Retry Loading
          </button>
        )}
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    if (isFiltered) {
      return (
        <div style={styles.stateContainer}>
          <p style={styles.emptyText}>No employees match your search or filters.</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Try adjusting your search keywords or clearing active filters.
          </p>
          {onClearFilters && (
            <button onClick={onClearFilters} style={styles.clearFiltersBtn}>
              Clear Filters
            </button>
          )}
        </div>
      );
    }

    return (
      <div style={styles.stateContainer}>
        <p style={styles.emptyText}>No employees found.</p>
        <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
          Click "Add Employee" above to create your first employee record.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Joining Date</th>
            <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id || emp.id} style={styles.tr}>
              <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.department}</td>
              <td style={styles.td}>{emp.designation}</td>
              <td style={styles.td}>
                <span
                  style={
                    emp.status === 'Active' ? styles.badgeActive : styles.badgeInactive
                  }
                >
                  {emp.status}
                </span>
              </td>
              <td style={styles.td}>{formatDate(emp.joiningDate)}</td>
              <td style={{ ...styles.td, textAlign: 'right' }}>
                <div style={styles.actionBtnGroup}>
                  <button
                    onClick={() => onEdit(emp)}
                    style={styles.editBtn}
                    title="Edit Employee"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(emp)}
                    style={styles.deleteBtn}
                    title="Delete Employee"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#1e1e1e',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.925rem',
  },
  thRow: {
    backgroundColor: '#25262b',
    borderBottom: '1px solid #333',
  },
  th: {
    padding: '0.85rem 1rem',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid #2a2a2a',
    transition: 'background-color 0.15s',
  },
  td: {
    padding: '0.9rem 1rem',
    color: '#ccc',
    whiteSpace: 'nowrap',
  },
  badgeActive: {
    display: 'inline-block',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(81, 207, 102, 0.15)',
    color: '#51cf66',
    border: '1px solid #51cf66',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  badgeInactive: {
    display: 'inline-block',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(134, 142, 150, 0.15)',
    color: '#adb5bd',
    border: '1px solid #868e96',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  actionBtnGroup: {
    display: 'inline-flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },
  editBtn: {
    padding: '0.35rem 0.75rem',
    backgroundColor: '#3b5bdb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '0.35rem 0.75rem',
    backgroundColor: '#e03131',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  stateContainer: {
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    border: '1px solid #333',
  },
  loadingText: {
    color: '#4c6ef5',
    fontWeight: '500',
  },
  errorText: {
    color: '#ff6b6b',
    fontWeight: '500',
    marginBottom: '1rem',
  },
  emptyText: {
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  retryBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  clearFiltersBtn: {
    padding: '0.5rem 1.25rem',
    backgroundColor: '#333',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default EmployeeTable;
