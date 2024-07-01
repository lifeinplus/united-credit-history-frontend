import { useEffect, useState } from "react";

import {
    MethodParams,
    TableData,
    TableSortClass,
    TableSortConfig,
} from "../../../types/Table";

import {
    useData,
    useDataByPage,
    useDataByParams,
    useRowActive,
    useSortableData,
} from ".";

const useTableData = (
    methodParams: MethodParams,
    pagination: boolean,
    rowActive: boolean,
    sorting: TableSortConfig,
    data?: TableData[]
) => {
    const [tableData, setTableData] = useState<TableData[]>();

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const { options } = methodParams;

    const [methodData, requestRefresh] = options
        ? useDataByParams(methodParams, pagination)
        : useData(methodParams, pagination);

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
    } = useDataByPage(methodParams, pagination);

    useEffect(() => {
        setTableData(dataByPage);
    }, [dataByPage]);

    const rowActiveData = useRowActive(rowActive, tableData);

    const [sortedData, requestSort, sortConfig] = useSortableData(
        rowActiveData,
        sorting
    );

    const requestSortClass: TableSortClass = (sysName) => {
        return sortConfig && sortConfig.sysName === sysName
            ? sortConfig.direction
            : undefined;
    };

    return {
        isPlaceholderData,
        page,
        refetch,
        requestRefresh,
        requestSort,
        requestSortClass,
        setPage,
        setTableData,
        tableData: sortedData,
        totalPages,
    };
};

export default useTableData;
