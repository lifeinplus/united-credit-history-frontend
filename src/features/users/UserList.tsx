import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PanelHeader, Table } from "../../components";
import type { HandleSetPage } from "../../types/Pagination";
import { userListColumns } from "../../utils";

import { selectTheme } from "../theme/themeSlice";

import { useGetUsersQuery } from "./usersApiSlice";
import { selectLimit, selectPage, setPage } from "./usersSlice";

const UserList = () => {
    const { t } = useTranslation(["user_list"]);

    const dispatch = useAppDispatch();

    const limit = useAppSelector(selectLimit);
    const page = useAppSelector(selectPage);
    const theme = useAppSelector(selectTheme);

    const { data, isFetching } = useGetUsersQuery({ limit, page });

    const users = data?.results;
    const totalPages = data?.totalPages;

    const columns = userListColumns.map((item) => ({
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
                        iconName={"bi bi-people"}
                        nameSpaces={["user_list"]}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"ul"}
                                columns={columns}
                                data={users}
                                isActions={true}
                                isPagination={true}
                                isRowHover={true}
                                paginationParams={{
                                    isFetching,
                                    page,
                                    setPage: handleSetPage,
                                    totalPages,
                                }}
                                sorting={{ sysName: "creationDate" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserList;
