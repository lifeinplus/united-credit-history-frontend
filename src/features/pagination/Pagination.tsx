import classNames from "classnames";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme } from "../theme/themeSlice";
import type { PageItemProps, PaginationProps } from "../../types/Pagination";
import { selectActivePage, setActivePage } from "./paginationSlice";

const Pagination = ({ isFetching = false, pagination }: PaginationProps) => {
    const { t } = useTranslation("table");

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const activePage = useAppSelector(selectActivePage);

    const { fromEntry, toEntry, total, totalPages } = pagination;

    const pages = Array(totalPages)
        .fill(undefined)
        .map((_, index) => index + 1);

    useEffect(() => {
        return () => {
            dispatch(setActivePage(1));
        };
    }, []);

    return (
        <nav aria-label="Pages" className="d-flex justify-content-between">
            <p className="my-2">
                {t("showingEntries", { fromEntry, toEntry, total })}
            </p>
            <ul className="pagination">
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
        pagination: prevPagination,
    }: Readonly<PaginationProps>,
    {
        isFetching: nextIsFetching,
        pagination: nextPagination,
    }: Readonly<PaginationProps>
): boolean {
    return (
        prevIsFetching === nextIsFetching &&
        prevPagination.total === nextPagination.total &&
        prevPagination.totalPages === nextPagination.totalPages &&
        prevPagination.fromEntry === nextPagination.fromEntry &&
        prevPagination.toEntry === nextPagination.toEntry
    );
}

const MemoizedPagination = memo(Pagination, propsAreEqual);

export default MemoizedPagination;
