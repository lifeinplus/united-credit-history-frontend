import { ChangeEvent, memo, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../utils";
import { useChangeUserPasswordByIdMutation, type UserId } from "../users";
import {
    hideModals,
    selectStatus,
    selectPasswordChangeData,
    setStatus,
} from ".";

type Field = "currentPassword" | "newPassword";

interface ErrorField {
    difference?: boolean;
    minLength?: boolean;
}

interface ErrorData extends Record<Field, ErrorField> {}

interface FormData extends Record<Field, string> {}

const PasswordChangeModal = () => {
    const { t } = useTranslation(["modal", "validation"]);

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { show, userId } = useAppSelector(selectPasswordChangeData);

    const initialFormData: FormData = {
        currentPassword: "",
        newPassword: "",
    };

    const initialErrorData: ErrorData = {
        currentPassword: {},
        newPassword: {},
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errorData, setErrorData] = useState<ErrorData>(initialErrorData);

    const [changeUserPasswordById] = useChangeUserPasswordByIdMutation();

    const validateForm = () => {
        const newErrors: ErrorData = initialErrorData;

        if (formData.currentPassword.length < 8) {
            newErrors.currentPassword.minLength = true;
        }

        if (formData.newPassword.length < 8) {
            newErrors.newPassword.minLength = true;
        }

        if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword.difference = true;
        }

        setErrorData(newErrors);

        return Object.values<ErrorField>(newErrors).every(
            (item) => Object.keys(item).length === 0
        );
    };

    const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrorData({ ...errorData, [id]: {} });
    };

    const handleHide = () => {
        setFormData(initialFormData);
        setErrorData(initialErrorData);
        dispatch(hideModals());
    };

    const handleSave = () => {
        if (!validateForm()) return;

        try {
            const verifiedUserId = ensureUserId(userId);
            dispatch(setStatus("loading"));
            setTimeout(() => runChangePassword(verifiedUserId), 500);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const runChangePassword = async (id: UserId) => {
        try {
            const response = await changeUserPasswordById({
                id,
                ...formData,
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
                            isInvalid={!!errorData.currentPassword.minLength}
                            isValid={formData.currentPassword.length >= 8}
                            onChange={handleFormData}
                            type="password"
                            value={formData.currentPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {t("passwordMinLength", { ns: "validation" })}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>{t("label.newPassword")}</Form.Label>
                        <Form.Control
                            isInvalid={
                                !!errorData.newPassword.minLength ||
                                !!errorData.newPassword.difference
                            }
                            isValid={formData.newPassword.length >= 8}
                            onChange={handleFormData}
                            type="password"
                            value={formData.newPassword}
                        />
                        {errorData.newPassword.minLength && (
                            <Form.Control.Feedback type="invalid">
                                {t("passwordMinLength", { ns: "validation" })}
                            </Form.Control.Feedback>
                        )}
                        {errorData.newPassword.difference && (
                            <Form.Control.Feedback type="invalid">
                                {t("passwordsDifference", { ns: "validation" })}
                            </Form.Control.Feedback>
                        )}
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
