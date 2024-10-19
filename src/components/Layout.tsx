import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import ChangeAvatarModal from "../features/modalData/ChangeAvatarModal";
import ChangePasswordModal from "../features/modalData/ChangePasswordModal";
import DeleteUserModal from "../features/modalData/DeleteUserModal";
import EditUserModal from "../features/modalData/EditUserModal";
import { selectTheme } from "../features/theme/themeSlice";

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
            <ChangeAvatarModal />
            <ChangePasswordModal />
            <DeleteUserModal />
            <EditUserModal />
            <Header />
            <main className="container-fluid">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
