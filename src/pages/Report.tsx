import { useParams } from "react-router-dom";

import { CreditHistory, PersonalData, Spinner } from "../components";
import { useGetFullByIdQuery } from "../features/reports/reportsApiSlice";

const Report = () => {
    const { reportId } = useParams();
    const { data: report, isLoading } = useGetFullByIdQuery({ id: reportId });

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
