import { ChangeEvent, memo } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import {
    useChangeUserPasswordByIdMutation,
    type UserId,
} from "../users/usersApiSlice";

import {
    hideModals,
    selectStatus,
    selectPasswordChangeData,
    setStatus,
    setPasswordChangeData,
} from "./modalsSlice";

const PasswordChangeModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { currentPassword, newPassword, show, userId } = useAppSelector(
        selectPasswordChangeData
    );

    const [changeUserPasswordById] = useChangeUserPasswordByIdMutation();

    const handleCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setPasswordChangeData({
                currentPassword: e.target.value,
            })
        );
    };

    const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setPasswordChangeData({
                newPassword: e.target.value,
            })
        );
    };

    const handleHide = () => {
        dispatch(hideModals());
    };

    const handleSave = () => {
        try {
            const verifiedUserId = ensureUserId(userId);
            dispatch(setStatus("loading"));
            setTimeout(() => changePassword(verifiedUserId), 500);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const changePassword = async (id: UserId) => {
        try {
            const response = await changeUserPasswordById({
                id,
                currentPassword,
                newPassword,
            }).unwrap();

            toast.success(response.message);
            handleHide();
        } catch (error) {
            dispatch(setStatus("failed"));
            console.error(error);

            if (isDataMessageError(error)) {
                toast.error(error.data.message);
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    "error" in error ? error.error : JSON.stringify(error.data);
                toast.error(errMsg);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.changePassword")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="currentPassword" className="mb-3">
                        <Form.Label>{t("label.currentPassword")}</Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={handleCurrentPassword}
                            type="password"
                            value={currentPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>{t("label.newPassword")}</Form.Label>
                        <Form.Control
                            onChange={handleNewPassword}
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

export default memo(PasswordChangeModal);
