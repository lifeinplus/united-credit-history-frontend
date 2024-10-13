import { apiSlice } from "../api/apiSlice";

import type {
    AuthQuery,
    AuthResultLogin,
    AuthResultRegister,
} from "../../types/Auth";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResultLogin, AuthQuery>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        register: build.mutation<AuthResultRegister, AuthQuery>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
