import { apiSlice } from "../../app/api/apiSlice";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getReports: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page }) =>
                `reports/getPaginated?page=${page}&limit=${limit}`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetReportsQuery } = reportsApiSlice;
