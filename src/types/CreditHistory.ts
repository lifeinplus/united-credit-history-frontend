import type { AmountListField } from "./List";
import type { ReportFull, Loan, Commons } from "./Report";

export interface CreditHistoryProps {
    data?: ReportFull;
}

export interface ListGroupProps {
    amounts: AmountListField[];
    justify: string;
}

export interface LoansProps {
    loans?: Loan[];
    reportCreationDate?: string;
}

export interface PaymentAmountsProps {
    data?: Commons;
}
