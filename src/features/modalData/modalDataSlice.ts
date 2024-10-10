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
    isModalDelete: boolean;
    isModalEdit: boolean;
    modalData: ModalData;
}

const initialState: ModalDataState = {
    isChangeAvatarModal: false,
    isChangePasswordModal: false,
    isModalDelete: false,
    isModalEdit: false,
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
        hideModalDelete: (state) => {
            state.isModalDelete = false;
        },
        hideModalEdit: (state) => {
            state.isModalEdit = false;
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
        showModalDelete: (state, action) => {
            state.modalData = action.payload ?? {};
            state.isModalDelete = true;
        },
        showModalEdit: (state, action) => {
            state.modalData = action.payload ?? {};
            state.isModalEdit = true;
        },
    },
    selectors: {
        selectIsChangeAvatarModal: (state) => state.isChangeAvatarModal,
        selectIsChangePasswordModal: (state) => state.isChangePasswordModal,
        selectIsModalDelete: (state) => state.isModalDelete,
        selectIsModalEdit: (state) => state.isModalEdit,
        selectModalData: (state) => state.modalData,
    },
});

export const {
    hideChangeAvatarModal,
    hideChangePasswordModal,
    hideModalDelete,
    hideModalEdit,
    setModalData,
    showChangeAvatarModal,
    showChangePasswordModal,
    showModalDelete,
    showModalEdit,
} = modalDataSlice.actions;

export const {
    selectIsChangeAvatarModal,
    selectIsChangePasswordModal,
    selectIsModalDelete,
    selectIsModalEdit,
    selectModalData,
} = modalDataSlice.selectors;
