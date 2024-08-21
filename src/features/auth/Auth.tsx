import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { useInput } from "../../hooks";
import type { AuthProps } from "../../types/Auth";

import { selectTheme } from "../theme/themeSlice";

const Auth = ({ buttonText, handleSubmit, question, title }: AuthProps) => {
    const theme = useAppSelector(selectTheme);
    const { t } = useTranslation(["auth"]);
    const userNameRef = useRef<HTMLInputElement>(null);
    const [validated, setValidated] = useState(false);

    const [userName, userNameAttributes] = useInput("userName", "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        userNameRef.current?.focus();
    }, []);

    return (
        <section className={classNames("uch-auth", "my-10", "m-auto")}>
            <h1 className="h3 mb-3 fw-normal">{title}</h1>
            <form
                className={validated ? "was-validated" : undefined}
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    setValidated(true);
                    handleSubmit(userName, password);
                }}
            >
                <div className="form-floating">
                    <input
                        id="floatingUserName"
                        className="form-control"
                        placeholder={t("userName")}
                        ref={userNameRef}
                        required
                        type="text"
                        {...userNameAttributes}
                    />
                    <label htmlFor="floatingUserName">{t("userName")}</label>
                </div>
                <div className="form-floating">
                    <input
                        id="floatingPassword"
                        className="form-control"
                        minLength={4}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("password")}
                        type="password"
                        required
                        value={password}
                    />
                    <label htmlFor="floatingPassword">{t("password")}</label>
                </div>
                <label className="form-label my-3">
                    {question.text}{" "}
                    <Link className={`uch-link ${theme}`} to={question.link}>
                        {question.linkText}
                    </Link>
                </label>
                <button className="btn btn-primary w-100 py-2" type="submit">
                    {buttonText}
                </button>
            </form>
        </section>
    );
};

export default Auth;
