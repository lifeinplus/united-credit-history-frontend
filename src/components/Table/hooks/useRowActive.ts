import { useMemo } from "react";
import { TableData } from "../../../types/Table";

const useRowActive = (rowActive: boolean, data: TableData[] = []) => {
    return useMemo(() => {
        return rowActive
            ? data.map((element, index) => ({
                  ...element,
                  activeId: String(index),
              }))
            : data;
    }, [rowActive, data]);
};

export default useRowActive;
