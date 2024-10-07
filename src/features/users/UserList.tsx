import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import type { SortConfigState } from "../../types/Sort";
import { userListColumns } from "../../utils";

import {
    selectActivePage,
    setFromEntry,
    setToEntry,
    setTotal,
    setTotalPages,
} from "../pagination/paginationSlice";
import { selectSearchValue } from "../search/searchSlice";
import { selectSortConfig, setSortConfig } from "../sortConfig/sortConfigSlice";
import { selectTheme } from "../theme/themeSlice";

import { useGetUsersQuery } from "./usersApiSlice";

const UserList = () => {
    const { t } = useTranslation(["user_list"]);

    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const searchValue = useAppSelector(selectSearchValue);
    const page = useAppSelector(selectActivePage);
    const { sortOrder, sortSysName } = useAppSelector(selectSortConfig);

    const sortConfig: SortConfigState = {
        sortOrder: "asc",
        sortSysName: "creationDate",
    };

    useEffect(() => {
        dispatch(setSortConfig(sortConfig));
    }, []);

    const { data, isFetching } = useGetUsersQuery({
        limit: 9,
        page,
        searchValue,
        sortOrder: sortOrder || sortConfig.sortOrder,
        sortSysName: sortSysName || sortConfig.sortSysName,
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
                                id={"ul"}
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
