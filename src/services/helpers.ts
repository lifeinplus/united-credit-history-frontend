import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { UserId } from "../features/users";

interface DataMessageError {
    data: { message: string };
    status: number;
}

export function ensureAvatar(avatar?: File) {
    if (!avatar) {
        throw new Error("Please select an avatar to upload");
    }
    return avatar;
}

export function ensureUserId(id?: UserId) {
    if (!id) {
        throw new Error("User ID is missing");
    }
    return id;
}

export function isDataMessageError(error: unknown): error is DataMessageError {
    return (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error.data as any).message === "string"
    );
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === "object" && error !== null && "status" in error;
}
