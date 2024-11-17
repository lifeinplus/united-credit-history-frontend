import classNames from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { useRegisterUserMutation } from "../features/auth";
import { selectTheme } from "../features/theme";
import { useLocalStorage } from "../hooks";
import { isDataMessageError, isFetchBaseQueryError } from "../utils";

type Field =
    | "firstName"
    | "lastName"
    | "username"
    | "password"
    | "confirmPassword";

interface ErrorData extends Partial<Record<Field, boolean>> {}

interface FormData extends Record<Field, string> {}

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["common", "auth", "validation"]);

    const theme = useAppSelector(selectTheme);
    const [storageUsername, setStorageUsername] = useLocalStorage(
        "username",
        ""
    );

    const firstNameRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("idle");
    const [errorData, setErrorData] = useState<ErrorData>({});

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        username: storageUsername || "",
        password: "",
        confirmPassword: "",
    });

    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    const validateForm = () => {
        const newErrors: ErrorData = {};

        const validateField = (field: Field) => {
            if (!formData[field]) newErrors[field] = true;
        };

        validateField("firstName");
        validateField("lastName");
        validateField("username");

        if (formData.password.length < 8) {
            newErrors.password = true;
        }

        if (
            !formData.confirmPassword ||
            formData.confirmPassword !== formData.password
        ) {
            newErrors.confirmPassword = true;
        }

        setErrorData(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };

        if (id === "firstName" || id === "lastName") {
            const newUsername = [newFormData.firstName, newFormData.lastName]
                .filter(Boolean)
                .join(".")
                .toLowerCase();

            newFormData.username = newUsername;
            setErrorData((prev) => ({ ...prev, username: false }));
        }

        setFormData(newFormData);
        setErrorData((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus("loading");
        setStorageUsername(formData.username);

        const runRegisterUser = async () => {
            try {
                const response = await registerUser(formData).unwrap();

                toast.success(response.message);
                setStatus("succeeded");
                navigate("/login");
            } catch (error) {
                setStatus("failed");

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

        setTimeout(runRegisterUser, 500);
    };

    return (
        <section className={classNames("uch-register", "w-100")}>
            <h3 className="mb-3 fw-normal">{t("titles.register")}</h3>

            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-4">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="firstName"
                                isInvalid={errorData.firstName}
                                isValid={!!formData.firstName}
                                onChange={handleFormData}
                                placeholder={t("labels.firstName")}
                                ref={firstNameRef}
                                type="text"
                                value={formData.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("validation:firstNameRequired")}
                            </Form.Control.Feedback>
                            <Form.Label htmlFor="firstName">
                                {t("labels.firstName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="lastName"
                                isInvalid={errorData.lastName}
                                isValid={!!formData.lastName}
                                onChange={handleFormData}
                                placeholder={t("labels.lastName")}
                                type="text"
                                value={formData.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {t("validation:lastNameRequired")}
                            </Form.Control.Feedback>
                            <Form.Label htmlFor="lastName">
                                {t("labels.lastName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                </Row>

                <Form.Floating>
                    <Form.Control
                        id="username"
                        isInvalid={errorData.username}
                        isValid={!!formData.username}
                        onChange={handleFormData}
                        placeholder={t("labels.username")}
                        type="text"
                        value={formData.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {t("validation:usernameRequired")}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="username">
                        {t("labels.username")}
                    </Form.Label>
                </Form.Floating>

                <Row className="mt-4 mb-2">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="password"
                                isInvalid={errorData.password}
                                isValid={formData.password.length >= 8}
                                onChange={handleFormData}
                                placeholder={t("labels.password")}
                                type="password"
                                value={formData.password}
                            />
                            <Form.Label htmlFor="password">
                                {t("labels.password")}
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {t("validation:passwordMinLength")}
                            </Form.Control.Feedback>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="confirmPassword"
                                isInvalid={errorData.confirmPassword}
                                isValid={formData.confirmPassword.length >= 8}
                                onChange={handleFormData}
                                placeholder={t("labels.confirmPassword")}
                                type="password"
                                value={formData.confirmPassword}
                            />
                            <Form.Label htmlFor="confirmPassword">
                                {t("labels.confirmPassword")}
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {t("validation:passwordsMatch")}
                            </Form.Control.Feedback>
                        </Form.Floating>
                    </Col>
                </Row>

                <Form.Label className="my-3">
                    {t("auth:questions.register")}{" "}
                    <Link className={`uch-link ${theme}`} to={"/login"}>
                        {t("links.register")}
                    </Link>
                </Form.Label>

                <Button
                    className="w-100 py-2"
                    disabled={status === "loading"}
                    type="submit"
                    variant="primary"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("buttons.register")
                    )}
                </Button>
            </Form>
        </section>
    );
};

export default Register;
