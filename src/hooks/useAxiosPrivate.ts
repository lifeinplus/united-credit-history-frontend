import { useEffect, useRef } from "react";

import { useAppSelector } from "../app/hooks";
import { axiosClient } from "../features/api";
import { selectAccessToken } from "../features/auth/authSlice";

import useRefreshAuth from "./useRefreshAuth";

const useAxiosPrivate = () => {
    const refreshRan = useRef(false);

    const accessToken = useAppSelector(selectAccessToken);
    const refreshAuth = useRefreshAuth();

    useEffect(() => {
        const requestIntercept = axiosClient.interceptors.request.use(
            (config) => {
                if (accessToken && !config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;

                if (error?.response?.status === 401 && !refreshRan.current) {
                    refreshRan.current = true;
                    const accessToken = await refreshAuth();
                    prevRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosClient(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosClient.interceptors.request.eject(requestIntercept);
            axiosClient.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refreshAuth]);

    return axiosClient;
};

export default useAxiosPrivate;
