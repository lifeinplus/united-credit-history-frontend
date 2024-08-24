import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/main.scss";
import "./assets/js/main";

import { store } from "./app/store";
import { Spinner } from "./components";
import App from "./App";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <Suspense fallback={<Spinner />}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </Suspense>
    </StrictMode>
);
