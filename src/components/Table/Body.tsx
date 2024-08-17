import classNames from "classnames";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    showModalDelete,
    showModalEdit,
} from "../../features/modalData/modalDataSlice";
import ModalDelete from "../../features/modalData/ModalDelete";
import ModalEdit from "../../features/modalData/ModalEdit";
import { selectTheme } from "../../features/theme/themeSlice";
import {
    TableBody,
    TableDataCell,
    TableDiff,
    TableDiffBadges,
    TableRow,
} from "../../types/Table";
import { getDateFormat, langs } from "../../utils";

const Body = ({
    columns,
    data,
    isActions,
    isMobileView,
    isRowActive,
    isTextDifference,
}: TableBody) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const [activeRowId, setActiveRowId] = useState<string | undefined>(
        undefined
    );

    const { i18n } = useTranslation();
    const lang = langs[i18n.resolvedLanguage || "en"];
    const numberFormat = new Intl.NumberFormat(lang.locale);

    const dateFormat = getDateFormat(lang.locale, "date");
    const timeFormat = getDateFormat(lang.locale, "time");

    const firstDataItem = data && data[0];

    const handleClick = ({ currentTarget }: { currentTarget: HTMLElement }) => {
        if (!isRowActive) return;
        const id = currentTarget?.id;
        setActiveRowId(id !== activeRowId ? id : undefined);
    };

    return (
        <>
            <ModalDelete />
            <ModalEdit />
            <tbody>
                {data?.map((element) => (
                    <Row key={element._id} data={element} />
                ))}
            </tbody>
        </>
    );

    function Row({ data }: TableRow) {
        const { _id, activeId } = data;

        return (
            <tr
                id={String(activeId)}
                className={
                    isRowActive && activeId === activeRowId
                        ? `uch-table ${theme} active`
                        : undefined
                }
                onClick={handleClick}
            >
                {columns.map((element, index) => {
                    const key = `${_id}-${index}`;
                    return (
                        <Cell key={key} id={key} column={element} data={data} />
                    );
                })}
                {isActions && <CellActions data={data} />}
            </tr>
        );
    }

    function Cell(params: TableDataCell) {
        const { id, column, data } = params;
        const { isLink, name, type } = column;

        const { cell, badge, diffData, value } =
            type === "status" ? getStatusData(params) : getCommonData(params);

        const label = isMobileView ? name : undefined;

        const linkValue = isLink && (
            <Link className={`uch-link ${theme}`} to={`/reports/${data._id}`}>
                {value}
            </Link>
        );

        return (
            <td className={cell} data-label={label}>
                <span className={badge}>
                    {isTextDifference ? (
                        <DiffBadges id={id} data={diffData} />
                    ) : (
                        linkValue || value
                    )}
                </span>
            </td>
        );
    }

    function CellActions({ data }: TableRow) {
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
                        onClick={() => dispatch(showModalEdit(data))}
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
                        onClick={() => dispatch(showModalDelete(data))}
                        type="button"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        );
    }

    function DiffBadges({ id, data }: TableDiffBadges) {
        return data?.map((element, index) => {
            const { spanText, text } = element;
            const key = `${id}-span${index}`;

            return spanText ? (
                <mark key={key} className={"uch-badge diff uch-text-bg-A"}>
                    {spanText}
                </mark>
            ) : (
                text
            );
        });
    }

    function getCommonData({ column, data }: TableDataCell) {
        const {
            alignment,
            badgeEqual,
            badgeMore,
            badgeType,
            dataType = "",
            sysName = "",
            sysNameStatus,
        } = column;

        const firstSource = firstDataItem && firstDataItem[sysName];
        const firstValue = firstSource && prepare(firstSource, dataType);

        const currentStatusSource = data[sysNameStatus || ""];
        const currentSource = currentStatusSource ?? data[sysName] ?? "";
        const currentValue = prepare(currentSource, dataType);

        const badge =
            currentSource === badgeEqual ||
            (badgeMore !== undefined && Number(currentSource) > badgeMore)
                ? `uch-badge uch-text-bg-${badgeType}`
                : undefined;

        const diffData = isTextDifference
            ? compare(firstValue, currentValue)
            : undefined;

        return { cell: alignment, badge, diffData, value: currentValue };
    }

    function getStatusData({ column, data }: TableDataCell) {
        const { name } = column;

        const value = data[name || ""];
        const badge = value ? `uch-badge status uch-text-bg-${value}` : "";

        return { cell: "uch-td-status", badge, diffData: undefined, value };
    }

    function prepare(sourceValue: string | number, dataType: string) {
        const numberValue = Number(sourceValue);

        if (dataType === "amount" && !isNaN(numberValue)) {
            return numberFormat.format(numberValue);
        }

        if (dataType === "date" && sourceValue) {
            const milliseconds = Date.parse(String(sourceValue));
            return dateFormat.format(milliseconds);
        }

        if (dataType === "dateTime" && sourceValue) {
            const milliseconds = Date.parse(String(sourceValue));
            const date = dateFormat.format(milliseconds);
            const time = timeFormat.format(milliseconds);
            return date + " " + time;
        }

        return sourceValue;
    }

    function compare(
        valueA: string | number = "",
        valueB: string | number = ""
    ) {
        let result: TableDiff[] = [];

        const arrayA = String(valueA).split(" ");
        const arrayB = String(valueB).split(" ");

        const maxLength = Math.max(arrayA.length, arrayB.length);

        for (let i = 0; i < maxLength; i++) {
            const stringA = arrayA[i] || "";
            const stringB = arrayB[i] || "";

            let compared = compareStrings(stringA, stringB);

            if (i < maxLength - 1) {
                compared = compared.concat([{ text: " " }]);
            }

            result = result.concat(compared);
        }

        return result;
    }

    function compareStrings(stringA: string, stringB: string) {
        const result = [];
        const maxLength = Math.max(stringA.length, stringB.length);

        let text = "";
        let spanText = "";

        for (let i = 0; i < maxLength; i++) {
            const charA = stringA[i] || "";
            const charB = stringB[i] || "";

            if (charA !== charB && charB) {
                if (text) {
                    result.push({ text });
                    text = "";
                }

                spanText += charB;
                continue;
            }

            if (spanText) {
                result.push({ spanText });
                spanText = "";
            }

            text += charB;
        }

        if (spanText) result.push({ spanText });
        if (text) result.push({ text });

        return result;
    }
};

function propsAreEqual(
    { columns: prevColumns, data: prevData }: Readonly<TableBody>,
    { columns: nextColumns, data: nextData }: Readonly<TableBody>
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
