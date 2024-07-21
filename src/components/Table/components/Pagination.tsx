import classNames from "classnames";

import { useTheme } from "../../../contexts";
import { PageItemProps, PaginationProps } from "../../../types/Pagination";

const Pagination = ({
    isPlaceholderData,
    page,
    setPage,
    totalPages,
}: PaginationProps) => {
    const theme = useTheme();

    const pagesArray = Array(totalPages)
        .fill(undefined)
        .map((_, index) => index + 1);

    return (
        <nav aria-label="Pages">
            <ul className="pagination justify-content-end">
                <PageItem
                    disabled={isPlaceholderData || page === 1}
                    page={page - 1}
                    pageText={"<"}
                    setPage={setPage}
                />
                {pagesArray.map((item) => (
                    <PageItem
                        key={item}
                        active={item === page}
                        disabled={isPlaceholderData}
                        page={item}
                        setPage={setPage}
                    />
                ))}
                <PageItem
                    disabled={isPlaceholderData || page === totalPages}
                    page={page + 1}
                    pageText={">"}
                    setPage={setPage}
                />
            </ul>
        </nav>
    );

    function PageItem({
        active,
        disabled,
        page,
        pageText,
        setPage,
    }: PageItemProps) {
        return (
            <li
                className={classNames(
                    "page-item",
                    active && "active",
                    disabled && "disabled"
                )}
            >
                <button
                    className={classNames(
                        "page-link",
                        `uch-page-link ${theme}`
                    )}
                    onClick={() => setPage(page)}
                >
                    {pageText || page}
                </button>
            </li>
        );
    }
};

export default Pagination;
