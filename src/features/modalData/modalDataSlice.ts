import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthState } from "../../types/Auth";
import type { User } from "../../types/User";

type ModalData = {
    avatar?: File;
    currentPassword?: string;
    newPassword?: string;
    status?: "idle" | "loading" | "failed";
} & Partial<User>;

interface ModalDataState {
    isChangeAvatarModal: boolean;
    isChangePasswordModal: boolean;
    isDeleteUserModal: boolean;
    isEditUserModal: boolean;
    modalData: ModalData;
}

type ChangeUserPayload = Required<Pick<AuthState, "userId">>;

type DeleteUserPayload = Required<Pick<AuthState, "userId" | "userName">>;

type EditUserPayload = { roles: string } & Required<
    Pick<AuthState, "userId" | "userName">
>;

const initialState: ModalDataState = {
    isChangeAvatarModal: false,
    isChangePasswordModal: false,
    isDeleteUserModal: false,
    isEditUserModal: false,
    modalData: {
        id: "",
        currentPassword: "",
        newPassword: "",
        status: "idle",
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
        hideEditUserModal: (state) => {
            state.isEditUserModal = false;
            state.modalData = initialState.modalData;
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
        showEditUserModal: (state, action: PayloadAction<EditUserPayload>) => {
            state.isEditUserModal = true;
            state.modalData = action.payload || {};
        },
    },
    selectors: {
        selectIsChangeAvatarModal: (state) => state.isChangeAvatarModal,
        selectIsChangePasswordModal: (state) => state.isChangePasswordModal,
        selectIsDeleteUserModal: (state) => state.isDeleteUserModal,
        selectIsEditUserModal: (state) => state.isEditUserModal,
        selectModalData: (state) => state.modalData,
    },
});

export const {
    hideChangeAvatarModal,
    hideChangePasswordModal,
    hideDeleteUserModal,
    hideEditUserModal,
    setModalData,
    showChangeAvatarModal,
    showChangePasswordModal,
    showDeleteUserModal,
    showEditUserModal,
} = modalDataSlice.actions;

export const {
    selectIsChangeAvatarModal,
    selectIsChangePasswordModal,
    selectIsDeleteUserModal,
    selectIsEditUserModal,
    selectModalData,
} = modalDataSlice.selectors;
