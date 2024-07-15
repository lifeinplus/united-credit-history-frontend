import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import Spinner from "../components/Spinner";
import { useAuth } from "../contexts";
import { useRefreshToken } from "../hooks";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const effectRan = useRef(false);

    const { auth } = useAuth();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            if (!effectRan.current) return;

            await refreshToken()
                .catch((error) => console.error(error))
                .finally(() => isMounted && setIsLoading(false));
        };

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            effectRan.current = true;
            isMounted = false;
        };
    }, []);

    return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
