import { createSlice } from "@reduxjs/toolkit";
import type { PaginationState } from "../../types/Pagination";

const initialState: PaginationState = {
    limit: 3,
    page: 1,
};

const usersSlice = createSlice({
    name: "users",
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

export const { setPage } = usersSlice.actions;
export const { selectLimit, selectPage } = usersSlice.selectors;

export default usersSlice.reducer;
