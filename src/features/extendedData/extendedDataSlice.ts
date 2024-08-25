import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ExtendedDataState {
    show: boolean;
}

const initialState: ExtendedDataState = {
    show: cookies.get("extended_data") === "yes",
};

export const extendedDataSlice = createSlice({
    name: "extendedData",
    initialState,
    reducers: {
        toggleExtendedData: (state) => {
            const show = !state.show;
            state.show = show;
            cookies.set("extended_data", show ? "yes" : "no");
        },
    },
    selectors: {
        selectShowExtendedData: (state) => state.show,
    },
});

export const { toggleExtendedData } = extendedDataSlice.actions;
export const { selectShowExtendedData } = extendedDataSlice.selectors;
