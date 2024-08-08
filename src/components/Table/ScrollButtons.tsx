import { memo } from "react";
import { useTheme } from "../../hooks";
import { TableScrollButtons } from "../../types/Table";

const ScrollButtons = ({ btnRefs, handleScroll }: TableScrollButtons) => {
    const { theme } = useTheme();

    const buttons = [
        { id: "btnStart", ref: "btnStartRef", icon: "bi-chevron-bar-left" },
        { id: "btnLeft", ref: "btnLeftRef", icon: "bi-arrow-left-circle" },
        { id: "btnRight", ref: "btnRightRef", icon: "bi-arrow-right-circle" },
        { id: "btnEnd", ref: "btnEndRef", icon: "bi-chevron-bar-right" },
    ];

    return (
        <aside
            className={`btn-group btn-group-sm uch-btn-group-scroll ${theme}`}
            role="group"
        >
            {buttons.map(({ id, ref, icon }) => (
                <button
                    key={id}
                    id={id}
                    className={`btn btn-primary uch-btn-primary ${theme}`}
                    onClick={handleScroll}
                    ref={btnRefs[ref]}
                    type="button"
                >
                    <i className={`bi ${icon}`}></i>
                </button>
            ))}
        </aside>
    );
};

function propsAreEqual(
    { btnRefs: prevBtnRefs }: Readonly<TableScrollButtons>,
    { btnRefs: nextBtnRefs }: Readonly<TableScrollButtons>
): boolean {
    return Object.keys(prevBtnRefs).every(
        (key) => prevBtnRefs[key] === nextBtnRefs[key]
    );
}

const MemoizedScrollButtons = memo(ScrollButtons, propsAreEqual);

export default MemoizedScrollButtons;
