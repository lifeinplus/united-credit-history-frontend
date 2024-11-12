import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

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
        selectAvatarName: (state) => state.avatarName,
        selectFirstName: (state) => state.firstName,
        selectLastName: (state) => state.lastName,
        selectRoles: (state) => state.roles,
        selectUserId: (state) => state.userId,
        selectUsername: (state) => state.username,
    },
});

export const { logOut, setCredentials } = authSlice.actions;

export const {
    selectAccessToken,
    selectAvatarName,
    selectFirstName,
    selectLastName,
    selectRoles,
    selectUserId,
    selectUsername,
} = authSlice.selectors;
