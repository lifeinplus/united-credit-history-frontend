import { memo } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import { useEditUserByIdMutation } from "../users/usersApiSlice";

import {
    hideEditUserModal,
    selectIsEditUserModal,
    selectModalData,
    setModalData,
} from "./modalDataSlice";

const EditUserModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const isEditUserModal = useAppSelector(selectIsEditUserModal);
    const modalData = useAppSelector(selectModalData);

    const { _id, roles = "", status, userName } = modalData;

    const [editUserById] = useEditUserByIdMutation();

    const handleSave = async () => {
        if (!_id) return;

        dispatch(setModalData({ status: "loading" }));

        const runEditUser = async () => {
            try {
                await editUserById({ id: _id, roles }).unwrap();
                dispatch(hideEditUserModal());
            } catch (error) {
                dispatch(setModalData({ status: "failed" }));

                if (isDataMessageError(error)) {
                    toast.error(error.data.message);
                } else if (isFetchBaseQueryError(error)) {
                    const errMsg =
                        "error" in error
                            ? error.error
                            : JSON.stringify(error.data);
                    toast.error(errMsg);
                } else {
                    console.error(error);
                }
            }
        };

        setTimeout(runEditUser, 500);
    };

    return (
        <Modal
            show={isEditUserModal}
            onHide={() => dispatch(hideEditUserModal())}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{t("title.edit")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="userName" className="mb-3">
                        <Form.Label>{t("label.userName")}:</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            defaultValue={userName}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="roles" className="mb-3">
                        <Form.Label>{t("label.roles")}:</Form.Label>
                        <Form.Control
                            as="textarea"
                            autoFocus
                            onChange={(e) =>
                                dispatch(
                                    setModalData({
                                        roles: e.target.value,
                                    })
                                )
                            }
                            rows={3}
                            value={roles}
                        ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => dispatch(hideEditUserModal())}
                    variant="secondary"
                >
                    {t("button.cancel")}
                </Button>
                <Button
                    disabled={status === "loading"}
                    onClick={handleSave}
                    variant="primary"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("button.save")
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(EditUserModal);
