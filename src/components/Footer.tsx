import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

const Footer = () => {
    const { t } = useTranslation(["footer"]);
    const theme = useAppSelector(selectTheme);

    return (
        <footer className={`footer flex-wrap bg-${theme} mt-auto py-2`}>
            <div className="container-fluid d-flex align-items-center">
                <p className="col-5 text-secondary m-0">
                    v4.13.0 © 2024 Artem Denisov
                </p>
                <NavLink
                    className="col-2 d-flex justify-content-center"
                    reloadDocument
                    to="/"
                >
                    <img
                        alt="logo_gray"
                        className="f-w-6"
                        src="/logo_gray.png"
                    />
                </NavLink>
                <ul className="col-5 nav justify-content-end">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link px-2 text-secondary"
                            to={"/"}
                        >
                            {t("home")}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link px-2 text-secondary"
                            to={"/reports"}
                        >
                            {t("reports")}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link px-2 text-secondary"
                            to={"/about"}
                        >
                            {t("about")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
