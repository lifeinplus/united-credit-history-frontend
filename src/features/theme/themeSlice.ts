import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ThemeState {
    value: string;
}

const initialState: ThemeState = {
    value: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === "light" ? "dark" : "light";
        },
    },
});

export const selectTheme = (state: RootState) => state.theme.value;

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
