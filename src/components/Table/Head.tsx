import classNames from "classnames";
import { forwardRef, memo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/theme/themeSlice";
import type { TableHead, TableHeaderCell } from "../../types/Table";

import { useTooltip } from "./hooks";

const Head = forwardRef<HTMLTableSectionElement, TableHead>((props, ref) => {
    const {
        columns,
        isActions,
        isTooltips,
        requestSort,
        sortDirection,
        sortSysName,
    } = props;

    const theme = useAppSelector(selectTheme);
    useTooltip(isTooltips, columns);

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
                        requestSort={requestSort}
                        sortDirection={sortDirection}
                        sortSysName={sortSysName}
                        theme={theme}
                    />
                ))}
                {isActions && <ThActions />}
            </tr>
        </thead>
    );
});

function Th({
    column,
    requestSort,
    sortDirection,
    sortSysName,
    theme,
}: TableHeaderCell) {
    const { alignment, extended, name, sortable, sysName, tooltipName } =
        column;

    const extendedClass =
        extended && (theme === "light" ? "table-info" : "uch-table dark info");

    const sortClass =
        sortable && sortSysName === sysName ? sortDirection : undefined;

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

function propsAreEqual(
    {
        columns: prevColumns,
        sortDirection: prevSortDirection,
        sortSysName: prevSortSysName,
    }: Readonly<TableHead>,
    {
        columns: nextColumns,
        sortDirection: nextSortDirection,
        sortSysName: nextSortSysName,
    }: Readonly<TableHead>
): boolean {
    return (
        prevColumns.length === nextColumns.length &&
        prevColumns.every((item, i) => item.name === nextColumns[i].name) &&
        prevSortDirection === nextSortDirection &&
        prevSortSysName === nextSortSysName
    );
}

const MemoizedHead = memo(Head, propsAreEqual);

export default MemoizedHead;
