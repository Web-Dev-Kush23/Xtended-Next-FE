import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaLongArrowAltLeft } from "react-icons/fa";

const MobileViewFilter = ({ data, items, setItems, size , setSize , totalArea , setMobileFilter , setError }) => {
    const [selectItem, setSelectItem] = useState("");
    const [subCategory, setSubCategory] = useState("")
    const [search, setSearch] = useState('')
    const [addArea , setAddArea] = useState({
        height:"",
        width:""
    })
    const [showFilter, setShowFilter] = useState(false)

    const handleClose = () => setShowFilter(false);

    const showPopUp = (elem) => {
        setSelectItem(elem.categoryName)
        setSubCategory(elem?.subCategory?.[0]?.subCategoryName)
        setShowFilter(true)
    }

    const toggleCollapse = (elem) => {
        if (selectItem == elem.categoryName) {
            setSelectItem("")
        } else {
            setSelectItem(elem.categoryName)
            setSubCategory(elem?.subCategory?.[0]?.subCategoryName)
        }
    };

    let SearchArr = data?.categoryItemList?.flatMap((elem) => elem.subCategory || [])?.flatMap((item) => item.storageItems || [])?.map((i) => i);

    const handleClick = (type, item) => {
        setError(false)
        if(size==0) setSize(100)
        const existingItem = items?.some((elm) => elm?.item?.itemId === item?.itemId);
        if (type == "add") {
                if (existingItem) {
                        const updateItem = items?.map((elem) => elem.item.itemId == item.itemId ? { ...elem, count: 1 + Number(elem.count) } : elem)
                        setItems(updateItem)
                } else {
                    setItems((prev) => [...prev, { item, count: 1 }])
                }
        }

        else if (type == "sub") {
            let currentitem = items?.find((elem) => elem.item.itemId == item.itemId)
            if (existingItem && currentitem.count > 1) {
                const updateItem = items?.map((elem) => elem.item?.itemId == item?.itemId ? { ...elem, count: Number(elem.count) - 1 } : elem)
                setItems(updateItem);
            } else {
                const updatedArr = items.filter((elem) => elem?.item.itemId !== item.itemId);
                setItems(updatedArr);

            }
        }
    }

    const handleAddArea = () => {
        const height = addArea?.height || 0;
        const width = addArea?.width || 0;
    
        const customArea = height * width;
       if(customArea==0){
        setError(true)
       }else{
        setError(false)
           const customItems = {
               count: 1,
               item: {
                   itemId: items?.length+1, 
                   itemName: "Custom Area",
                   squareFeet: customArea,
               },
           };
       
           setItems((prevItems) => [...prevItems, customItems]);
           setAddArea({...addArea , height:"",width:""})
       }
    };
    


    return (
        <React.Fragment>
            <div className='fixed top-20 bottom-0 z-50 bg-blue-100'>
                <h5 className='text-blue-500 flex items-center p-4 text-2xl' onClick={()=>setMobileFilter(false)}><span><FaLongArrowAltLeft className='text-2xl mr-2'/> </span>Back</h5>
                <form className="m-3">
                    <label for="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                        style={{color:"#000"}}
                            className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-2xl bg-white"
                            placeholder="Search & Add Items..." required
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>
                {
                    data?.categoryItemList?.map((elem,id) => {
                        return (
                            <div key={id} className='m-3  border-b-2'>
                                <div onClick={() => showPopUp(elem)} className='flex cursor-pointer justify-between items-center px-3 py-1'>
                                    <p
                                        className=" text-gray-800 text-[18px]"
                                    >
                                        {elem?.categoryName}
                                    </p>
                                    {/* <IoIosArrowDown className={`text-xl ${selectItem == elem.categoryName ? 'rotate-180' : 'rotate-0'} transition-all duration-1000 ease-in-out`} /> */}
                                </div>
                            </div>
                        )
                    })
                }

                <div className='m-3  border-b-2'>
                    <div onClick={() => toggleCollapse({ categoryName: "Space Dimensions" })} className='flex cursor-pointer justify-between items-center px-3 py-1'>
                        <p
                            className=" text-gray-800 text-[18px]"
                        >
                            Space Dimensions (sq ft./room)
                        </p>
                        {/* <IoIosArrowDown className={`text-xl ${selectItem == "Space Dimensions" ? 'rotate-180' : 'rotate-0'} transition-all duration-1000 ease-in-out`} /> */}
                    </div>
                    <div
                        className={`transition-all duration-1000  ease-in-out overflow-hidden ${true ? 'max-h-72' : 'max-h-0'}`}
                    >
                        <div className='flex justify-between my-3 items-center mb-2'>
                            <input className='mx-1 rounded-xl border border-gray-300 py-2 px-2 w-1/2' placeholder='length in feet' value={addArea.height} onChange={(e)=>setAddArea({...addArea,height:e.target.value})} />X
                            <input className='mx-1 rounded-xl border border-gray-300 py-2 px-2 w-1/2' placeholder='width in feet' value={addArea.width} onChange={(e)=>setAddArea({...addArea,width:e.target.value})}/>
                        </div>
                        <button className='w-full py-2 px-2 bg-blue-600 text-white font-normal text-xl rounded-lg' onClick={()=>handleAddArea()}>Add space dimension</button>
                    </div>
                </div>
                {search.length > 0 && (
                    <div className='absolute top-36 p-4 rounded-md left-4 shadow-xl overflow-y-scroll max-w-lg h-72 bg-white'>
                        {SearchArr?.filter((elem) => elem?.itemName.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                            SearchArr?.filter((elem) =>
                                elem?.itemName.toLowerCase().includes(search.toLowerCase())
                            ).map((item ,id) => (
                                <div className='flex justify-between items-center px-4 py-2' key={id}>
                                    <p className="pr-2">
                                        {item?.itemName}
                                    </p>
                                    <div>
                                        <span
                                            onMouseDown={() => handleClick("add", item)}
                                            className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400'
                                        >
                                            +
                                        </span>
                                        {items?.map((elem) => elem.item.itemId === item?.itemId ? elem.count : "")}
                                        <span
                                            onMouseDown={() => handleClick("sub", item)}
                                            className='ml-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'
                                        >
                                            -
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">This item is not found , try other</p>
                        )}
                    </div>
                )}


            </div>
            <Modal
                show={showFilter}
                onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body>
                    <div className='max-w-screen-lg mx-auto my-2'>
                        <div className='mr-4  flex justify-between items-center'>
                        <div className={`progress w-full  h-8 bg-yellow-100 mx-6 ${size == 0? "flex justify-center items-center":""} `} >
                                <div
                                    style={{
                                        width: `${size == 0 ? 0 : Math.trunc(totalArea)}%`
                                    }}
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {size == 0 ? 0 : Math.trunc(totalArea)}% Full

                                </div>
                                {size == 0 && <p className='font-semibold'>0% Full</p>}
                            </div>
                            <button className='bg-[#8DC63F]  text-white px-4 py-2 rounded ' onClick={() => setShowFilter(false)} >Done</button>
                        </div>
                       <div className='overflow-x-auto bottom-oveflow-none'>
                       <div className='flex items-center justify-between my-4'>
                            {data?.categoryItemList?.filter((elem) => elem.categoryName == selectItem)?.[0]?.subCategory?.map((subCat, id) => {
                                return (
                                    <h2 key={id} onClick={() => setSubCategory(subCat?.subCategoryName)} className={`text-sm whitespace-nowrap ${subCategory == subCat?.subCategoryName ? "bg-[#8DC63F] text-white" : "bg-gray-100 text-gray-800"} px-4 py-2 cursor-pointer mx-2 rounded-2xl font-semibold `}>{subCat?.subCategoryName}</h2>
                                )
                            })}
                        </div>
                       </div>
                        <div className='grid grid-cols-1 gap-4'>
                            
                            <div className='col-span-2 relative'>
                                {/* <p className='absolute top-[-30px] text-xl  text-blue-500 '>Television <span className='text-sm px-2 py-0.5 rounded-md bg-blue-500 text-white'>2 selected</span></p> */}
                                <div className='w-full border'>
                                    <ul className='bg-white h-72 overflow-y-scroll'>
                                        {
                                            data?.categoryItemList?.filter((elem) => elem.categoryName == selectItem)?.[0]?.subCategory?.filter((subCat) => subCat?.subCategoryName == subCategory)?.[0]?.storageItems?.map((item) => {
                                                return (
                                                    <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                                        <p>{item?.itemName}</p>
                                                        <div>
                                                            <span onClick={() => handleClick("sub", item)} className='mr-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400'>-</span>
                                                            {items?.map((elem) => elem.item.itemId == item?.itemId ? elem.count : "")}
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

                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default MobileViewFilter