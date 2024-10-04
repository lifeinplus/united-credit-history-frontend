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
    { sysName: "chbLoansAmountEur", country: "gb", hide: true, type: "loan" },
    { sysName: "chbLoansAmountRub", country: "ru", hide: true, type: "loan" },
    { sysName: "chbLoansAmountTry", country: "tr", hide: true, type: "loan" },
    { sysName: "chbCreditCardsAmount", type: "card" },
    {
        sysName: "chbCreditCardsAmountEur",
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
    { sysName: "chbPaymentsAmountEur", type: "chb", country: "gb" },
    { sysName: "chbPaymentsAmountRub", type: "chb", country: "ru" },
    { sysName: "chbPaymentsAmountTry", type: "chb", country: "tr" },
    {
        sysName: "flcPaymentsAmount",
        type: "flc",
        extended: true,
        context: "info",
    },
    {
        sysName: "flcPaymentsAmountEur",
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
        sortType: "numeric",
        sysName: "delinquency0Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "B",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "delinquency30Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "C",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "delinquency60Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "delinquency90Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "F",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "delinquencyRefinancing",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        sysName: "status",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortType: "numeric",
        sysName: "chbPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "amount",
        extended: true,
        sortType: "numeric",
        sysName: "flcPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-start",
        badgeEqual: "Microcredit",
        badgeType: "E",
        dataType: "text",
        sortType: "text",
        sysName: "loanType",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortType: "numeric",
        sysName: "loanAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        sysName: "currency",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortType: "numeric",
        sysName: "balanceAmount",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sortType: "numeric",
        sysName: "debtAmount",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "unpaidPercent",
        sysNameStatus: "unpaidPercentStatus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "amount",
        sortType: "numeric",
        sysName: "delinquencyAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        sysName: "guarantee",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortType: "text",
        sysName: "creationDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortType: "text",
        sysName: "closeDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sortType: "text",
        sysName: "lastUpdateDate",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        sysName: "businessCategory",
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sortType: "numericArray",
        sysName: "loanNumberNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sortType: "numericArray",
        sysName: "loanNumberUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "paymentPeriod",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "monthsNumberSinceCreationDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "monthsNumberBeforeCloseDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "flcTaken",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "flcNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "flcUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sortType: "numeric",
        sysName: "contractPeriod",
        tooltip: true,
    },
];
