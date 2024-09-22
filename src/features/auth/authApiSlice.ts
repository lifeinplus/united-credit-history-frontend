import { apiSlice } from "../api/apiSlice";

import type {
    AuthQuery,
    AuthQueryChangePassword,
    AuthResultLogin,
    AuthResultRegister,
} from "../../types/Auth";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation<void, AuthQueryChangePassword>({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `auth/changePassword`,
                method: "PUT",
                body: { id, currentPassword, newPassword },
            }),
            invalidatesTags: ["Users"],
        }),
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

export const {
    useChangePasswordMutation,
    useLoginMutation,
    useRegisterMutation,
} = authApiSlice;
