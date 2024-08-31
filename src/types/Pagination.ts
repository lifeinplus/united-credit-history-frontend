import type { ReportRecord } from "./Report";
import type { User } from "./User";

export type HandleSetPage = (page: number) => void;

export interface PaginationState {
    activePage: number;
}

export interface PaginationQueryArg {
    limit: number;
    page: number;
    search: string;
}

export interface PaginationResult {
    page: number;
    results: ReportRecord[] | User[];
    total: number;
    totalPages: number;
}

export interface PaginationProps {
    isFetching: boolean;
    totalPages: number;
}

export interface PageItemProps {
    active?: boolean;
    disabled: boolean;
    page: number;
    pageText?: string;
}
