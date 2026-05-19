"use client"
import imag from "../../public/images/oopsimg.jpg"
import Image from "next/image";
import packerimage from "../../public/images/packer-icon.png";
import logisticimg from "../../public/images/logistic-icon.png";
import businessimg from "../../public/images/business-icon.png";
import easyimg from "../../public/images/easystorage-icon.png";
import affordableimg from "../../public/images/affordable-icon.png";
import "../../src/styles/ourteam.css"
import Header from "@/pages/header";
import Footer from "../components/footer/index"


export default function Custom404() {

  const services = [
    {
      name:"Store With A Host",
      image:affordableimg,
      link:"/store-with-a-host"
    },
    {
      name:"Store At A Warehouses",
      image:easyimg,
      link:"/store-at-a-warehouse"
    },
    {
      name:"Packers & Movers",
      image:packerimage,
      link:"/services/packers-and-movers"
    },
    {
      name:"Business Storage",
      image:businessimg,
      link:"/services/business-storage"
    },
    {
      name:"B2B Logistics",
      image:logisticimg,
      link:"/services/b2b-logistics"
    },
    {
      name:"Track Shipment",
      image:logisticimg,
      link:"/alltimelogistic"
    }
  ]
  return (
    <>
    <Header/>
      <div className="max-w-screen-lg mx-auto block md:flex justify-between items-center">
    <div className="w-full md:w-1/3">
      <Image
        src={imag}
        height={300}
        width={300}
        alt='oopsimage'
        className="h-full w-full"
      />
    </div>
    <div className="w-full notfound-head md:w-1/2">
      <h1 className="text-4xl text-gray-800 py-2">PAGE NOT FOUND</h1>
      <h2 className="text-xl py-3">The page you're looking for does not exist! You might want to explore from one of the links below.</h2>
      <a  href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go To Home</a>
    </div>
  </div>
  <div className='max-w-2xl mx-auto my-10'>
            <h1 className='text-center text-blue-900 font-bold text-4xl'>Xtended spaces's trusted services</h1>
            <h2 className='text-center text-blue-900 font-normal text-lg'>You name it , we serve it !</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 place-items-center place-content-center">
          {services.map((elem,id)=>{
            return(
              <a key={id} href={elem.link} className="m-auto px-8 py-6 w-64 rounded-lg shadow" >
                <img src={elem.image.src} className="mx-auto"/>
                <p className="text-center font-bold text-xl mt-2">{elem.name}</p>
              </a>
            )
          })}
        </div>
        <Footer/>
    </>
  )
}
