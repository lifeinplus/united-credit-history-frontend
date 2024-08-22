import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/Auth";

const initialState: AuthState = {};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.accessToken = undefined;
            state.roles = undefined;
            state.userName = undefined;
        },
        setCredentials: (state, action) => {
            const { accessToken, roles, userName } = action.payload;
            state.accessToken = accessToken;
            state.roles = roles;
            state.userName = userName;
        },
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectRoles: (state) => state.roles,
        selectUserName: (state) => state.userName,
    },
});

export const { logOut, setCredentials } = authSlice.actions;

export const { selectAccessToken, selectRoles, selectUserName } =
    authSlice.selectors;

export default authSlice.reducer;