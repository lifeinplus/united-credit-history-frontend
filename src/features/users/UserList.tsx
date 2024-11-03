import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import type { TableId } from "../../types";
import { userListColumns } from "../../utils";
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
import { useGetUsersPaginatedQuery } from ".";

const UserList = () => {
    const { t } = useTranslation(["user_list"]);

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const searchValue = useAppSelector(selectSearchValue);
    const page = useAppSelector(selectActivePage);

    const tableId: TableId = "users";
    const { sortOrder, sortSysName } = useAppSelector((state) =>
        selectSortConfig(state, tableId)
    );

    useEffect(() => {
        dispatch(setSearchSysName("username"));
    }, []);

    const { data, isFetching } = useGetUsersPaginatedQuery({
        limit: 9,
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

    const columns = userListColumns.map((item) => ({
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
                        iconName={"bi bi-people"}
                        isSearch={true}
                        nameSpaces={["user_list"]}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={tableId}
                                columns={columns}
                                data={data?.results}
                                isActions={true}
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

export default UserList;
