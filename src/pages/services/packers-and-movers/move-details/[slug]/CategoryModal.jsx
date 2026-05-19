import Loader from '@/components/Loader';
import { fetchDataByCategoryId } from '@/service/packermover';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowForward } from 'react-icons/io';

const CategoryModal = ({ modalShow, setModalShow, items, setItems, category, setCategory, storageItems, catId, setCatId,setShowSelected, type, setShowBtn }) => {

  const [categoryData, setCategoryData] = useState()
  const [subCategoryData, setSubCategoryData] = useState()
  const [filterItem, setFilterItem] = useState([])
  const [loader, setLoader] = useState(false)

  const handleClose = () => {
    setModalShow(false)
    setCategoryData()
    setSubCategoryData()
  }

  const fetchDataByCatgory = async (id, storageItems) => {
    setLoader(true)
    let res = await fetchDataByCategoryId(id, storageItems, type)
    let response = await res?.success ? true : false
    try {
      if (response) {
        setCategoryData(res?.success?.relocationItemCategory)
        setSubCategoryData(res?.success?.relocationItemCategory?.subCategory?.[0]?.subCategoryName)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchDataByCatgory(catId, storageItems)
  }, [catId, modalShow])

  const handleClick = (type, item) => {
    setShowBtn(true)
    setShowSelected(false)
    const existingItem = items.some((elm) => elm?.itemId === item?.itemId);
    if (type == "add") {
      if (existingItem) {
        const updateItem = items.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: elem.quantity + 1 } : elem)
        // const updateFilterItem = items.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: item.quantity + 1 } : elem)
        const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems + 1 } : elem)

        setItems(updateItem)
        setCategory(updateCategory)
      } else {
        const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems + 1 } : elem)
        // const updateFilterItem = filterItem.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: item.quantity + 1 } : elem)
        setCategory(updateCategory)
        // setFilterItem(updateFilterItem)
        let updateNewItem = { ...item, quantity: item.quantity + 1, categoryName: item?.categoryName }
        setItems((prev) => [updateNewItem, ...prev])
      }

    }
    else if (type == "sub") {
      let currentitem = items.find((elem) => elem?.itemId == item.itemId)
      if (existingItem && currentitem.quantity > 1) {
        const updateItem = items.map((elem) => elem?.itemId == item?.itemId ? { ...elem, quantity: elem.quantity - 1 } : elem)
        // const updateFilterItem = items.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: item.quantity - 1 } : elem)
        const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems - 1 } : elem)

        setCategory(updateCategory)
        // setFilterItem(updateFilterItem)
        setItems(updateItem);
      } else {
        const updatedArr = items.filter((elem) => elem?.itemId !== item.itemId);
        setItems(updatedArr);

      }
    }
  }

  const handleSubCat = (subCat) => {
    setSubCategoryData(subCat?.subCategoryName)
  }

  useEffect(() => {
    if (setCategoryData) {
      setFilterItem(categoryData?.subCategory?.filter((x) => x?.subCategoryName == subCategoryData)?.[0]?.items)
    }
  }, [subCategoryData])

  return (
    // <Modal
    // show={modalShow}
    // onHide={handleClose}
    //   size="xl"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   <Modal.Header closeButton>

    //     <h4 className='text-2xl font-semibold text-blue-600 '>EXPLORE CATEGORIES</h4>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <div className='grid grid-cols-3 gap-3 m-8'>
    //         {category.map((elem)=>{
    //             return(
    //                 <div className='relative' onClick={()=>handleCategoryRoute(elem)}>
    //                 <div className='border rounded bg-blue-100 place-content-between px-4 py-4'>{elem?.categoryName}</div>
    //                 <p className='absolute top-0 right-0 px-2 rounded-sm bg-blue-500 text-white text-sm '>{elem?.selectedItems} item selected</p>
    //                 </div>
    //             )
    //         })}
    //     </div>
    //   </Modal.Body>
    // </Modal>
    <React.Fragment>
      {filterItem?.length > 0 &&
        <Modal
          show={modalShow}
          onHide={handleClose}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >

          <Modal.Body>
            <div className='max-w-screen-lg mx-auto my-2'>

              <div className='overflow-x-auto  mt-4 mb-2 bottom-oveflow'>
                <div className='flex items-center justify-between mb-2'>
                  {category?.map((elem, id) => {
                    return (
                      <h2 onClick={() => { fetchDataByCatgory(elem?.categoryId, storageItems); setCatId(elem?.categoryId) }} className={`text-sm whitespace-nowrap ${elem?.categoryId == catId ? "bg-[#8DC63F] text-white" : "bg-gray-100 text-gray-800"} px-4 py-2 cursor-pointer mx-2 rounded-2xl font-semibold `}>
                        {elem?.categoryName}
                      </h2>
                    )
                  })}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-1'>
                  <div className='w-full border'>
                    <ul className='bg-white h-72 overflow-y-scroll'>
                      {
                        categoryData?.subCategory?.map((subCat, id) => {
                          return (
                            <li key={id} onClick={() => handleSubCat(subCat)} className={`border cursor-pointer ${subCat?.subCategoryName == subCategoryData ? "bg-[#8DC63F] text-white" : "bg-gray-100 text-gray-800"}  border-b p-3 flex justify-between items-center`}>
                              <img src={subCat?.subCategoryIconPath} className='h-full w-11 mr-4' />
                              <p>{subCat?.subCategoryName}</p>
                              <div className='flex items-center'><span className={`mr-2 px-2 pb-[1px] text-[16px] border ${subCat?.subCategoryName == subCategoryData ? "text-white border-white" : "text-black border-gray-800"} font-medium  rounded-full `}>
                                {items.filter((i) => i.subCategoryName == subCat?.subCategoryName)?.map((x) => x.quantity)?.reduce((acc, curr) => acc + curr, 0)}
                                {/* {subCat?.selectedItems} */}
                              </span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>
                            </li>
                          )
                        })
                      }


                    </ul>
                  </div>
                </div>
                <div className='col-span-2 relative'>
                  <div className='w-full border'>
                    <ul className='bg-white h-72 overflow-y-scroll'>
                      {
                        filterItem?.map((item) => {
                          return (
                            <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                              <div className='flex items-center h-12'>
                                <img src={item?.itemsIconPath} className='h-full mr-4' />
                                <div>
                                  <p>{item?.itemName}</p>
                                  {!(type=="area-calculator") && <p className='text-sm text-slate-500 mt-0.5'>L:{item?.length} | W:{item?.breadth} | H:{item?.height} (in inches)</p>}
                                </div>
                              </div>
                              {/* <p>{item?.itemName}</p> */}
                              
                              {/* <div>
                                <span onClick={() => handleClick("sub", item)} className='mr-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'>-</span>
                                {items?.map((elem) => elem?.itemId == item?.itemId ? elem?.quantity : "")}
                                <span onClick={() => handleClick("add", item)} className='ml-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'>+</span>
                              </div> */}

                              <div className='text-lg flex justify-between font-semibold text-gray-800'>
                                <div onClick={() => handleClick("sub", item)} className=' px-2 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>-</div>
                                <div className='w-[25px] text-center'>{items?.map((elem) => elem?.itemId == item?.itemId ? elem?.quantity : "")}</div>
                                <div onClick={() => handleClick("add", item)} className=' px-1.5 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>+</div>
                              </div>

                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className='mt-4  flex justify-end items-center'>
                <button className='bg-[#8DC63F]  text-white px-4 py-2 rounded ' onClick={() => handleClose()} >Done</button>
              </div>
            </div>
          </Modal.Body>
          {loader && <Loader />}
        </Modal>}
    </React.Fragment>
  );
}

export default CategoryModal