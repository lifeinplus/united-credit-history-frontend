import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { PanelHeader, Table } from "../../components";
import { useTheme } from "../../hooks";

import { tableColumns } from "./utils";

const UserList = () => {
    const { theme } = useTheme();
    const { t } = useTranslation(["user_list"]);

    const columns = tableColumns.map((item) => ({
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
                        nameSpaces={["user_list"]}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"ul"}
                                columns={columns}
                                isActions={true}
                                isPagination={true}
                                isRowHover={true}
                                methodParams={{
                                    limit: 5,
                                    url: "users/getPaginated",
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
