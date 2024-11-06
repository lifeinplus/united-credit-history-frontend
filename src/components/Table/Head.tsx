import classNames from "classnames";
import { forwardRef, memo } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { requestSort, selectSortConfig } from "../../features/sortConfig";
import { selectTheme } from "../../features/theme";
import type { TableHeadProps } from "../../types";
import { useTooltip } from "./hooks";

const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ columns, isActions, isTooltips, tableId }, ref) => {
        const { t } = useTranslation("table");

        const dispatch = useAppDispatch();
        const theme = useAppSelector(selectTheme);
        useTooltip(isTooltips, columns);

        const { sortOrder, sortSysName } = useAppSelector((state) =>
            selectSortConfig(state, tableId)
        );

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
                                                      sortSysName: sysName,
                                                      sortSysNameStatus:
                                                          sysNameStatus,
                                                      tableId,
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
    { columns: prevColumns }: Readonly<TableHeadProps>,
    { columns: nextColumns }: Readonly<TableHeadProps>
): boolean {
    return (
        prevColumns.length === nextColumns.length &&
        prevColumns.every((item, i) => item.name === nextColumns[i].name)
    );
}

export default memo(Head, propsAreEqual);
