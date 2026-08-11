import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import * as employeeService from '../services/employeeService';
import TopNavbar from '../components/layout/TopNavbar';
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');

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
    <div style={styles.shellContainer}>
      {/* Top Navbar */}
      <TopNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Dashboard Application Surface */}
      <div style={styles.mainSurface}>
        {/* Welcome Header */}
        <header style={styles.welcomeHeader}>
          <div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, {user?.name || 'Administrator'} 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              Here is what's happening with your workforce management system today.
            </p>
          </div>
        </header>

        {/* Global Analytics Section (Displayed on Dashboard and Analytics tab views) */}
        {(activeTab === 'Dashboard' || activeTab === 'Analytics') && (
          <section style={styles.analyticsSection}>
            {analyticsLoading ? (
              <div style={styles.stateContainer}>
                <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Loading analytics metrics...</p>
              </div>
            ) : analyticsError ? (
              <div style={styles.stateContainer}>
                <p style={{ color: 'var(--accent-red)', fontWeight: '600' }}>{analyticsError}</p>
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
                  <MonthlyJoinedChart data={analytics?.monthlyJoinedEmployees || []} />
                  <DepartmentChart data={analytics?.departmentWiseCount || []} />
                  <StatusDistributionChart data={analytics?.statusDistribution || []} />
                </div>
              </>
            )}
          </section>
        )}

        {/* Employee Records Section (Displayed on Dashboard and Employees tab views) */}
        {(activeTab === 'Dashboard' || activeTab === 'Employees') && (
          <section style={{ marginTop: '2rem' }}>
            <div style={styles.sectionHeaderRow}>
              <div>
                <h3 style={styles.sectionTitle}>Employee Records</h3>
                <p style={styles.sectionSubtitle}>
                  Search, filter, manage, and view detailed workforce records
                </p>
              </div>
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
              onAddEmployee={handleAddEmployee}
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
          </section>
        )}
      </div>

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
  shellContainer: {
    width: '100%',
    margin: '0 auto',
    padding: '0.5rem 0',
  },
  mainSurface: {
    backgroundColor: 'var(--bg-shell)',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    padding: '2rem',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
  },
  welcomeHeader: {
    marginBottom: '1.75rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border-soft)',
  },
  welcomeTitle: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
  },
  welcomeSubtitle: {
    margin: '0.3rem 0 0 0',
    fontSize: '0.925rem',
    color: 'var(--text-secondary)',
  },
  analyticsSection: {
    marginBottom: '2rem',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.25rem',
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  sectionSubtitle: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  stateContainer: {
    padding: '2.5rem',
    textAlign: 'center',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
  },
};

export default Dashboard;
