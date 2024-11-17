import { ChangeEvent, memo } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../utils";
import { useEditUserByIdMutation, type UserId } from "../users";
import {
    hideModals,
    selectStatus,
    selectUserEditData,
    setStatus,
    setUserEditData,
} from ".";

const UserEditModal = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { isResetPassword, roles, show, userId, username } =
        useAppSelector(selectUserEditData);

    const [editUserById] = useEditUserByIdMutation();

    const handleChangeRoles = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setUserEditData({
                roles: e.target.value,
            })
        );
    };

    const handleChangeResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setUserEditData({
                isResetPassword: e.target.checked,
            })
        );
    };

    const handleHide = () => {
        dispatch(hideModals());
    };

    const handleSave = async () => {
        try {
            const verifiedUserId = ensureUserId(userId);
            dispatch(setStatus("loading"));
            setTimeout(() => editUser(verifiedUserId), 500);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const editUser = async (id: UserId) => {
        try {
            const response = await editUserById({
                id,
                isResetPassword,
                roles,
            }).unwrap();

            toast.success(response.message);
            handleHide();
        } catch (error) {
            dispatch(setStatus("failed"));

            if (isDataMessageError(error)) {
                toast.error(error.data.message);
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    "error" in error ? error.error : JSON.stringify(error.data);
                toast.error(errMsg);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("titles.edit")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label>{t("labels.username")}:</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            defaultValue={username}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="roles" className="mb-3">
                        <Form.Label>{t("labels.roles")}:</Form.Label>
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
                        label={t("labels.resetPassword")}
                        onChange={handleChangeResetPassword}
                        type={"checkbox"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide} variant="secondary">
                    {t("buttons.cancel")}
                </Button>
                <Button
                    disabled={status === "loading"}
                    onClick={handleSave}
                    variant="primary"
                >
                    {status === "loading" ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("buttons.save")
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(UserEditModal);
