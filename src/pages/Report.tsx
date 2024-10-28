import { useParams } from "react-router-dom";

import { CreditHistory, PersonalData, Spinner } from "../components";
import { useGetReportFullByIdQuery } from "../features/reports";

const Report = () => {
    const { reportId = "" } = useParams();
    const { data: report, isLoading } = useGetReportFullByIdQuery(reportId);

    return isLoading ? (
        <Spinner />
    ) : (
        <>
            <PersonalData data={report} />
            <CreditHistory data={report} />
        </>
    );
};

export default Report;
