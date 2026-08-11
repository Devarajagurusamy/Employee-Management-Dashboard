import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as employeeService from '../services/employeeService';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeForm from '../components/employees/EmployeeForm';
import DeleteConfirmation from '../components/employees/DeleteConfirmation';

function Dashboard() {
  const { user, logout } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal & Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete Confirmation Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEmployeeList = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await employeeService.getEmployees();
      if (res && res.success) {
        setEmployees(res.data || []);
      } else {
        setError(res?.message || 'Failed to load employees.');
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      const msg = err.response?.data?.message || 'Unable to load employees. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  // Form Handlers
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleEditEmployee = (emp) => {
    setSelectedEmployee(emp);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    if (isFormSubmitting) return;
    setIsFormOpen(false);
    setSelectedEmployee(null);
    setFormError('');
  };

  const handleFormSubmit = async (formData) => {
    setIsFormSubmitting(true);
    setFormError('');

    try {
      if (selectedEmployee) {
        // Edit Mode
        const empId = selectedEmployee._id || selectedEmployee.id;
        const res = await employeeService.updateEmployee(empId, formData);
        if (res && res.success) {
          setEmployees((prev) =>
            prev.map((emp) =>
              (emp._id || emp.id) === empId ? res.data : emp
            )
          );
          setIsFormOpen(false);
          setSelectedEmployee(null);
        } else {
          setFormError(res?.message || 'Failed to update employee.');
        }
      } else {
        // Create Mode
        const res = await employeeService.createEmployee(formData);
        if (res && res.success) {
          setEmployees((prev) => [res.data, ...prev]);
          setIsFormOpen(false);
        } else {
          setFormError(res?.message || 'Failed to create employee.');
        }
      }
    } catch (err) {
      console.error('Error saving employee:', err);
      const msg =
        err.response?.data?.message ||
        'An error occurred while saving employee data.';
      setFormError(msg);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Delete Handlers
  const handleDeleteEmployee = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    if (isDeleting) return;
    setIsDeleteOpen(false);
    setEmployeeToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);
    const empId = employeeToDelete._id || employeeToDelete.id;

    try {
      const res = await employeeService.deleteEmployee(empId);
      if (res && res.success) {
        setEmployees((prev) =>
          prev.filter((emp) => (emp._id || emp.id) !== empId)
        );
        setIsDeleteOpen(false);
        setEmployeeToDelete(null);
      } else {
        alert(res?.message || 'Failed to delete employee.');
      }
    } catch (err) {
      console.error('Error deleting employee:', err);
      const msg = err.response?.data?.message || 'Failed to delete employee.';
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar / Header */}
      <header style={styles.header}>
        <div>
          <h2 style={styles.appTitle}>Employee Management Dashboard</h2>
          <p style={styles.userInfo}>
            Logged in as <strong>{user?.name || user?.email}</strong> ({user?.email})
          </p>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      {/* Action Bar */}
      <div style={styles.actionBar}>
        <div>
          <h3 style={styles.sectionTitle}>Employee Records</h3>
          <p style={styles.sectionSubtitle}>
            Manage team members and view employee details
          </p>
        </div>
        <button onClick={handleAddEmployee} style={styles.addBtn}>
          + Add Employee
        </button>
      </div>

      {/* Main Table Component */}
      <main>
        <EmployeeTable
          employees={employees}
          loading={loading}
          error={error}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onRetry={fetchEmployeeList}
        />
      </main>

      {/* Reusable Employee Form Modal */}
      <EmployeeForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedEmployee}
        isSubmitting={isFormSubmitting}
        apiError={formError}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDelete?.name || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #333',
  },
  appTitle: {
    margin: 0,
    fontSize: '1.6rem',
    color: '#fff',
    fontWeight: '700',
  },
  userInfo: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.875rem',
    color: '#aaa',
  },
  logoutBtn: {
    padding: '0.55rem 1.1rem',
    backgroundColor: 'transparent',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background 0.2s',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight: '600',
  },
  sectionSubtitle: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.85rem',
    color: '#777',
  },
  addBtn: {
    padding: '0.65rem 1.25rem',
    backgroundColor: '#4c6ef5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(76, 110, 245, 0.3)',
  },
};

export default Dashboard;
