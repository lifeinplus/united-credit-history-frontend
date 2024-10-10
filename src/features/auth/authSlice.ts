import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/Auth";

const initialState: AuthState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        setCredentials: (_, action) => action.payload,
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectAvatarPath: (state) => state.avatarPath,
        selectRoles: (state) => state.roles,
        selectUserId: (state) => state.userId,
        selectUserName: (state) => state.userName,
    },
});

export const { logOut, setCredentials } = authSlice.actions;

export const {
    selectAccessToken,
    selectAvatarPath,
    selectRoles,
    selectUserId,
    selectUserName,
} = authSlice.selectors;
