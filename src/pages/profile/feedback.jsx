"use client";
import HeaderMenu from '@/components/header/header';
import Footer from "@/components/footer"
import React, { useEffect, useState } from 'react';
import img from "../../../public/images/feedbackimg1.png"
import Image from 'next/image';
import { Button, Form } from 'react-bootstrap';
import "../../styles/profile.css";
import { fetchFeedbackData, saveFeedbackForm } from '@/service/homePageService';
import { useSearchParams } from 'next/navigation';
import { localStorageManager } from '@/util/common';
import { useRouter } from 'next/router';

const feedback = () => {
     const params = useSearchParams();
     const router = useRouter()
    const [feedbackData, setFeedbackData] = useState()
    const [savedData, setSavedData] = useState([])
    const [colorEmoji, setColorEmoji] = useState([])
    const [description , setDescription] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const userData =
            localStorageManager?.getValue("userDetails") &&
            JSON.parse(localStorageManager.getValue("userDetails"));
        setUserId(userData?.userId);
    }, []);

    const fetchData = async () => {
        let res = await fetchFeedbackData()
        setFeedbackData(res?.success)
    }


    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (elem, item, feedbackType) => {
        const newFeedback = {
            categoryId: elem?.categoryId,
            questionId: item?.questionId,
            customerFeedback: feedbackType,
        };

        setSavedData((prevData) => {
            const existingIndex = prevData.findIndex(
                (data) => data.categoryId === elem?.categoryId && data.questionId === item?.questionId
            );

            if (existingIndex !== -1) {
                const updatedData = [...prevData];
                updatedData[existingIndex] = newFeedback;
                return updatedData;
            } else {
                return [...prevData, newFeedback];
            }
        });

        setColorEmoji((prevData) => {
            const newEntry = elem?.categoryId + feedbackType + item?.questionId;

            const existingColorEmojiIndex = prevData.findIndex(
                (entry) => entry.endsWith(item?.questionId)
            );

            if (existingColorEmojiIndex !== -1) {
                const updatedColorEmoji = [...prevData];
                updatedColorEmoji[existingColorEmojiIndex] = newEntry;
                return updatedColorEmoji;
            } else {
                return [...prevData, newEntry];
            }
        });
    };

