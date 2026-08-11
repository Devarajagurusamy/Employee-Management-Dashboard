import React from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';

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
  onAddEmployee,
}) {
  return (
    <div
      data-aos="fade-up"
      className="bg-white dark:bg-[#2d2d30] p-5 rounded-2xl border border-slate-200 dark:border-[#3e3e42] mb-5 shadow-sm"
    >
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search Input */}
        <div className="flex flex-col gap-1.5 flex-[2_1_240px]">
          <label htmlFor="employee-search" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left">
            Search
          </label>
          <div className="flex items-center bg-slate-100 dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#3e3e42] px-3.5 focus-within:border-[#007acc] transition-colors">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              id="employee-search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full py-2.5 bg-transparent border-none text-slate-900 dark:text-white text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col gap-1.5 flex-[1_1_180px]">
          <label htmlFor="department-filter" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left">
            Department
          </label>
          <div className="flex items-center bg-slate-100 dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#3e3e42] px-3.5">
            <Filter className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <select
              id="department-filter"
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full py-2.5 bg-transparent border-none text-slate-900 dark:text-white text-sm outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-[#1e1e1e]">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="dark:bg-[#1e1e1e]">
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-1.5 flex-[1_1_150px]">
          <label htmlFor="status-filter" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left">
            Status
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-[#3e3e42] bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none cursor-pointer"
          >
            <option value="All" className="dark:bg-[#1e1e1e]">All Statuses</option>
            <option value="Active" className="dark:bg-[#1e1e1e]">Active</option>
            <option value="Inactive" className="dark:bg-[#1e1e1e]">Inactive</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex flex-col gap-1.5 flex-none justify-end">
            <label className="text-xs font-bold uppercase invisible">Clear</label>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-200 dark:bg-[#3e3e42] text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-[#4e4e52] rounded-xl text-sm font-semibold transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Employee Action Button */}
        {onAddEmployee && (
          <div className="flex flex-col gap-1.5 flex-none ml-auto justify-end">
            <label className="text-xs font-bold uppercase invisible">Action</label>
            <button
              onClick={onAddEmployee}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#007acc] hover:bg-[#005fb8] text-white font-bold text-sm rounded-xl shadow-sm transition-colors whitespace-nowrap"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeFilters;
