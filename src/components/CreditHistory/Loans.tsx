import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/hooks";
import { Table } from "../../components";
import { selectShowExtendedData } from "../../features/extendedData/extendedDataSlice";
import type { LoansProps } from "../../types/CreditHistory";
import { getDateFormat } from "../../utils";

import { tableColumns, TimePeriod } from "./utils";

const Loans = ({ loans, reportCreationDate }: LoansProps) => {
    const { i18n, t } = useTranslation(["credit_history"]);
    const showExtendedData = useAppSelector(selectShowExtendedData);
    const dateFormat = getDateFormat("ru", "status");
    const columns = defineColumns();

    return (
        <Table
            id={"ch"}
            columns={columns}
            data={loans}
            isRowActive={true}
            isRowHover={true}
            isScrolling={true}
            sorting={{
                dataType: "amount",
                sysName: "chbPayment",
                sysNameStatus: "chbPaymentStatus",
            }}
            isStickyHeader={true}
            isTooltips={true}
        />
    );

    function defineColumns() {
        const commonCols = useMemo(
            () => getCommonCols(),
            [showExtendedData, i18n.resolvedLanguage]
        );

        const statusCols = useMemo(() => getStatusCols(), []);

        return [...commonCols, ...statusCols];
    }

    function getCommonCols() {
        const all = [...tableColumns];

        const columns = showExtendedData
            ? all
            : all.filter((column) => !column.extended);

        return columns.map((item) => {
            const { sysName, tooltip } = item;
            return {
                ...item,
                name: t(`columns.${sysName}`),
                tooltipName: tooltip
                    ? t(`columns.tooltips.${sysName}`)
                    : undefined,
            };
        });
    }

    function getStatusCols() {
        if (!loans?.length || !reportCreationDate) {
            return [];
        }

        const timePeriod = new TimePeriod(loans, reportCreationDate);

        return timePeriod.result.map((value: Date) => {
            return {
                name: dateFormat.format(value),
                type: "status",
            };
        });
    }
};

export default Loans;
