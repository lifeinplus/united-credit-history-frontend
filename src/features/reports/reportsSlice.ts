import { createSlice } from "@reduxjs/toolkit";
import type { PaginationState } from "../../types/Pagination";

const initialState: PaginationState = {
    limit: 2,
    page: 1,
};

export const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    selectors: {
        selectLimit: (state) => state.limit,
        selectPage: (state) => state.page,
    },
});

export const { setPage } = reportsSlice.actions;
export const { selectLimit, selectPage } = reportsSlice.selectors;
