import classNames from "classnames";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { axiosPrivate, BASE_URL } from "../../features/api/axios";
import {
    logOut,
    selectAvatarPath,
    selectFirstName,
    selectLastName,
    selectRoles,
    selectUserId,
    selectUsername,
} from "../../features/auth/authSlice";
import {
    showChangeAvatarModal,
    showChangePasswordModal,
} from "../../features/modalData/modalDataSlice";
import { selectTheme } from "../../features/theme/themeSlice";

const Account = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("header");

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const avatarPath = useAppSelector(selectAvatarPath);
    const firstName = useAppSelector(selectFirstName);
    const lastName = useAppSelector(selectLastName);
    const roles = useAppSelector(selectRoles);
    const userId = useAppSelector(selectUserId) || "";
    const username = useAppSelector(selectUsername);

    return username ? <Inside /> : <Outside />;

    function Inside() {
        const handleChangePassword = () => {
            dispatch(showChangePasswordModal({ userId }));
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
                    {avatarPath ? (
                        <Image
                            src={`${BASE_URL}/${avatarPath}`}
                            rounded
                            width="16"
                            height="16"
                            className="me-2 align-text-top"
                        />
                    ) : (
                        <i className="bi bi-person-circle me-2"></i>
                    )}
                    {firstName || lastName
                        ? [firstName, lastName].join(" ").trim()
                        : username}
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
                            onClick={() => {
                                dispatch(showChangeAvatarModal({ userId }));
                            }}
                            type="button"
                        >
                            {t("changeAvatar")}
                        </button>
                    </li>
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

    function Outside() {
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
