import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Auth from "../features/auth/Auth";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { isDataMessageError, isFetchBaseQueryError } from "../services/helpers";
import type { AuthSubmitHandler } from "../types/Auth";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["register"]);

    const [register] = useRegisterMutation();

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
        <Auth
            buttonText={t("buttonText")}
            handleSubmit={handleSubmit}
            question={{
                link: "/login",
                linkText: t("linkText"),
                text: t("questionText"),
            }}
            title={t("title")}
        />
    );
};

export default Register;
