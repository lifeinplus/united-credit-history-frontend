import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../contexts";
import {
    RequestCountsCard,
    RequestCountsItem,
    RequestCountsProps,
} from "../../types/PersonalData";

import { listFields, scoreStyles } from "./utils";

const RequestCounts = ({ requestCounts: data, score }: RequestCountsProps) => {
    const { t } = useTranslation(["personal_data"]);
    const theme = useTheme();

    return (
        <div className="card-group">
            <Card title={t("requests.title_all")} type={"all"} />
            <Card title={t("requests.title_microcredits")} type={"micro"} />
        </div>
    );

    function Card({ title, type }: RequestCountsCard) {
        const fields = listFields.filter((item) => item.type === type);
        const values = fields.map(({ sysName }) => data && data[sysName]);

        const scoreDanger = score && score < 500;
        const microDanger = type === "micro" && values.some((item) => item);

        return (
            <section
                className={classNames(
                    "card",
                    `uch-text-bg ${theme}`,
                    theme === "dark" && "uch-card-border-dark",
                    (scoreDanger || microDanger) && "border-danger"
                )}
            >
                <header
                    className={classNames(
                        "card-header text-center text-truncate",
                        theme === "dark" && "uch-border-dark"
                    )}
                >
                    {title}
                </header>
                {data && (
                    <ul className="list-group list-group-flush">
                        {fields.map(({ sysName }) => {
                            return (
                                <Item
                                    key={sysName}
                                    count={data[sysName]}
                                    sysName={sysName}
                                    type={type}
                                />
                            );
                        })}
                    </ul>
                )}
                {type === "all" && <CardFooter />}
            </section>
        );
    }

    function Item({ count, sysName, type }: RequestCountsItem) {
        const isDanger = type === "micro" && count > 0;

        return (
            <li
                className={classNames(
                    "list-group-item",
                    `uch-list-group-item ${theme}`,
                    "d-flex",
                    "justify-content-between",
                    "align-items-center"
                )}
            >
                <span className="text-truncate">
                    {t(`requests.${sysName}`)}
                </span>
                <span
                    className={classNames(
                        "badge",
                        "rounded-pill",
                        isDanger ? "text-bg-danger" : `text-bg-${theme}`,
                        "ms-2"
                    )}
                >
                    {count}
                </span>
            </li>
        );
    }

    function CardFooter() {
        const scoreStyle = scoreStyles.find(({ min, max }) => {
            return score && score >= min && score <= max;
        });

        return (
            <footer className="card-footer text-center">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-truncate">{t("score")}</span>
                    <span
                        className={`badge rounded-pill ${scoreStyle?.style} ms-2`}
                    >
                        {score}
                    </span>
                </li>
            </footer>
        );
    }
};

export default RequestCounts;
