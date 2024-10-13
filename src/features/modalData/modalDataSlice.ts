import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type ModalData = {
    avatar?: File;
    currentPassword: string;
    newPassword: string;
    status?: "idle" | "loading" | "failed";
} & Partial<User>;

interface ModalDataState {
    isChangeAvatarModal: boolean;
    isChangePasswordModal: boolean;
    isDeleteUserModal: boolean;
    isEditUserModal: boolean;
    modalData: ModalData;
}

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
        },
        hideEditUserModal: (state) => {
            state.isEditUserModal = false;
        },
        setModalData: (state, action) => {
            if (action.payload) {
                state.modalData = {
                    ...state.modalData,
                    ...action.payload,
                };
            }
        },
        showChangeAvatarModal: (state, action) => {
            state.isChangeAvatarModal = true;

            if (action.payload) {
                state.modalData = {
                    ...state.modalData,
                    ...action.payload,
                };
            }
        },
        showChangePasswordModal: (state, action) => {
            state.isChangePasswordModal = true;

            if (action.payload) {
                state.modalData = {
                    ...state.modalData,
                    ...action.payload,
                };
            }
        },
        showDeleteUserModal: (state, action) => {
            state.modalData = action.payload ?? {};
            state.isDeleteUserModal = true;
        },
        showEditUserModal: (state, action) => {
            state.modalData = action.payload ?? {};
            state.isEditUserModal = true;
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
