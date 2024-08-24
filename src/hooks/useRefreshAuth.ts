import { useAppDispatch } from "../app/hooks";
import { axiosPrivate } from "../features/api/axios";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshAuth = () => {
    const dispatch = useAppDispatch();

    return async () => {
        const { accessToken, roles, userName } = await axiosPrivate
            .get("auth/refresh")
            .then((response) => response.data);

        dispatch(setCredentials({ accessToken, roles, userName }));

        return accessToken;
    };
};

export default useRefreshAuth;
