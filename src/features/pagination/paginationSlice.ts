import { createSlice } from "@reduxjs/toolkit";
import type { PaginationState } from "../../types/Pagination";

const initialState: PaginationState = {
    activePage: 1,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
    },
    selectors: {
        selectActivePage: (state) => state.activePage,
    },
});

export const { setActivePage } = paginationSlice.actions;

export const { selectActivePage } = paginationSlice.selectors;
