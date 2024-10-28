import { memo } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import { useDeleteUserByIdMutation, type UserId } from "../users";

import { hideModals, selectStatus, selectUserDeleteData, setStatus } from ".";

const UserDeleteModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { show, userId, username } = useAppSelector(selectUserDeleteData);

    const [deleteUserById] = useDeleteUserByIdMutation();

    const handleHide = () => {
        dispatch(hideModals());
    };

    const handleDelete = async () => {
        try {
            const verifiedUserId = ensureUserId(userId);
            dispatch(setStatus("loading"));
            setTimeout(() => deleteUser(verifiedUserId), 500);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const deleteUser = async (id: UserId) => {
        try {
            const response = await deleteUserById(id).unwrap();
            toast.success(response.message);
            handleHide();
        } catch (error) {
            dispatch(setStatus("failed"));

            if (isDataMessageError(error)) {
                toast.error(error.data.message);
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    "error" in error ? error.error : JSON.stringify(error.data);
                toast.error(errMsg);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.delete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t("message.delete", { username })}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide} variant="secondary">
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

export default memo(UserDeleteModal);
