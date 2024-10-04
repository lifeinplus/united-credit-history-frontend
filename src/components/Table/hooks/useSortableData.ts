import { useMemo } from "react";

import { useAppSelector } from "../../../app/hooks";
import { selectSortConfig } from "../../../features/sortConfig/sortConfigSlice";
import type { SortCompare } from "../../../types/Sort";
import type { TableData } from "../../../types/Table";

const useSortableData = (data: TableData[]) => {
    const { sortOrder, sortSysName, sortSysNameStatus, sortType } =
        useAppSelector(selectSortConfig);

    const sortedData = useMemo(() => {
        if (!sortType || !sortSysName) return data;

        const more = sortOrder === "asc" ? 1 : -1;
        const less = sortOrder === "asc" ? -1 : 1;

        const compareFunction = getCompareFunction(sortType);

        const result = [...data].sort((a, b) => {
            const result = compareFunction({
                statusA: a[sortSysNameStatus || ""],
                statusB: b[sortSysNameStatus || ""],
                valueA: a[sortSysName],
                valueB: b[sortSysName],
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
    }, [data, sortOrder, sortSysName]);

    return sortedData;
};

function getCompareFunction(type: string) {
    const _compareFunctions: Record<string, SortCompare> = {
        numeric({ statusA, statusB, valueA, valueB }) {
            if (statusA === "Calculation Error") return { order: -1 };
            if (statusB === "Calculation Error") return { order: 1 };

            const numberA = Number(valueA);
            const numberB = Number(valueB);

            if (isNaN(numberA)) return { order: 1 };
            if (isNaN(numberB)) return { order: -1 };

            return { resultA: numberA, resultB: numberB };
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
