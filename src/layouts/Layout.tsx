import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    const theme = useAppSelector((state) => state.theme.theme);

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: theme === "dark" ? "#2f343a" : "#f9f9fa",
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                }}
            />
            <Header />
            <main className="container-fluid">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
