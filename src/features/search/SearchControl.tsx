import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearch, setSearch } from "./searchSlice";

const SearchControl = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSearch);

    useEffect(() => {
        return () => {
            dispatch(setSearch(""));
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.code === "KeyF" && searchRef.current) {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Form.Control
            aria-label="Search"
            onChange={(e) => {
                dispatch(setSearch(e.target.value));
            }}
            placeholder="Search"
            ref={searchRef}
            type="search"
            value={search}
        />
    );
};

export default SearchControl;
