import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api";
import { authSlice } from "../features/auth";
import { extendedDataSlice } from "../features/extendedData";
import { modalsSlice } from "../features/modals";
import { paginationSlice } from "../features/pagination";
import { searchSlice } from "../features/search";
import { sortConfigSlice } from "../features/sortConfig";
import { themeSlice } from "../features/theme";

const rootReducer = combineSlices(
    apiSlice,
    authSlice,
    extendedDataSlice,
    modalsSlice,
    paginationSlice,
    searchSlice,
    sortConfigSlice,
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
