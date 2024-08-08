import classNames from "classnames";
import { useEffect } from "react";

import { useModal, useTheme } from "../../hooks";
import { Table } from "../../types/Table";

import { useStickyHeader, useTableData, useTableScroll } from "./hooks";
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
    methodParams = {},
    sorting = {},
}: Table) => {
    const { theme } = useTheme();

    const {
        isPlaceholderData,
        page,
        refetch,
        requestRefresh,
        requestSort,
        setPage,
        sortDirection,
        sortSysName,
        tableData,
        totalPages,
    } = useTableData(methodParams, isPagination, isRowActive, sorting, data);

    const { closingRefresh, setClosingRefresh } = useModal();

    useEffect(() => {
        if (closingRefresh) {
            setClosingRefresh(false);
            isPagination ? refetch() : requestRefresh();
        }
    }, [closingRefresh]);

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
                        data={tableData}
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
                        isPlaceholderData={isPlaceholderData}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </footer>
            )}
        </>
    );
};

export default Table;
