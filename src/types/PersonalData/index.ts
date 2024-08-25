import type { Person, ReportFull } from "../Report";

import type {
    RequestCountsCard,
    RequestCountsItem,
    RequestCountsProps,
} from "./RequestCounts";

export interface PersonalDataProps {
    data?: ReportFull;
}

export interface PersonsProps {
    persons?: Person[];
}

export interface ScoreStyle {
    min: number;
    max: number;
    style: string;
}

export { RequestCountsCard, RequestCountsItem, RequestCountsProps };
