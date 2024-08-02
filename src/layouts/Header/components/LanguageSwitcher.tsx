import "/node_modules/flag-icons/css/flag-icons.min.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../hooks";
import { langs } from "../../../utils";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const { resolvedLanguage, changeLanguage } = i18n;
    const { countryCode, nativeName } = langs[resolvedLanguage ?? "en"];
    const keys = Object.keys(langs).filter((key) => key !== resolvedLanguage);

    const { theme } = useTheme();

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
                <figure className={`fi fi-${countryCode} mb-0 me-2`}></figure>
                {nativeName}
            </button>
            <ul
                className={classNames(
                    "dropdown-menu dropdown-menu-md-end",
                    theme === "dark" && "dropdown-menu-dark"
                )}
            >
                {keys.map((key) => {
                    const { countryCode, nativeName } = langs[key];

                    return (
                        <li key={key}>
                            <button
                                className="dropdown-item"
                                onClick={() => changeLanguage(key)}
                                type="button"
                            >
                                <figure
                                    className={`fi fi-${countryCode} mb-0 me-2`}
                                ></figure>
                                {nativeName}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LanguageSwitcher;
