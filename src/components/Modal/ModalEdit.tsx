import { memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAxiosPrivate, useModal } from "../../hooks";

const ModalEdit = () => {
    const { t } = useTranslation("modal");
    const axiosPrivate = useAxiosPrivate();

    const {
        isModalEdit,
        modalData,
        hideModalEdit,
        setClosingRefresh,
        setModalData,
    } = useModal();

    const { _id, userName, roles } = modalData;

    const handleSave = () => {
        if (!_id) return;

        axiosPrivate
            .put(`/users/updateById`, { id: _id, roles })
            .then(() => {
                setClosingRefresh(true);
                hideModalEdit();
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <Modal show={isModalEdit} onHide={hideModalEdit} centered>
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
                                setModalData({
                                    ...modalData,
                                    roles: e.target.value,
                                })
                            }
                            rows={3}
                            value={roles}
                        ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hideModalEdit} variant="secondary">
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
