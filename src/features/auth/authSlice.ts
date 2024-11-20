import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

const initialState: AuthState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        setAvatarName: (state, action: PayloadAction<string>) => {
            const { avatarVersion: version } = state;
            state.avatarName = action.payload;
            state.avatarVersion = version ? version + 1 : 1;
        },
        setCredentials: (_, action: PayloadAction<AuthState>) => ({
            ...action.payload,
            avatarVersion: 0,
        }),
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectAvatarName: (state) => state.avatarName,
        selectAvatarVersion: (state) => state.avatarVersion,
        selectFirstName: (state) => state.firstName,
        selectLastName: (state) => state.lastName,
        selectIsPasswordChangeRequired: (state) =>
            state.isPasswordChangeRequired,
        selectRoles: (state) => state.roles,
        selectUserId: (state) => state.userId,
        selectUsername: (state) => state.username,
    },
});

export const { logOut, setAvatarName, setCredentials } = authSlice.actions;

export const {
    selectAccessToken,
    selectAvatarName,
    selectAvatarVersion,
    selectFirstName,
    selectLastName,
    selectIsPasswordChangeRequired,
    selectRoles,
    selectUserId,
    selectUsername,
} = authSlice.selectors;
