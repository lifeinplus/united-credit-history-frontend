import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import type { TableId } from "../../types";
import { reportListColumns } from "../../utils";
import {
    selectActivePage,
    setFromEntry,
    setToEntry,
    setTotal,
    setTotalPages,
} from "../pagination";
import { selectSearchValue, setSearchSysName } from "../search";
import { selectSortConfig } from "../sortConfig";
import { selectTheme } from "../theme";
import { useGetReportsPaginatedQuery } from ".";

const ReportList = () => {
    const { t } = useTranslation(["report_list"]);

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const searchValue = useAppSelector(selectSearchValue);
    const page = useAppSelector(selectActivePage);

    const tableId: TableId = "reports";
    const { sortOrder, sortSysName } = useAppSelector((state) =>
        selectSortConfig(state, tableId)
    );

    useEffect(() => {
        dispatch(setSearchSysName("clientName"));
    }, []);

    const { data, isFetching } = useGetReportsPaginatedQuery({
        limit: 10,
        page,
        searchValue,
        sortOrder,
        sortSysName,
    });

    useEffect(() => {
        dispatch(setFromEntry(data?.fromEntry));
        dispatch(setToEntry(data?.toEntry));
        dispatch(setTotal(data?.total));
        dispatch(setTotalPages(data?.totalPages));
    }, [data]);

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
                                id="reports"
                                columns={columns}
                                data={data?.results}
                                isFetching={isFetching}
                                isPagination={true}
                                isRowHover={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportList;
