import classNames from "classnames";
import { forwardRef, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    requestSort,
    resetSortConfig,
    selectSortConfig,
} from "../../features/sortConfig";
import { selectTheme } from "../../features/theme";
import type { TableHeadProps } from "../../types/Table";

import { useTooltip } from "./hooks";

const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ columns, isActions, isTooltips }, ref) => {
        const { t } = useTranslation("table");

        const dispatch = useAppDispatch();
        const { sortOrder, sortSysName } = useAppSelector(selectSortConfig);
        const theme = useAppSelector(selectTheme);

        useTooltip(isTooltips, columns);

        useEffect(() => {
            return () => {
                dispatch(resetSortConfig());
            };
        }, []);

        return (
            <thead className="align-middle" ref={ref}>
                <tr
                    className={
                        theme === "light"
                            ? "table-primary"
                            : "uch-table dark primary"
                    }
                >
                    {columns.map((column) => {
                        const {
                            alignment,
                            extended,
                            name,
                            sortType,
                            sysName,
                            sysNameStatus,
                            tooltipName,
                        } = column;

                        const extendedClass =
                            extended &&
                            (theme === "light"
                                ? "table-info"
                                : "uch-table dark info");

                        const sortClass =
                            sortType && sortSysName === sysName
                                ? sortOrder
                                : undefined;

                        const sortThemeClass = sortType && `sortable ${theme}`;

                        return (
                            <th
                                key={sysName || name}
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
                                onClick={
                                    sortType
                                        ? () =>
                                              dispatch(
                                                  requestSort({
                                                      sortType,
                                                      sysName,
                                                      sysNameStatus,
                                                  })
                                              )
                                        : undefined
                                }
                                scope="col"
                            >
                                {name}
                            </th>
                        );
                    })}
                    {isActions && (
                        <th className={"text-end"} scope="col">
                            {t("actions")}
                        </th>
                    )}
                </tr>
            </thead>
        );
    }
);

function propsAreEqual(
    {
        columns: prevColumns,
        sortSysName: prevSortSysName,
    }: Readonly<TableHeadProps>,
    {
        columns: nextColumns,
        sortSysName: nextSortSysName,
    }: Readonly<TableHeadProps>
): boolean {
    return (
        prevColumns.length === nextColumns.length &&
        prevColumns.every((item, i) => item.name === nextColumns[i].name) &&
        prevSortSysName === nextSortSysName
    );
}

export default memo(Head, propsAreEqual);
