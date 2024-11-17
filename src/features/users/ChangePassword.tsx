import classNames from "classnames";
import {
    ChangeEvent,
    FormEvent,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../utils";
import { selectUserId, setCredentials } from "../auth";
import { selectStatus, setStatus } from "../modals";
import { useChangeUserPasswordByIdMutation, type UserId } from ".";

type Field = "currentPassword" | "newPassword";

interface ErrorField {
    difference?: boolean;
    minLength?: boolean;
}

interface ErrorData extends Record<Field, ErrorField> {}

interface FormData extends Record<Field, string> {}

const ChangePassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentPasswordRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const userId = useAppSelector(selectUserId);

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

    useEffect(() => {
        currentPasswordRef.current?.focus();
    }, []);

    const validateForm = () => {
        const newErrors: ErrorData = { ...initialErrorData };

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

            dispatch(setCredentials(response));
            dispatch(setStatus("succeeded"));
            navigate("/reports", { replace: true });
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
        <section className={classNames("uch-change-password", "w-100")}>
            <h3 className="mb-3 fw-normal">{t("titles.changePassword")}</h3>

            <Form noValidate onSubmit={handleSubmit}>
                <Form.Floating className="mb-4">
                    <Form.Control
                        id="currentPassword"
                        isInvalid={errorData.currentPassword.minLength}
                        isValid={formData.currentPassword.length >= 8}
                        onChange={handleFormData}
                        placeholder={t("labels.currentPassword")}
                        ref={currentPasswordRef}
                        type="password"
                        value={formData.currentPassword}
                    />
                    <Form.Label htmlFor="currentPassword">
                        {t("labels.currentPassword")}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">
                        {t("validation:passwordMinLength")}
                    </Form.Control.Feedback>
                </Form.Floating>

                <Form.Floating className="mb-4">
                    <Form.Control
                        id="newPassword"
                        isInvalid={
                            errorData.newPassword.minLength ||
                            errorData.newPassword.difference
                        }
                        isValid={formData.newPassword.length >= 8}
                        onChange={handleFormData}
                        placeholder={t("labels.newPassword")}
                        type="password"
                        value={formData.newPassword}
                    />
                    <Form.Label htmlFor="newPassword">
                        {t("labels.newPassword")}
                    </Form.Label>
                    {errorData.newPassword.minLength && (
                        <Form.Control.Feedback type="invalid">
                            {t("validation:passwordMinLength")}
                        </Form.Control.Feedback>
                    )}
                    {errorData.newPassword.difference && (
                        <Form.Control.Feedback type="invalid">
                            {t("validation:passwordsDifference")}
                        </Form.Control.Feedback>
                    )}
                </Form.Floating>

                <Button
                    className="w-100 py-2"
                    disabled={status === "loading"}
                    type="submit"
                    variant="primary"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("buttons.change")
                    )}
                </Button>
            </Form>
        </section>
    );
};

export default memo(ChangePassword);
