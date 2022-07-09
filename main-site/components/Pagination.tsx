import { Link } from '~/lib/Link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { c } from '~/lib/c';

export function Pagination(props: {
  linkTemplate: string;
  currentPage: number | undefined;
  pageSize: number;
  totalItems: number;
}) {
  const currentPage = props.currentPage || 1;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;
  const showPreviousPage = currentPage * props.pageSize > props.pageSize;
  const showNextPage = currentPage * props.pageSize < props.totalItems;
  const showPagination = props.totalItems > props.pageSize;

  return (
    <div
      className={c('flex items-center justify-center gap-5 px-5', {
        hidden: !showPagination,
      })}
    >
      <Link
        href={props.linkTemplate.replace('{p}', previousPage + '')}
        passHref
      >
        <a
          id="pagination-previous-page-button"
          aria-disabled={!showPreviousPage}
          className={c(
            'flex flex-1 items-center justify-center gap-2 rounded-md border bg-gray-50 py-2 px-5 text-neutral-500',
            {
              'pointer-events-none opacity-70 shadow-none': !showPreviousPage,
              'shadow-sm': showPreviousPage,
            },
          )}
        >
          <FaChevronLeft className="text-gray-400" />
          Previous
        </a>
      </Link>

      <Link href={props.linkTemplate.replace('{p}', nextPage + '')} passHref>
        <a
          id="pagination-next-page-button"
          aria-disabled={!showNextPage}
          className={c(
            'flex flex-1 items-center justify-center gap-2 rounded-md border bg-gray-50 py-2 px-5 text-neutral-500',
            {
              'pointer-events-none opacity-70 shadow-none': !showNextPage,
              'shadow-sm': showNextPage,
            },
          )}
        >
          Next
          <FaChevronRight className="text-gray-400" />
        </a>
      </Link>
    </div>
  );
}
