import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { toggleExtendedData } from "./features/extendedData/extendedDataSlice";
import { selectTheme, toggleTheme } from "./features/theme/themeSlice";
import { Layout } from "./layouts";
import {
    About,
    Login,
    NotFound,
    Register,
    Report,
    Reports,
    Unauthorized,
    Users,
} from "./pages";
import { langs } from "./utils";

const App = () => {
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
        document.body.className = theme;
    }, [theme]);

    document.onkeydown = ({ altKey, code, shiftKey }) => {
        if (!altKey) return;

        if (code === "KeyE") {
            dispatch(toggleExtendedData());
        }

        if (code === "KeyL") {
            changeLanguage(shiftKey);
        }

        if (code === "KeyT") {
            dispatch(toggleTheme());
        }
    };

    function changeLanguage(shiftKey: boolean) {
        const keys = Object.keys(langs);
        const resolvedLanguage = i18n.resolvedLanguage ?? "gb";
        const resolvedIndex = keys.indexOf(resolvedLanguage);

        let nextIndex = shiftKey ? resolvedIndex - 1 : resolvedIndex + 1;

        if (nextIndex >= keys.length) {
            nextIndex = 0;
        }

        if (nextIndex < 0) {
            nextIndex = keys.length - 1;
        }

        i18n.changeLanguage(keys[nextIndex]);
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[2020]} />}>
                        <Route path="/reports">
                            <Route index element={<Reports />} />
                            <Route path=":reportId" element={<Report />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[1010]} />}>
                            <Route path="/users" element={<Users />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
