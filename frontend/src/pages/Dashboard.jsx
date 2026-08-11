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
import Spinner from '../components/ui/Spinner';

import AOS from 'aos';

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

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus]);

  const availableDepartments = useMemo(() => {
    const defaultDepts = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
    const empDepts = employees
      .map((e) => e.department)
      .filter((dept) => dept && typeof dept === 'string' && dept.trim() !== '');

    const combined = Array.from(new Set([...defaultDepts, ...empDepts]));
    return combined.sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        (emp.name && emp.name.toLowerCase().includes(term)) ||
        (emp.email && emp.email.toLowerCase().includes(term));

      const matchesDept =
        selectedDepartment === 'All' || emp.department === selectedDepartment;

      const matchesStatus =
        selectedStatus === 'All' || emp.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
          fetchAnalytics();
        } else {
          setFormError(res?.message || 'Failed to update employee.');
        }
      } else {
        const res = await employeeService.createEmployee(formData);
        if (res && res.success) {
          setEmployees((prev) => [res.data, ...prev]);
          setIsFormOpen(false);
          setCurrentPage(1);
          fetchAnalytics();
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
        fetchAnalytics();
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
    <div className="w-full max-w-[1400px] mx-auto py-2 px-2 sm:px-4">
      {/* Top Navbar */}
      <TopNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Shell Container */}
      <div className="bg-white dark:bg-[#252526] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#3e3e42] p-4 sm:p-6 md:p-8 shadow-sm text-left transition-colors duration-200">
        {/* Welcome Header */}
        <header data-aos="fade-down" className="mb-6 pb-4 border-b border-slate-200 dark:border-[#3e3e42]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight m-0">
            Welcome back, {user?.name || 'Administrator'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here is what's happening with your workforce management system today.
          </p>
        </header>

        {/* Global Analytics Section */}
        {(activeTab === 'Dashboard' || activeTab === 'Analytics') && (
          <section className="mb-8">
            {analyticsLoading ? (
              <div className="p-10 text-center bg-slate-50 dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] flex items-center justify-center">
                <Spinner text="Loading analytics metrics..." />
              </div>
            ) : analyticsError ? (
              <div className="p-10 text-center bg-slate-50 dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42]">
                <p className="text-rose-500 font-semibold">{analyticsError}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <MonthlyJoinedChart data={analytics?.monthlyJoinedEmployees || []} />
                  <DepartmentChart data={analytics?.departmentWiseCount || []} />
                  <StatusDistributionChart data={analytics?.statusDistribution || []} />
                </div>
              </>
            )}
          </section>
        )}

        {/* Employee Records Section */}
        {(activeTab === 'Dashboard' || activeTab === 'Employees') && (
          <section className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white m-0">
                  Employee Records
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
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

export default Dashboard;
