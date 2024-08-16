import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/main.scss";
import "./assets/js/main";

import App from "./App";
import { store } from "./app/store";
import Spinner from "./components/Spinner";
import { AuthProvider, ModalDataProvider } from "./contexts";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <Suspense fallback={<Spinner />}>
            <Provider store={store}>
                <AuthProvider>
                    <ModalDataProvider>
                        <QueryClientProvider client={queryClient}>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/*" element={<App />} />
                                </Routes>
                            </BrowserRouter>
                        </QueryClientProvider>
                    </ModalDataProvider>
                </AuthProvider>
            </Provider>
        </Suspense>
    </StrictMode>
);
