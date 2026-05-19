"use client";
import React, { useEffect, useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import CategoryModal from '../services/packers-and-movers/move-details/[slug]/CategoryModal'
import MobileViewModal from '../services/packers-and-movers/move-details/[slug]/MobileViewModal'
import { useRouter } from 'next/router'

const ItemCalculator = ({ items, setItems, preData, totalArea, setTotalArea, setShowSelected, mobile, getCalculation, showBtn, setShowBtn, setFirstRender,removeCoupon }) => {
    // const [items, setItems] = useState([])
    const router = useRouter()
    const [mobileModal, setMobileModal] = useState(false)
    const [category, setCategory] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [catId, setCatId] = useState()
    const [search, setSearch] = useState('')
    const [outSide, setOuSide] = useState(false);
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

    useEffect(() => {
        if (preData?.relocationCategories) {
            setCategory(preData.relocationCategories);
        }
    }, [preData]);

    const itemArr = preData?.relocationItems?.map((elem) => elem)

    const handleClick = (type, item) => {
        setShowBtn(true)
        setShowSelected(false)
        const existingItem = items?.some((elm) => elm?.itemId === item?.itemId);
        if (type == "add") {
            if (existingItem) {
                const updateItem = items?.map((elem) => elem?.itemId == item.itemId ? { ...elem, quantity: elem.quantity + 1 } : elem)
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

    const handleRemove = (id) => {
        let updateItem = items.filter((i) => i?.itemId != id)
        setItems(updateItem)
        setShowSelected(false)
        setShowBtn(true)
    }

    const handleModal = () => {
        if (mobile) {
            setMobileModal(true)
        } else {
            setModalShow(!modalShow);
        }
        setCatId(1)
    }

    useEffect(() => {
        let totalItemArea = (items?.reduce((acc, elem) => acc + parseFloat(elem?.quantity) * parseFloat(elem?.squareFeet ? elem?.squareFeet : elem?.netCFT), 0))
        setTotalArea(totalItemArea)
    }, [items])

    let totalItemArea = (items?.reduce((acc, elem) => acc + parseFloat(elem?.quantity) * parseFloat(elem?.squareFeet ? elem?.squareFeet : elem?.netCFT), 0))

    const handleUpdatePrice = () => {
        getCalculation()
        setFirstRender(false)
        removeCoupon()
        setTimeout(()=>{
            if(totalItemArea>1000){
                router.push("/services/business-storage")
            }
        },[3000])
        
    }

    return (
        <>
            <div className='w-full relative'>

                <div className='flex justify-between items-center border bg-gray-200 p-3 rounded-tl-xl rounded-tr-xl'>
                    <button onClick={() => handleModal()} className='text-lg rounded-lg px-2 md:px-4 py-2 font-semibold text-white bg-[#8DC63F]'>Add More Items +</button>
                    <div className='text-lg font-semibold text-gray-800' ref={outSideRef} onClick={() => setOuSide(true)}>
                        <form className="hidden md:block">
                            <label for="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search by Items"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    required />
                            </div>
                        </form>
                    </div>
                    {search?.length > 0 && outSide && (
                        itemArr?.filter((elem) => elem?.itemName?.toLowerCase()?.includes(search?.toLowerCase()))?.length > 0 ? (
                            <div
                                className='absolute top-1/4 md:top-16 md:left-[30%] left-4 md:p-1 p-3 rounded-md shadow-xl overflow-y-scroll w-auto h-96 bg-white'
                                ref={outSideRef}
                                onClick={() => setOuSide(true)}
                            >
                                {itemArr
                                    ?.filter((elem) => elem?.itemName?.toLowerCase()?.includes(search?.toLowerCase()))
                                    ?.map((item) => (
                                        <div className='flex justify-between items-center md:px-2 py-2 my-2 md:my-0' key={item?.itemId}>
                                            <div className='flex items-center h-8 mr-2'>
                                                <img src={item?.itemsIconPath} className='h-full mr-4' alt={item?.itemName} />
                                                <div>
                                                    <p className='text-[14px] text-slate-700'>{item?.itemName}</p>
                                                    {/* <p className='md:text-[11px] text-[10px] text-slate-500 mt-0.5'>
                                                        L:{item?.length} | W:{item?.breadth} | H:{item?.height} (in inches)
                                                    </p> */}
                                                </div>
                                            </div>

                                            <div className='flex justify-between'>
                                                <div
                                                    onClick={() => handleClick("sub", item)}
                                                    className='mr-2 px-2 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'
                                                >
                                                    -
                                                </div>
                                                <div className='w-[7px]'>
                                                    {items?.find((elem) => elem?.itemId === item?.itemId)?.quantity || ""}
                                                </div>
                                                <div
                                                    onClick={() => handleClick("add", item)}
                                                    className='ml-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="absolute top-1/4 md:top-16 md:left-[30%] left-4 md:p-1 p-3 rounded-md shadow-xl w-auto h-auto bg-white">Item Not Found</p>
                        )
                    )}

                    <p className='text-lg font-semibold text-gray-800'>Total Items - {items?.map((elem) => elem?.quantity).reduce((acc, curr) => acc + curr, 0)}</p>
                </div>
                <form className="block md:hidden">
                    <label for="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" ref={outSideRef} onClick={() => setOuSide(true)}
                         className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search & add Items..."
                            onChange={(e) => setSearch(e.target.value)}
                            required />
                    </div>
                </form>
                <div className='item-list-height'>
                    {
                        items?.map((elem, id) => {
                            return (
                                <div key={id} className='flex justify-between items-center border px-3 py-2'>
                                    <p className='text-lg font-medium text-gray-800 w-72'>{elem?.itemName}
                                        {/* <span className='text-[12px] text-gray-600'>({elem?.tag=="cart"?"Old item":"Latest item"})</span> */}
                                    </p>
                                    <div className='text-lg flex justify-between font-semibold text-gray-800'>
                                        <div onClick={() => handleClick("sub", elem)} className=' px-2 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>-</div>
                                        <div className='w-[30px] text-center'>{elem?.quantity}</div>
                                        <div onClick={() => handleClick("add", elem)} className=' px-1.5 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>+</div>
                                    </div>
                                    <p onClick={() => handleRemove(elem?.itemId)} className='text-lg cursor-pointer ml-2 md:ml-0 font-semibold text-gray-800'><MdDelete className='text-lg text-red-600' /></p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex justify-between items-center border bg-gray-200 p-3 rounded-bl-xl rounded-br-xl'>
                    {(items?.length>0 && showBtn ) && <button onClick={() => handleUpdatePrice()}
                        className='hidden md:block text-lg rounded-lg px-4 py-2 font-semibold text-white bg-[#8DC63F]'>
                        Check Updated Price</button>}
                    <p className='text-lg font-semibold text-gray-800 '>Total Items Size</p>
                    <p className='text-lg font-semibold text-gray-800'>{Math.round(totalItemArea)} sq ft</p>
                </div>
                {/* <div className='md:hidden mt-2 flex justify-between items-center border bg-gray-200 p-3  rounded-xl'> */}
                    {(!items?.length<=0 || showBtn ) && <button onClick={() => handleUpdatePrice()}
                        className='md:hidden block my-2 w-full text-lg rounded-lg px-4 py-2 font-semibold text-white bg-[#8DC63F]'>
                        Check Updated Price</button>}
                {/* </div> */}
                {items?.length == 0 ? <div className='flex justify-between items-center border  p-3 '>
                    <p className='text-lg font-semibold text-gray-800'></p>
                    <p className='text-lg font-semibold text-gray-800'>No items added</p>
                    <p className='text-lg font-semibold text-gray-800'></p>
                </div> : ""}
            </div>
            {modalShow && <CategoryModal modalShow={modalShow} setModalShow={setModalShow} items={items} setItems={setItems} category={category} setCategory={setCategory} storageItems={preData?.easyStorageType?.propertySize} catId={catId} setCatId={setCatId} setShowSelected={setShowSelected} type="area-calculator" setShowBtn={setShowBtn} />}
            {mobileModal && <MobileViewModal items={items} setItems={setItems} category={category} setCategory={setCategory} storageItems={preData?.easyStorageType?.propertySize} catId={catId} setCatId={setCatId} mobileModal={mobileModal} setMobileModal={setMobileModal} setShowSelected={setShowSelected} type="area-calculator" setShowBtn={setShowBtn} />}

        </>
    )
}

export default ItemCalculator