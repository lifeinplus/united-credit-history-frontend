import classNames from "classnames";
import { forwardRef } from "react";

import { useTheme } from "../../../contexts";
import { TableHead, TableHeaderCell } from "../../../types/Table";

import { useTooltip } from "../hooks";
import { useTranslation } from "react-i18next";

const Head = forwardRef<HTMLTableSectionElement, TableHead>(
    (props: TableHead, ref) => {
        const { columns, actions, getSortClass, requestSort, tooltips } = props;

        const theme = useTheme();
        useTooltip(tooltips, columns);

        return (
            <thead className="align-middle" ref={ref}>
                <tr
                    className={
                        theme === "light"
                            ? "table-primary"
                            : "uch-table dark primary"
                    }
                >
                    {columns.map((item) => (
                        <Th
                            key={item.sysName || item.name}
                            column={item}
                            getSortClass={getSortClass}
                            requestSort={requestSort}
                            theme={theme}
                        />
                    ))}
                    {actions && <ThActions />}
                </tr>
            </thead>
        );
    }
);

function Th({ column, getSortClass, requestSort, theme }: TableHeaderCell) {
    const { alignment, extended, name, sortable, sysName, tooltipName } =
        column;

    const extendedClass =
        extended && (theme === "light" ? "table-info" : "uch-table dark info");

    const sortClass = sortable && getSortClass(sysName);
    const sortThemeClass = sortable && `sortable ${theme}`;

    return (
        <th
            className={classNames(
                alignment,
                extendedClass,
                sortClass,
                sortThemeClass
            )}
            data-bs-toggle={tooltipName && "tooltip"}
            data-bs-placement={tooltipName && "top"}
            data-bs-custom-class={`uch-tooltip ${theme}`}
            data-bs-title={tooltipName}
            onClick={sortable ? () => requestSort(column) : undefined}
            scope="col"
        >
            {name}
        </th>
    );
}

function ThActions() {
    const { t } = useTranslation("table");

    return (
        <th className={"text-end"} scope="col">
            {t("actions")}
        </th>
    );
}

export default Head;
