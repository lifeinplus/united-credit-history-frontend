import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ExtendedDataState {
    show: boolean;
}

const initialState: ExtendedDataState = {
    show: cookies.get("extended_data") === "yes",
};

const extendedDataSlice = createSlice({
    name: "extendedData",
    initialState,
    reducers: {
        toggleExtendedData: (state) => {
            const show = !state.show;
            state.show = show;
            cookies.set("extended_data", show ? "yes" : "no");
        },
    },
});

export const selectShowExtendedData = (state: RootState) =>
    state.extendedData.show;

export const { toggleExtendedData } = extendedDataSlice.actions;

export default extendedDataSlice.reducer;
