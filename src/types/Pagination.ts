import type { ReportRecord } from "./Report";
import type { User } from "./User";

export type HandleSetPage = (page: number) => void;

export interface Pagination {
    fromEntry: number;
    toEntry: number;
    total: number;
    totalPages: number;
}

export interface PaginationState {
    activePage: number;
}

export interface PaginationQueryArg {
    limit: number;
    page: number;
    search: string;
}

export interface PaginationResult extends Pagination {
    page: number;
    results: ReportRecord[] | User[];
}

export interface PaginationProps {
    isFetching: boolean;
    pagination: Partial<Pagination>;
}

export interface PageItemProps {
    active?: boolean;
    disabled: boolean;
    page: number;
    pageText?: string;
}
