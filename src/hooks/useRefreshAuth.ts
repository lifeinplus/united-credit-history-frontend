import { useAppDispatch } from "../app/hooks";
import { axiosPrivate } from "../features/api/axios";
import { setCredentials } from "../features/auth/authSlice";
import { AuthState } from "../types/Auth";

const useRefreshAuth = () => {
    const dispatch = useAppDispatch();

    return async () => {
        const { accessToken, roles, userId, userName }: AuthState =
            await axiosPrivate
                .get("auth/refresh")
                .then((response) => response.data);

        dispatch(setCredentials({ accessToken, roles, userId, userName }));

        return accessToken;
    };
};

export default useRefreshAuth;
