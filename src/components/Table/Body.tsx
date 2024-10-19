import classNames from "classnames";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    showDeleteUserModal,
    showEditUserModal,
} from "../../features/modalData/modalDataSlice";
import {
    selectSearchSysName,
    selectSearchValue,
} from "../../features/search/searchSlice";
import { selectTheme } from "../../features/theme/themeSlice";
import type {
    TableBodyProps,
    TableColumn,
    TableData,
    TableDiffBadges,
    TableRowProps,
} from "../../types/Table";
import { getDateFormat, langs } from "../../utils";

import BadgeText from "./BadgeText";

const Body = ({
    columns,
    data,
    isActions,
    isMobileView,
    isRowActive,
    isTextDifference,
}: TableBodyProps) => {
    const { t } = useTranslation("table");

    const [activeRowId, setActiveRowId] = useState<string | undefined>(
        undefined
    );

    const dispatch = useAppDispatch();
    const searchSysName = useAppSelector(selectSearchSysName);
    const searchValue = useAppSelector(selectSearchValue);
    const theme = useAppSelector(selectTheme);

    const { i18n } = useTranslation();
    const lang = langs[i18n.resolvedLanguage || "en"];
    const numberFormat = new Intl.NumberFormat(lang.locale);
    const dateFormat = getDateFormat(lang.locale, "date");
    const timeFormat = getDateFormat(lang.locale, "time");

    const firstDataItem = data[0];
    const noDataColSpan = isActions ? columns.length + 1 : columns.length;

    const handleClick = ({ currentTarget }: { currentTarget: HTMLElement }) => {
        if (!isRowActive) return;
        const id = currentTarget?.id;
        setActiveRowId(id !== activeRowId ? id : undefined);
    };

    return (
        <>
            <tbody>
                {!data.length ? (
                    <tr>
                        <td className="text-center" colSpan={noDataColSpan}>
                            {t("noData")}
                        </td>
                    </tr>
                ) : (
                    data.map((dataItem) => {
                        const { _id: dataId, activeId } = dataItem;

                        // I decided not to create rows and cells in individual components,
                        // since with a large number of them the table renders noticeably slower
                        // (the difference is almost twice – from 55ms to 30ms)
                        return (
                            <tr
                                key={dataId}
                                id={String(activeId)}
                                className={
                                    isRowActive && activeId === activeRowId
                                        ? `uch-table ${theme} active`
                                        : undefined
                                }
                                onClick={handleClick}
                            >
                                {columns.map((column, index) => {
                                    const key = `${dataId}-${index}`;

                                    const { isLink, name, sysName, type } =
                                        column;

                                    const { cell, badge, value } =
                                        type === "status"
                                            ? getStatusData(column, dataItem)
                                            : getCommonData(column, dataItem);

                                    const label = isMobileView
                                        ? name
                                        : undefined;

                                    const diffedBadges =
                                        isTextDifference &&
                                        diffBadges(column, value);

                                    const highlightedSearch =
                                        searchValue && sysName === searchSysName
                                            ? highlightSearch(value)
                                            : undefined;

                                    const linkValue = isLink ? (
                                        <Link
                                            className={`uch-link ${theme}`}
                                            to={`/reports/${dataId}`}
                                        >
                                            {highlightedSearch || value}
                                        </Link>
                                    ) : undefined;

                                    return (
                                        <td
                                            key={key}
                                            className={cell}
                                            data-label={label}
                                        >
                                            <span className={badge}>
                                                {isTextDifference
                                                    ? diffedBadges
                                                    : linkValue ||
                                                      highlightedSearch ||
                                                      value}
                                            </span>
                                        </td>
                                    );
                                })}
                                {isActions && <CellActions data={dataItem} />}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </>
    );

    function CellActions({ data }: TableRowProps) {
        const roles = data.roles as string;
        const userId = data._id;
        const username = data.username as string;

        return (
            <td className={"text-end"}>
                <div className="btn-group" role="group">
                    <button
                        className={classNames(
                            "btn",
                            "btn-outline-primary",
                            `uch-btn-outline-primary ${theme}`,
                            "btn-sm"
                        )}
                        onClick={() =>
                            dispatch(
                                showEditUserModal({
                                    roles,
                                    userId,
                                    username,
                                })
                            )
                        }
                        type="button"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                        className={classNames(
                            "btn",
                            "btn-outline-primary",
                            `uch-btn-outline-primary ${theme}`,
                            "btn-sm"
                        )}
                        onClick={() =>
                            dispatch(
                                showDeleteUserModal({
                                    userId,
                                    username,
                                })
                            )
                        }
                        type="button"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        );
    }

    function getCommonData(column: TableColumn, data: TableData) {
        const {
            alignment,
            badgeEqual,
            badgeMore,
            badgeType,
            dataType = "",
            sysName = "",
            sysNameStatus,
        } = column;

        const statusSource = data[sysNameStatus || ""];
        const source = statusSource ?? data[sysName] ?? "";
        const value = prepare(source, dataType);

        const badge =
            source === badgeEqual ||
            (badgeMore !== undefined && Number(source) > badgeMore)
                ? `uch-badge uch-text-bg-${badgeType}`
                : undefined;

        return { cell: alignment, badge, value };
    }

    function getStatusData(column: TableColumn, data: TableData) {
        const { name } = column;

        const value = data[name || ""];
        const badge = value ? `uch-badge status uch-text-bg-${value}` : "";

        return { cell: "uch-td-status", badge, value };
    }

    function diffBadges(column: TableColumn, diffValue: string | number) {
        const { dataType = "", sysName = "" } = column;

        let result: TableDiffBadges[] = [];

        const firstSource = firstDataItem && String(firstDataItem[sysName]);
        const firstValue = firstSource && prepare(firstSource, dataType);

        const firstArray = String(firstValue).split(" ");
        const diffArray = String(diffValue).split(" ");

        const maxLength = Math.max(firstArray.length, diffArray.length);

        for (let i = 0; i < maxLength; i++) {
            const firstString = firstArray[i] || "";
            const diffString = diffArray[i] || "";

            let badged = badgeDiffs(firstString, diffString);

            if (i < maxLength - 1) {
                badged.push(" ");
            }

            result = result.concat(badged);
        }

        return result;
    }

    function highlightSearch(text: string | number) {
        const regex = new RegExp(`(${searchValue})`, "gi");
        const parts = String(text).split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <BadgeText key={index} text={part} /> : part
        );
    }

    function prepare(value: string | number, dataType: string) {
        const numberValue = Number(value);

        if (dataType === "amount" && !isNaN(numberValue)) {
            return numberFormat.format(numberValue);
        }

        if (dataType === "date" && value) {
            const milliseconds = Date.parse(String(value));
            return dateFormat.format(milliseconds);
        }

        if (dataType === "dateTime" && value) {
            const milliseconds = Date.parse(String(value));
            const date = dateFormat.format(milliseconds);
            const time = timeFormat.format(milliseconds);
            return date + " " + time;
        }

        return value;
    }

    function badgeDiffs(firstString: string, diffString: string) {
        const result: (string | JSX.Element)[] = [];

        let regularBuffer = "";
        let badgeBuffer = "";
        let key = 1;

        const maxLength = Math.max(firstString.length, diffString.length);

        for (let i = 0; i < maxLength; i++) {
            const firstChar = firstString[i] || "";
            const diffChar = diffString[i] || "";

            if (firstChar === diffChar) {
                if (badgeBuffer) {
                    result.push(
                        <BadgeText
                            key={`badge-${maxLength}-${key++}`}
                            text={badgeBuffer}
                        />
                    );
                    badgeBuffer = "";
                }

                regularBuffer += firstChar;
            } else {
                if (regularBuffer) {
                    result.push(regularBuffer);
                    regularBuffer = "";
                }

                badgeBuffer += diffChar;
            }
        }

        if (badgeBuffer) {
            result.push(
                <BadgeText
                    key={`badge-${maxLength}-${key++}`}
                    text={badgeBuffer}
                />
            );
        }

        if (regularBuffer) {
            result.push(regularBuffer);
        }

        return result;
    }
};

function propsAreEqual(
    { columns: prevColumns, data: prevData }: Readonly<TableBodyProps>,
    { columns: nextColumns, data: nextData }: Readonly<TableBodyProps>
): boolean {
    const areColumnsEqual = prevColumns.length === nextColumns.length;

    const isDataEqual =
        prevData &&
        nextData &&
        prevData.length === nextData.length &&
        prevData.every((item, i) =>
            Object.keys(item).every((key) => item[key] === nextData[i][key])
        );

    return areColumnsEqual && Boolean(isDataEqual);
}

const MemoizedBody = memo(Body, propsAreEqual);

export default MemoizedBody;
