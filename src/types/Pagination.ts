import { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
    isPlaceholderData: boolean;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}

export interface PageItemProps {
    active?: boolean;
    disabled: boolean;
    page: number;
    pageText?: string;
    setPage: Dispatch<SetStateAction<number>>;
}
