import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { useDeleteUserMutation } from "../users/usersApiSlice";

import {
    hideModalDelete,
    selectIsModalDelete,
    selectModalData,
} from "./modalDataSlice";

const ModalDelete = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const isModalDelete = useAppSelector(selectIsModalDelete);
    const modalData = useAppSelector(selectModalData);

    const { _id, userName } = modalData;

    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async () => {
        if (!_id) return;

        try {
            await deleteUser({ id: _id }).unwrap();
            dispatch(hideModalDelete());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={isModalDelete}
            onHide={() => dispatch(hideModalDelete())}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{t("title.delete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t("message.delete", { userName })}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => dispatch(hideModalDelete())}
                    variant="secondary"
                >
                    {t("button.cancel")}
                </Button>
                <Button onClick={handleDelete} variant="danger">
                    {t("button.delete")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(ModalDelete);
