import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import type { HandleSetPage } from "../../types/Pagination";
import { reportListColumns } from "../../utils";

import { selectTheme } from "../theme/themeSlice";

import { useGetReportsQuery } from "./reportsApiSlice";
import { selectLimit, selectPage, setPage } from "./reportsSlice";

const ReportList = () => {
    const { t } = useTranslation(["report_list"]);

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const page = useAppSelector(selectPage);
    const limit = useAppSelector(selectLimit);

    const { data, isFetching } = useGetReportsQuery({ limit, page });
    const reports = data?.results;
    const totalPages = data?.totalPages;

    const columns = reportListColumns.map((item) => ({
        ...item,
        name: t(`table.${item.sysName}`),
    }));

    const handleSetPage: HandleSetPage = (page) => {
        dispatch(setPage(page));
    };

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
                        nameSpaces={["report_list"]}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"rl"}
                                columns={columns}
                                data={reports}
                                isPagination={true}
                                isRowHover={true}
                                paginationParams={{
                                    isFetching,
                                    page,
                                    setPage: handleSetPage,
                                    totalPages,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportList;
