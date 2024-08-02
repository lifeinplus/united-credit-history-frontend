import { PropsWithChildren, createContext, useEffect, useReducer } from "react";

interface InitState {
    theme: string;
}

const initState: InitState = {
    theme: localStorage.getItem("theme") || "light",
};

const enum REDUCER_ACTION_KIND {
    TOGGLE_THEME,
}

interface ReducerAction {
    type: REDUCER_ACTION_KIND;
}

const themeReducer = (state: InitState, action: ReducerAction): InitState => {
    switch (action.type) {
        case REDUCER_ACTION_KIND.TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === "light" ? "dark" : "light",
            };
        default:
            throw new Error("Unknown reducer action: " + action.type);
    }
};

const useThemeContext = () => {
    const [state, dispatch] = useReducer(themeReducer, initState);

    const toggleTheme = () => {
        return dispatch({ type: REDUCER_ACTION_KIND.TOGGLE_THEME });
    };

    return { state, toggleTheme };
};

type ThemeContextType = ReturnType<typeof useThemeContext>;

export const ThemeContext = createContext<ThemeContextType>({
    state: initState,
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const themeContext = useThemeContext();
    const { theme } = themeContext.state;

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeContext}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
