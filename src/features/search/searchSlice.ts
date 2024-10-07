import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    searchFocus: boolean;
    searchValue: string;
}

const initialState: SearchState = {
    searchFocus: false,
    searchValue: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchFocus: (state, action) => {
            state.searchFocus = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
    selectors: {
        selectSearchFocus: (state) => state.searchFocus,
        selectSearchValue: (state) => state.searchValue,
    },
});

export const { setSearchFocus, setSearchValue } = searchSlice.actions;

export const { selectSearchFocus, selectSearchValue } = searchSlice.selectors;
