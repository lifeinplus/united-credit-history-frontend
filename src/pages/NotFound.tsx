import classNames from "classnames";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

const NotFound = () => {
    const theme = useAppSelector(selectTheme);
    const textClass = theme === "light" ? "text-dark" : "text-light";

    return (
        <section className="container-fluid">
            <div
                className={classNames(
                    `row panel ${theme} pt-3 pb-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <h3 className={textClass}>404 Not Found</h3>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
