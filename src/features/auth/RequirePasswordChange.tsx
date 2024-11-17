import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectIsPasswordChangeRequired } from ".";

const RequirePasswordChange = () => {
    const isPasswordChangeRequired = useAppSelector(
        selectIsPasswordChangeRequired
    );

    if (isPasswordChangeRequired) {
        return <Navigate to="/change-password" replace />;
    }

    return <Outlet />;
};

export default RequirePasswordChange;
