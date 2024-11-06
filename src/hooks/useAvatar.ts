import { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { selectAvatarPath } from "../features/auth";
import useAxiosPrivate from "./useAxiosPrivate";

export const useAvatar = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const avatarPath = useAppSelector(selectAvatarPath);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchAvatar = async () => {
            if (avatarPath) {
                try {
                    const response = await axiosPrivate.get(avatarPath, {
                        responseType: "blob",
                    });

                    const blob = response.data;
                    const objectUrl = URL.createObjectURL(blob);
                    setAvatarUrl(objectUrl);

                    return () => URL.revokeObjectURL(objectUrl);
                } catch (error) {
                    console.error(
                        "An error occurred while fetching the avatar:",
                        error
                    );
                }
            }
        };

        fetchAvatar();
    }, [avatarPath]);

    return avatarUrl;
};
