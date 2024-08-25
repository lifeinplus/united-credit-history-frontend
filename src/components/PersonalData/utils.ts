import type { ListField } from "../../types/List";
import type { ScoreStyle } from "../../types/PersonalData";
import type { TableColumn } from "../../types/Table";

export const listFields: ListField[] = [
    {
        sysName: "total",
        type: "all",
    },
    {
        sysName: "last24Months",
        type: "all",
    },
    {
        sysName: "last30Days",
        type: "all",
    },
    {
        sysName: "microcreditTotal",
        type: "micro",
    },
    {
        sysName: "microcreditLast30Days",
        type: "micro",
    },
    {
        sysName: "microcreditLastYear",
        type: "micro",
    },
    {
        sysName: "microcreditMore1Year",
        type: "micro",
    },
];

export const tableColumns: TableColumn[] = [
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "dataSource",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "clientName",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sysName: "birthDate",
    },
    {
        alignment: "text-end",
        dataType: "text",
        sysName: "documentSeries",
    },
    {
        alignment: "text-end",
        dataType: "text",
        sysName: "documentNumber",
    },
    {
        alignment: "text-end",
        dataType: "date",
        sysName: "documentIssueDate",
    },
];

export const scoreStyles: ScoreStyle[] = [
    { min: 300, max: 499, style: "text-bg-danger" },
    { min: 500, max: 649, style: "text-bg-warning" },
    { min: 650, max: 799, style: "text-bg-info" },
    { min: 800, max: 850, style: "text-bg-success" },
];
