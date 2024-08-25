import type {
    AmountField,
    AmountContextField,
    GroupProps,
    PaymentAmountsProps,
} from "./PaymentAmounts";

import type { ReportFull, Loan } from "../Report";

export interface CreditHistoryProps {
    data?: ReportFull;
}

export interface LoansProps {
    loans?: Loan[];
    reportCreationDate?: string;
}

export { AmountField, AmountContextField, GroupProps, PaymentAmountsProps };
