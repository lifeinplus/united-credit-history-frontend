import { useMemo } from "react";
import { TableDataList } from "../../../types/Table";

const useRowActive = (rowActive: boolean, data: TableDataList = []) => {
    return useMemo(() => {
        return rowActive
            ? data?.map((element, index) => ({
                  ...element,
                  activeId: String(index),
              }))
            : data;
    }, [rowActive, data]);
};

export default useRowActive;
