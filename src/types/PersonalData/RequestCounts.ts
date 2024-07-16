import { RequestCounts } from "../Report";

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
