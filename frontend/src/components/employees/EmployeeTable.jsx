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
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
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
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
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
            <th style={styles.th}>Employee</th>
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
              <td style={styles.tdEmployee}>
                <div style={styles.avatar}>
                  {emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}
                </div>
                <span style={styles.empName}>{emp.name}</span>
              </td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>
                <span style={styles.deptBadge}>{emp.department}</span>
              </td>
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
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    boxShadow: 'var(--card-shadow)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.925rem',
  },
  thRow: {
    backgroundColor: 'var(--bg-card-muted)',
    borderBottom: '1px solid var(--border-color)',
  },
  th: {
    padding: '0.95rem 1.1rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid var(--border-soft)',
    transition: 'background-color 0.15s',
  },
  tdEmployee: {
    padding: '0.95rem 1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    whiteSpace: 'nowrap',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    fontWeight: '700',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  empName: {
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  td: {
    padding: '0.95rem 1.1rem',
    color: 'var(--text-secondary)',
    whiteSpace: 'nowrap',
  },
  deptBadge: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.825rem',
    fontWeight: '600',
    border: '1px solid var(--border-color)',
  },
  badgeActive: {
    display: 'inline-block',
    padding: '0.25rem 0.65rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: 'var(--accent-green)',
    border: '1px solid var(--accent-green)',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  badgeInactive: {
    display: 'inline-block',
    padding: '0.25rem 0.65rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: 'var(--accent-orange)',
    border: '1px solid var(--accent-orange)',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  actionBtnGroup: {
    display: 'inline-flex',
    gap: '0.4rem',
    justifyContent: 'flex-end',
  },
  editBtn: {
    padding: '0.35rem 0.75rem',
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    border: '1px solid var(--primary)',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '0.35rem 0.75rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--accent-red)',
    border: '1px solid var(--accent-red)',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  stateContainer: {
    padding: '3.5rem',
    textAlign: 'center',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--card-shadow)',
  },
  loadingText: {
    color: 'var(--primary)',
    fontWeight: '600',
  },
  errorText: {
    color: 'var(--accent-red)',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  emptyText: {
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  retryBtn: {
    padding: '0.55rem 1.1rem',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  clearFiltersBtn: {
    padding: '0.55rem 1.25rem',
    backgroundColor: 'transparent',
    color: 'var(--accent-red)',
    border: '1px solid var(--accent-red)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default EmployeeTable;
