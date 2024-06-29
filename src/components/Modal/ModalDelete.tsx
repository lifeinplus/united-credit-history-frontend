import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useModalData } from "../../contexts";
import { useAxiosPrivate } from "../../hooks";

const ModalDelete = () => {
    const effectRan = useRef(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const [activeDelete, setActiveDelete] = useState(false);
    const { t } = useTranslation("modal");

    const axiosPrivate = useAxiosPrivate();
    const { modalData, setModalData } = useModalData();
    const { _id, userName } = modalData;

    useEffect(() => {
        if (_id && activeDelete && effectRan.current === true) {
            setActiveDelete(false);

            axiosPrivate
                .delete(`/users/deleteById/${_id}`)
                .then(() => {
                    setModalData((prev) => ({
                        ...prev,
                        closingRefresh: "yes",
                    }));
                    closeRef.current?.click();
                })
                .catch((error) => console.log(error.message));
        }

        return () => {
            effectRan.current = true;
        };
    }, [_id, activeDelete]);

    return (
        <div
            className="modal fade"
            id="modalDelete"
            tabIndex={-1}
            aria-labelledby="modalDeleteLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalDeleteLabel">
                            {t("title.delete")}
                        </h1>
                        <button
                            aria-label="Close"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            ref={closeRef}
                            type="button"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{t("message.delete", { userName })}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button"
                        >
                            {t("button.cancel")}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                setActiveDelete(true);
                            }}
                            type="button"
                        >
                            {t("button.delete")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
