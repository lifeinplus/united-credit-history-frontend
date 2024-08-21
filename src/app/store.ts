import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import extendedDataReducer from "../features/extendedData/extendedDataSlice";
import modalDataReducer from "../features/modalData/modalDataSlice";
import themeReducer from "../features/theme/themeSlice";

import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        extendedData: extendedDataReducer,
        modalData: modalDataReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware().concat(apiSlice.middleware),
    devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
