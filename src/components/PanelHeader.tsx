import classNames from "classnames";
import { Container, Form, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { ExtendControl } from "../features/extendedData";
import { SearchControl } from "../features/search";
import type { PanelHeaderProps, PanelHeaderFieldProps } from "../types";
import { getDateFormat, langs } from "../utils";

const PanelHeader = ({
    date,
    iconName,
    isExtendControl = false,
    isSearch = false,
    nameSpaces,
    number,
}: PanelHeaderProps) => {
    const { i18n, t } = useTranslation(nameSpaces);

    const headerDate = date && date.value && getHeaderDate(date.value);

    return (
        <header className="row">
            <Navbar>
                <Container className={classNames(isSearch && "mb-2")} fluid>
                    <Navbar.Brand>
                        <i className={`bi ${iconName} me-2`}></i>
                        {t("title")}
                    </Navbar.Brand>
                    {isExtendControl && (
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <ExtendControl />
                            </li>
                        </ul>
                    )}
                    <Form
                        className="d-flex"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Navbar.Text>
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
                        </Navbar.Text>
                        {isSearch && <SearchControl />}
                    </Form>
                </Container>
            </Navbar>
        </header>
    );

    function HeaderField({ caption, value }: PanelHeaderFieldProps) {
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
