import { apiSlice } from "../api";

import type { PaginationQueryArg, PaginationResult } from "../../types";

export type UserId = string;

interface UserAvatarQueryArg {
    id: UserId;
    formData: FormData;
}

interface UserPasswordQueryArg {
    id: UserId;
    currentPassword: string;
    newPassword: string;
}

interface UserQueryArg {
    id: UserId;
    isResetPassword: boolean;
    roles: string;
}

interface UserQueryResult {
    avatarName: string;
    message: string;
}

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changeUserAvatarById: builder.mutation<
            UserQueryResult,
            UserAvatarQueryArg
        >({
            query: ({ id, formData }) => ({
                url: `users/${id}/avatar`,
                method: "PUT",
                body: formData,
            }),
        }),
        changeUserPasswordById: builder.mutation<
            UserQueryResult,
            UserPasswordQueryArg
        >({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `users/${id}/password`,
                method: "PUT",
                body: { currentPassword, newPassword },
            }),
        }),
        deleteUserById: builder.mutation<UserQueryResult, UserId>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        editUserById: builder.mutation<UserQueryResult, UserQueryArg>({
            query: ({ id, isResetPassword, roles }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: { isResetPassword, roles },
            }),
            invalidatesTags: ["Users"],
        }),
        getUsersPaginated: builder.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) => {
                let query = `users/paginated?page=${page}&limit=${limit}`;

                if (searchValue) {
                    query += `&search=${encodeURIComponent(searchValue)}`;
                }

                if (sortSysName) {
                    query += `&sort=${encodeURIComponent(sortSysName)}`;
                }

                if (sortOrder) {
                    query += `&order=${encodeURIComponent(sortOrder)}`;
                }

                return query;
            },
            keepUnusedDataFor: 1,
            providesTags: ["Users"],
        }),
    }),
});

export const {
    useChangeUserAvatarByIdMutation,
    useChangeUserPasswordByIdMutation,
    useDeleteUserByIdMutation,
    useEditUserByIdMutation,
    useGetUsersPaginatedQuery,
} = usersApiSlice;
