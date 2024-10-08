import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { axiosPrivate } from "../../features/api/axios";
import {
    logOut,
    selectRoles,
    selectUserId,
    selectUserName,
} from "../../features/auth/authSlice";
import { showChangePasswordModal } from "../../features/modalData/modalDataSlice";
import { selectTheme } from "../../features/theme/themeSlice";

const Account = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("header");

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const userName = useAppSelector(selectUserName);
    const userId = useAppSelector(selectUserId);
    const roles = useAppSelector(selectRoles);

    return userName ? <Out /> : <In />;

    function Out() {
        const handleChangePassword = () => {
            dispatch(showChangePasswordModal({ _id: userId }));
        };

        const handleLogout = async () => {
            await axiosPrivate("/auth/logout")
                .then(() => {
                    dispatch(logOut());
                    navigate("/login");
                })
                .catch((error) => console.error(error));
        };

        const handleUsers = () => {
            navigate("/users");
        };

        return (
            <div className="dropdown">
                <button
                    className={classNames(
                        "btn",
                        "btn-outline-primary",
                        `uch-btn-outline-primary ${theme}`,
                        "btn-sm",
                        "dropdown-toggle"
                    )}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-person-circle me-2"></i>
                    {userName}
                </button>
                <ul
                    className={classNames(
                        "dropdown-menu",
                        "dropdown-menu-md-end",
                        theme === "dark" && "dropdown-menu-dark"
                    )}
                >
                    {roles?.find((role) => role === 1010) && (
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={handleUsers}
                                type="button"
                            >
                                {t("users")}
                            </button>
                        </li>
                    )}
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleChangePassword}
                            type="button"
                        >
                            {t("changePassword")}
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleLogout}
                            type="button"
                        >
                            {t("logout")}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    function In() {
        return (
            <button
                className={classNames(
                    "btn",
                    "btn-outline-primary",
                    `uch-btn-outline-primary ${theme}`,
                    "btn-sm"
                )}
                onClick={() => navigate("/login")}
                type="button"
            >
                <i className="bi bi-box-arrow-in-right me-1"></i>
            </button>
        );
    }
};

export default Account;
