import { apiSlice } from "../api";

import type {
    AuthQueryLogin,
    AuthQueryRegister,
    AuthResultLogin,
    AuthResultRegister,
} from "../../types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<AuthResultLogin, AuthQueryLogin>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
        }),
        registerUser: builder.mutation<AuthResultRegister, AuthQueryRegister>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
} = authApiSlice;
