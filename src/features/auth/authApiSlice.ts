import { apiSlice } from "../api/apiSlice";

import type {
    AuthQueryLogin,
    AuthQueryRegister,
    AuthResultLogin,
    AuthResultRegister,
} from "../../types/Auth";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResultLogin, AuthQueryLogin>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        register: build.mutation<AuthResultRegister, AuthQueryRegister>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
