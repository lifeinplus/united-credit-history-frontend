import { apiSlice } from "../../app/api/apiSlice";

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
            query: ({ limit, page }) =>
                `users/getPaginated?page=${page}&limit=${limit}`,
            keepUnusedDataFor: 5,
        }),
        updateUser: build.mutation<void, UsersQueryArg>({
            query: (arg) => ({
                url: "users/updateById",
                method: "PUT",
                body: { ...arg },
            }),
        }),
        deleteUser: build.mutation<void, UsersQueryArg>({
            query: ({ id }) => ({
                url: `users/deleteById/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} = usersApiSlice;
