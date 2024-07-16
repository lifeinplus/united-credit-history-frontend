import { MouseEvent, RefObject } from "react";

import { Loan, Person, ReportRecord } from "./Report";
import { User } from "./User";

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

export interface MethodParams {
    limit?: number;
    options?: {
        reportId?: string;
    };
    url?: string;
}

export interface Table {
    id: string;
    actions?: boolean;
    columns: TableColumn[];
    data?: TableData[];
    methodParams?: MethodParams;
    mobileView?: boolean;
    pagination?: boolean;
    rowActive?: boolean;
    rowHover?: boolean;
    scrolling?: boolean;
    sorting?: TableSortConfig;
    stickyHeader?: boolean;
    textDifference?: boolean;
    tooltips?: boolean;
}

export interface TableHead {
    actions: boolean;
    columns: TableColumn[];
    requestSort: TableSortFunc;
    requestSortClass: TableSortClass;
    tooltips: boolean;
}

export interface TableBody {
    actions: boolean;
    columns: TableColumn[];
    data?: TableData[];
    mobileView: boolean;
    rowActive: boolean;
    textDifference: boolean;
}

export interface TableRow {
    data: TableData;
}

export interface TableHeaderCell {
    column: TableColumn;
    requestSort: TableSortFunc;
    requestSortClass: TableSortClass;
    theme: string;
}

export interface TableDataCell {
    id: string;
    column: TableColumn;
    data: TableData;
}

export interface TableDiff {
    text?: string;
    spanText?: string;
}

export interface TableDiffBadges {
    id: string;
    data?: TableDiff[];
}

export interface TableRefreshFunc {
    (): void;
}

export interface TableSortClass {
    (sysName?: string): string | undefined;
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
    wrapperRef: RefObject<HTMLDivElement>;
}
