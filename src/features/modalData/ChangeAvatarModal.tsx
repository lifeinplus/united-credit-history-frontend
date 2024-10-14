import { ChangeEvent, memo, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    isDataMessageError,
    isFetchBaseQueryError,
} from "../../services/helpers";

import { useChangeUserAvatarByIdMutation } from "../users/usersApiSlice";

import {
    hideChangeAvatarModal,
    selectIsChangeAvatarModal,
    selectModalData,
    setModalData,
} from "./modalDataSlice";

const ChangeAvatarModal = () => {
    const { t } = useTranslation("modal");

    const [avatar, setAvatar] = useState<File>();

    const dispatch = useAppDispatch();
    const isChangeAvatarModal = useAppSelector(selectIsChangeAvatarModal);
    const modalData = useAppSelector(selectModalData);

    const { _id, status } = modalData;

    const [changeUserAvatarById] = useChangeUserAvatarByIdMutation();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            setAvatar(files[0]);
        }
    };

    const handleHide = () => {
        setAvatar(undefined);
        dispatch(hideChangeAvatarModal());
    };

    const handleSave = () => {
        if (!_id) return;

        if (!avatar) {
            toast.error("Please select an avatar to upload");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", avatar);

        dispatch(setModalData({ status: "loading" }));

        const runChangeAvatar = async () => {
            try {
                await changeUserAvatarById({ id: _id, formData }).unwrap();
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

        setTimeout(runChangeAvatar, 500);
    };

    return (
        <Modal show={isChangeAvatarModal} onHide={handleHide} centered>
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
                            onChange={handleFileChange}
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
