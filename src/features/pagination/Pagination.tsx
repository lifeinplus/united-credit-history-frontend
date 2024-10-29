import classNames from "classnames";
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { PageItemProps, PaginationProps } from "../../types";

import { selectSearchFocus } from "../search";
import { selectTheme } from "../theme";

import {
    goFirstPage,
    goLastPage,
    goNextPage,
    goPrevPage,
    selectActivePage,
    selectFromEntry,
    selectToEntry,
    selectTotal,
    selectTotalPages,
    setActivePage,
} from "./paginationSlice";

const Pagination = ({ isFetching = false }: PaginationProps) => {
    const { t } = useTranslation("table");

    const dispatch = useAppDispatch();
    const searchFocus = useAppSelector(selectSearchFocus);
    const theme = useAppSelector(selectTheme);
    const activePage = useAppSelector(selectActivePage);
    const fromEntry = useAppSelector(selectFromEntry);
    const toEntry = useAppSelector(selectToEntry);
    const total = useAppSelector(selectTotal);
    const totalPages = useAppSelector(selectTotalPages);

    const pages = Array(totalPages)
        .fill(undefined)
        .map((_, index) => index + 1);

    // Reset active page when component unmount
    useEffect(() => {
        return () => {
            dispatch(setActivePage(1));
        };
    }, []);

    const handleKeyDown = useCallback(
        ({ altKey, code }: KeyboardEvent) => {
            if (searchFocus) return;

            if (altKey && code === "ArrowLeft") {
                dispatch(goFirstPage());
            }

            if (altKey && code === "ArrowRight") {
                dispatch(goLastPage());
            }

            if (!altKey && code === "ArrowRight" && activePage < totalPages) {
                dispatch(goNextPage());
            }

            if (!altKey && code === "ArrowLeft" && activePage > 1) {
                dispatch(goPrevPage());
            }
        },
        [activePage, totalPages, searchFocus]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

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
    { isFetching: prevIsFetching }: Readonly<PaginationProps>,
    { isFetching: nextIsFetching }: Readonly<PaginationProps>
): boolean {
    return prevIsFetching === nextIsFetching;
}

export default memo(Pagination, propsAreEqual);
