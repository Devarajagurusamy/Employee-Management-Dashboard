import React from 'react';

function DeleteConfirmation({ isOpen, onClose, onConfirm, employeeName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Confirm Delete</h3>
        <p style={styles.text}>
          Are you sure you want to delete employee{' '}
          <strong style={{ color: '#fff' }}>"{employeeName}"</strong>?
        </p>
        <p style={styles.warning}>
          This action will permanently remove the employee record.
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    border: '1px solid #333',
    width: '100%',
    maxWidth: '440px',
    padding: '1.75rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    textAlign: 'left',
  },
  title: {
    margin: '0 0 0.75rem 0',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ff6b6b',
  },
  text: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.95rem',
    color: '#ccc',
  },
  warning: {
    margin: '0 0 1.5rem 0',
    fontSize: '0.85rem',
    color: '#888',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  },
  cancelBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#333',
    color: '#ccc',
    border: '1px solid #444',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#e03131',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};

export default DeleteConfirmation;
