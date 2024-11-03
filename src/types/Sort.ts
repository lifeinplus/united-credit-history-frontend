import type { TableId } from "./Table";

export type SortOrder = "asc" | "desc";
export type SortType = "numeric" | "numericArray" | "text";

export interface SortConfig {
    sortOrder?: SortOrder;
    sortSysName?: string;
    sortSysNameStatus?: string;
    sortType?: SortType;
}

export type SortConfigState = {
    [tableId in TableId]: SortConfig;
};

interface SortCompareOptions {
    statusA: string | number;
    statusB: string | number;
    valueA: string | number;
    valueB: string | number;
}

export type SortCompare = (arg0: SortCompareOptions) => {
    order?: number;
    resultA?: string | number;
    resultB?: string | number;
};
