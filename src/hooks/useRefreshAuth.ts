import { useAppDispatch } from "../app/hooks";
import { axiosClient } from "../features/api";
import { setCredentials } from "../features/auth";
import { AuthState } from "../types";

const useRefreshAuth = () => {
    const dispatch = useAppDispatch();

    return async () => {
        const data: AuthState = await axiosClient
            .get("auth/refresh")
            .then((response) => response.data);

        dispatch(setCredentials(data));

        return data.accessToken;
    };
};

export default useRefreshAuth;
