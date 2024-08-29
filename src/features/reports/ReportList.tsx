import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import { reportListColumns } from "../../utils";

import { selectActivePage } from "../pagination/paginationSlice";
import { selectSearch } from "../search/searchSlice";
import { selectTheme } from "../theme/themeSlice";

import { useGetReportsQuery } from "./reportsApiSlice";

const ReportList = () => {
    const { t } = useTranslation(["report_list"]);

    const theme = useAppSelector(selectTheme);
    const search = useAppSelector(selectSearch);
    const page = useAppSelector(selectActivePage);

    const { data, isFetching } = useGetReportsQuery({
        limit: 2,
        page,
        search,
    });

    const reports = data?.results;
    const totalPages = data?.totalPages;

    const columns = reportListColumns.map((item) => ({
        ...item,
        name: t(`table.${item.sysName}`),
    }));

    return (
        <section className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} pt-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <PanelHeader
                        iconName={"bi-card-list"}
                        isSearch={true}
                        nameSpaces={["report_list"]}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"rl"}
                                columns={columns}
                                data={reports}
                                isFetching={isFetching}
                                isPagination={true}
                                isRowHover={true}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportList;
