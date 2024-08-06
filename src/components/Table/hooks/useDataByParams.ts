import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { MethodParams, TableData } from "../../../types/Table";

const useDataByParams = (methodParams: MethodParams, isPagination: boolean) => {
    const [data, setData] = useState<TableData[]>();
    const [refresh, setRefresh] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    const axiosPrivate = useAxiosPrivate();
    const { options, url } = methodParams;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (
            !isPagination &&
            url &&
            options?.reportId &&
            effectRan.current === true
        ) {
            axiosPrivate
                .get(`/${url}/${options?.reportId}`, {
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
