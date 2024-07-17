import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import Spinner from "../components/Spinner";
import { useAuth } from "../contexts";
import { useRefreshAuth } from "../hooks";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const effectRan = useRef(false);

    const { auth } = useAuth();
    const refreshAuth = useRefreshAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshAuth = async () => {
            if (!effectRan.current) return;

            await refreshAuth()
                .catch((error) => console.error(error))
                .finally(() => isMounted && setIsLoading(false));
        };

        !auth.accessToken ? verifyRefreshAuth() : setIsLoading(false);

        return () => {
            effectRan.current = true;
            isMounted = false;
        };
    }, []);

    return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
