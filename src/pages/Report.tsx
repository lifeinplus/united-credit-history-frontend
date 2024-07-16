import { useParams } from "react-router-dom";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";
import { ReportFull, ReportProps } from "../types/Report";

const Report = ({ handleExtend, showExtendedData }: ReportProps) => {
    const { reportId } = useParams();
    const reportFull = useDataById<ReportFull>("reports/getFullById", reportId);

    return (
        <>
            <PersonalData data={reportFull} />
            <CreditHistory
                data={reportFull}
                handleExtend={handleExtend}
                showExtendedData={showExtendedData}
            />
        </>
    );
};

export default Report;
