import { axiosPrivate } from "../api/axios";
import { useAuth } from "../contexts";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const { accessToken, roles, userName } = await axiosPrivate
            .get("auth/refreshToken")
            .then((response) => response.data);

        setAuth((prev) => ({ ...prev, accessToken, roles, userName }));

        return accessToken;
    };
};

export default useRefreshToken;
