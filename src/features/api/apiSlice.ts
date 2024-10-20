import {
    type BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./axios";

import { logOut, setCredentials } from "../auth/authSlice";
import type { AuthState } from "../../types/Auth";

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

    if (result.error?.status === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);

        if (refreshResult.data) {
            const { auth } = api.getState() as { auth: AuthState };

            // store the new token
            api.dispatch(
                setCredentials({
                    ...refreshResult.data,
                    username: auth.username,
                })
            );

            // retry the original query with new access token
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
    endpoints: (builder) => ({}),
});
