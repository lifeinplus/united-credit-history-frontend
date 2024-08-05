import { PropsWithChildren, createContext, useReducer } from "react";

interface ModalData extends Record<string, string | number> {}

interface InitState {
    closingRefresh: boolean;
    isModalDelete: boolean;
    isModalEdit: boolean;
    modalData: ModalData;
}

const initState: InitState = {
    closingRefresh: false,
    isModalDelete: false,
    isModalEdit: false,
    modalData: {},
};

const enum REDUCER_ACTION_KIND {
    HIDE_DELETE,
    HIDE_EDIT,
    SET_DATA,
    SET_REFRESH,
    SHOW_DELETE,
    SHOW_EDIT,
}

interface ReducerAction {
    type: REDUCER_ACTION_KIND;
    data?: ModalData;
    closingRefresh?: boolean;
}

const modalDataReducer = (
    state: InitState,
    action: ReducerAction
): InitState => {
    const { closingRefresh, data, type } = action;

    switch (type) {
        case REDUCER_ACTION_KIND.HIDE_DELETE:
            return {
                ...state,
                isModalDelete: false,
            };
        case REDUCER_ACTION_KIND.HIDE_EDIT:
            return {
                ...state,
                isModalEdit: false,
            };
        case REDUCER_ACTION_KIND.SET_DATA:
            if (data) {
                return { ...state, modalData: data };
            }

            return { ...state };
        case REDUCER_ACTION_KIND.SET_REFRESH:
            return {
                ...state,
                closingRefresh: closingRefresh ?? false,
            };
        case REDUCER_ACTION_KIND.SHOW_DELETE:
            return {
                ...state,
                modalData: data ?? {},
                isModalDelete: true,
            };
        case REDUCER_ACTION_KIND.SHOW_EDIT:
            return {
                ...state,
                modalData: data ?? {},
                isModalEdit: true,
            };

        default:
            throw new Error("Unknown reducer action: " + type);
    }
};

const useModalDataContext = () => {
    const [state, dispatch] = useReducer(modalDataReducer, initState);

    const showModalDelete = (data: ModalData) => {
        dispatch({ type: REDUCER_ACTION_KIND.SHOW_DELETE, data: data });
    };

    const showModalEdit = (data: ModalData) => {
        dispatch({ type: REDUCER_ACTION_KIND.SHOW_EDIT, data: data });
    };

    const hideModalDelete = () => {
        dispatch({ type: REDUCER_ACTION_KIND.HIDE_DELETE });
    };

    const hideModalEdit = () => {
        dispatch({ type: REDUCER_ACTION_KIND.HIDE_EDIT });
    };

    const setClosingRefresh = (value: boolean) => {
        dispatch({
            type: REDUCER_ACTION_KIND.SET_REFRESH,
            closingRefresh: value,
        });
    };

    const setModalData = (data: ModalData) => {
        dispatch({ type: REDUCER_ACTION_KIND.SET_DATA, data });
    };

    return {
        state,
        hideModalDelete,
        hideModalEdit,
        setClosingRefresh,
        setModalData,
        showModalDelete,
        showModalEdit,
    };
};

type ModalDataContext = ReturnType<typeof useModalDataContext>;

export const ModalDataContext = createContext<ModalDataContext>({
    state: initState,
    hideModalDelete: () => {},
    hideModalEdit: () => {},
    setClosingRefresh: () => {},
    setModalData: (data: ModalData) => {},
    showModalDelete: () => {},
    showModalEdit: () => {},
});

const ModalDataProvider = ({ children }: PropsWithChildren) => {
    const modalDataContext = useModalDataContext();

    return (
        <ModalDataContext.Provider value={modalDataContext}>
            {children}
        </ModalDataContext.Provider>
    );
};

export default ModalDataProvider;
