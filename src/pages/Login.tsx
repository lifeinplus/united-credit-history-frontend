import classNames from "classnames";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLoginUserMutation, setCredentials } from "../features/auth";
import { selectTheme } from "../features/theme";
import { useInput } from "../hooks";
import { isDataMessageError, isFetchBaseQueryError } from "../utils";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(["common", "auth"]);

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const usernameRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("idle");
    const [validated, setValidated] = useState(false);

    const [username, usernameAttributes] = useInput("username", "");
    const [password, setPassword] = useState("");

    const [loginUser] = useLoginUserMutation();

    const from = location.state?.from?.pathname || "/reports";

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);

        if (!form.checkValidity()) return;

        setStatus("loading");
        setTimeout(runLoginUser, 500);
    };

    const runLoginUser = async () => {
        try {
            const response = await loginUser({
                username,
                password,
            }).unwrap();

            dispatch(setCredentials(response));
            setStatus("succeeded");

            if (response.isPasswordChangeRequired) {
                toast.error("You must change your default password.");
                navigate("/change-password", { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setStatus("failed");

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
        <section className={classNames("uch-auth", "w-100")}>
            <h3 className="mb-3 fw-normal">{t("titles.login")}</h3>

            <Form noValidate onSubmit={handleSubmit} validated={validated}>
                <Form.Floating>
                    <Form.Control
                        id="username"
                        placeholder={t("labels.username")}
                        ref={usernameRef}
                        required
                        type="text"
                        {...usernameAttributes}
                    />
                    <Form.Label htmlFor="username">
                        {t("labels.username")}
                    </Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-2">
                    <Form.Control
                        id="password"
                        minLength={8}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("labels.password")}
                        required
                        type="password"
                        value={password}
                    />
                    <Form.Label htmlFor="password">
                        {t("labels.password")}
                    </Form.Label>
                </Form.Floating>

                <Form.Label className="my-3">
                    {t("auth:questions.login")}{" "}
                    <Link className={`uch-link ${theme}`} to={"/register"}>
                        {t("links.login")}
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
                        t("buttons.login")
                    )}
                </Button>
            </Form>
        </section>
    );
};

export default Login;
