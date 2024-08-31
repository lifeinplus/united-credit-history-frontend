import classNames from "classnames";
import { memo, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme } from "../theme/themeSlice";
import type { PageItemProps, PaginationProps } from "../../types/Pagination";
import { selectActivePage, setActivePage } from "./paginationSlice";

const Pagination = ({
    isFetching = false,
    totalPages = 1,
}: PaginationProps) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const activePage = useAppSelector(selectActivePage);

    const pages = Array(totalPages)
        .fill(undefined)
        .map((_, index) => index + 1);

    useEffect(() => {
        return () => {
            dispatch(setActivePage(1));
        };
    }, []);

    return (
        <nav aria-label="Pages">
            <ul className="pagination justify-content-end">
                <PageItem
                    disabled={isFetching || activePage === 1}
                    page={activePage - 1}
                    pageText={"<"}
                />
                {pages.map((page) => (
                    <PageItem
                        key={page}
                        active={page === activePage}
                        disabled={isFetching || totalPages === 1}
                        page={page}
                    />
                ))}
                <PageItem
                    disabled={isFetching || activePage === totalPages}
                    page={activePage + 1}
                    pageText={">"}
                />
            </ul>
        </nav>
    );

    function PageItem({ active, disabled, page, pageText }: PageItemProps) {
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
                    onClick={() => dispatch(setActivePage(page))}
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
        totalPages: prevTotalPages,
    }: Readonly<PaginationProps>,
    {
        isFetching: nextIsFetching,
        totalPages: nextTotalPages,
    }: Readonly<PaginationProps>
): boolean {
    return (
        prevIsFetching === nextIsFetching && prevTotalPages === nextTotalPages
    );
}

const MemoizedPagination = memo(Pagination, propsAreEqual);

export default MemoizedPagination;
