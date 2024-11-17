import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface AvatarChangeData extends Pick<AuthState, "userId"> {
    show: boolean;
}

interface PasswordChangeData extends Pick<AuthState, "userId"> {
    show: boolean;
}

interface UserDeleteData extends Pick<AuthState, "userId" | "username"> {
    show: boolean;
}

interface UserEditData extends Pick<AuthState, "userId" | "username"> {
    isResetPassword: boolean;
    roles: string;
    show: boolean;
}

interface ModalsState {
    avatarChangeData: AvatarChangeData;
    passwordChangeData: PasswordChangeData;
    status: Status;
    userDeleteData: UserDeleteData;
    userEditData: UserEditData;
}

const initialState: ModalsState = {
    avatarChangeData: {
        show: false,
    },
    passwordChangeData: {
        show: false,
    },
    status: "idle",
    userDeleteData: {
        show: false,
    },
    userEditData: {
        isResetPassword: false,
        roles: "",
        show: false,
    },
};

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        hideModals: () => initialState,
        setAvatarChangeData: (
            state,
            action: PayloadAction<Partial<AvatarChangeData>>
        ) => {
            state.avatarChangeData = {
                ...state.avatarChangeData,
                ...action.payload,
            };
        },
        setPasswordChangeData: (
            state,
            action: PayloadAction<Partial<PasswordChangeData>>
        ) => {
            state.passwordChangeData = {
                ...state.passwordChangeData,
                ...action.payload,
            };
        },
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setUserDeleteData: (
            state,
            action: PayloadAction<Partial<UserDeleteData>>
        ) => {
            state.userDeleteData = {
                ...state.userDeleteData,
                ...action.payload,
            };
        },
        setUserEditData: (
            state,
            action: PayloadAction<Partial<UserEditData>>
        ) => {
            state.userEditData = {
                ...state.userEditData,
                ...action.payload,
            };
        },
        showAvatarChangeModal: (state) => {
            state.avatarChangeData.show = true;
        },
        showPasswordChangeModal: (state) => {
            state.passwordChangeData.show = true;
        },
        showUserDeleteModal: (state) => {
            state.userDeleteData.show = true;
        },
        showUserEditModal: (state) => {
            state.userEditData.show = true;
        },
    },
    selectors: {
        selectAvatarChangeData: (state) => state.avatarChangeData,
        selectPasswordChangeData: (state) => state.passwordChangeData,
        selectStatus: (state) => state.status,
        selectUserDeleteData: (state) => state.userDeleteData,
        selectUserEditData: (state) => state.userEditData,
    },
});

export const {
    hideModals,
    setAvatarChangeData,
    setPasswordChangeData,
    setStatus,
    setUserDeleteData,
    setUserEditData,
    showAvatarChangeModal,
    showPasswordChangeModal,
    showUserDeleteModal,
    showUserEditModal,
} = modalsSlice.actions;

export const {
    selectAvatarChangeData,
    selectPasswordChangeData,
    selectStatus,
    selectUserDeleteData,
    selectUserEditData,
} = modalsSlice.selectors;
