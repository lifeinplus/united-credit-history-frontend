import { FC } from "react";
import { useParams } from "react-router-dom";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";
import { ReportFull, ReportProps } from "../types/Report";

const Report: FC<ReportProps> = ({ handleExtend, showExtendedData }) => {
    const { reportId } = useParams();
    const report = useDataById<ReportFull>("reports/getFullById", reportId);

    return (
        <>
            <PersonalData data={report} />
            <CreditHistory
                data={report}
                handleExtend={handleExtend}
                showExtendedData={showExtendedData}
            />
        </>
    );
};

export default Report;
