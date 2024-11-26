export function getPagination(
  currentPage: number,
  limit: number,
  totalCount: number,
) {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    currentPage,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    totalPages,
    limit,
    totalCount,
  };
}
