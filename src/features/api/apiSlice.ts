import {
    type BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { logOut, setCredentials } from "../auth/authSlice";
import type { AuthState } from "../../types";
import { BASE_URL } from "./axiosClient";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { auth } = getState() as { auth: AuthState };
        if (auth.accessToken) {
            headers.set("authorization", `Bearer ${auth.accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery(
            "auth/refresh",
            api,
            extraOptions
        );

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Reports", "Users"],
    endpoints: () => ({}),
});
