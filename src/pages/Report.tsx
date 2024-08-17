import { useParams } from "react-router-dom";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";
import { ReportFull } from "../types/Report";

const Report = () => {
    const { reportId } = useParams();
    const report = useDataById<ReportFull>("reports/getFullById", reportId);

    return (
        <>
            <PersonalData data={report} />
            <CreditHistory data={report} />
        </>
    );
};

export default Report;
