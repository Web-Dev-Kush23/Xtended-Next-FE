import HeaderMenu from '@/components/header/header';
import Footer from "@/components/footer";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import React from 'react'

const index = () => {

    return (
        <div>
            <HeaderMenu />
            <div className='max-w-screen-lg mx-auto my-6'>
                <div className='flex items-center justify-between my-12'>
                    <h2 className='text-2xl font-semibold '>Larg Appliances</h2>
                    <div className='mr-4 bg-green-500 text-white px-4 py-2 rounded flex items-center'><FaArrowLeft className='text-xl text-white' /> Go Back</div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-1'>
                        <div className='w-full border'>
                            <ul className='bg-white h-72 overflow-y-scroll'>
                                <li className='border bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Sofa</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>
                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div className='flex items-center'><span className='mr-2 px-2 pb-[1px] text-[16px] font-medium text-white rounded-full bg-blue-500'>2</span><span><IoIosArrowForward className='text-xl text-gray-600' /></span></div>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-2 relative'>
                        <p className='absolute top-[-30px] text-xl  text-blue-500 '>Television <span className='text-sm px-2 py-0.5 rounded-md bg-blue-500 text-white'>2 selected</span></p>
                        <div className='w-full border'>
                            <ul className='bg-white h-72 overflow-y-scroll'>
                                <li className='border bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Sofa 2 seater</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>
                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Sofa 4 seater</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Sofa 8 seater</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                </li>
                                <li className='border hover:bg-gray-100 border-b p-3 flex justify-between items-center'>
                                    <p>Bar Chair</p>
                                    <div><span className='mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>+</span>2<span className='ml-2 px-2 pb-[2px] text-xl font-semibold text-white rounded-full bg-gray-400'>-</span></div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                        <button className='px-12 rounded  py-2.5 bg-blue-500 text-white text-lg font-medium hover:bg-green-500 mt-5 ml-6'>Done</button>
                    </div>
            </div>
            <Footer />
        </div>
    )
}

export default index