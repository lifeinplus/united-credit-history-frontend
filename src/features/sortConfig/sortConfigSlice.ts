import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SortConfig, SortConfigState, TableId } from "../../types";

const initialState: SortConfigState = {
    loans: {
        sortOrder: "asc",
        sortSysName: "chbPayment",
        sortSysNameStatus: "chbPaymentStatus",
        sortType: "numeric",
    },
    persons: {},
    reports: {
        sortOrder: "asc",
        sortSysName: "appNumber",
    },
    users: {
        sortOrder: "asc",
        sortSysName: "creationDate",
    },
};

interface RequestSort extends SortConfig {
    tableId: TableId;
}

export const sortConfigSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        requestSort: (state, action: PayloadAction<RequestSort>) => {
            const {
                sortType,
                sortSysName,
                sortSysNameStatus,
                tableId = "reports",
            } = action.payload;

            const configState = state[tableId];

            configState.sortOrder =
                configState.sortOrder === "asc" &&
                configState.sortSysName === sortSysName
                    ? "desc"
                    : "asc";

            configState.sortType = sortType;
            configState.sortSysName = sortSysName;
            configState.sortSysNameStatus = sortSysNameStatus;
        },
    },
    selectors: {
        selectSortConfig: (state, tableId: TableId) => state[tableId],
    },
});

export const { requestSort } = sortConfigSlice.actions;

export const { selectSortConfig } = sortConfigSlice.selectors;
