import { useTranslation } from "react-i18next";

import { useTheme } from "../contexts";
import { getDateFormat, langs } from "../utils";

import ExtendControl from "./ExtendControl";

type HeaderFieldProps = {
    caption: string | undefined;
    value: string | undefined;
};

type HeaderProps = {
    date?: HeaderFieldProps;
    handleExtend?: () => void;
    iconName: string;
    nameSpaces: string[];
    number?: HeaderFieldProps;
    showExtendedData?: boolean;
};

const PanelHeader = ({
    date,
    handleExtend,
    iconName,
    nameSpaces,
    number,
    showExtendedData,
}: HeaderProps) => {
    const { i18n, t } = useTranslation(nameSpaces);
    const theme = useTheme();

    const headerDate = date && date.value && getHeaderDate(date.value);

    return (
        <nav className="navbar" data-bs-theme={`${theme}`}>
            <div className="container-fluid">
                <a className="navbar-brand">
                    <i className={`bi ${iconName} me-2`}></i>
                    {t("title")}
                </a>
                {handleExtend && (
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <ExtendControl
                                handleExtend={handleExtend}
                                showExtendedData={showExtendedData}
                            />
                        </li>
                    </ul>
                )}
                <form className="d-flex">
                    <span className="navbar-text">
                        {number && (
                            <HeaderField
                                caption={number.caption}
                                value={number.value}
                            />
                        )}
                        {date && (
                            <HeaderField
                                caption={date.caption}
                                value={headerDate}
                            />
                        )}
                    </span>
                </form>
            </div>
        </nav>
    );

    function HeaderField({ caption, value }: HeaderFieldProps) {
        return (
            caption && (
                <>
                    <small className="px-2">{t(caption)}</small>
                    <div className={`d-inline uch-navbar-text user-select-all`}>
                        {value}
                    </div>
                </>
            )
        );
    }

    function getHeaderDate(value: string) {
        const lang = langs[i18n.resolvedLanguage || "en"];
        const dateFormat = getDateFormat(lang.locale, "header");
        const milliseconds = Date.parse(value);

        return dateFormat.format(milliseconds);
    }
};

export default PanelHeader;