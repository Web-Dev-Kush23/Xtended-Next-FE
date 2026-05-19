"use client"
import React, { useEffect, useRef, useState } from 'react'
import Footer from "@/components/footer";
import HeaderMenu from '@/components/header/header'
import CategoryModal from './CategoryModal';
import { useRouter } from 'next/router';
import { fetchpmdata, savepackerMoverDataItem } from '@/service/packermover';
import Loader from '@/components/Loader';
import MobileViewModal from './MobileViewModal';
import { localStorageManager } from '@/util/common';

const index = () => {

    const router = useRouter()
    const [userDetails, setUserDetails] = useState()
    const [modalShow, setModalShow] = useState(false)
    const [pmData, setPmData] = useState()
    const [items, setItems] = useState([])
    const [category, setCategory] = useState([])
    const [search, setSearch] = useState('')
    const [catId, setCatId] = useState()
    const [loader, setLoader] = useState(false)
    const [mobileModal, setMobileModal] = useState(false)
    const [showBtn, setShowBtn] = useState(false)
    const [outSide, setOuSide] = useState(false);
    const [showSelected, setShowSelected] = useState(true)
    const outSideRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (outSideRef.current && !outSideRef.current.contains(event.target)) {
                setOuSide(false);
                setSearch('')
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const fetchPackerMoverData = async () => {
        setLoader(true)
        let res = await fetchpmdata(router.query.slug)
        let response = await res?.success ? true : false
        try {
            if (response) {
                setPmData(res?.success)
                const detected = res?.success?.packersAndMovers?.detectedItems;
    const selected = res?.success?.packersAndMovers?.relocationSelectedItems;
    setItems(detected?.length > 0 ? detected : selected);

                // setItems(res?.success?.packersAndMovers?.relocationSelectedItems)
                setCategory(res?.success?.packersAndMovers?.relocationCategories)
                setLoader(false)
                let xsMoverDetails = {
                    deliveryAddress: {
                        ...res?.success?.packersAndMovers?.deliveryAddress
                    },
                    pickupAddress: {
                        ...res?.success?.packersAndMovers?.pickupAddress
                    },
                    storageRequirement: res?.success?.packersAndMovers?.storageRequirement,
                    moveDate: res?.success?.packersAndMovers?.startDate
                }
                localStorageManager.setValue("xsMoverDetails", JSON.stringify(xsMoverDetails))
            }
        } catch (error) {
            setLoader(false)
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchPackerMoverData()

            const userData = localStorageManager.getValue("userDetails") &&
                JSON.parse(localStorageManager.getValue("userDetails"));
            setUserDetails(userData)
        }
    }, [router.query.slug])


    const itemArr = pmData?.packersAndMovers?.relocationItems?.map((elem) => elem)

    const handleClick = (type, item) => {
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
                setItems(updateItem);
            } else {
                const updatedArr = items.filter((elem) => elem?.itemId !== item.itemId);
                setItems(updatedArr);

            }
        }
    }

    const handleSave = async () => {
        setLoader(true)
        let payload = {
            packersAndMoversId: pmData?.packersAndMovers?.id,
            selectedProducts: items?.map((elem) => ({ itemId: elem?.itemId, quantity: elem?.quantity }))
        }
        let res = await savepackerMoverDataItem(payload, userDetails?.userId)
        let response = await res?.success ? true : false
        if (response) {
            localStorageManager.setValue("xsMoverDetails", {})
            router.push(`/services/packers-and-movers/checkout?pmId=${pmData?.packersAndMovers?.id}`)
            // router.push("/services/packers-and-movers/thank-you")

            setLoader(false)
        } else {
            setLoader(false)
        }

    }
    return (
        <>
            <HeaderMenu />
            <div className='max-w-screen-xl mx-auto my-6'>
                <div className='bg-gray-50 mb-4 p-3'>
                    <p className='p-2 font-semibold text-xl text-blue-500'>Quotation Id - {pmData?.packersAndMovers?.quotationId}</p>
                    <div className='flex-col md:flex-row flex m-2 items-center justify-between'>
                        <div className='w-full'>
                            <p className='my-1 font-medium text-gray-800'>Pickup Location - {pmData?.packersAndMovers?.pickupAddress?.city}</p>
                            <p className='my-1 font-medium text-gray-800'>Drop Location - {pmData?.packersAndMovers?.deliveryAddress?.city}</p>
                            {/* <p className='my-1 font-medium text-gray-800'>Move Date - {pmData?.packersAndMovers?.startDate}</p> */}
                        </div>
                        <div className='w-full'>
                            {/* <p className='my-1 font-medium text-gray-800'>Drop Location :{pmData?.packersAndMovers?.cityTo}</p> */}
                            <p className='my-1 font-medium text-gray-800'>Move Date - {pmData?.packersAndMovers?.startDate}</p>
                            <p className='my-1 font-medium text-gray-800'>{pmData?.packersAndMovers?.storageRequirement.length > 14 ? "Office Type" : "House Type"} - {pmData?.packersAndMovers?.storageRequirement}</p>

                        </div>
                        <p className='w-full text-left md:text-end font-bold text-xl'>Total Items : {items?.map((elem) => elem.quantity)?.reduce((acc, curr) => acc + curr, 0)}</p>
                    </div>
                </div>
                <div className='flex-col md:flex-row flex justify-between md:m-0 m-6  '>
                    <div className='md:w-2/3 w-full relative md:pt-0 pt-4'>
                        <form className="" ref={outSideRef} onClick={() => setOuSide(true)}>
                            <label for="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search & add Items"
                                    onChange={(e) => setSearch(e.target.value)}
                                    required />
                            </div>
                        </form>
                        {(search.length > 0 && outSide) > 0 && (
                            itemArr?.filter((elem) => elem?.itemName.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                                <div className='absolute top-16 p-4 rounded-md shadow-xl overflow-y-scroll w-auto h-96 bg-white' ref={outSideRef} onClick={() => setOuSide(true)}>
                                    {itemArr
                                        ?.filter((elem) => elem?.itemName.toLowerCase().includes(search.toLowerCase()))
                                        .map((item) => (
                                            <div className='flex justify-between items-center md:px-4 py-3 my-2 md:my-0' key={item?.itemId}>
                                                <div className='flex items-center h-8 mr-2'>
                                                    <img src={item?.itemsIconPath} className='h-full mr-4' alt={item?.itemName} />
                                                    <div>
                                                        <p className='text-[14px] text-slate-700'>{item?.itemName}</p>
                                                        <p className='md:text-[11px] text-[10px] text-slate-500 mt-0.5'>
                                                            L:{item?.length} | W:{item?.breadth} | H:{item?.height} (in inches)
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <div>
                                                    <span
                                                        onClick={() => handleClick("add", item)}
                                                        className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'
                                                    >
                                                        +
                                                    </span>
                                                    <span className=' w-[20px]'>{
                                                        items?.find((elem) => elem?.itemId === item?.itemId)?.quantity || ""
                                                    }</span>
                                                    <span
                                                        onClick={() => handleClick("sub", item)}
                                                        className='ml-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'
                                                    >
                                                        -
                                                    </span>
                                                </div> */}
                                                <div className='flex justify-between'>
                                                    <div
                                                        onClick={() => handleClick("sub", item)}

                                                        className='mr-1 px-2 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'
                                                    >
                                                        -
                                                    </div>
                                                    <div className='w-[20px] text-center'> {
                                                        items?.find((elem) => elem?.itemId === item?.itemId)?.quantity || ""
                                                    }
                                                    </div>
                                                    <div
                                                        onClick={() => handleClick("add", item)}
                                                        className='ml-1 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="absolute top-16 p-4 rounded-md  w-auto h-auto bg-white">Item Not Found</p>
                            )
                        )}

                    </div>
                    <div className='md:pt-0 pt-4'>
                        <button onClick={() => { setModalShow(!modalShow); setCatId(1) }} className='px-6 md:block hidden  rounded py-2.5 bg-[#8DC63F] hover:bg-green-600 text-white font-semibold md:w-auto w-full'>Explore Categories</button>
                        <button onClick={() => setMobileModal(!mobileModal)} className='px-6 md:hidden block rounded py-2.5 bg-[#8DC63F] hover:bg-green-600 text-white font-semibold md:w-auto w-full'>Explore Categories</button>
                    </div>
                </div>

                <div className='bg-gray-100 md:my-8 my-4 md:p-10 p-3'>
                    <div className='grid md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3  grid-cols-1 gap-4 '>
                        {
                            category?.filter((x) => x?.selectedItems > 0)?.map((elem, id) => {
                                const selectedItems = items.filter((i) => i.categoryName === elem.categoryName);
                                const totalQuantity = selectedItems.map((x) => x.quantity).reduce((acc, curr) => acc + curr, 0);

                                if (totalQuantity === 0) return null;

                                return (
                                    <div key={id} className='md:py-4 py-2'>
                                        <div className='flex justify-between mb-2 items-center'>
                                            <div className='text-blue-600 text-xl'>
                                                {elem?.categoryName}
                                                <span className='ml-4 px-2.5 py-1 rounded-2xl bg-blue-500 text-[12px] text-white'>
                                                    {totalQuantity} selected
                                                </span>
                                            </div>

                                            <div
                                                onClick={() => setMobileModal(!mobileModal)}
                                                className='bg-[#8DC63F] block md:hidden cursor-pointer text-lg px-2 text-white rounded-sm'>
                                                +
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setModalShow(!modalShow);
                                                    setCatId(elem?.categoryId);
                                                }}
                                                className='bg-[#8DC63F] hidden md:block cursor-pointer text-lg px-2 text-white rounded-sm'>
                                                +
                                            </div>
                                        </div>

                                        <div className='w-full border'>
                                            <ul className='bg-white h-72 overflow-y-scroll'>
                                                {selectedItems.map((i) => (
                                                    <li key={i.itemName} className='border border-b p-3 h-[70px] flex justify-between items-center'>
                                                        <div className='flex items-center h-full'>
                                                            <img src={i?.itemsIconPath} className='w-9 h-full mr-4' />
                                                            <div>
                                                                <p className='text-[14px] text-slate-700'>{i?.itemName}</p>
                                                                <p className='md:text-[11px] text-[10px] text-slate-500 mt-0.5'>
                                                                    L:{i?.length} | W:{i?.breadth} | H:{i?.height} (in inches)
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span
                                                                onClick={() => handleClick("sub", i)}
                                                                className='mr-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded-full bg-gray-400'>
                                                                -
                                                            </span>
                                                            <span className='text-black'>{i?.quantity}</span>
                                                            <span
                                                                onClick={() => handleClick("add", i)}
                                                                className='ml-2 px-1.5 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded-full bg-gray-400'>
                                                                +
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                    {!items.length && <p className='text-center text-xl font-semibold text-blue-500'>Please add some items</p>}
                    <div className='flex justify-between '>
                        <button
                            onClick={() => router.push(`/services/packers-and-movers/move-details?pmId=${pmData?.packersAndMovers?.id}&previous=true`)}
                            className="md:px-16 px-8 rounded py-2.5 bg-blue-500 text-white text-lg font-medium hover:bg-[#8DC63F] mt-5 ml-4"
                        >
                            Previous
                        </button>
                        <button onClick={() => handleSave()} className='px-6 rounded  py-2.5 bg-blue-500 text-white text-lg font-medium hover:bg-[#8DC63F] mt-5 ml-6'>Get quote</button>
                    </div>
                </div>
            </div>
            <Footer />
            {modalShow && <CategoryModal modalShow={modalShow} setModalShow={setModalShow} items={items} setItems={setItems} category={category} setCategory={setCategory} storageItems={pmData?.packersAndMovers?.storageRequirement} catId={catId} setCatId={setCatId} setShowSelected={setShowSelected} type="packer-mover" setShowBtn={setShowBtn} />}
            {mobileModal && <MobileViewModal items={items} setItems={setItems} category={category} setCategory={setCategory} storageItems={pmData?.packersAndMovers?.storageRequirement} catId={catId} setCatId={setCatId} mobileModal={mobileModal} setMobileModal={setMobileModal} setShowSelected={setShowSelected} type="packer-mover" setShowBtn={setShowBtn} />}
            {loader && <Loader />}
        </>
    )
}

export default index