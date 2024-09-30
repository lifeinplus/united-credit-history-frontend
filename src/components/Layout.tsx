import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import ChangePasswordModal from "../features/modalData/ChangePasswordModal";
import ModalDelete from "../features/modalData/ModalDelete";
import ModalEdit from "../features/modalData/ModalEdit";
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
            <ChangePasswordModal />
            <ModalDelete />
            <ModalEdit />
            <Header />
            <main className="container-fluid">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
