import React from 'react'
import Header from '../header'
import Footer from "../../components/footer/index"
import Image from 'next/image';
import '../../styles/ourteam.css'
import teamimg from "../../../public/images/teamimg.jpeg";
import { FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const index = () => {
    let teamList = [
        {
            id: 1,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Ritesh Suneja",
            designation: "Founder",
            Descriptions: "With over 20 years of experience in finance and serial entrepreneurship, Ritesh Suneja founded Xtended Space to overcome storage and relocation challenges in India by pioneering innovative solutions for businesses and individuals ",
            linkedin: "https://www.linkedin.com/in/ritesh-suneja-1252701b/",
            gmail: "",
        },
        {
            id: 2,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Rachna Suneja",
            designation: "Co-founder",
            Descriptions: "Rachna Suneja is a seasoned and driven marketer with over 17 years of experience in global entrepreneurship. Her bold vision and leadership in several projects have been instrumental in achieving the company’s milestones.  ",
            linkedin: "https://www.linkedin.com/in/rachnasuneja/",
            gmail: "",
        },
        {
            id: 3,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Vinay Pandey",
            designation: "Vice President",
            Descriptions: "Over 31 years of experience and currently working as Vice President at Xtended Space reflects his dedication across renowned companies. With deep knowledge in last-mile delivery and reverse logistics.",
            linkedin: "https://www.linkedin.com/in/vinay-pandey-3916a565/",
            gmail: "",
        },
        {
            id: 4,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Arnada Sankar Swain",
            designation: "GM Sales and Operations ",
            Descriptions: "From Software Developer to General Manager in Sales and Operations, Arnada Sankar Swain has dedicated 13 years to revolutionizing the packers and movers industry by integrating technology using his developer expertise. ",
            linkedin: "https://www.linkedin.com/in/arnada-swain-68795159/",
            gmail: "",
        },
        {
            id: 5,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Vibhav Gupta",
            designation: "Head Digital Marketing",
            Descriptions: "A seasoned marketing expert with over 12 years of experience, Vibhav has successfully led multiple projects. His leadership has been instrumental in building and enhancing brands for several organizations. ",
            linkedin: "https://www.linkedin.com/in/vibhavgupta55/",
            gmail: "",
        },
        {
            id: 6,
            image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
            name: "Himanshu Kataria",
            designation: "General Manager",
            Descriptions: "With a finance background and over 9 years of working experience, Himanshu currently serves as a Marketing Manager at Xtended Space, exemplifying his dedication to delivering insights in his work. ",
            linkedin: "https://www.linkedin.com/in/himanshu-kataria-795574170/",
            gmail: "",
        }

    ]
    return (
        // <div>
        //     <Header />
        //     <section className=" h-[50vh] md:h-[70vh] relative">
        //         <Image
        //             src={teamimg}
        //             alt="Background Image"
        //             layout="fill"
        //             objectFit="cover"
        //             className="z-0 "
        //         />
        //         <div className='absolute top-4 left-4 z-50'>
        //             <nav class="flex" aria-label="Breadcrumb">
        //                 <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        //                     <li class="inline-flex items-center cursor-pointer">
        //                         <a href="/" class="inline-flex cursor-pointer items-center text-sm font-semibold text-white hover:text-blue-600 dark:text-white dark:hover:text-white">
        //                             <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        //                                 <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
        //                             </svg>
        //                             Home
        //                         </a>
        //                     </li>
        //                     <li>
        //                         <div class="flex items-center cursor-pointer">
        //                             <svg class="rtl:rotate-180 w-3 h-3 text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        //                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        //                             </svg>
        //                             <a href="/ourteam" class="ms-1 cursor-pointer text-sm font-medium text-white hover:text-blue-600 md:ms-2 dark:text-white dark:hover:text-white">Our Team</a>
        //                         </div>
        //                     </li>

        //                 </ol>
        //             </nav>
        //         </div>
        //         <div className="absolute inset-0 bg-black opacity-50 "></div>

        //         <div className="text-box w-[90%] md:w-[848px] grid place-items-center relative z-20">
        //             <h1 className="text-[24px] md:text-[48px] font-bold capitalize">
        //                 Meet Our Team
        //             </h1>
        //         </div>
        //     </section>
        //     <div className='max-w-2xl mx-auto my-10'>
        //         <h1 className='text-center text-blue-900 font-bold text-4xl'>Our Team</h1>
        //         <h2 className='text-center text-blue-900 font-normal text-lg'>Everything you need about finding the best , safe and affordable storage space near you.</h2>
        //     </div>
        //     <div className='max-w-screen-lg mx-auto'>
        //         <div className='grid grid-cols-1 md:grid-cols-3 justify-items-center'>
        //             {teamList.map((elem, id) => {
        //                 return (
        //                     <div class="flip-box">
        //                         <div class="flip-box-inner">
        //                             <div class="flip-box-front">
        //                                 <Image
        //                                     height={300}
        //                                     width={250}
        //                                     className='h-full w-full rounded-lg'
        //                                     src={elem.image}
        //                                     alt={elem.name}
        //                                 />
        //                             </div>
        //                             <div class="flip-box-back p-6">
        //                                 <h2 className='text-md'>{elem.Descriptions}</h2>
        //                                 <p className='text-xl font-semibold'>{elem.name}</p>
        //                                 <p className='text-sm font-normal'>{elem.designation}</p>
        //                                 <div className='flex justify-center'>
        //                                     <FaLinkedin className='text-xl mr-4' />
        //                                     <CgMail className='text-xl' />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )
        //             })}
        //         </div>
        //     </div>
            
        //     <Footer />
        // </div>
        <div>
            <Header/>
<div className="w-full bg-gray-50">
<section className=" h-[50vh] md:h-[70vh] relative">
        <Image
                src={teamimg}
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                className="z-0 "
            />
            <div className='absolute top-4 left-4 z-50'>
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center cursor-pointer">
                            <a href="/" class="inline-flex cursor-pointer items-center text-sm font-semibold text-white hover:text-blue-600 dark:text-white dark:hover:text-white">
                                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center cursor-pointer">
                                <svg class="rtl:rotate-180 w-3 h-3 text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a href="/ourteam" class="ms-1 cursor-pointer text-sm font-medium text-white hover:text-blue-600 md:ms-2 dark:text-white dark:hover:text-white">Our Team</a>
                            </div>
                        </li>

                    </ol>
                </nav>
            </div>
            <div className="absolute inset-0 bg-black opacity-50 "></div>

            <div className="text-box w-[90%] md:w-[848px] grid place-items-center relative z-20">
                <h1 className="text-[24px] md:text-[48px] font-bold capitalize">
                    Meet Our Team
                </h1>
            </div>
        </section>
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
  <div className='max-w-2xl mx-auto my-10'>
            <h1 className='text-center text-blue-900 font-bold text-4xl'>Our Team</h1>
            <h2 className='text-center text-blue-900 font-normal text-lg'>Everything you need about finding the best , safe and affordable storage space near you.</h2>
        </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {
        teamList?.map((elem,id)=>{
            return(
                <div className="w-full bg-blue-500 rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-80">
          <img
            className="object-center object-cover w-full h-full"
            src={elem.image}
            alt="photo"
          />
        </div>
        <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
          <p className="text-xl text-white font-bold">{elem.name}</p>
          <p className="text-base text-gray-200 font-semibold">
           {elem.designation}
          </p>
          <p className="text-base leading-relaxed text-gray-200 font-normal">
           {elem.Descriptions}
          </p>
          <div className="flex justify-start space-x-2">
          <FaLinkedin className='text-2xl text-white '/>
            <CgMail className='text-3xl text-white '/>
          </div>
        </div>
      </div>
            )
        })
      }
     
    </div>
  </section>
</div>
<Footer/>
</div>
        
    )
}

export default index;

