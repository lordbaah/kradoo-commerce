import type { PaginationProps } from '../types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  currentSkip,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 3;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Previous button
  if (currentPage > 1) {
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors text-sm"
      >
        Previous
      </button>
    );
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-2 mx-1 rounded transition-colors text-sm ${
          i === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {i}
      </button>
    );
  }

  // Next button
  if (currentPage < totalPages) {
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors text-sm"
      >
        Next
      </button>
    );
  }

  const startItem = currentSkip + 1;
  const endItem = Math.min(currentSkip + itemsPerPage, totalItems);

  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-4">
      <div className="flex items-center flex-wrap justify-center">{pages}</div>
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} products
      </div>
    </div>
  );
};

export default Pagination;
