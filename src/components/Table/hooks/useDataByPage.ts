import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAxiosPrivate } from "../../../hooks";
import { MethodParams } from "../../../types/Table";

const useDataByPage = (methodParams: MethodParams, pagination: boolean) => {
    const [page, setPage] = useState(1);
    const axiosPrivate = useAxiosPrivate();
    const { limit, url } = methodParams;

    const getReportsByPage = async (page = 1) => {
        if (!url || !pagination) return {};

        const response = await axiosPrivate.get(
            `${url}?page=${page}&limit=${limit}`
        );

        return response.data;
    };

    const { data, error, isError, isPlaceholderData, refetch } = useQuery({
        queryKey: [url, page],
        queryFn: () => getReportsByPage(page),
        placeholderData: keepPreviousData,
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
