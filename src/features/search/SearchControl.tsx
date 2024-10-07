import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActivePage } from "../pagination/paginationSlice";
import {
    selectSearchValue,
    setSearchFocus,
    setSearchValue,
} from "./searchSlice";

const SearchControl = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(selectSearchValue);

    useEffect(() => {
        return () => {
            dispatch(setSearchValue(""));
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
            onBlur={() => {
                dispatch(setSearchFocus(false));
            }}
            onChange={(e) => {
                dispatch(setActivePage(1));
                dispatch(setSearchValue(e.target.value));
            }}
            onFocus={() => {
                dispatch(setSearchFocus(true));
            }}
            placeholder="Search"
            ref={searchRef}
            type="search"
            value={searchValue}
        />
    );
};

export default SearchControl;
