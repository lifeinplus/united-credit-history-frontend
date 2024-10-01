export interface Commons extends Record<string, string | number> {
    reportId: string;
    chbCreditCardsAmountEur: number;
    chbCreditCardsAmountRub: number;
    chbCreditCardsAmountTry: number;
    chbLoansAmountEur: number;
    chbLoansAmountRub: number;
    chbLoansAmountTry: number;
    chbPaymentsAmountEur: number;
    chbPaymentsAmountRub: number;
    chbPaymentsAmountTry: number;
    flcPaymentsAmountEur: number;
    flcPaymentsAmountRub: number;
    flcPaymentsAmountTry: number;
    score: number;
}

export interface Delinquency extends Record<string, string | number> {}

export interface Flc extends Record<string, string | number> {}

export interface Loan extends Record<string, string | number> {
    _id: string;
    reportId: string;
    balanceAmount: number;
    businessCategory: string;
    chbPayment: number;
    chbPaymentStatus: string;
    closeDate: string;
    contractPeriod: number;
    creationDate: string;
    currency: string;
    debtAmount: number;
    delinquencyAmount: number;
    firstPaymentDate: string;
    guarantee: string;
    lastUpdateDate: string;
    loanAmount: number;
    loanNumberNchb: string;
    loanNumberUcb: string;
    loanType: string;
    monthsNumberBeforeCloseDate: number;
    monthsNumberSinceCreationDate: number;
    paymentPeriod: number;
    status: string;
    unpaidPercent: number;
    unpaidPercentStatus: string;
}

export interface PaymentHistory extends Record<string, string> {}

export interface Person extends Record<string, string> {}

export interface Report {
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
    reportCreationDate: string;
}

export interface ReportFull extends Report {
    commons: Commons;
    loans: Loan[];
    persons: Person[];
    requestCounts: RequestCounts;
}

export interface ReportRecord extends Report, Record<string, string> {}

export interface RequestCounts extends Record<string, number> {}
