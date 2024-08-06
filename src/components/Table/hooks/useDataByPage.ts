import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { MethodParams } from "../../../types/Table";

const useDataByPage = (methodParams: MethodParams, isPagination: boolean) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const axiosPrivate = useAxiosPrivate();
    const { limit, url } = methodParams;

    const getReportsByPage = async (page = 1) => {
        if (!url || !isPagination) return {};

        return await axiosPrivate
            .get(`${url}?page=${page}&limit=${limit}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error(error);

                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });

                return {};
            });
    };

    const { data, error, isError, isPlaceholderData, refetch } = useQuery({
        queryKey: [url, page],
        queryFn: () => getReportsByPage(page),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isError) {
        toast.error(error.message);
    }

    const dataByPage = data?.results;
    const totalPages = data?.totalPages;

    return {
        dataByPage,
        isPlaceholderData,
        page,
        refetch,
        setPage,
        totalPages,
    };
};

export default useDataByPage;
