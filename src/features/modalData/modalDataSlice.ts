import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthState } from "../../types/Auth";
import type { User } from "../../types/User";

interface UserEditModalData extends Pick<AuthState, "userId" | "username"> {
    isResetPassword: boolean;
    roles: string;
    show: boolean;
}

type ModalData = {
    avatar?: File;
    currentPassword?: string;
    newPassword?: string;
    status?: "idle" | "loading" | "failed";
    userId?: string;
} & Partial<Pick<User, "username">>;

interface ModalDataState {
    isChangeAvatarModal: boolean;
    isChangePasswordModal: boolean;
    isDeleteUserModal: boolean;
    userEditModalData: UserEditModalData;
    modalData: ModalData;
}

type ChangeUserPayload = Required<Pick<AuthState, "userId">>;

type DeleteUserPayload = Required<Pick<AuthState, "userId" | "username">>;

const initialState: ModalDataState = {
    isChangeAvatarModal: false,
    isChangePasswordModal: false,
    isDeleteUserModal: false,
    userEditModalData: {
        isResetPassword: false,
        roles: "",
        show: false,
    },
    modalData: {
        currentPassword: "",
        newPassword: "",
        status: "idle",
        username: "",
    },
};

export const modalDataSlice = createSlice({
    name: "modalData",
    initialState,
    reducers: {
        hideChangeAvatarModal: (state) => {
            state.isChangeAvatarModal = false;
            state.modalData = initialState.modalData;
        },
        hideChangePasswordModal: (state) => {
            state.isChangePasswordModal = false;
            state.modalData = initialState.modalData;
        },
        hideDeleteUserModal: (state) => {
            state.isDeleteUserModal = false;
            state.modalData = initialState.modalData;
        },
        hideModal: () => initialState,
        setUserEditModalData: (
            state,
            action: PayloadAction<Partial<UserEditModalData>>
        ) => {
            state.userEditModalData = {
                ...state.userEditModalData,
                ...action.payload,
            };
        },
        setModalData: (state, action: PayloadAction<ModalData>) => {
            if (action.payload) {
                state.modalData = {
                    ...state.modalData,
                    ...action.payload,
                };
            }
        },
        showChangeAvatarModal: (
            state,
            action: PayloadAction<ChangeUserPayload>
        ) => {
            state.isChangeAvatarModal = true;
            state.modalData = action.payload || {};
        },
        showChangePasswordModal: (
            state,
            action: PayloadAction<ChangeUserPayload>
        ) => {
            state.isChangePasswordModal = true;
            state.modalData = action.payload || {};
        },
        showDeleteUserModal: (
            state,
            action: PayloadAction<DeleteUserPayload>
        ) => {
            state.isDeleteUserModal = true;
            state.modalData = action.payload || {};
        },
        showUserEditModal: (state) => {
            state.userEditModalData.show = true;
        },
    },
    selectors: {
        selectIsChangeAvatarModal: (state) => state.isChangeAvatarModal,
        selectIsChangePasswordModal: (state) => state.isChangePasswordModal,
        selectIsDeleteUserModal: (state) => state.isDeleteUserModal,
        selectModalData: (state) => state.modalData,
        selectUserEditModalData: (state) => state.userEditModalData,
    },
});

export const {
    hideChangeAvatarModal,
    hideChangePasswordModal,
    hideDeleteUserModal,
    hideModal,
    setModalData,
    setUserEditModalData,
    showChangeAvatarModal,
    showChangePasswordModal,
    showDeleteUserModal,
    showUserEditModal,
} = modalDataSlice.actions;

export const {
    selectIsChangeAvatarModal,
    selectIsChangePasswordModal,
    selectIsDeleteUserModal,
    selectModalData,
    selectUserEditModalData,
} = modalDataSlice.selectors;
