import { apiSlice } from "../api/apiSlice";

import type {
    PaginationQueryArg,
    PaginationResult,
} from "../../types/Pagination";

interface UsersQueryArg {
    id: string;
    roles?: string;
}

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<PaginationResult, PaginationQueryArg>({
            query: ({ limit, page, searchValue, sortOrder, sortSysName }) =>
                `users/getPaginated?page=${page}&limit=${limit}&search=${searchValue}&sort=${sortSysName}&order=${sortOrder}`,
            keepUnusedDataFor: 5,
            providesTags: ["Users"],
        }),
        updateUser: build.mutation<void, UsersQueryArg>({
            query: (arg) => ({
                url: "users/updateById",
                method: "PUT",
                body: { ...arg },
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: build.mutation<void, UsersQueryArg>({
            query: ({ id }) => ({
                url: `users/deleteById/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} = usersApiSlice;
