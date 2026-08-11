import React from 'react';

function DeleteConfirmation({ isOpen, onClose, onConfirm, employeeName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Confirm Delete</h3>
        <p style={styles.text}>
          Are you sure you want to delete employee{' '}
          <strong style={{ color: 'var(--text-primary)' }}>"{employeeName}"</strong>?
        </p>
        <p style={styles.warning}>
          This action will permanently remove the employee record from MongoDB.
        </p>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            style={styles.cancelBtn}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              ...styles.deleteBtn,
              opacity: isDeleting ? 0.7 : 1,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Employee'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
    width: '100%',
    maxWidth: '440px',
    padding: '1.75rem',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
  },
  title: {
    margin: '0 0 0.75rem 0',
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--accent-red)',
  },
  text: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
  },
  warning: {
    margin: '0 0 1.5rem 0',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  },
  cancelBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: 'var(--accent-red)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
  },
};

export default DeleteConfirmation;
