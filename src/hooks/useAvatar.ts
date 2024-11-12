import { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import {
    selectAvatarName,
    selectAvatarVersion,
    selectUserId,
} from "../features/auth";
import useAxiosPrivate from "./useAxiosPrivate";

export const useAvatar = () => {
    const [avatarURL, setAvatarURL] = useState<string>("");
    const avatarName = useAppSelector(selectAvatarName);
    const avatarVersion = useAppSelector(selectAvatarVersion);
    const userId = useAppSelector(selectUserId);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let objectURL: string = "";

        const fetchAvatar = async () => {
            if (!avatarName) return;

            try {
                const response = await axiosPrivate.get(
                    `users/${userId}/avatar/${avatarName}`,
                    { responseType: "blob" }
                );

                const blob = response.data;
                objectURL = URL.createObjectURL(blob);
                setAvatarURL(objectURL);
            } catch (error) {
                console.error(
                    "An error occurred while fetching the avatar:",
                    error
                );
            }
        };

        fetchAvatar();

        return () => {
            setAvatarURL("");
            URL.revokeObjectURL(objectURL);
        };
    }, [avatarName, avatarVersion]);

    return [avatarURL];
};
