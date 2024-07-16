import classNames from "classnames";
import { FC } from "react";

import { PanelHeader } from "../../components";
import { useTheme } from "../../contexts";
import { PersonalDataProps } from "../../types/PersonalData";

import Persons from "./Persons";
import RequestCounts from "./RequestCounts";

const PersonalData: FC<PersonalDataProps> = ({ data }) => {
    const { appCreationDate, appNumber, commons, persons, requestCounts } =
        data || {};

    const theme = useTheme();

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
                                value: appCreationDate,
                            }}
                            iconName={"bi-file-person"}
                            nameSpaces={["personal_data"]}
                            number={{
                                caption: "app_number",
                                value: appNumber,
                            }}
                        />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-7 col-xl-8">
                            <Persons persons={persons} />
                        </div>
                        <div className="col-md-8 col-lg-5 col-xl-4 mb-sm-3">
                            <RequestCounts
                                requestCounts={requestCounts}
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
