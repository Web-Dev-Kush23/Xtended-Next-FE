import React from 'react';
import Modal from 'react-bootstrap/Modal';

function FormModal({ modalShow, setModalShow, ModalBody, title }) {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ModalBody && <ModalBody />}
      </Modal.Body>
    </Modal>
  );
}

export default FormModal;
