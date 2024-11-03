import { apiSlice } from "../api";

import type {
    PaginationQueryArg,
    PaginationResult,
    ReportFull,
} from "../../types";

type ReportId = string;

const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getReportFullById: build.query<ReportFull, ReportId>({
            query: (id) => `reports/${id}/full`,
        }),
        getReportsPaginated: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) => {
                let query = `reports/paginated?page=${page}&limit=${limit}`;

                if (searchValue) {
                    query += `&search=${encodeURIComponent(searchValue)}`;
                }

                if (sortSysName) {
                    query += `&sort=${encodeURIComponent(sortSysName)}`;
                }

                if (sortOrder) {
                    query += `&order=${encodeURIComponent(sortOrder)}`;
                }

                return query;
            },
            keepUnusedDataFor: 1,
            providesTags: ["Reports"],
        }),
    }),
});

export const { useGetReportFullByIdQuery, useGetReportsPaginatedQuery } =
    reportsApiSlice;
