import { ChangeEvent, memo } from "react";
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
    hideModal,
    selectModalData,
    selectUserEditModalData,
    setModalData,
    setUserEditModalData,
} from "./modalDataSlice";

const EditUserModal = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();

    const { isResetPassword, roles, show, userId, username } = useAppSelector(
        selectUserEditModalData
    );

    const { status } = useAppSelector(selectModalData);

    const [editUserById] = useEditUserByIdMutation();

    const handleChangeRoles = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setUserEditModalData({
                roles: e.target.value,
            })
        );
    };

    const handleChangeResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setUserEditModalData({
                isResetPassword: e.target.checked,
            })
        );
    };

    const handleHide = () => {
        dispatch(hideModal());
    };

    const handleSave = async () => {
        if (!userId) return;

        dispatch(setModalData({ status: "loading" }));

        const runEditUser = async () => {
            try {
                const response = await editUserById({
                    id: userId,
                    isResetPassword,
                    roles,
                }).unwrap();

                toast.success(response.message);
                handleHide();
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
        <Modal show={show} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.edit")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label>{t("label.username")}:</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            defaultValue={username}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="roles" className="mb-3">
                        <Form.Label>{t("label.roles")}:</Form.Label>
                        <Form.Control
                            as="textarea"
                            autoFocus
                            onChange={handleChangeRoles}
                            rows={3}
                            value={roles}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Check
                        id="resetPassword"
                        checked={isResetPassword}
                        label={t("label.resetPassword")}
                        onChange={handleChangeResetPassword}
                        type={"checkbox"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide} variant="secondary">
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
