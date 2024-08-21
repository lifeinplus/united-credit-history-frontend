import { useEffect, useRef } from "react";

import { axiosPrivate } from "../app/api/axios";
import { useAppSelector } from "../app/hooks";
import { selectAccessToken } from "../features/auth/authSlice";

import useRefreshAuth from "./useRefreshAuth";

const useAxiosPrivate = () => {
    const refreshRan = useRef(false);

    const accessToken = useAppSelector(selectAccessToken);
    const refreshAuth = useRefreshAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;

                if (error?.response?.status === 403 && !refreshRan.current) {
                    refreshRan.current = true;
                    const accessToken = await refreshAuth();
                    prevRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refreshAuth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
