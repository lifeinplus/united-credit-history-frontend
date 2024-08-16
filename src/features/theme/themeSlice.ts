import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    theme: string;
}

const initialState: ThemeState = {
    theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
