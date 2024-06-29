import { TableColumn } from "../../types/Table";

export const tableColumns: TableColumn[] = [
    {
        alignment: "text-center",
        dataType: "dateTime",
        sysName: "creationDate",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "userName",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "roles",
    },
];
