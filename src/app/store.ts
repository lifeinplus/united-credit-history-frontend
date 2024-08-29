import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import { authSlice } from "../features/auth/authSlice";
import { extendedDataSlice } from "../features/extendedData/extendedDataSlice";
import { modalDataSlice } from "../features/modalData/modalDataSlice";
import { paginationSlice } from "../features/pagination/paginationSlice";
import { searchSlice } from "../features/search/searchSlice";
import { themeSlice } from "../features/theme/themeSlice";

const rootReducer = combineSlices(
    apiSlice,
    authSlice,
    extendedDataSlice,
    modalDataSlice,
    paginationSlice,
    searchSlice,
    themeSlice
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware().concat(apiSlice.middleware),
    devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
