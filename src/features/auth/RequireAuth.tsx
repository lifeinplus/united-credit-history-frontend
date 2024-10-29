import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import type { AuthRequireProps } from "../../types";

import { selectRoles, selectUsername } from ".";

const RequireAuth = ({ allowedRoles }: AuthRequireProps) => {
    const roles = useAppSelector(selectRoles);
    const username = useAppSelector(selectUsername);
    const location = useLocation();

    return roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
    ) : username ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
