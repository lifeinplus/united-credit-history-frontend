import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { PanelHeader, Table } from "../../components";
import { useTheme } from "../../contexts";
import { useDataById } from "../../hooks";
import { PersonalDataProps } from "../../types/PersonalData";
import { Person, RequestCount } from "../../types/Report";

import RequestCounts from "./components/RequestCounts";
import { tableColumns } from "./utils";

const PersonalData = ({ commons, report }: PersonalDataProps) => {
    const { reportId } = useParams();
    const { t } = useTranslation(["personal_data"]);
    const theme = useTheme();

    const requestCounts = useDataById<RequestCount>(
        "requestCounts/getByReportId",
        reportId
    );

    const columns = tableColumns.map((item) => ({
        ...item,
        name: t(`document.${item.sysName}`),
    }));

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} pt-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <div className="row">
                        <PanelHeader
                            date={{
                                caption: "app_creation_date",
                                value: report?.appCreationDate,
                            }}
                            iconName={"bi-file-person"}
                            nameSpaces={["personal_data"]}
                            number={{
                                caption: "app_number",
                                value: report?.appNumber,
                            }}
                        />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-7 col-xl-8">
                            <Table
                                id={"pd"}
                                columns={columns}
                                method={"persons/getByReportId"}
                                methodParams={{ reportId }}
                                mobileView={true}
                                textDifference={true}
                            />
                        </div>
                        <div className="col-md-8 col-lg-5 col-xl-4 mb-sm-3">
                            <RequestCounts
                                counts={requestCounts}
                                score={commons?.score}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalData;
