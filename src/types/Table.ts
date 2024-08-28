import type { MouseEvent, RefObject } from "react";

import type { PaginationProps } from "./Pagination";
import type { Loan, Person, ReportRecord } from "./Report";
import type { User } from "./User";

export type TableData = Loan | Person | ReportRecord | User;

export interface TableColumn {
    alignment?: string;
    badgeEqual?: string;
    badgeMore?: number;
    badgeType?: string;
    dataType?: string;
    extended?: boolean;
    isLink?: boolean;
    name?: string;
    sortable?: boolean;
    sysName?: string;
    sysNameStatus?: string;
    tooltip?: boolean;
    tooltipName?: string;
    type?: string;
}

export interface TableProps {
    id: string;
    columns: TableColumn[];
    data?: TableData[];
    isActions?: boolean;
    isMobileView?: boolean;
    isPagination?: boolean;
    isRowActive?: boolean;
    isRowHover?: boolean;
    isScrolling?: boolean;
    isStickyHeader?: boolean;
    isTextDifference?: boolean;
    isTooltips?: boolean;
    paginationParams?: PaginationProps;
    sorting?: TableSortConfig;
}

export interface TableHeadProps {
    columns: TableColumn[];
    isActions: boolean;
    isTooltips: boolean;
    requestSort: TableSortFunc;
    sortSysName?: string;
    sortDirection?: string;
}

export interface TableBodyProps {
    columns: TableColumn[];
    data?: TableData[];
    isActions: boolean;
    isMobileView: boolean;
    isRowActive: boolean;
    isTextDifference: boolean;
}

export interface TableRowProps {
    data: TableData;
}

export interface TableDiffBadgesProps {
    id: string;
    data?: TableDiffData[];
}

export interface TableDiffData {
    text?: string;
    spanText?: string;
}

export interface TableSortConfig {
    dataType?: string;
    direction?: string;
    sysName?: string;
    sysNameStatus?: string;
}

export interface TableSortFunc {
    (column: TableColumn): void;
}

interface TableSortCompareOptions {
    statusA: string | number;
    statusB: string | number;
    valueA: string | number;
    valueB: string | number;
}

export interface TableSortCompare {
    (arg0: TableSortCompareOptions): {
        order?: number;
        resultA?: string | number;
        resultB?: string | number;
    };
}

export interface TableScrollButtons {
    btnRefs: {
        [key: string]: RefObject<HTMLButtonElement>;
    };
    handleScroll: (arg0: MouseEvent<HTMLButtonElement>) => void;
}
