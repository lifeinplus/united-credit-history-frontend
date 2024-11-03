import type { ReportRecord } from "./Report";
import type { SortConfig } from "./Sort";
import type { User } from "./User";

export type HandleSetPage = (page: number) => void;

export interface PaginationState {
    activePage: number;
    fromEntry: number;
    toEntry: number;
    total: number;
    totalPages: number;
}

export interface PaginationQueryArg
    extends Pick<SortConfig, "sortOrder" | "sortSysName"> {
    limit: number;
    page: number;
    searchValue: string;
}

export interface PaginationResult extends PaginationState {
    page: number;
    results: ReportRecord[] | User[];
}

export interface PaginationProps {
    isFetching: boolean;
}

export interface PageItemProps {
    active?: boolean;
    disabled: boolean;
    page: number;
    pageText?: string;
}
