import React from 'react';
import { Edit3, Trash2, RotateCcw } from 'lucide-react';

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
      <div className="p-10 sm:p-14 text-center bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] shadow-sm">
        <p className="text-[#007acc] font-semibold">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 sm:p-14 text-center bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] shadow-sm">
        <p className="text-rose-500 font-semibold mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-[#3e3e42] text-slate-800 dark:text-white rounded-xl text-sm font-semibold hover:bg-slate-300 dark:hover:bg-[#4e4e52] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Loading
          </button>
        )}
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    if (isFiltered) {
      return (
        <div className="p-10 sm:p-14 text-center bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] shadow-sm">
          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
            No employees match your search or filters.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Try adjusting your search keywords or clearing active filters.
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-5 py-2.5 bg-slate-200 dark:bg-[#3e3e42] text-slate-800 dark:text-white rounded-xl text-sm font-bold hover:bg-slate-300 dark:hover:bg-[#4e4e52] transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="p-10 sm:p-14 text-center bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] shadow-sm">
        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
          No employees found.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
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
    <>
      {/* Desktop Table */}
      <div
        data-aos="fade-up"
        className="hidden md:block w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#3e3e42] bg-white dark:bg-[#2d2d30] shadow-sm"
      >
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-[#252526] border-b border-slate-200 dark:border-[#3e3e42]">
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Employee
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Email
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Department
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Designation
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                Joining Date
              </th>
              <th className="px-5 py-3.5 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#3e3e42]">
            {employees.map((emp) => (
              <tr
                key={emp._id || emp.id}
                className="hover:bg-slate-50/80 dark:hover:bg-[#252526] transition-colors"
              >
                <td className="px-5 py-3.5 flex items-center gap-3 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-full bg-[#007acc] text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                    {emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {emp.name}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {emp.email}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-[#3e3e42] text-slate-800 dark:text-slate-100 text-xs font-semibold">
                    {emp.department}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {emp.designation}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm ${
                      emp.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {formatDate(emp.joiningDate)}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-right">
                  <div className="inline-flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(emp)}
                      className="px-3 py-1.5 bg-[#007acc] hover:bg-[#005fb8] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                      title="Edit Employee"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(emp)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                      title="Delete Employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-3" data-aos="fade-up">
        {employees.map((emp) => (
          <div
            key={emp._id || emp.id}
            className="bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#007acc] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  {emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                    {emp.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {emp.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm flex-shrink-0 ${
                  emp.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                {emp.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Department</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{emp.department}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block">Designation</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{emp.designation}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 dark:text-slate-500 block">Joining Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(emp.joiningDate)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-[#3e3e42]">
              <button
                onClick={() => onEdit(emp)}
                className="flex-1 py-2 bg-[#007acc] hover:bg-[#005fb8] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => onDelete(emp)}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EmployeeTable;
