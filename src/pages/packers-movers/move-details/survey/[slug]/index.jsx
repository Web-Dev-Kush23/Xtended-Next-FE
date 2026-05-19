import React, { useState } from 'react'
import Footer from "@/components/footer";
import HeaderMenu from '@/components/header/header'
import Item from 'antd/es/list/Item';
import CategoryModal from './CategoryModal';

const index = () => {
    const [modalShow, setModalShow] = useState(false)
    const data = [
        {
            categories: "Furniture",
            subCategories: [
                {
                    name: "Bar Furniture",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Bed/Matterss",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Chair",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Dinning",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                }
            ]
        },
        {
            categories: "Large Appliances",
            subCategories: [
                {
                    name: "Bar Furniture",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Bed/Matterss",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Chair",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Dinning",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                }
            ]
        },
        {
            categories: "Kitchen Item",
            subCategories: [
                {
                    name: "Bar Furniture",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Bed/Matterss",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Chair",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                },
                {
                    name: "Dinning",
                    Item: [
                        {
                            name: "Bar Cabinet",
                        },
                        {
                            name: "Bar Unit",
                        },
                        {
                            name: "Bar Chair",
                        },
                        {
                            name: "Bar Tool",
                        }
                    ]
                }
            ]
        },
    ]
    return (
        <>
            <HeaderMenu />
            <div className='max-w-screen-xl mx-auto my-6'>
                <div className='bg-gray-50 mb-4 p-3'>
                    <p className='p-2 font-semibold text-xl text-blue-500'>Selcted Items - SKAS12345</p>
                    <div className='flex m-2 items-center justify-between'>
                        <div>
                            <p className='my-1 font-medium text-gray-800'>Pickup Location : Banglore , Karnatka</p>
                            <p className='my-1 font-medium text-gray-800'>Move Date - 17/08/2025</p>
                        </div>
                        <div>
                            <p className='my-1 font-medium text-gray-800'>Drop Location : Banglore , Karnatka</p>
                            <p className='my-1 font-medium text-gray-800'>Drop Date - 17/08/2025</p>
                        </div>
                        <p className='font-bold text-xl'>₹ 9404/-</p>
                    </div>
                </div>
                <div className='flex  justify-between  pl-10 pr-6 '>
                    <div className='w-2/3'>
                        <form className="">
                            <label for="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Items..." required />
                            </div>
                        </form>
                    </div>
                    <div>
                        <button onClick={() => setModalShow(!modalShow)} className='px-6 rounded py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold'>Explore Categories</button>
                    </div>
                </div>

                <div className='bg-gray-100 my-8 p-10'>
                    <div className='grid grid-cols-3 gap-6 '>
                        <div className=''>
                            <div className='flex justify-between mb-2 items-center'>
                                <div className='text-blue-600 text-xl'>
                                    Furniture <span className='ml-4 px-2.5 py-1 rounded-2xl bg-blue-500 text-[12px] text-white'>5 selected</span>
                                </div>
                                <div className='bg-green-500  text-lg px-2 text-white rounded-sm'>+</div>
                            </div>
                            <div className='w-full border'>
                                <ul className='bg-white h-72 overflow-y-scroll'>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>
                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className=''>
                            <div className='flex justify-between mb-2 items-center'>
                                <div className='text-blue-600 text-xl'>
                                    Furniture <span className='ml-4 px-2.5 py-1 rounded-2xl bg-blue-500 text-[12px] text-white'>5 selected</span>
                                </div>
                                <div className='bg-green-500 text-lg px-2 text-white rounded-sm'>+</div>
                            </div>
                            <div className='w-full border'>
                                <ul className='bg-white h-72 overflow-y-scroll'>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className=''>
                            <div className='flex justify-between mb-2 items-center'>
                                <div className='text-blue-600 text-xl'>
                                    Furniture <span className='ml-4 px-2.5 py-1 rounded-2xl bg-blue-500 text-[12px] text-white'>5 selected</span>
                                </div>
                                <div className='bg-green-500 text-lg px-2 text-white rounded-sm'>+</div>
                            </div>
                            <div className='w-full border'>
                                <ul className='bg-white h-72 overflow-y-scroll'>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between mb-2 items-center'>
                                <div className='text-blue-600 text-xl'>
                                    Furniture <span className='ml-4 px-2.5 py-1 rounded-2xl bg-blue-500 text-[12px] text-white'>5 selected</span>
                                </div>
                                <div className='bg-green-500 text-lg px-2 text-white rounded-sm'>+</div>
                            </div>
                            <div className='w-full border'>
                                <ul className='bg-white h-72 overflow-y-scroll'>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                    <li className='border border-b p-3 flex justify-between items-center'>
                                        <p>Bar Chair</p>
                                        <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button className='px-6 rounded  py-2.5 bg-blue-500 text-white text-lg font-medium hover:bg-green-500 mt-5 ml-6'>Get quote</button>
                        <button className='px-16 rounded  py-2.5 bg-blue-500 text-white text-lg font-medium hover:bg-green-500 mt-5 ml-4'>Continue</button>
                    </div>
                </div>
            </div>
            <Footer />
            <CategoryModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default index