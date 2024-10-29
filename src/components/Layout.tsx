import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import {
    AvatarChangeModal,
    PasswordChangeModal,
    UserDeleteModal,
    UserEditModal,
} from "../features/modals";
import { selectTheme } from "../features/theme";

import { Footer, Header } from ".";

const Layout = () => {
    const theme = useAppSelector(selectTheme);

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: theme === "dark" ? "#2f343a" : "#f9f9fa",
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                }}
            />
            <AvatarChangeModal />
            <PasswordChangeModal />
            <UserDeleteModal />
            <UserEditModal />
            <Header />
            <main className="container-fluid">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
