import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import * as employeeService from '../services/employeeService';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeForm from '../components/employees/EmployeeForm';
import DeleteConfirmation from '../components/employees/DeleteConfirmation';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import Pagination from '../components/employees/Pagination';

import AnalyticsCards from '../components/analytics/AnalyticsCards';
import DepartmentChart from '../components/analytics/DepartmentChart';
import MonthlyJoinedChart from '../components/analytics/MonthlyJoinedChart';
import StatusDistributionChart from '../components/analytics/StatusDistributionChart';

function Dashboard() {
  const { user, logout } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Global Analytics State
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState('');

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    setAnalyticsError('');
    try {
      const res = await employeeService.getEmployeeAnalytics();
      if (res && res.success) {
        setAnalytics(res.data);
      } else {
        setAnalyticsError(res?.message || 'Failed to load analytics metrics.');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      const msg = err.response?.data?.message || 'Unable to load analytics data.';
      setAnalyticsError(msg);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
    fetchAnalytics();
  }, []);

  // Reset page to 1 whenever search term or filter selection changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus]);

  // Derive unique available departments from current employee dataset or standard defaults
  const availableDepartments = useMemo(() => {
    const defaultDepts = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
    const empDepts = employees
      .map((e) => e.department)
      .filter((dept) => dept && typeof dept === 'string' && dept.trim() !== '');

    const combined = Array.from(new Set([...defaultDepts, ...empDepts]));
    return combined.sort();
  }, [employees]);

  // Derived filtered employees list (Search + Department + Status)
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // 1. Search term match (name or email, case-insensitive)
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        (emp.name && emp.name.toLowerCase().includes(term)) ||
        (emp.email && emp.email.toLowerCase().includes(term));

      // 2. Department match
      const matchesDept =
        selectedDepartment === 'All' || emp.department === selectedDepartment;

      // 3. Status match
      const matchesStatus =
        selectedStatus === 'All' || emp.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  // Calculate total pages for current filtered dataset
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));

  // Boundary safety check: reset to last valid page if current page exceeds total pages (e.g. after deletion)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Derived paginated employee subset for current page view
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(startIndex, startIndex + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedDepartment !== 'All' ||
    selectedStatus !== 'All';

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

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
          fetchAnalytics(); // Refresh global analytics
        } else {
          setFormError(res?.message || 'Failed to update employee.');
        }
      } else {
        // Create Mode
        const res = await employeeService.createEmployee(formData);
        if (res && res.success) {
          setEmployees((prev) => [res.data, ...prev]);
          setIsFormOpen(false);
          setCurrentPage(1); // Jump to first page so newly created employee is immediately visible
          fetchAnalytics(); // Refresh global analytics
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
        fetchAnalytics(); // Refresh global analytics
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

      {/* Global Analytics Section */}
      <section style={styles.analyticsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>System Analytics & Metrics</h3>
          <p style={styles.sectionSubtitle}>
            Real-time organizational insights calculated from MongoDB dataset
          </p>
        </div>

        {analyticsLoading ? (
          <div style={styles.stateContainer}>
            <p style={{ color: '#4c6ef5', fontWeight: '500' }}>Loading analytics...</p>
          </div>
        ) : analyticsError ? (
          <div style={styles.stateContainer}>
            <p style={{ color: '#ff6b6b', fontWeight: '500' }}>{analyticsError}</p>
          </div>
        ) : (
          <>
            {/* KPI Summary Cards */}
            <AnalyticsCards
              totalEmployees={analytics?.totalEmployees || 0}
              activeEmployees={analytics?.activeEmployees || 0}
              inactiveEmployees={analytics?.inactiveEmployees || 0}
            />

            {/* Charts Grid */}
            <div style={styles.chartsGrid}>
              <DepartmentChart data={analytics?.departmentWiseCount || []} />
              <MonthlyJoinedChart data={analytics?.monthlyJoinedEmployees || []} />
              <StatusDistributionChart data={analytics?.statusDistribution || []} />
            </div>
          </>
        )}
      </section>

      {/* Action Bar for Employee Table */}
      <div style={styles.actionBar}>
        <div>
          <h3 style={styles.sectionTitle}>Employee Records</h3>
          <p style={styles.sectionSubtitle}>
            Manage team members, search, filter, and navigate employee records
          </p>
        </div>
        <button onClick={handleAddEmployee} style={styles.addBtn}>
          + Add Employee
        </button>
      </div>

      {/* Search & Filter Controls Component */}
      <EmployeeFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        departments={availableDepartments}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Table Component */}
      <main>
        <EmployeeTable
          employees={paginatedEmployees}
          loading={loading}
          error={error}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onRetry={fetchEmployeeList}
          isFiltered={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Pagination Controls */}
        {!loading && !error && filteredEmployees.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredEmployees.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
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
  analyticsSection: {
    marginBottom: '2rem',
  },
  sectionHeader: {
    marginBottom: '1rem',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#fff',
    fontWeight: '600',
  },
  sectionSubtitle: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.85rem',
    color: '#777',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.25rem',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    flexWrap: 'wrap',
    gap: '1rem',
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
  stateContainer: {
    padding: '2.5rem',
    textAlign: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    border: '1px solid #333',
  },
};

export default Dashboard;
