import type { Person, ReportFull, RequestCounts } from "./Report";

export interface PersonalDataProps {
    data?: ReportFull;
}

export interface PersonsProps {
    persons?: Person[];
}

export interface RequestCountsProps {
    requestCounts?: RequestCounts;
    score?: number;
}

export interface RequestCountsCard {
    title: string;
    type: string;
}

export interface RequestCountsItem {
    count: number;
    sysName: string;
    type: string;
}
