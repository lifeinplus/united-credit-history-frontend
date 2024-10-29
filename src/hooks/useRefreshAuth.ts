import { useAppDispatch } from "../app/hooks";
import { axiosPrivate } from "../features/api";
import { setCredentials } from "../features/auth";
import { AuthState } from "../types";

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
