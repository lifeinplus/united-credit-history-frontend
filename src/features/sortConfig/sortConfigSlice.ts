import { createSlice } from "@reduxjs/toolkit";
import { SortConfigState } from "../../types/Sort";

const initialState: SortConfigState = {};

export const sortConfigSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        requestSort: (state, action) => {
            const { sortType, sysName, sysNameStatus } = action.payload;

            if (state.sortOrder === "asc" && state.sortSysName === sysName) {
                state.sortOrder = "desc";
            } else {
                state.sortOrder = "asc";
            }

            state.sortType = sortType;
            state.sortSysName = sysName;
            state.sortSysNameStatus = sysNameStatus;
        },
        resetSortConfig: () => {
            return initialState;
        },
        setSortConfig: (state, action) => {
            return action.payload;
        },
    },
    selectors: {
        selectSortConfig: (state) => state,
    },
});

export const { requestSort, resetSortConfig, setSortConfig } =
    sortConfigSlice.actions;

export const { selectSortConfig } = sortConfigSlice.selectors;
