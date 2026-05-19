import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormModal({modalShow, setModalShow, title, ModalBody, className="!pl-0", size="lg", fetchUserAddress}) {
  return (
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={className}
      // backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <ModalBody fetchUserAddress={fetchUserAddress} setModalShow = {setModalShow}/>
      </Modal.Body>
    
    </Modal>
  );
}




export default FormModal