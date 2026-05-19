import Loader from '@/components/Loader';
import { fetchDataByCategoryId } from '@/service/packermover';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaLongArrowAltLeft } from "react-icons/fa";

const MobileViewModal = ({ items, setItems, category, setCategory, storageItems, mobileModal, setMobileModal,setShowSelected,type, setShowBtn}) => {
    const [itemList, setItemList] = useState([]);
    const [subCategory, setSubCategory] = useState("");
    const [categoryData, setCategoryData] = useState()
    const [showFilter, setShowFilter] = useState(false)
    const [loader, setLoader] = useState(false)
    const [subCatId, setSubCatId] = useState()

    const handleClose = () => setShowFilter(false);



    const fetchDataByCatgory = async (id, storageItems) => {
        setLoader(true)
        let res = await fetchDataByCategoryId(id, storageItems,type)
        let response = await res?.success ? true : false
        try {
            if (response) {
                setSubCategory(res?.success?.relocationItemCategory?.subCategory)
                setSubCatId(res?.success?.relocationItemCategory?.subCategory?.[0]?.subCategoryId)
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
        }
    }

    const showPopUp = (elem) => {
        fetchDataByCatgory(elem?.categoryId, storageItems)
        setShowFilter(true)
    }

    useEffect(() => {
        if (subCatId) {
            setItemList(subCategory?.filter((elem, id) => elem?.subCategoryId == subCatId)?.[0]?.items)
        }
    }, [subCatId])

    const handleClick = (type, item) => {
        setShowBtn(true)
        setShowSelected(false)
        const existingItem = items.some((elm) => elm?.itemId === item?.itemId);
        if (type == "add") {
            if (existingItem) {
                const updateItem = items.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: elem.quantity + 1 } : elem)
                const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems + 1 } : elem)

                setItems(updateItem)
                setCategory(updateCategory)
            } else {
                const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems + 1 } : elem)
                setCategory(updateCategory)
                let updateNewItem = { ...item, quantity: item.quantity + 1, categoryName: item?.categoryName }
                setItems((prev) => [updateNewItem, ...prev])
            }

        }
        else if (type == "sub") {
            let currentitem = items.find((elem) => elem?.itemId == item.itemId)
            if (existingItem && currentitem.quantity > 1) {
                const updateItem = items.map((elem) => elem?.itemId == item?.itemId ? { ...elem, quantity: elem.quantity - 1 } : elem)
                const updateCategory = category?.map((elem) => elem?.categoryId == item?.categoryId ? { ...elem, selectedItems: elem.selectedItems - 1 } : elem)

                setCategory(updateCategory)
                setItems(updateItem);
            } else {
                const updatedArr = items.filter((elem) => elem?.itemId !== item.itemId);
                setItems(updatedArr);

            }
        }
    }

    return (
        <React.Fragment>
            <div className='fixed w-full left-0 top-[70px] bottom-0 z-[999] bg-blue-100'>
                <h5 className='text-blue-500 flex items-center p-4 text-2xl' onClick={() => setMobileModal(false)}><span><FaLongArrowAltLeft className='text-2xl mr-2' /> </span>Back</h5>

                {
                    category?.map((elem) => {
                        return (
                            <div className='m-3  border-b-2'>
                                <div onClick={() => showPopUp(elem)} className='flex cursor-pointer justify-between items-center px-3 py-1'>
                                    <p
                                        className=" text-gray-800 text-[18px]"
                                    >
                                        {elem?.categoryName}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            {!!subCategory.length &&
                <Modal
                    show={showFilter}
                    onHide={handleClose}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Body>
                        <div className='max-w-screen-lg mx-auto my-2'>

                            <div className='overflow-x-auto bottom-oveflow-none'>
                                <div className='flex items-center justify-between my-4'>
                                    {subCategory?.map((subCat, id) => {
                                        return (
                                            <h2
                                                onClick={() => setSubCatId(subCat?.subCategoryId)}
                                                className={`text-sm whitespace-nowrap ${subCatId == subCat?.subCategoryId ? "bg-[#8DC63F] text-white" : "bg-gray-100 text-gray-800"} px-4 py-2 cursor-pointer mx-2 rounded-2xl font-semibold `}>
                                                {subCat?.subCategoryName}</h2>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-4'>

                                <div className='col-span-2 relative'>
                                    <div className='w-full border'>
                                        <ul className='bg-white h-72 overflow-y-scroll'>
                                            {
                                                itemList?.map((item) => {
                                                    return (
                                                        <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                                            <div className='flex items-center h-12'>
                                                                <img src={item?.itemsIconPath} className='h-full mr-4' />
                                                                <div>
                                                                    <p className='text-[13px] text-slate-700'>{item?.itemName}</p>
                                                                   {!(type=="area-calculator") && <p className='md:text-[10px] text-[10px] text-slate-500 mt-0.5'>L:{item?.length} | W:{item?.breadth} | H:{item?.height} (in inches)</p>}
                                                                </div>
                                                            </div>
                                                            {/* <p>{item?.itemName}</p> */}
                                                            <div>
                                                                <span onClick={() => handleClick("sub", item)} className='mr-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'>-</span>
                                                                {items?.map((elem) => elem?.itemId == item?.itemId ? elem?.quantity : "")}
                                                                <span onClick={() => handleClick("add", item)} className='ml-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'>+</span>
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
                                <button className='bg-[#8DC63F]  text-white px-4 py-2 rounded ' onClick={() => setShowFilter(false)} >Done</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>}
            {loader && <Loader />}
        </React.Fragment>
    )
}

export default MobileViewModal