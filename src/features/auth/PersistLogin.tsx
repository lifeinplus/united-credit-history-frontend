import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner";
import { selectAccessToken } from "./authSlice";
import { useRefreshAuth } from "../../hooks";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const effectRan = useRef(false);

    const accessToken = useAppSelector(selectAccessToken);
    const refreshAuth = useRefreshAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshAuth = async () => {
            if (!effectRan.current) return;

            await refreshAuth()
                .catch((error) => console.error(error))
                .finally(() => isMounted && setIsLoading(false));
        };

        !accessToken ? verifyRefreshAuth() : setIsLoading(false);

        return () => {
            effectRan.current = true;
            isMounted = false;
        };
    }, []);

    return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
