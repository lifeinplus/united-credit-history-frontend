import classNames from "classnames";
import { Button, Dropdown, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    logOut,
    selectFirstName,
    selectLastName,
    selectRoles,
    selectUserId,
    selectUsername,
    useLogoutUserMutation,
} from "../../features/auth";
import {
    setAvatarChangeData,
    setPasswordChangeData,
    showAvatarChangeModal,
    showPasswordChangeModal,
} from "../../features/modals";
import { selectTheme } from "../../features/theme";
import { useAvatar } from "../../hooks";

const Account = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("header");

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const firstName = useAppSelector(selectFirstName);
    const lastName = useAppSelector(selectLastName);
    const roles = useAppSelector(selectRoles);
    const userId = useAppSelector(selectUserId) || "";
    const username = useAppSelector(selectUsername);

    const [avatarURL] = useAvatar();
    const [logoutUser] = useLogoutUserMutation();

    return username ? <Inside /> : <Outside />;

    function Inside() {
        const handleUsers = () => {
            navigate("/users");
        };

        const handleAvatar = () => {
            dispatch(showAvatarChangeModal());
            dispatch(setAvatarChangeData({ userId }));
        };

        const handlePassword = () => {
            dispatch(showPasswordChangeModal());
            dispatch(setPasswordChangeData({ userId }));
        };

        const handleLogout = async () => {
            try {
                await logoutUser();
                dispatch(logOut());
                navigate("/login");
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <Dropdown align={"end"}>
                <Dropdown.Toggle
                    className={classNames(`uch-btn-outline-primary ${theme}`)}
                    size="sm"
                    variant="outline-primary"
                >
                    {avatarURL ? (
                        <Image
                            src={avatarURL}
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
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className={classNames(
                        theme === "dark" && "dropdown-menu-dark"
                    )}
                >
                    <Dropdown.ItemText className="text-secondary">
                        {username}
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    {roles?.find((role) => role === 1010) && (
                        <Dropdown.Item onClick={handleUsers}>
                            {t("users")}
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={handleAvatar}>
                        {t("changeAvatar")}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handlePassword}>
                        {t("changePassword")}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                        {t("logout")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    function Outside() {
        return (
            <Button
                className={classNames(`uch-btn-outline-primary ${theme}`)}
                onClick={() => navigate("/login")}
                size="sm"
                variant="outline-primary"
            >
                <i className="bi bi-box-arrow-in-right me-1"></i>
            </Button>
        );
    }
};

export default Account;
