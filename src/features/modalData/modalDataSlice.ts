import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { axiosPrivate } from "../../api/axios";

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

export const deleteUser = createAsyncThunk(
    "modalData/deleteUser",
    async ({ id }: ModalData) => {
        try {
            const response = await axiosPrivate.delete(
                `/users/deleteById/${id}`
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    "modalData/update",
    async ({ id, roles }: ModalData) => {
        try {
            const response = await axiosPrivate.put(`/users/updateById`, {
                id,
                roles,
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

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
    extraReducers(builder) {
        builder.addCase(updateUser.fulfilled, (state) => {
            state.closingRefresh = true;
            state.isModalEdit = false;
        });
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.closingRefresh = true;
            state.isModalDelete = false;
        });
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
