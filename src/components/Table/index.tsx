import classNames from "classnames";

import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/theme/themeSlice";
import type { TableProps } from "../../types/Table";

import {
    useRowActive,
    useSortableData,
    useStickyHeader,
    useTableScroll,
} from "./hooks";

import Body from "./Body";
import Head from "./Head";
import Pagination from "./Pagination";
import ScrollButtons from "./ScrollButtons";

const Table = ({
    id,
    columns,
    data,
    isActions = false,
    isMobileView = false,
    isPagination = false,
    isRowActive = false,
    isRowHover = false,
    isScrolling = false,
    isStickyHeader = false,
    isTextDifference = false,
    isTooltips = false,
    paginationParams = {},
    sorting = {},
}: TableProps) => {
    const theme = useAppSelector(selectTheme);

    const rowActiveData = useRowActive(isRowActive, data);

    const [sortedData, requestSort, sortDirection, sortSysName] =
        useSortableData(rowActiveData, sorting);

    const [tableWrapperRef, headerRef] = useStickyHeader(isStickyHeader);
    const [scrollWrapperRef, btnRefs, handleScroll] =
        useTableScroll(isScrolling);

    return (
        <>
            <div
                id={id}
                className={classNames(
                    "table-responsive rounded mb-3",
                    "border",
                    theme === "dark" && "uch-border-dark"
                )}
                ref={(node) => {
                    tableWrapperRef.current = node;
                    scrollWrapperRef.current = node;
                }}
            >
                {isScrolling && !!scrollWrapperRef.current && (
                    <ScrollButtons
                        btnRefs={btnRefs}
                        handleScroll={handleScroll}
                    />
                )}
                <table
                    className={classNames(
                        "table",
                        `table-${theme}`,
                        `uch-table ${theme}`,
                        isRowHover && `table-hover`,
                        "table-striped align-middle mb-0",
                        isMobileView && "table-mobile"
                    )}
                >
                    <Head
                        columns={columns}
                        isActions={isActions}
                        isTooltips={isTooltips}
                        ref={headerRef}
                        requestSort={requestSort}
                        sortDirection={sortDirection}
                        sortSysName={sortSysName}
                    />
                    <Body
                        columns={columns}
                        data={sortedData}
                        isActions={isActions}
                        isMobileView={isMobileView}
                        isRowActive={isRowActive}
                        isTextDifference={isTextDifference}
                    />
                </table>
            </div>
            {isPagination && (
                <footer>
                    <Pagination
                        isFetching={paginationParams.isFetching}
                        page={paginationParams.page}
                        setPage={paginationParams.setPage}
                        totalPages={paginationParams.totalPages}
                    />
                </footer>
            )}
        </>
    );
};

export default Table;
