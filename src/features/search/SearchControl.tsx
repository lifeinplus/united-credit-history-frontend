import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearch, setSearch } from "./searchSlice";

const SearchControl = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSearch);

    useEffect(() => {
        return () => {
            dispatch(setSearch(""));
        };
    }, []);

    return (
        <Form.Control
            aria-label="Search"
            onChange={(e) => {
                dispatch(setSearch(e.target.value));
            }}
            placeholder="Search"
            type="search"
            value={search}
        />
    );
};

export default SearchControl;
