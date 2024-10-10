import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    searchFocus: boolean;
    searchSysName: string;
    searchValue: string;
}

const initialState: SearchState = {
    searchFocus: false,
    searchSysName: "",
    searchValue: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchFocus: (state, action) => {
            state.searchFocus = action.payload;
        },
        setSearchSysName: (state, action) => {
            state.searchSysName = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
    selectors: {
        selectSearchFocus: (state) => state.searchFocus,
        selectSearchSysName: (state) => state.searchSysName,
        selectSearchValue: (state) => state.searchValue,
    },
});

export const { setSearchFocus, setSearchSysName, setSearchValue } =
    searchSlice.actions;

export const { selectSearchFocus, selectSearchSysName, selectSearchValue } =
    searchSlice.selectors;
