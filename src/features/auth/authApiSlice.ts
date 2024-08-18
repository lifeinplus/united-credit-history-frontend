import { apiSlice } from "../../app/api/apiSlice";
import {
    AuthLoginResult,
    AuthQueryArg,
    AuthRegisterResult,
} from "../../types/Auth";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthLoginResult, AuthQueryArg>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        register: build.mutation<AuthRegisterResult, AuthQueryArg>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
