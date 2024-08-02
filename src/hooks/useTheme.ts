import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

const useTheme = () => {
    const {
        state: { theme },
        toggleTheme,
    } = useContext(ThemeContext);

    return { theme, toggleTheme };
};

export default useTheme;
