import { useMemo } from "react";
import type { TableData } from "../../../types/Table";

const useRowActive = (isRowActive: boolean, data: TableData[] = []) => {
    return useMemo(() => {
        return isRowActive
            ? data.map((element, index) => ({
                  ...element,
                  activeId: String(index),
              }))
            : data;
    }, [isRowActive, data]);
};

export default useRowActive;
