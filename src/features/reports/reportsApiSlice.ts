import { apiSlice } from "../api/apiSlice";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

import type { ReportFull } from "../../types/Report";

interface ReportFullQueryArg {
    id?: string;
}

const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getReports: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, search }) =>
                `reports/getPaginated?page=${page}&limit=${limit}&search=${search}`,
            keepUnusedDataFor: 5,
            providesTags: ["Reports"],
        }),
        getFullById: build.query<ReportFull, ReportFullQueryArg>({
            query: ({ id }) => `reports/getFullById/${id}`,
        }),
    }),
});

export const { useGetFullByIdQuery, useGetReportsQuery } = reportsApiSlice;