const handleSubmit = async()=>{
    let payload = {
        applicationUserId:userId,
        feedback:savedData,
        description:description,
        feedbackType:params.get("type")?params.get("type"):""
    }
    let res = await saveFeedbackForm(payload)
    if(res?.success){
        router.push("/thankyou?type=feedback")
    }
}
    

    return (
        <div>
            <HeaderMenu />
            <section className='max-w-screen-lg md:mx-auto mx-6'>
                <div className='max-w-2xl mx-auto'>
                    <div className='flex justify-center my-4'>
                        <Image
                            src={img}
                            height={150}
                            width={150}
                        />
                    </div>
                    <h2 className=' text-center text-2xl text-gray-800 font-bold'>Enjoying Our Website?</h2>
                    <p className='text-center text-lg font-normal text-gray-700 mb-4'>Please provide your feedback of your storage booking experience with Xtended space so far.</p>
                </div>
                {
                    feedbackData && feedbackData.map((elem, id) => {
                        return (
                            <React.Fragment>
                                <p className='text-lg text-gray-900 mb-2 font-semibold'>{elem?.categoryName}</p>
                                <div className='w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4 overflow-x-scroll no-scroll'>
                                    <div className='lg:w-auto min-w-[600px]'>
                                        <div className='bg-blue-500 grid grid-cols-10 gap-2'>
                                            <div className='col-span-5 font-semibold text-white px-4 py-3'>Questions</div>
                                            <div className='px-1 text-center text-white font-medium py-3'>Very Good</div>
                                            <div className='px-1 text-center text-white font-medium py-3'>Good</div>
                                            <div className='px-1 text-center text-white font-medium py-3'>Fair</div>
                                            <div className='px-1 text-center text-white font-medium py-3'>Poor</div>
                                            <div className='px-1 text-center text-white font-medium py-3'>Very Poor</div>

                                        </div>
                                        <div className=' grid grid-cols-10 gap-2'>
                                            {elem?.questions?.map((item, id) => {
                                                return (
                                                    <React.Fragment>
                                                        <div className="col-span-5 font-semibold px-4 py-2">{id + 1}. {item?.questionText}</div>
                                                        <div className={`text-center text-2xl px-4 py-2 cursor-pointer
                                                             ${colorEmoji.includes(elem?.categoryId + "Very_Good" + item?.questionId) ? "emoji-color" : "emoji-bw"}`}
                                                            onClick={() => handleClick(elem, item, "Very_Good")}>&#128525;</div>
                                                        <div className={`text-center text-2xl px-4 py-2 cursor-pointer
                                                             ${colorEmoji.includes(elem?.categoryId + "Good" + item?.questionId) ? "emoji-color" : "emoji-bw"}`}
                                                            onClick={() => handleClick(elem, item, "Good")}>&#128522;</div>
                                                        <div className={`text-center text-2xl px-4 py-2 cursor-pointer
                                                             ${colorEmoji.includes(elem?.categoryId + "Fair" + item?.questionId) ? "emoji-color" : "emoji-bw"}`}
                                                            onClick={() => handleClick(elem, item, "Fair")}>&#128528;</div>
                                                        <div className={`text-center text-2xl px-4 py-2 cursor-pointer 
                                                            ${colorEmoji.includes(elem?.categoryId + "Poor" + item?.questionId) ? "emoji-color" : "emoji-bw"}`}
                                                            onClick={() => handleClick(elem, item, "Poor")}>&#128533;</div>
                                                        <div className={`text-center text-2xl px-4 py-2 cursor-pointer
                                                             ${colorEmoji.includes(elem?.categoryId + "Very_Poor" + item?.questionId) ? "emoji-color" : "emoji-bw"}`}
                                                            onClick={() => handleClick(elem, item, "Very_Poor")}>&#128534;</div>
                                                        {elem?.categoryId == 4 &&
                                                            <Form.Group className="px-4 py-2 col-span-10" controlId="exampleForm.ControlTextarea1">
                                                                <Form.Label className='font-semibold'>Other comments...</Form.Label>
                                                                <Form.Control onChange={(e)=>setDescription(e.target.value)} as="textarea" rows={3} />
                                                            </Form.Group>
                                                        }
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
                {/* <p className='text-lg text-gray-900 mb-2 font-semibold'>Booking experience</p>
                <div className='w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4 overflow-x-scroll no-scroll'>
                    <div className='lg:w-auto min-w-[600px]'>
                        <div className='bg-gray-200 grid grid-cols-10 gap-2'>
                            <div className='col-span-5 font-semibold px-4 py-3'>Questions</div>
                            <div className='px-1 text-center font-medium py-3'>Very Good</div>
                            <div className='px-1 text-center font-medium py-3'>Good</div>
                            <div className='px-1 text-center font-medium py-3'>Fair</div>
                            <div className='px-1 text-center font-medium py-3'>Poor</div>
                            <div className='px-1 text-center font-medium py-3'>Very Poor</div>

                        </div>
                        <div className=' grid grid-cols-10 gap-2'>
                            <div className="col-span-5 font-semibold px-4 py-2">1. Quality & Timely follow-up</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">2. Accessible during the move</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>
                        </div>
                    </div>
                </div> */}
                {/* <div className='table-responsive '>
                    <table className="w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4">
                        <thead>
                            <tr className='bg-gray-200'>
                                <th scope="col" className="w-1/2 px-4 py-2 border-t border-l rounded-tl-lg">Question</th>
                                <th scope="col" className="px-4 py-2 border-t border-b-0">Very Good</th>
                                <th scope="col" className="px-4 py-2 border-t  border-b-0">Good</th>
                                <th scope="col" className="px-4 py-2 border-t border-b-0">Fair</th>
                                <th scope="col" className="px-4 py-2 border-t border-b-0">Poor</th>
                                <th scope="col" className="px-4 py-2 border-t border-r rounded-tr-lg">Very Poor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border-l font-semibold border-t-0 border-b-0">1. Quality & Timely follow-up</td>
                                <td className="px-4 py-2 text-center text-2xl border-t-0 border-b-0">&#128525;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b-0">&#128522;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b-0">&#128528;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b-0">&#128533;</td>
                                <td className="px-4 py-2 text-center text-2xl border-r   border-t-0 border-b-0">&#128534;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-l font-semibold rounded-bl-lg border-t-0 border-b">2. Accessible during the move</td>
                                <td className="px-4 py-2 text-center text-2xl border-t-0 border-b">&#128525;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b">&#128522;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b">&#128528;</td>
                                <td className="px-4 py-2 text-center text-2xl  border-t-0 border-b">&#128533;</td>
                                <td className="px-4 py-2 text-center text-2xl border-r rounded-br-lg   border-t-0 border-b">&#128534;</td>
                            </tr>
                        </tbody>
                    </table>

                </div> */}
                {/* <p className='text-lg text-gray-900 mb-2 font-semibold'>Coordination</p>
                <div className='w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4 overflow-x-scroll no-scroll'>
                    <div className='lg:w-auto min-w-[600px]'>
                        <div className='bg-gray-200 grid grid-cols-10 gap-2'>
                            <div className='col-span-5 font-semibold px-4 py-3'>Questions</div>
                            <div className='px-1 text-center font-medium py-3'>Very Good</div>
                            <div className='px-1 text-center font-medium py-3'>Good</div>
                            <div className='px-1 text-center font-medium py-3'>Fair</div>
                            <div className='px-1 text-center font-medium py-3'>Poor</div>
                            <div className='px-1 text-center font-medium py-3'>Very Poor</div>

                        </div>
                        <div className=' grid grid-cols-10 gap-2'>
                            <div className="col-span-5 font-semibold px-4 py-2">1. Quality & Timely follow-up</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">2. Accessible during the move</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>
                        </div>
                    </div>
                </div> */}

                {/* <p className='text-lg text-gray-900 mb-2 font-semibold'>Crew at origin & desination</p>
                <div className='w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4 overflow-x-scroll no-scroll'>
                    <div className='lg:w-auto min-w-[600px]'>
                        <div className='bg-gray-200 grid grid-cols-10 gap-2'>
                            <div className='col-span-5 font-semibold px-4 py-3'>Questions</div>
                            <div className='px-1 text-center font-medium py-3'>Very Good</div>
                            <div className='px-1 text-center font-medium py-3'>Good</div>
                            <div className='px-1 text-center font-medium py-3'>Fair</div>
                            <div className='px-1 text-center font-medium py-3'>Poor</div>
                            <div className='px-1 text-center font-medium py-3'>Very Poor</div>

                        </div>
                        <div className=' grid grid-cols-10 gap-2'>
                            <div className="col-span-5 font-semibold px-4 py-2">1. Punctuality</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">2. Appearance</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">3. General attitude</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">2. Quality packing</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>

                            <div className="col-span-5 font-semibold px-4 py-2">2. Overall satisfaction</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                            <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-lg text-gray-900 mb-2 font-semibold'>Overall feedback form:</p>
                    <div className='w-full shadow-md border-separate border rounded-lg border-spacing-0 mb-4 overflow-x-scroll no-scroll'>
                        <div className='lg:w-auto min-w-[600px]'>
                            <div className='bg-gray-200 grid grid-cols-10 gap-2'>
                                <div className='col-span-5 font-semibold px-4 py-3'>Questions</div>
                                <div className='px-1 text-center font-medium py-3'>Very Good</div>
                                <div className='px-1 text-center font-medium py-3'>Good</div>
                                <div className='px-1 text-center font-medium py-3'>Fair</div>
                                <div className='px-1 text-center font-medium py-3'>Poor</div>
                                <div className='px-1 text-center font-medium py-3'>Very Poor</div>

                            </div>
                            <div className=' grid grid-cols-10 gap-2'>
                                <div className="col-span-5 font-semibold px-4 py-2">1. How likely are you recommended Xtended space</div>
                                <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128525;</div>
                                <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128522;</div>
                                <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128528;</div>
                                <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128533;</div>
                                <div className="text-center text-2xl px-4 py-2 emoji-bw">&#128534;</div>
                                <Form.Group className="px-4 py-2 col-span-10" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='font-semibold'>Other comments...</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    
                </div> */}
                <div className='flex justify-end mb-4'>
                    <Button className='bg-green-600 font-semibold rounded-md border-green-600 text-white px-3 py-3' onClick={()=>handleSubmit()}>Submit feedback</Button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default feedback