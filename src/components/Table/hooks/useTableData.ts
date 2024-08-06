import { MouseEvent, useEffect, useState } from "react";

import { MethodParams, TableData, TableSortConfig } from "../../../types/Table";

import {
    useData,
    useDataByPage,
    useDataByParams,
    useRowActive,
    useSortableData,
} from ".";

const useTableData = (
    methodParams: MethodParams,
    isPagination: boolean,
    isRowActive: boolean,
    sorting: TableSortConfig,
    data?: TableData[]
) => {
    const [tableData, setTableData] = useState<TableData[]>();

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const { options } = methodParams;

    const [methodData, requestRefresh] = options
        ? useDataByParams(methodParams, isPagination)
        : useData(methodParams, isPagination);

    useEffect(() => {
        setTableData(methodData);
    }, [methodData]);

    const {
        dataByPage,
        isPlaceholderData,
        page,
        refetch,
        setPage,
        totalPages,
    } = useDataByPage(methodParams, isPagination);

    useEffect(() => {
        setTableData(dataByPage);
    }, [dataByPage]);

    const rowActiveData = useRowActive(isRowActive, tableData);

    const [sortedData, requestSort, sortDirection, sortSysName] =
        useSortableData(rowActiveData, sorting);

    return {
        isPlaceholderData,
        page,
        refetch,
        requestRefresh,
        requestSort,
        setPage,
        setTableData,
        sortDirection,
        sortSysName,
        tableData: sortedData,
        totalPages,
    };
};

export default useTableData;
