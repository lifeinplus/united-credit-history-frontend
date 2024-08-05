import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAxiosPrivate, useModal } from "../../hooks";

const ModalDelete = () => {
    const { t } = useTranslation("modal");
    const axiosPrivate = useAxiosPrivate();

    const { isModalDelete, modalData, hideModalDelete, setClosingRefresh } =
        useModal();

    const { _id, userName } = modalData;

    const handleDelete = () => {
        if (!_id) return;

        axiosPrivate
            .delete(`/users/deleteById/${_id}`)
            .then(() => {
                setClosingRefresh(true);
                hideModalDelete();
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <Modal show={isModalDelete} onHide={hideModalDelete} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.delete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t("message.delete", { userName })}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hideModalDelete} variant="secondary">
                    {t("button.cancel")}
                </Button>
                <Button onClick={handleDelete} variant="danger">
                    {t("button.delete")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;
