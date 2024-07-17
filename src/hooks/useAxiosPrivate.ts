import { useEffect, useRef } from "react";

import { axiosPrivate } from "../api/axios";
import { useAuth } from "../contexts";

import useRefreshAuth from "./useRefreshAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refreshAuth = useRefreshAuth();
    const refreshRan = useRef(false);

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth.accessToken}`;
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
    }, [auth, refreshAuth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
