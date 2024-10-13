import { memo } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import { useDeleteUserMutation } from "../users/usersApiSlice";

import {
    hideDeleteUserModal,
    selectIsDeleteUserModal,
    selectModalData,
    setModalData,
} from "./modalDataSlice";

const DeleteUserModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const isDeleteUserModal = useAppSelector(selectIsDeleteUserModal);
    const modalData = useAppSelector(selectModalData);

    const { _id, status, userName } = modalData;

    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async () => {
        if (!_id) return;

        dispatch(setModalData({ status: "loading" }));

        const runDeleteUser = async () => {
            try {
                await deleteUser({ id: _id }).unwrap();
                dispatch(hideDeleteUserModal());
            } catch (error) {
                dispatch(setModalData({ status: "failed" }));

                if (isDataMessageError(error)) {
                    toast.error(error.data.message);
                } else if (isFetchBaseQueryError(error)) {
                    const errMsg =
                        "error" in error
                            ? error.error
                            : JSON.stringify(error.data);
                    toast.error(errMsg);
                } else {
                    console.error(error);
                }
            }
        };

        setTimeout(runDeleteUser, 500);
    };

    return (
        <Modal
            show={isDeleteUserModal}
            onHide={() => dispatch(hideDeleteUserModal())}
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
                    onClick={() => dispatch(hideDeleteUserModal())}
                    variant="secondary"
                >
                    {t("button.cancel")}
                </Button>
                <Button
                    disabled={status === "loading"}
                    onClick={handleDelete}
                    variant="danger"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("button.delete")
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(DeleteUserModal);
