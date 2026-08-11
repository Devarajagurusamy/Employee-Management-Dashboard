import React from 'react';

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

  // Generate array of page numbers to display
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
    <div style={styles.container}>
      {/* Pagination Info */}
      <div style={styles.info}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{startItem}</strong>–
        <strong style={{ color: 'var(--text-primary)' }}>{endItem}</strong> of{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> employees
      </div>

      {/* Pagination Controls */}
      <div style={styles.controls}>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            ...styles.btn,
            ...(currentPage === 1 ? styles.btnDisabled : {}),
          }}
          aria-label="Previous page"
          type="button"
        >
          &laquo; Previous
        </button>

        {/* First Page Quick Link if offset */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              style={styles.pageBtn}
              type="button"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span style={styles.ellipsis}>...</span>}
          </>
        )}

        {/* Page Number Buttons */}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                ...styles.pageBtn,
                ...(isActive ? styles.pageBtnActive : {}),
              }}
              aria-current={isActive ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          );
        })}

        {/* Last Page Quick Link if offset */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span style={styles.ellipsis}>...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              style={styles.pageBtn}
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
          style={{
            ...styles.btn,
            ...(currentPage === totalPages ? styles.btnDisabled : {}),
          }}
          aria-label="Next page"
          type="button"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.25rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    flexWrap: 'wrap',
    gap: '1rem',
    boxShadow: 'var(--card-shadow)',
  },
  info: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '0.45rem 0.85rem',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    color: 'var(--text-muted)',
  },
  pageBtn: {
    padding: '0.45rem 0.75rem',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '36px',
  },
  pageBtnActive: {
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    borderColor: 'var(--primary)',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(21, 94, 239, 0.3)',
  },
  ellipsis: {
    color: 'var(--text-muted)',
    padding: '0 0.25rem',
    fontSize: '0.9rem',
  },
};

export default Pagination;
