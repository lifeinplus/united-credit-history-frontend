import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import type { AuthRequireProps } from "../../types/Auth";
import { selectRoles, selectUserName } from "./authSlice";

const RequireAuth = ({ allowedRoles }: AuthRequireProps) => {
    const roles = useAppSelector(selectRoles);
    const userName = useAppSelector(selectUserName);
    const location = useLocation();

    return roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
    ) : userName ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
