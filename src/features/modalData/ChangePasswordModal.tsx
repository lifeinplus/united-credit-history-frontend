import { memo } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import { useChangeUserPasswordByIdMutation } from "../users/usersApiSlice";

import {
    hideChangePasswordModal,
    selectIsChangePasswordModal,
    selectModalData,
    setModalData,
} from "./modalDataSlice";

const ChangePasswordModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const isChangePasswordModal = useAppSelector(selectIsChangePasswordModal);
    const modalData = useAppSelector(selectModalData);

    const {
        currentPassword = "",
        newPassword = "",
        status,
        userId,
    } = modalData;

    const [changeUserPasswordById] = useChangeUserPasswordByIdMutation();

    const handleHide = () => {
        dispatch(hideChangePasswordModal());
    };

    const handleSave = () => {
        if (!userId) return;

        dispatch(setModalData({ status: "loading" }));

        const runChangePassword = async () => {
            try {
                const response = await changeUserPasswordById({
                    id: userId,
                    currentPassword,
                    newPassword,
                }).unwrap();

                toast.success(response.message);
                handleHide();
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

        setTimeout(runChangePassword, 500);
    };

    return (
        <Modal show={isChangePasswordModal} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.changePassword")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="currentPassword" className="mb-3">
                        <Form.Label>{t("label.currentPassword")}</Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={(e) =>
                                dispatch(
                                    setModalData({
                                        currentPassword: e.target.value,
                                    })
                                )
                            }
                            type="password"
                            value={currentPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>{t("label.newPassword")}</Form.Label>
                        <Form.Control
                            onChange={(e) =>
                                dispatch(
                                    setModalData({
                                        newPassword: e.target.value,
                                    })
                                )
                            }
                            type="password"
                            value={newPassword}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide} variant="secondary">
                    {t("button.cancel")}
                </Button>
                <Button
                    disabled={status === "loading"}
                    onClick={handleSave}
                    variant="primary"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("button.save")
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(ChangePasswordModal);
