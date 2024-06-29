import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { TableDataList } from "../../../types/Table";

const useData = (method?: string) => {
    const [data, setData] = useState<TableDataList>();
    const [refresh, setRefresh] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (method && effectRan.current) {
            axiosPrivate
                .get(method, {
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

export default useData;
