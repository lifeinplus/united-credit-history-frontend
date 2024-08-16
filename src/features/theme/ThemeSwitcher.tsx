import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, toggleTheme } from "./themeSlice";

const ThemeSwitcher = () => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    return (
        <button
            type="button"
            className={`btn btn-sm uch-btn-theme ${theme}`}
            onClick={() => dispatch(toggleTheme())}
        ></button>
    );
};

export default ThemeSwitcher;
