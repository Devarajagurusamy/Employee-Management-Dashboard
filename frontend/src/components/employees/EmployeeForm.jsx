import React, { useState, useEffect } from 'react';

function EmployeeForm({ isOpen, onClose, onSubmit, initialData, isSubmitting, apiError }) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    status: 'Active',
    joiningDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format date for date input (YYYY-MM-DD)
      let formattedDate = '';
      if (initialData.joiningDate) {
        const d = new Date(initialData.joiningDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString().split('T')[0];
        } else {
          formattedDate = initialData.joiningDate;
        }
      }

      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        department: initialData.department || '',
        designation: initialData.designation || '',
        status: initialData.status || 'Active',
        joiningDate: formattedDate,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        designation: '',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            {isEditMode ? 'Edit Employee Record' : 'Add New Employee'}
          </h3>
          <button onClick={onClose} style={styles.closeBtn} disabled={isSubmitting}>
            &times;
          </button>
        </div>

        {apiError && <div style={styles.alertError}>{apiError}</div>}

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                style={{
                  ...styles.input,
                  borderColor: errors.name ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                style={{
                  ...styles.input,
                  borderColor: errors.email ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                style={{
                  ...styles.input,
                  borderColor: errors.department ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              />
              {errors.department && (
                <span style={styles.errorText}>{errors.department}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Designation *</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                style={{
                  ...styles.input,
                  borderColor: errors.designation ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              />
              {errors.designation && (
                <span style={styles.errorText}>{errors.designation}</span>
              )}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  borderColor: errors.status ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <span style={styles.errorText}>{errors.status}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Joining Date *</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  borderColor: errors.joiningDate ? 'var(--accent-red)' : 'var(--border-color)',
                }}
                disabled={isSubmitting}
              />
              {errors.joiningDate && (
                <span style={styles.errorText}>{errors.joiningDate}</span>
              )}
            </div>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? 'Updating...'
                  : 'Saving...'
                : isEditMode
                ? 'Update Employee'
                : 'Save Employee'}
            </button>
          </div>
        </form>
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
    maxWidth: '560px',
    padding: '1.75rem',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: '1',
  },
  alertError: {
    padding: '0.65rem 0.85rem',
    marginBottom: '1.25rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--accent-red)',
    borderRadius: '10px',
    color: 'var(--accent-red)',
    fontSize: '0.85rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  formGroup: {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.825rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  input: {
    padding: '0.65rem 0.85rem',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
  },
  select: {
    padding: '0.65rem 0.85rem',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
  },
  errorText: {
    color: 'var(--accent-red)',
    fontSize: '0.75rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-soft)',
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
  submitBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(21, 94, 239, 0.3)',
  },
};

export default EmployeeForm;
