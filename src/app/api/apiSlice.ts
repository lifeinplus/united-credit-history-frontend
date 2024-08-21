import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { logOut, setCredentials } from "../../features/auth/authSlice";
import type { AuthState } from "../../types/Auth";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:9090",
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
        console.log("sending refresh token");

        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult);

        if (refreshResult.data) {
            const { auth } = api.getState() as { auth: AuthState };

            // store the new token
            api.dispatch(
                setCredentials({
                    ...refreshResult.data,
                    userName: auth.userName,
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
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
