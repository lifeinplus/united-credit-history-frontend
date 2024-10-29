import type { AmountContextField, AmountField, ListField } from "../types";

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

export const requestCountsFields: ListField[] = [
    {
        sysName: "total",
        type: "all",
    },
    {
        sysName: "last24Months",
        type: "all",
    },
    {
        sysName: "last30Days",
        type: "all",
    },
    {
        sysName: "microcreditTotal",
        type: "micro",
    },
    {
        sysName: "microcreditLast30Days",
        type: "micro",
    },
    {
        sysName: "microcreditLastYear",
        type: "micro",
    },
    {
        sysName: "microcreditMore1Year",
        type: "micro",
    },
];
