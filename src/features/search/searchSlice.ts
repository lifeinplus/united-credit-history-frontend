import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    search: string;
}

const initialState: SearchState = {
    search: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
    selectors: {
        selectSearch: (state) => state.search,
    },
});

export const { setSearch } = searchSlice.actions;

export const { selectSearch } = searchSlice.selectors;
