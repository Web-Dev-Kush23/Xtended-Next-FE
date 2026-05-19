import React from 'react'
import { Modal } from 'react-bootstrap'
import { useRouter } from "next/router";
import Register from "../../pages/login/register";

const RegisterModal = (props) => {
    const router = useRouter();
    const { phone, firstName, lastName, email,userId } = router.query;
   
  return (
    <div>
        <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>

      <Register
        phoneNumber={phone}
        firstName={firstName} 
        lastName={lastName} 
        email={email} 
        userId={userId}
        regModal={true}
        setRegisterModal={props.setRegisterModal}
        props= {props}
      />
      </Modal.Body>
     
    </Modal>
    </div>
  )
}

export default RegisterModal