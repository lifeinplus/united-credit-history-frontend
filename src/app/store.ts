import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import extendedDataReducer from "../features/extendedData/extendedDataSlice";
import modalDataReducer from "../features/modalData/modalDataSlice";
import reportsReducer from "../features/reports/reportsSlice";
import themeReducer from "../features/theme/themeSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        extendedData: extendedDataReducer,
        modalData: modalDataReducer,
        reports: reportsReducer,
        theme: themeReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware().concat(apiSlice.middleware),
    devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
