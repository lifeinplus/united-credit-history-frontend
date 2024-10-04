import type { MouseEvent, RefObject } from "react";

import type { Loan, Person, ReportRecord } from "./Report";
import type { SortType } from "./Sort";
import type { User } from "./User";

export type DataType =
    | "amount"
    | "date"
    | "dateTime"
    | "numeric"
    | "numericArray"
    | "text";

export type TableData = Loan | Person | ReportRecord | User;

export interface TableColumn {
    alignment?: string;
    badgeEqual?: string;
    badgeMore?: number;
    badgeType?: string;
    dataType?: DataType;
    extended?: boolean;
    isLink?: boolean;
    name?: string;
    sortType?: SortType;
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
    isFetching?: boolean;
    isMobileView?: boolean;
    isPagination?: boolean;
    isRowActive?: boolean;
    isRowHover?: boolean;
    isScrolling?: boolean;
    isStickyHeader?: boolean;
    isTextDifference?: boolean;
    isTooltips?: boolean;
}

export interface TableHeadProps {
    columns: TableColumn[];
    isActions: boolean;
    isTooltips: boolean;
    sortSysName?: string;
}

export interface TableBodyProps {
    columns: TableColumn[];
    data: TableData[];
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

export interface TableScrollButtons {
    btnRefs: {
        [key: string]: RefObject<HTMLButtonElement>;
    };
    handleScroll: (arg0: MouseEvent<HTMLButtonElement>) => void;
}
