import { useTheme } from "../../../hooks";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className={`btn btn-sm uch-btn-theme ${theme}`}
            onClick={toggleTheme}
        ></button>
    );
};

export default ThemeSwitcher;
