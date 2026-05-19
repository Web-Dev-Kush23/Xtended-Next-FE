import HeaderMenu from '@/components/header/header'
import React, { useEffect, useState } from 'react';
import Footer from "../../components/footer/index"
import { fetchUtubeData } from '@/service/storageService';
import { IoLogoYoutube } from 'react-icons/io';
import Image from 'next/image';

const index = () => {
    const [utube, setUtube] = useState([])
    const [activeTab, setActiveTab] = useState("all")
    const fetchUtubeVideo = async () => {
        let res = await fetchUtubeData()
        setUtube(res?.success?.data)
    }

    useEffect(() => {
        fetchUtubeVideo()
    }, [])

    return (
        <>
            <HeaderMenu />
            <section>

                <div className="max-w-screen-xl mx-auto mb-4 relative bg-gray-50">
                    <h2 className='text-3xl pt-4 text-gray-900 font-semibold text-center'>Our Videos</h2>
                    <div className='sm:flex block justify-center items-center sm:overflow-x-hidden  overflow-x-scroll  scrollabar-view-none'>
                        <div className="grid grid-cols-3 gap-10 p-4 sm:w-auto w-[720px]">
                            <button onClick={() => setActiveTab("all")} className={`${activeTab === "all" ? "bg-blue-500 text-white" : ""} px-4 py-3 font-semibold rounded shadow-md flex items-center justify-center`}>
                            All
                        </button>
                        <button onClick={() => setActiveTab("PackersAndMovers")} className={`${activeTab === "PackersAndMovers" ? "bg-blue-500 text-white" : ""} px-4 py-3 font-semibold rounded shadow-md flex items-center justify-center`}>
                        Packers & movers
                    </button>
                    <button onClick={() => setActiveTab("Storage")} className={`${activeTab === "Storage" ? "bg-blue-500 text-white" : ""} px-4 py-3 font-semibold rounded shadow-md flex items-center justify-center`}>
                    Storage Space
                </button>
            </div>
        </div >
            <div className="overflow-hidden w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-4 mx-4">
                    {utube?.filter((elem) => activeTab == "all" ? elem.categoryName : elem.categoryName == activeTab)?.map((review, index) => (
                        <div className="rounded-lg relative h-[180px] ">
                            <Image
                                className="rounded-lg h-full"
                                src={review?.youTubeImagePath} ac
                                alt="review"
                                width={500}
                                height={180}
                            />
                            <a target="_blank" href={review.youtubeUrl} className="absolute rounded-lg inset-0 bg-gradient-to-b from-transparent  opacity-80 z-10"></a>
                            <a target="_blank" href={review.youtubeUrl} className="absolute top-1/4 left-[150px] sm:left-[100px] z-50"><IoLogoYoutube className="md:text-6xl text-6xl text-red-500 p-2  rounded-xl bg-white" /></a>
                            <p className="absolute bottom-2 w-auto px-2 py-1 rounded left-2 right-2 z-50 bg-blue-500 text-white text-sm font-medium">{review?.youtubeTitle}</p>

                        </div>
                    ))}
                </div>


            </div>

                </div >
            </section >
    <Footer />
        </>
    )
}

export default index