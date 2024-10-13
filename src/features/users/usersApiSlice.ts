import { apiSlice } from "../api/apiSlice";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

interface UserQueryArg {
    id: string;
}

interface ChangeAvatarUserQueryArg extends UserQueryArg {
    formData: FormData;
}

interface ChangePasswordQueryArg extends UserQueryArg {
    currentPassword: string;
    newPassword: string;
}

interface EditUserQueryArg extends UserQueryArg {
    roles?: string;
}

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        changeAvatar: build.mutation<void, ChangeAvatarUserQueryArg>({
            query: ({ id, formData }) => ({
                url: `users/${id}/changeAvatar`,
                method: "PUT",
                body: formData,
            }),
        }),
        changePassword: build.mutation<void, ChangePasswordQueryArg>({
            query: ({ id, currentPassword, newPassword }) => ({
                url: `users/${id}/changePassword`,
                method: "PUT",
                body: { id, currentPassword, newPassword },
            }),
        }),
        deleteUser: build.mutation<void, UserQueryArg>({
            query: ({ id }) => ({
                url: `users/deleteById/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        editUser: build.mutation<void, EditUserQueryArg>({
            query: (arg) => ({
                url: "users/editById",
                method: "PUT",
                body: { ...arg },
            }),
            invalidatesTags: ["Users"],
        }),
        getUsers: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) =>
                `users/getPaginated?page=${page}&limit=${limit}&search=${searchValue}&sort=${sortSysName}&order=${sortOrder}`,
            keepUnusedDataFor: 5,
            providesTags: ["Users"],
        }),
    }),
});

export const {
    useChangeAvatarMutation,
    useChangePasswordMutation,
    useDeleteUserMutation,
    useEditUserMutation,
    useGetUsersQuery,
} = usersApiSlice;
