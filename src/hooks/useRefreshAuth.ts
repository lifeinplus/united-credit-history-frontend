import { axiosPrivate } from "../api/axios";
import { useAuth } from "../contexts";

const useRefreshAuth = () => {
    const { setAuth } = useAuth();

    return async () => {
        const { accessToken, roles, userName } = await axiosPrivate
            .get("auth/refresh")
            .then((response) => response.data);

        setAuth((prev) => ({ ...prev, accessToken, roles, userName }));

        return accessToken;
    };
};

export default useRefreshAuth;
