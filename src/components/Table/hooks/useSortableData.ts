import { useMemo, useState } from "react";
import {
    TableSortConfig,
    TableColumn,
    TableData,
    TableSortCompare,
} from "../../../types/Table";

const useSortableData = (data: TableData[] = [], config: TableSortConfig) => {
    const { dataType, direction } = config;

    if (!dataType) config.dataType = "date";
    if (!direction) config.direction = "asc";

    const [sortConfig, setSortConfig] = useState(config);

    const sortedData = useMemo(() => {
        const { dataType, direction, sysName, sysNameStatus } = sortConfig;

        if (!dataType || !sysName) return data;

        const more = direction === "asc" ? 1 : -1;
        const less = direction === "asc" ? -1 : 1;

        const result = [...data].sort((a, b) => {
            const compare = getCompareFunction(dataType);

            const result = compare({
                statusA: a[sysNameStatus || ""],
                statusB: b[sysNameStatus || ""],
                valueA: a[sysName],
                valueB: b[sysName],
            });

            const { order, resultA, resultB } = result;

            if (order) return order;

            if (
                resultA !== undefined &&
                resultB !== undefined &&
                resultA > resultB
            ) {
                return more;
            }

            return less;
        });

        return result;
    }, [data, sortConfig]);

    const requestSort = (column: TableColumn) => {
        let direction = "asc";

        if (
            sortConfig &&
            sortConfig.sysName === column.sysName &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }

        setSortConfig({ ...column, direction });
    };

    return [sortedData, requestSort, sortConfig] as const;
};

function getCompareFunction(type: string) {
    const _compareFunctions: Record<string, TableSortCompare> = {
        amount({ statusA, statusB, valueA, valueB }) {
            if (statusA === "Ошибка вычисления") return { order: -1 };
            if (statusB === "Ошибка вычисления") return { order: 1 };

            if (isNaN(Number(valueA))) return { order: 1 };
            if (isNaN(Number(valueB))) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },

        numeric({ statusA, statusB, valueA, valueB }) {
            if (statusA === "Ошибка вычисления") return { order: -1 };
            if (statusB === "Ошибка вычисления") return { order: 1 };

            if (isNaN(Number(valueA))) return { order: 1 };
            if (isNaN(Number(valueB))) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },

        numericArray({ valueA = "", valueB = "" }) {
            const arrayA = String(valueA).split(",");
            const arrayB = String(valueB).split(",");

            const resultA = parseInt(arrayA[0]);
            const resultB = parseInt(arrayB[0]);

            if (isNaN(resultA)) return { order: 1 };
            if (isNaN(resultB)) return { order: -1 };

            return { resultA, resultB };
        },

        text({ valueA = "", valueB = "" }) {
            if (!valueA) return { order: 1 };
            if (!valueB) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },
    };

    const func = _compareFunctions[type];
    return func || _compareFunctions.text;
}

export default useSortableData;
