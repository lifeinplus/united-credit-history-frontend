import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type ModalData = { id?: string } & Partial<User>;

interface ModalDataState {
    closingRefresh: boolean;
    isModalDelete: boolean;
    isModalEdit: boolean;
    modalData: ModalData;
}

const initialState: ModalDataState = {
    closingRefresh: false,
    isModalDelete: false,
    isModalEdit: false,
    modalData: {},
};

const modalDataSlice = createSlice({
    name: "modalData",
    initialState,
    reducers: {
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
        setClosingRefresh: (state, action) => {
            state.closingRefresh = action.payload ?? false;
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
        selectClosingRefresh: (state) => state.closingRefresh,
        selectIsModalDelete: (state) => state.isModalDelete,
        selectIsModalEdit: (state) => state.isModalEdit,
        selectModalData: (state) => state.modalData,
    },
});

export const {
    hideModalDelete,
    hideModalEdit,
    setClosingRefresh,
    setModalData,
    showModalDelete,
    showModalEdit,
} = modalDataSlice.actions;

export const {
    selectClosingRefresh,
    selectIsModalDelete,
    selectIsModalEdit,
    selectModalData,
} = modalDataSlice.selectors;

export default modalDataSlice.reducer;
