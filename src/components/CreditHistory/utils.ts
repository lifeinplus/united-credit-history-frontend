import type {
    AmountContextField,
    AmountField,
} from "../../types/CreditHistory";
import type { Loan } from "../../types/Report";
import type { TableColumn } from "../../types/Table";
import { getDateFormat } from "../../utils";

export class TimePeriod {
    constructor(
        private readonly loans: Loan[],
        private readonly lastDate: string
    ) {}

    get result() {
        const milliseconds = Date.parse(this.lastDate);
        const lastDate = new Date(milliseconds);
        const result = [lastDate];

        const monthsNumber = this.#getMonthsNumber();

        for (let i = 1; i < monthsNumber; i++) {
            let previous = result[i - 1];

            let date = new Date(previous.getTime());
            date.setMonth(date.getMonth() - 1);

            result.push(date);
        }

        return result;
    }

    #getMonthsNumber() {
        const startDate = this.#getStartDate();
        const lastDate = this.lastDate;

        const [startMonth, startYear] = this.#defineMonthYear(startDate);
        const [lastMonth, lastYear] = this.#defineMonthYear(lastDate);

        return (lastYear - startYear) * 12 + (lastMonth + 1) - startMonth;
    }

    #getStartDate() {
        return this.loans?.reduce((result, { firstPaymentDate }) => {
            return result > firstPaymentDate ? firstPaymentDate : result;
        }, this.lastDate);
    }

    #defineMonthYear(isoDate: string) {
        if (!isoDate) return [];

        const dateFormat = getDateFormat("ru", "status");
        const milliseconds = Date.parse(isoDate);

        return dateFormat
            .format(milliseconds)
            .split(".")
            .map((item) => Number(item));
    }
}

export const obligationFields: AmountField[] = [
    { sysName: "chbLoansAmount", type: "loan" },
    { sysName: "chbLoansAmountGbp", country: "gb", hide: true, type: "loan" },
    { sysName: "chbLoansAmountRub", country: "ru", hide: true, type: "loan" },
    { sysName: "chbLoansAmountTry", country: "tr", hide: true, type: "loan" },
    { sysName: "chbCreditCardsAmount", type: "card" },
    {
        sysName: "chbCreditCardsAmountGbp",
        country: "gb",
        hide: true,
        type: "card",
    },
    {
        sysName: "chbCreditCardsAmountRub",
        country: "ru",
        hide: true,
        type: "card",
    },
    {
        sysName: "chbCreditCardsAmountTry",
        country: "tr",
        hide: true,
        type: "card",
    },
];

export const paymentFields: AmountContextField[] = [
    { sysName: "chbPaymentsAmount", type: "chb", context: "primary" },
    { sysName: "chbPaymentsAmountGbp", type: "chb", country: "gb" },
    { sysName: "chbPaymentsAmountRub", type: "chb", country: "ru" },
    { sysName: "chbPaymentsAmountTry", type: "chb", country: "tr" },
    {
        sysName: "flcPaymentsAmount",
        type: "flc",
        extended: true,
        context: "info",
    },
    {
        sysName: "flcPaymentsAmountGbp",
        type: "flc",
        extended: true,
        country: "gb",
        hide: true,
    },
    {
        sysName: "flcPaymentsAmountRub",
        type: "flc",
        extended: true,
        country: "ru",
        hide: true,
    },
    {
        sysName: "flcPaymentsAmountTry",
        type: "flc",
        extended: true,
        country: "tr",
        hide: true,
    },
];

export const tableColumns: TableColumn[] = [
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "A",
        dataType: "numeric",
        sortable: true,
        sysName: "delinquency0Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "B",
        dataType: "numeric",
        sortable: true,
        sysName: "delinquency30Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "C",
        dataType: "numeric",
        sortable: true,
        sysName: "delinquency60Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "numeric",
        sortable: true,
        sysName: "delinquency90Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "F",
        dataType: "numeric",
        sortable: true,
        sysName: "delinquencyRefinancing",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortable: true,
        sysName: "status",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortable: true,
        sysName: "chbPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "amount",
        extended: true,
        sortable: true,
        sysName: "flcPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-start",
        badgeEqual: "Микрокредит",
        badgeType: "E",
        dataType: "text",
        sortable: true,
        sysName: "loanType",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortable: true,
        sysName: "loanAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortable: true,
        sysName: "currency",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortable: true,
        sysName: "balanceAmount",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortable: true,
        sysName: "debtAmount",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sortable: true,
        sysName: "unpaidPercent",
        sysNameStatus: "unpaidPercentStatus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "amount",
        sortable: true,
        sysName: "delinquencyAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortable: true,
        sysName: "guarantee",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortable: true,
        sysName: "creationDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortable: true,
        sysName: "closeDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortable: true,
        sysName: "lastUpdateDate",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortable: true,
        sysName: "businessCategory",
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sortable: true,
        sysName: "loanNumberNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sortable: true,
        sysName: "loanNumberUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "paymentPeriod",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "monthsNumberSinceCreationDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "monthsNumberBeforeCloseDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "flcTaken",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "flcNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "flcUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortable: true,
        sysName: "contractPeriod",
        tooltip: true,
    },
];
