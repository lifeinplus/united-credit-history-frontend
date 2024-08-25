import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import { authSlice } from "../features/auth/authSlice";
import { extendedDataSlice } from "../features/extendedData/extendedDataSlice";
import { modalDataSlice } from "../features/modalData/modalDataSlice";
import { reportsSlice } from "../features/reports/reportsSlice";
import { themeSlice } from "../features/theme/themeSlice";
import { usersSlice } from "../features/users/usersSlice";

const rootReducer = combineSlices(
    apiSlice,
    authSlice,
    extendedDataSlice,
    modalDataSlice,
    reportsSlice,
    themeSlice,
    usersSlice
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
