import { ChangeEvent, memo, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    ensureAvatar,
    ensureUserId,
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import {
    useChangeUserAvatarByIdMutation,
    type UserId,
} from "../users/usersApiSlice";

import {
    hideModals,
    selectStatus,
    selectAvatarChangeData,
    setStatus,
} from "./modalsSlice";

const ChangeAvatarModal = () => {
    const { t } = useTranslation("modal");
    const [avatar, setAvatar] = useState<File>();

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { show, userId } = useAppSelector(selectAvatarChangeData);

    const [changeUserAvatarById] = useChangeUserAvatarByIdMutation();

    const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            setAvatar(files[0]);
        }
    };

    const handleHide = () => {
        setAvatar(undefined);
        dispatch(hideModals());
    };

    const handleSave = () => {
        try {
            const verifiedAvatar = ensureAvatar(avatar);
            const verifiedUserId = ensureUserId(userId);
            dispatch(setStatus("loading"));
            setTimeout(() => changeAvatar(verifiedUserId, verifiedAvatar), 500);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const changeAvatar = async (id: UserId, avatar: File) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        try {
            const response = await changeUserAvatarById({
                id,
                formData,
            }).unwrap();

            toast.success(response.message);
            handleHide();
        } catch (error) {
            dispatch(setStatus("failed"));
            console.error(error);

            if (isDataMessageError(error)) {
                toast.error(error.data.message);
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    "error" in error ? error.error : JSON.stringify(error.data);
                toast.error(errMsg);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title.changeAvatar")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="selectAvatar" className="mb-3">
                        <Form.Label>{t("label.selectAvatar")}</Form.Label>
                        <Form.Control
                            accept="image/*"
                            autoFocus
                            onChange={handleAvatar}
                            type="file"
                        />
                    </Form.Group>
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

export default memo(ChangeAvatarModal);
