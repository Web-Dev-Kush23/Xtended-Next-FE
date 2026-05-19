import Modal from 'react-bootstrap/Modal';

 const CategoryModal=(props)=> {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>

        <h4 className='text-2xl font-semibold text-blue-600 '>EXPLORE CATEGORIES</h4>
      </Modal.Header>
      <Modal.Body>
        <div className='grid grid-cols-3 gap-3 m-8'>
            {[0,0,0,0,0,0,0,0].map((elem)=>{
                return(
                    <div className='relative'>
                    <div className='border rounded bg-blue-100 place-content-between px-4 py-4'>Furniture</div>
                    <p className='absolute top-0 right-0 px-2 rounded-sm bg-blue-500 text-white text-sm '>12 item selected</p>
                    </div>
                )
            })}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CategoryModal