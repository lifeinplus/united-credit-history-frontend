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
import { isDataMessageError, isFetchBaseQueryError } from "../services/helpers";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(["auth"]);

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
        setValidated(true);
        setStatus("loading");

        const runLoginUser = async () => {
            try {
                const response = await loginUser({
                    username,
                    password,
                }).unwrap();

                dispatch(setCredentials(response));
                setStatus("succeeded");
                navigate(from, { replace: true });
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

        setTimeout(runLoginUser, 500);
    };

    return (
        <section className={classNames("uch-auth", "my-10", "m-auto")}>
            <h1 className="h3 mb-3 fw-normal">{t("titles.login")}</h1>
            <Form
                className={validated ? "was-validated" : undefined}
                noValidate
                onSubmit={handleSubmit}
            >
                <Form.Floating>
                    <Form.Control
                        id="floatingUsername"
                        placeholder={t("labels.username")}
                        ref={usernameRef}
                        required
                        type="text"
                        {...usernameAttributes}
                    />
                    <Form.Label htmlFor="floatingUsername">
                        {t("labels.username")}
                    </Form.Label>
                </Form.Floating>

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

                <Form.Label className="my-3">
                    {t("questions.login")}{" "}
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
