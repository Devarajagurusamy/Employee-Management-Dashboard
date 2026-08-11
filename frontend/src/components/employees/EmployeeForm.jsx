import React, { useState, useEffect } from 'react';
import { X, AlertCircle, UserPlus, Edit3 } from 'lucide-react';

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
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex justify-center items-center z-[1000] p-4">
      <div
        data-aos="zoom-in"
        data-aos-duration="300"
        className="bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] w-full max-w-lg p-7 shadow-2xl text-left"
      >
        <div className="flex justify-between items-center pb-3 mb-5 border-b border-slate-200 dark:border-[#3e3e42]">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 m-0">
            {isEditMode ? (
              <>
                <Edit3 className="w-5 h-5 text-[#007acc]" /> Edit Employee Record
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 text-[#007acc]" /> Add New Employee
              </>
            )}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
            disabled={isSubmitting}
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {apiError && (
          <div className="flex items-center gap-2 p-3.5 mb-5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              />
              {errors.name && <span className="text-xs text-rose-500">{errors.name}</span>}
            </div>

            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && <span className="text-xs text-rose-500">{errors.email}</span>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                  errors.department ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              />
              {errors.department && <span className="text-xs text-rose-500">{errors.department}</span>}
            </div>

            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                  errors.designation ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              />
              {errors.designation && <span className="text-xs text-rose-500">{errors.designation}</span>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none cursor-pointer transition-colors ${
                  errors.status ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              >
                <option value="Active" className="dark:bg-[#1e1e1e]">Active</option>
                <option value="Inactive" className="dark:bg-[#1e1e1e]">Inactive</option>
              </select>
              {errors.status && <span className="text-xs text-rose-500">{errors.status}</span>}
            </div>

            <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Joining Date *
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className={`p-2.5 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                  errors.joiningDate ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
                }`}
                disabled={isSubmitting}
              />
              {errors.joiningDate && <span className="text-xs text-rose-500">{errors.joiningDate}</span>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-[#3e3e42] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#007acc] hover:bg-[#005fb8] text-white font-bold text-sm rounded-xl shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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

export default EmployeeForm;
