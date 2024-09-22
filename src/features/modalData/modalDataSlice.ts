import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type ModalData = {
    currentPassword: string;
    newPassword: string;
    status?: "idle" | "loading" | "failed";
} & Partial<User>;

interface ModalDataState {
    isChangePasswordModal: boolean;
    isModalDelete: boolean;
    isModalEdit: boolean;
    modalData: ModalData;
}

const initialState: ModalDataState = {
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
        selectIsChangePasswordModal: (state) => state.isChangePasswordModal,
        selectIsModalDelete: (state) => state.isModalDelete,
        selectIsModalEdit: (state) => state.isModalEdit,
        selectModalData: (state) => state.modalData,
    },
});

export const {
    hideChangePasswordModal,
    hideModalDelete,
    hideModalEdit,
    setModalData,
    showChangePasswordModal,
    showModalDelete,
    showModalEdit,
} = modalDataSlice.actions;

export const {
    selectIsChangePasswordModal,
    selectIsModalDelete,
    selectIsModalEdit,
    selectModalData,
} = modalDataSlice.selectors;
