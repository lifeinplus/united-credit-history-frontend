import { apiSlice } from "../api";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

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
    message: string;
}

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        changeUserAvatarById: build.mutation<
            UserQueryResult,
            UserAvatarQueryArg
        >({
            query: ({ id, formData }) => ({
                url: `users/${id}/avatar`,
                method: "PUT",
                body: formData,
            }),
        }),
        changeUserPasswordById: build.mutation<
            UserQueryResult,
            UserPasswordQueryArg
        >({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `users/${id}/password`,
                method: "PUT",
                body: { currentPassword, newPassword },
            }),
        }),
        deleteUserById: build.mutation<UserQueryResult, UserId>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        editUserById: build.mutation<UserQueryResult, UserQueryArg>({
            query: ({ id, isResetPassword, roles }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: { isResetPassword, roles },
            }),
            invalidatesTags: ["Users"],
        }),
        getUsersPaginated: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) =>
                `users/paginated?page=${page}&limit=${limit}&search=${searchValue}&sort=${sortSysName}&order=${sortOrder}`,
            keepUnusedDataFor: 5,
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
