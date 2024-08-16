import classNames from "classnames";
import { FC } from "react";

import { useAppSelector } from "../../app/hooks";
import { PanelHeader } from "../../components";
import { selectTheme } from "../../features/theme/themeSlice";
import { CreditHistoryProps } from "../../types/CreditHistory";

import Loans from "./Loans";
import PaymentAmounts from "./PaymentAmounts";

const CreditHistory: FC<CreditHistoryProps> = ({
    data,
    handleExtend,
    showExtendedData,
}) => {
    const { commons, loans, reportCreationDate } = data || {};
    const theme = useAppSelector(selectTheme);

    return (
        <section className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} rounded`,
                    `border`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <PanelHeader
                        date={{
                            caption: "report_date",
                            value: reportCreationDate,
                        }}
                        handleExtend={handleExtend}
                        iconName={"bi-credit-card-2-front"}
                        nameSpaces={["credit_history"]}
                        number={{
                            caption: "number_of_accounts",
                            value: String(loans?.length),
                        }}
                        showExtendedData={showExtendedData}
                    />
                    <PaymentAmounts
                        data={commons}
                        showExtendedData={showExtendedData}
                    />
                    <div className="row">
                        <div className="col">
                            <Loans
                                loans={loans}
                                reportCreationDate={reportCreationDate}
                                showExtendedData={showExtendedData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreditHistory;
