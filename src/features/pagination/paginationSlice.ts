import { createSlice } from "@reduxjs/toolkit";
import type { PaginationState } from "../../types/Pagination";

const initialState: PaginationState = {
    activePage: 1,
    fromEntry: 1,
    toEntry: 1,
    total: 1,
    totalPages: 5,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        goFirstPage: (state) => {
            state.activePage = 1;
        },
        goLastPage: (state) => {
            state.activePage = state.totalPages;
        },
        goNextPage: (state) => {
            state.activePage = Math.min(state.activePage + 1, state.totalPages);
        },
        goPrevPage: (state) => {
            state.activePage = Math.max(state.activePage - 1, 1);
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setFromEntry: (state, action) => {
            state.fromEntry = action.payload;
        },
        setToEntry: (state, action) => {
            state.toEntry = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
    },
    selectors: {
        selectActivePage: (state) => state.activePage,
        selectFromEntry: (state) => state.fromEntry,
        selectToEntry: (state) => state.toEntry,
        selectTotal: (state) => state.total,
        selectTotalPages: (state) => state.totalPages,
    },
});

export const {
    goFirstPage,
    goLastPage,
    goNextPage,
    goPrevPage,
    setActivePage,
    setFromEntry,
    setToEntry,
    setTotal,
    setTotalPages,
} = paginationSlice.actions;

export const {
    selectActivePage,
    selectFromEntry,
    selectToEntry,
    selectTotal,
    selectTotalPages,
} = paginationSlice.selectors;
