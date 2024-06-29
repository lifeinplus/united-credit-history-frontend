import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { MethodParams, TableDataList } from "../../../types/Table";

const useDataByParams = (method?: string, params?: MethodParams) => {
    const [data, setData] = useState<TableDataList>();
    const [refresh, setRefresh] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    const axiosPrivate = useAxiosPrivate();

    const reportId = params?.reportId;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (method && reportId && effectRan.current === true) {
            axiosPrivate
                .get(`/${method}/${reportId}`, {
                    signal: controller.signal,
                })
                .then((response) => {
                    isMounted && setData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                })
                .finally(() => setRefresh(false));
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRan.current = true;
        };
    }, [refresh]);

    const requestRefresh = () => {
        setRefresh(true);
    };

    return [data, requestRefresh] as const;
};

export default useDataByParams;
