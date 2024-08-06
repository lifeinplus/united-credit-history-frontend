import {
    AmountField,
    AmountContextField,
    GroupProps,
    PaymentAmountsProps,
} from "./PaymentAmounts";
import { ReportFull, Loan } from "../Report";

export interface CreditHistoryProps {
    data?: ReportFull;
    handleExtend: () => void;
    showExtendedData: boolean;
}

export interface LoansProps {
    loans?: Loan[];
    reportCreationDate?: string;
    showExtendedData: boolean;
}

export { AmountField, AmountContextField, GroupProps, PaymentAmountsProps };
