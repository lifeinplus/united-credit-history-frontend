import { useContext } from "react";
import { ModalDataContext } from "../contexts/ModalDataProvider";

const useModal = () => {
    const {
        state: { closingRefresh, isModalDelete, isModalEdit, modalData },
        hideModalEdit,
        hideModalDelete,
        setClosingRefresh,
        setModalData,
        showModalEdit,
        showModalDelete,
    } = useContext(ModalDataContext);

    return {
        closingRefresh,
        isModalDelete,
        isModalEdit,
        modalData,
        hideModalDelete,
        hideModalEdit,
        setClosingRefresh,
        setModalData,
        showModalDelete,
        showModalEdit,
    };
};

export default useModal;
