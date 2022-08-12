export function getPaginationRange(args: { p?: string; pageSize?: number }) {
  const p = parseInt(args.p ?? '1');
  const pageSize = args.pageSize ?? 10;
  const start = (p - 1) * pageSize;
  const end = start + pageSize;

  return {
    start,
    end,
    pageSize,
    p,
  };
}

export type PaginationProps = ReturnType<typeof getPaginationProps>;

export function getPaginationProps(
  paginationRange: ReturnType<typeof getPaginationRange>,
  totalItems: number,
) {
  return {
    currentPage: paginationRange.p,
    pageSize: paginationRange.pageSize,
    totalItems,
  };
}
