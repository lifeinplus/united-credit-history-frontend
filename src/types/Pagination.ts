import type { ReportRecord } from "./Report";
import type { SortConfigState } from "./Sort";
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
    extends Pick<SortConfigState, "sortOrder" | "sortSysName"> {
    limit: number;
    page: number;
    search: string;
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
