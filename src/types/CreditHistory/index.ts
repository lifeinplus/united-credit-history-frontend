import {
    AmountField,
    AmountContextField,
    GroupProps,
    PaymentAmountsProps,
} from "./PaymentAmounts";
import { ReportFull, Loan } from "../Report";

export interface CreditHistoryProps {
    data?: ReportFull;
}

export interface LoansProps {
    loans?: Loan[];
    reportCreationDate?: string;
}

export { AmountField, AmountContextField, GroupProps, PaymentAmountsProps };
