import classNames from "classnames";
import { useEffect } from "react";

import { useModalData } from "../../contexts";
import { useTheme } from "../../hooks";
import { Table } from "../../types/Table";

import { Body, Head, Pagination, ScrollButtons } from "./components";
import { useStickyHeader, useTableData, useTableScroll } from "./hooks";

const Table = ({
    id,
    actions = false,
    columns,
    data,
    methodParams = {},
    mobileView = false,
    pagination = false,
    rowActive = false,
    rowHover = false,
    scrolling = false,
    sorting = {},
    stickyHeader = false,
    textDifference = false,
    tooltips = false,
}: Table) => {
    const { theme } = useTheme();

    const {
        requestSortClass,
        isPlaceholderData,
        page,
        refetch,
        requestRefresh,
        requestSort,
        setPage,
        tableData,
        totalPages,
    } = useTableData(methodParams, pagination, rowActive, sorting, data);

    const { modalData, setModalData } = useModalData();
    const { closingRefresh } = modalData;

    useEffect(() => {
        if (closingRefresh === "yes") {
            setModalData((prev) => ({ ...prev, closingRefresh: "no" }));
            pagination ? refetch() : requestRefresh();
        }
    }, [closingRefresh]);

    const [tableWrapperRef, headerRef] = useStickyHeader(stickyHeader);
    const [scrollWrapperRef, btnRefs, handleScroll] = useTableScroll(scrolling);

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
                {scrolling && (
                    <ScrollButtons
                        btnRefs={btnRefs}
                        handleScroll={handleScroll}
                        wrapperRef={scrollWrapperRef}
                    />
                )}
                <table
                    className={classNames(
                        "table",
                        `table-${theme}`,
                        `uch-table ${theme}`,
                        rowHover && `table-hover`,
                        "table-striped align-middle mb-0",
                        mobileView && "table-mobile"
                    )}
                >
                    <Head
                        actions={actions}
                        columns={columns}
                        ref={headerRef}
                        requestSortClass={requestSortClass}
                        requestSort={requestSort}
                        tooltips={tooltips}
                    />
                    <Body
                        actions={actions}
                        columns={columns}
                        data={tableData}
                        mobileView={mobileView}
                        rowActive={rowActive}
                        textDifference={textDifference}
                    />
                </table>
            </div>
            {pagination && (
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
