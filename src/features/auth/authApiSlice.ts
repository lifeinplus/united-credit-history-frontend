import { apiSlice } from "../api";

import type {
    AuthQueryLogin,
    AuthQueryRegister,
    AuthResultLogin,
    AuthResultRegister,
} from "../../types/Auth";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<AuthResultLogin, AuthQueryLogin>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        registerUser: build.mutation<AuthResultRegister, AuthQueryRegister>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApiSlice;
