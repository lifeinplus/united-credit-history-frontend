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

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["auth"]);

    const theme = useAppSelector(selectTheme);
    const [username, setUsername] = useLocalStorage("username", "");

    const firstNameRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("idle");
    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: username || "",
        password: "",
        confirmPassword: "",
    });

    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };

        if (id === "firstName" || id === "lastName") {
            newFormData.username = [newFormData.firstName, newFormData.lastName]
                .filter(Boolean)
                .join(".")
                .toLowerCase();
        }

        setFormData(newFormData);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        setStatus("loading");
        setUsername(formData.username);

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
        <section className={classNames("uch-register", "my-10", "m-auto")}>
            <h1 className="h3 mb-3 fw-normal">{t("titles.register")}</h1>
            <Form
                className={validated ? "was-validated" : undefined}
                noValidate
                onSubmit={handleSubmit}
            >
                <Row className="mb-4">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="firstName"
                                onChange={handleFormData}
                                placeholder={t("labels.firstName")}
                                ref={firstNameRef}
                                required
                                type="text"
                                value={formData.firstName}
                            />
                            <Form.Label htmlFor="firstName">
                                {t("labels.firstName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="lastName"
                                onChange={handleFormData}
                                placeholder={t("labels.lastName")}
                                required
                                type="text"
                                value={formData.lastName}
                            />
                            <Form.Label htmlFor="lastName">
                                {t("labels.lastName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                </Row>

                <Form.Floating>
                    <Form.Control
                        id="username"
                        onChange={handleFormData}
                        placeholder={t("labels.username")}
                        required
                        type="text"
                        value={formData.username}
                    />
                    <Form.Label htmlFor="username">
                        {t("labels.username")}
                    </Form.Label>
                </Form.Floating>

                <Row className="mt-4">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="password"
                                minLength={8}
                                onChange={handleFormData}
                                placeholder={t("labels.password")}
                                required
                                type="password"
                                value={formData.password}
                            />
                            <Form.Label htmlFor="password">
                                {t("labels.password")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="confirmPassword"
                                minLength={8}
                                onChange={handleFormData}
                                placeholder={t("labels.confirmPassword")}
                                required
                                type="password"
                                value={formData.confirmPassword}
                            />
                            <Form.Label htmlFor="confirmPassword">
                                {t("labels.confirmPassword")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                </Row>

                <Form.Label className="my-3">
                    {t("questions.register")}{" "}
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
