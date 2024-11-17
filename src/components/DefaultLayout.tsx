import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <main className="container-fluid">
            <Outlet />
        </main>
    );
};

export default DefaultLayout;
