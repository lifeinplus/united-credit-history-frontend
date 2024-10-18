import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { selectTheme } from "../features/theme/themeSlice";
import { useInput } from "../hooks";
import { isDataMessageError, isFetchBaseQueryError } from "../services/helpers";
import type { AuthSubmitHandler } from "../types/Auth";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["auth"]);

    const theme = useAppSelector(selectTheme);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const [validated, setValidated] = useState(false);

    const [firstName, firstNameAttributes] = useInput("firstName", "");
    const [lastName, lastNameAttributes] = useInput("lastName", "");
    const [userName, userNameAttributes] = useInput("userName", "");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [register] = useRegisterMutation();

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    const handleSubmit: AuthSubmitHandler = async (userName, password) => {
        try {
            const response = await register({ userName, password }).unwrap();
            toast.success(response.message);
            navigate("/login");
        } catch (err) {
            if (isDataMessageError(err)) {
                toast.error(err.data.message);
            } else if (isFetchBaseQueryError(err)) {
                const errMsg =
                    "error" in err ? err.error : JSON.stringify(err.data);
                toast.error(errMsg);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <section className={classNames("uch-register", "my-10", "m-auto")}>
            <h1 className="h3 mb-3 fw-normal">{t("titles.register")}</h1>
            <Form
                className={validated ? "was-validated" : undefined}
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    setValidated(true);
                    handleSubmit(userName, password);
                }}
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
                        placeholder={t("labels.userName")}
                        required
                        type="text"
                        {...userNameAttributes}
                    />
                    <Form.Label htmlFor="floatingUsername">
                        {t("labels.userName")}
                    </Form.Label>
                </Form.Floating>

                <Row className="mt-4">
                    <Col>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPassword"
                                minLength={4}
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
                                id="floatingRepeatPassword"
                                minLength={4}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                                placeholder={t("labels.repeatPassword")}
                                required
                                type="password"
                                value={repeatPassword}
                            />
                            <Form.Label htmlFor="floatingRepeatPassword">
                                {t("labels.repeatPassword")}
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

                <Button className="w-100 py-2" variant="primary" type="submit">
                    {t("buttons.register")}
                </Button>
            </Form>
        </section>
    );
};

export default Register;
