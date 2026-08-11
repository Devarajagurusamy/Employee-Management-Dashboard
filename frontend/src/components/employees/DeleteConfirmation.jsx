import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

function DeleteConfirmation({ isOpen, onClose, onConfirm, employeeName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex justify-center items-end sm:items-center z-[1000] p-0 sm:p-4">
      <div
        data-aos="zoom-in"
        data-aos-duration="300"
        className="bg-white dark:bg-[#2d2d30] rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-[#3e3e42] w-full max-w-md p-5 sm:p-7 shadow-2xl text-left"
      >
        <div className="flex items-center gap-3 mb-3 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <h3 className="text-xl font-extrabold m-0">Confirm Delete</h3>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
          Are you sure you want to delete employee{' '}
          <strong className="text-slate-900 dark:text-white font-bold">"{employeeName}"</strong>?
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
          This action will permanently remove the employee record from MongoDB.
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Employee'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
