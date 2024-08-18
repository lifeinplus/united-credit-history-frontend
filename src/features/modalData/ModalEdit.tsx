import { memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
    hideModalEdit,
    selectIsModalEdit,
    selectModalData,
    setModalData,
    updateUser,
} from "./modalDataSlice";

const ModalEdit = () => {
    const { t } = useTranslation("modal");

    const dispatch = useAppDispatch();
    const isModalEdit = useAppSelector(selectIsModalEdit);
    const modalData = useAppSelector(selectModalData);

    const { _id, userName, roles } = modalData;

    const handleSave = () => {
        if (_id) {
            dispatch(updateUser({ id: _id, roles }));
        }
    };

    return (
        <Modal
            show={isModalEdit}
            onHide={() => dispatch(hideModalEdit())}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{t("title.edit")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("label.userName")}:</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            defaultValue={userName}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
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
                    onClick={() => dispatch(hideModalEdit())}
                    variant="secondary"
                >
                    {t("button.cancel")}
                </Button>
                <Button onClick={handleSave} variant="primary">
                    {t("button.save")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(ModalEdit);
