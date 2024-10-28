import { apiSlice } from "../api";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

import type { ReportFull } from "../../types/Report";

type ReportId = string;

const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getReportFullById: build.query<ReportFull, ReportId>({
            query: (id) => `reports/${id}/full`,
        }),
        getReportsPaginated: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) =>
                `reports/paginated?page=${page}&limit=${limit}&search=${searchValue}&sort=${sortSysName}&order=${sortOrder}`,
            keepUnusedDataFor: 5,
            providesTags: ["Reports"],
        }),
    }),
});

export const { useGetReportFullByIdQuery, useGetReportsPaginatedQuery } =
    reportsApiSlice;
