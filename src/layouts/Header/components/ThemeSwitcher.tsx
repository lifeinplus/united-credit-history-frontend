import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleTheme } from "../../../features/theme/themeSlice";

const ThemeSwitcher = () => {
    const theme = useAppSelector((state) => state.theme.theme);
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
