import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks";
import Auth from "../features/auth/Auth";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { isDataMessageError, isFetchBaseQueryError } from "../services/helpers";
import type { AuthSubmitHandler } from "../types/Auth";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(["auth"]);

    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    const from = location.state?.from?.pathname || "/reports";

    const handleSubmit: AuthSubmitHandler = async (userName, password) => {
        try {
            const response = await login({ userName, password }).unwrap();
            dispatch(setCredentials({ ...response, userName }));
            navigate(from, { replace: true });
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
        <Auth
            buttonText={t("buttons.login")}
            handleSubmit={handleSubmit}
            question={{
                link: "/register",
                linkText: t("links.login"),
                text: t("questions.login"),
            }}
            title={t("titles.login")}
        />
    );
};

export default Login;
