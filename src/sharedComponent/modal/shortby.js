import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormModal({modalShow, setModalShow, title, ModalBody, className="", size="lg", fetchUserAddress, onChangeFilter}) {
  return (
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
    //   centered
      dialogClassName="  w-full top-[40%]  mx-[auto] absolute rounder" 
    //   className={className}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Sort By
         {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <ModalBody onChangeFilter={onChangeFilter} fetchUserAddress={fetchUserAddress} setModalShow = {setModalShow}/>
      </Modal.Body>
    
    </Modal>
  );
}




export default FormModal