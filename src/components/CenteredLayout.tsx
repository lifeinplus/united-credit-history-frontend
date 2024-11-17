import { Outlet } from "react-router-dom";

const CenteredLayout = () => {
    return (
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
            <Outlet />
        </main>
    );
};

export default CenteredLayout;
