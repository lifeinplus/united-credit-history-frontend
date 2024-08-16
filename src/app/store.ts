import { configureStore } from "@reduxjs/toolkit";
import extendedDataReducer from "../features/extendedData/extendedDataSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
    reducer: {
        extendedData: extendedDataReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
