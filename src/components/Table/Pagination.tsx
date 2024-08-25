import classNames from "classnames";
import { memo } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/theme/themeSlice";
import type { PageItemProps, PaginationProps } from "../../types/Pagination";

const Pagination = ({
    isFetching = false,
    page = 1,
    setPage = () => {},
    totalPages = 1,
}: PaginationProps) => {
    const theme = useAppSelector(selectTheme);

    const pagesArray = Array(totalPages)
        .fill(undefined)
        .map((_, index) => index + 1);

    return (
        <nav aria-label="Pages">
            <ul className="pagination justify-content-end">
                <PageItem
                    disabled={isFetching || page === 1}
                    page={page - 1}
                    pageText={"<"}
                    setPage={setPage}
                />
                {pagesArray.map((item) => (
                    <PageItem
                        key={item}
                        active={item === page}
                        disabled={isFetching}
                        page={item}
                        setPage={setPage}
                    />
                ))}
                <PageItem
                    disabled={isFetching || page === totalPages}
                    page={page + 1}
                    pageText={">"}
                    setPage={setPage}
                />
            </ul>
        </nav>
    );

    function PageItem({
        active,
        disabled,
        page,
        pageText,
        setPage,
    }: PageItemProps) {
        return (
            <li
                className={classNames(
                    "page-item",
                    active && "active",
                    disabled && "disabled"
                )}
            >
                <button
                    className={classNames(
                        "page-link",
                        `uch-page-link ${theme}`
                    )}
                    onClick={() => setPage(page)}
                >
                    {pageText || page}
                </button>
            </li>
        );
    }
};

function propsAreEqual(
    {
        isFetching: prevIsFetching,
        page: prevPage,
        totalPages: prevTotalPages,
    }: Readonly<PaginationProps>,
    {
        isFetching: nextIsFetching,
        page: nextPage,
        totalPages: nextTotalPages,
    }: Readonly<PaginationProps>
): boolean {
    return (
        prevIsFetching === nextIsFetching &&
        prevPage === nextPage &&
        prevTotalPages === nextTotalPages
    );
}

const MemoizedPagination = memo(Pagination, propsAreEqual);

export default MemoizedPagination;
