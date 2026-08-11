import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (!totalItems || totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      data-aos="fade-up"
      className="flex flex-wrap justify-between items-center mt-5 px-5 py-3.5 bg-white dark:bg-[#2d2d30] rounded-2xl border border-slate-200 dark:border-[#3e3e42] shadow-sm gap-4"
    >
      {/* Pagination Info */}
      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Showing <strong className="text-slate-900 dark:text-white font-bold">{startItem}</strong>–
        <strong className="text-slate-900 dark:text-white font-bold">{endItem}</strong> of{' '}
        <strong className="text-slate-900 dark:text-white font-bold">{totalItems}</strong> employees
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
          aria-label="Previous page"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* First Page Link if offset */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="min-w-[34px] px-2.5 py-1.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-xs font-semibold hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
              type="button"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="text-slate-400 px-1 text-xs">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[34px] px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#007acc] text-white border border-[#007acc] shadow-sm'
                  : 'bg-slate-100 dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#3e3e42] hover:bg-slate-200 dark:hover:bg-[#3e3e42]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          );
        })}

        {/* Last Page Link if offset */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="text-slate-400 px-1 text-xs">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="min-w-[34px] px-2.5 py-1.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-xs font-semibold hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
              type="button"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#3e3e42] rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-[#3e3e42] transition-colors"
          aria-label="Next page"
          type="button"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
