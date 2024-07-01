import { Dispatch, SetStateAction } from "react";

export interface ModalData extends Record<string, string | number> {}

export interface ModalDataContext {
    modalData: ModalData;
    setModalData: Dispatch<SetStateAction<ModalData>>;
}
