import { useTheme, useThemeUpdate } from "../../../contexts";

const ThemeSwitcher = () => {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    return (
        <button
            type="button"
            className={`btn btn-sm uch-btn-theme ${theme}`}
            onClick={toggleTheme}
        ></button>
    );
};

export default ThemeSwitcher;
