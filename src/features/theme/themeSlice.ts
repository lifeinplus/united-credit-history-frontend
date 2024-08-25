import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    theme: string;
}

const initialState: ThemeState = {
    theme: localStorage.getItem("theme") || "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
    selectors: {
        selectTheme: (state) => state.theme,
    },
});

export const { toggleTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
