import classNames from "classnames";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { useRegisterUserMutation } from "../features/auth";
import { selectTheme } from "../features/theme";
import { useInput } from "../hooks";
import { isDataMessageError, isFetchBaseQueryError } from "../services/helpers";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["auth"]);

    const theme = useAppSelector(selectTheme);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("idle");
    const [validated, setValidated] = useState(false);

    const [firstName, firstNameAttributes] = useInput("firstName", "");
    const [lastName, lastNameAttributes] = useInput("lastName", "");
    const [username, usernameAttributes] = useInput("username", "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        setStatus("loading");

        const runRegisterUser = async () => {
            try {
                const response = await registerUser({
                    firstName,
                    lastName,
                    username,
                    password,
                    confirmPassword,
                }).unwrap();

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
                                id="floatingFirstName"
                                placeholder={t("labels.firstName")}
                                ref={firstNameRef}
                                required
                                type="text"
                                {...firstNameAttributes}
                            />
                            <Form.Label htmlFor="floatingFirstName">
                                {t("labels.firstName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="floatingLastName"
                                placeholder={t("labels.lastName")}
                                required
                                type="text"
                                {...lastNameAttributes}
                            />
                            <Form.Label htmlFor="floatingLastName">
                                {t("labels.lastName")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                </Row>

                <Form.Floating>
                    <Form.Control
                        id="floatingUsername"
                        placeholder={t("labels.username")}
                        required
                        type="text"
                        {...usernameAttributes}
                    />
                    <Form.Label htmlFor="floatingUsername">
                        {t("labels.username")}
                    </Form.Label>
                </Form.Floating>

                <Row className="mt-4">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPassword"
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("labels.password")}
                                required
                                type="password"
                                value={password}
                            />
                            <Form.Label htmlFor="floatingPassword">
                                {t("labels.password")}
                            </Form.Label>
                        </Form.Floating>
                    </Col>
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="floatingConfirmPassword"
                                minLength={8}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder={t("labels.confirmPassword")}
                                required
                                type="password"
                                value={confirmPassword}
                            />
                            <Form.Label htmlFor="floatingConfirmPassword">
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
