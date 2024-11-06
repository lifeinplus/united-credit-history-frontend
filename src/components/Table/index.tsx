import classNames from "classnames";

import { useAppSelector } from "../../app/hooks";
import { Pagination } from "../../features/pagination";
import { selectTheme } from "../../features/theme";
import type { TableProps } from "../../types";
import {
    useRowActive,
    useSortableData,
    useStickyHeader,
    useTableScroll,
} from "./hooks";
import Body from "./Body";
import Head from "./Head";
import ScrollButtons from "./ScrollButtons";

const Table = ({
    id,
    columns,
    data = [],
    isActions = false,
    isFetching = true,
    isMobileView = false,
    isPagination = false,
    isRowActive = false,
    isRowHover = false,
    isScrolling = false,
    isStickyHeader = false,
    isTextDifference = false,
    isTooltips = false,
}: TableProps) => {
    const theme = useAppSelector(selectTheme);

    const rowActiveData = useRowActive(isRowActive, data);
    const sortedData = useSortableData(rowActiveData, id);

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
                {isScrolling && (
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
                        isRowHover && data.length && `table-hover`,
                        "table-striped align-middle mb-0",
                        isMobileView && "table-mobile"
                    )}
                >
                    <Head
                        columns={columns}
                        isActions={isActions}
                        isTooltips={isTooltips}
                        ref={headerRef}
                        tableId={id}
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
                    <Pagination isFetching={isFetching} />
                </footer>
            )}
        </>
    );
};

export default Table;
