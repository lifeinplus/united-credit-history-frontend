import { useAppDispatch } from "../app/hooks";
import { axiosPrivate } from "../features/api/axios";
import { setCredentials } from "../features/auth/authSlice";
import { AuthState } from "../types/Auth";

const useRefreshAuth = () => {
    const dispatch = useAppDispatch();

    return async () => {
        const data: AuthState = await axiosPrivate
            .get("auth/refresh")
            .then((response) => response.data);

        dispatch(setCredentials(data));

        return data.accessToken;
    };
};

export default useRefreshAuth;
