import React, { useEffect, useState } from 'react';
import {SaveCityWiseLandingDetails} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { SaveOutdoorMarketingDetails } from '@/service/storageService';
import { submitForm } from "@/util/common";
import Hubspot from "./hubspot";
import { useRouter } from "next/router";
import Head from 'next/head';
import { GiPlateClaw } from 'react-icons/gi';
import Image from "next/image";
import { IoCall } from "react-icons/io5";


const Index = () => {
  
  const initialData = {
    Name: '',
    Phone: '',
    Email: '',
    TypeOfService: "Storage",
    coupon_id: "NUTSXS30",
  };

  // State to manage form input values
  const [data, setData] = useState(initialData);
// console.log(AddType)
  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit]  = useState(false)
  const [generalError, setGeneralError] = useState({});
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {setErrors((prevErrors) => ({...prevErrors,checkError: "",}));}};
    
  
  // State to manage errors
  const [errors, setErrors] = useState({
    nameError: '',
    PhoneError: '',
    emailError: '',
  
  });

  // Handle input changes
  const validatePhone = (Phone) => /^0?[0-9]{10}$/.test(Phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex
  const router = useRouter(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Reset errors on input change
    setErrors(prevErrors => ({ ...prevErrors, [`${name.toLowerCase()}Error`]: '' }));
  
    if (name === 'Phone' && !validatePhone(value)) {
      setErrors(prevErrors => ({ ...prevErrors, PhoneError: 'Please enter a valid Phone number.' }));
    } 
    if (name === 'Email' && !validateEmail(value)) {
      setErrors(prevErrors => ({ ...prevErrors, emailError: 'Please enter a valid email address.' }));
    }
    setGeneralError({});
    setErrors("")
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) {setErrors((prevErrors) => ({...prevErrors, checkError: "Please agree to the terms and conditions before submitting.",})); return;}
  
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (data.Name && validatePhone(data.Phone)) {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      if (utm_source) {
        formData.append("UTM_Source", utm_source);
        formData.append("UTM_Medium", utm_medium);
        formData.append("UTM_Campaign", utm_campaign);
        formData.append("UTM_Content", utm_content);
        formData.append("UTM_Term", utm_term);
        formData.append("Gclid", gclid);
        formData.append("Referrer", referrer);
      }

      try {
        // localStorageManager.setValue("landingoffer", JSON.stringify(data));
        const response = await SaveOutdoorMarketingDetails(formData);
        
        submitForm(formData);
        if (response.success) {
          localStorage.setItem("landingOfferData", JSON.stringify(data));
          setHubspotFormSubmit(true)
          setIsSubmitted(true);
          setData(initialData);
          document.getElementById("myform").reset(); 

        //   setTimeout(() => {
        //     if (data?.AddType === "storage-space") {
        //       // Redirect logic for storage space
        //       if (response.success?.isExistingUser) {
        //         router.push('/login?callback=easy-storage');
        //       } else {
        //         router.push('/signup?callback=easy-storage');
        //       }
        //     } else {
              // Show an alert if AddType is not "storage-space"
            //   alert("Form submitted successfully");
        //     }
        //   }, 250);
          
        } else {
          setGeneralError(response.error.errors);}

      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } 
    else {
      setErrors({
        nameError: !data.Name ? 'Name is required.' : '',
        PhoneError: !validatePhone(data.Phone) ? 'Please enter a valid Phone number.' : '',
        emailError: !validateEmail(data.Email) ? 'Please enter a valid email address.' : '',
      });
      setIsSubmitting(false);
    }
    
  };

  return (<>
      <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your Reliable Choice for Storage Space and Packing Moving | Xtended Space</title>
    <meta name="keywords" content="packers and movers, Storage space provider, warehouse storage, household storage service, packing and moving services." />
    <meta name="description" content="Don't be stressful. Let Xtended Space take care of your Storing and moving needs. We provides top-notch packing, moving, and storage solutions to make your transition seamless."/>
    </Head>
   <Hubspot  portalId = "45810273" formId = "df70fa42-f809-4dc7-9f80-c91b7d92ead7" hubspotFormSubmit = {hubspotFormSubmit} data = {data} setIsSubmitting={setIsSubmitting}/>
   <div className="landingnav flex justify-between h-[80px] items-center sticky top-0 z-50 bg-white w-[100%] text-black">
<div className="">
<img
            className="w-[150px]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
            alt="Xtended Space Logo"
          />
</div>
         <div className="">
         <a className="flex items-center gap-2" href="tel:+919009000798">
         <div className=" h-8 w-8 lg:bg-blue-500 rounded-full text-[20px] flex justify-center text-blue-500 lg:text-white">
         <IoCall className="m-auto" />
         </div>
          <span className="text font-bold"> +(91) 900 900 0798</span>
            </a>
         </div>
</div>
    <div class=" offer-online text-black p-[10px] md:p-[50px]  lg:p-[50px] flex flex-col justify-between lg:items-start items-center lg:pl-[100px]">

 <div className="text-center flex justify-center items-center w-full lg:w-[500px]">
 <h1 class="text-[30px] lg:text-[45px] font-[popins]  mt-2 lg:mt-0 font-bold  mb-4 text-center">Storage Solutions for <br/> Homes & Businesses
  </h1>
  {/* <div className="max-w-[300px] md:max-w-full lg:mb-4"> */}
  {/* <h2 class="text-[20px] lg:text-[30px]  my-2 pb-2 uppercase">Lowest Price Guaranteed!
  </h2> */}
  {/* <h3 class="text-[30px] lg:text-[50px]  font-extrabold">Storage Providers</h3> */}
  {/* </div> */}
 </div>
  <div className="lg:hidden ">
    <Image priority width={500} height={100} sizes='100vw' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/pack-move-store/offers+package.webp" alt="" />
</div>
  <div className=" w-[100%] mx-[auto] p-2 justify-between  items-center flex lg:hidden mb-2">

<div className=" w-full justify-center items-center gap-2 px-2 ">
<button className='text-[14px] md:text-[18px]   font-semibold rounded   flex items-center text-start gap-2 '><Image priority width={100} height={100} sizes='100' className=' w-[30px] rounded-full  border-[2px] border-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-calculator.png" alt="" />Smart Area Calculator

</button>
<button className='text-[14px] md:text-[18px]   font-semibold rounded   flex items-center text-start gap-2 pt-2'><Image priority width={100} height={100} sizes='100' className=' w-[30px] rounded-full  border-[2px] border-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-camera.png" alt="" />24/7 CCTV Surveillance

</button>
</div>
<div className=" w-full justify-center items-center gap-2  px-2 ">

<button className='text-[14px] md:text-[18px]   font-semibold rounded   flex items-center text-start gap-2 '><Image priority width={100} height={100} sizes='100' className=' w-[30px] rounded-full  border-[2px] border-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-door-to-door-delivery.png" alt="" />End-to-End Doorstep Services

</button>
<button className='text-[14px] md:text-[18px]   font-semibold rounded   flex items-center text-start gap-2 pt-2'><Image priority width={100} height={100} sizes='100' className=' w-[30px] rounded-full  border-[2px] border-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-insurance.png" alt="" /> Insurance Coverage
</button>

   
</div>
</div>

  <div className="w-full lg:w-[500px] ">
  <form id='myform' onSubmit={handleSubmit} c>
              <div className="bg-[#328bff33] rounded-xl lg:rounded-3xl shadow flex flex-col items-center justify-around p-[20px] lg:px-[40px] py-[20px] gap-3">
               <div className=" flex flex-col items-center">
               <h2 className="font-bold text-[26px] md:text-[30px] text-black">
               Save Up To 40%

                </h2>
                <p className="text-black text-[16px] font-bold">On Market Price</p>
           
               </div>
                <div className="flex flex-col items-start justify-center w-full">
                  {/* <p className="text-black font-bold text-[14px]">Name</p> */}
                  <input
                    type="text"
                    onChange={handleChange} 
                    className="w-full text-black outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
                    placeholder="Name"
                    name="Name"
                    value={data?.Name}
                    required
                  />
                      {generalError?.Name && (
                <p className="text-[13px] text-red-500">{generalError?.Name}</p>
              )}
                   {errors.nameError && <p className="text-red-500 text-[13px] ">{errors.nameError}</p>}
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                  {/* <p className="text-black font-bold text-[14px]">Phone Number</p> */}
                  <input
                    type="number"
                    onChange={handleChange} 
                    name="Phone"
                    maxLength={10} 
                    onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                    value={data?.Phone}
                    className="w-full text-black outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
                    placeholder="Phone Number"
                    required
                  />
                      {generalError?.Phone && (
                <p className="text-[13px] text-red-500">{generalError?.Phone}</p>
              )}
                   {errors.PhoneError && <p className="text-red-500 text-[13px]">{errors.PhoneError}</p>} {/* Error message for Phone */}
    
                </div>
              
                <div className="flex flex-col items-start justify-center w-full">
                  {/* <p className="text-black font-bold text-[14px]">Email</p> */}
                  <input
                    type="text"
                    name="Email"
                    value={data?.Email}
                    onChange={handleChange} 
                    className="w-full text-black outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
                    placeholder="Email"
                    required
                  />
                      {generalError?.Email && (
                <p className="text-[13px] text-red-500">{generalError?.Email}</p>
              )}
                   {errors.emailError && <p className="text-red-500 text-[13px]">{errors.emailError}</p>} {/* Error message for Email */}
   
                </div>
                <div className=" flex-col items-start justify-center w-full hidden">
                <select
                id="TypeOfService "
                name="TypeOfService"
                // type="text"
                // required
                defaultValue="Storage"
                className="w-full text-black outline-none border-[1px] rounded lg:rounded-3xl  text-[14px] pl-3 h-[40px]"
                onChange={handleChange} 
              >
                <option value="" disabled selected>
                Service Type
                </option> 
                <option value="Storage">Storage</option>
                <option value="Relocation">Packers And Movers</option>
               

                
              </select>
              {generalError?.TypeOfService && (
                <p className="text-[13px] text-red-500">{generalError?.TypeOfService}</p>
              )}
              </div>
             
            <p className='text-black m-0 p-0 hidden'>
              service
            </p>
            {/* <p className="text-base text-red-500 text-[13px] mb-2">
      {generalError}
    </p> */}
   
    <input
                    type="text"
                    name="coupon_id"
                    value="HOLI1000"
                    onChange={handleChange} 
                    className="bg-black text-black hidden"
                    placeholder="coupon_id"
                    required
                  />
     <div className="flex items-left w-full ">
     <p className="text-[16px] text-black ">
     Get Extra Rs.1000 OFF* on First Booking <br />Coupon Code: <span className='  font-bold'>HOLI1000</span>

       </p>
     </div>
            
              
              <div className="form-checkbox py-2 w-full">
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      className="form-checkbox-input"
    />
     <div className="">
   <p className="text-[12px] text-black">
                              By continuing, you agree to our
                              <a href="/terms-and-conditions" target="_blank">
                                <span className=" text-blue-600 underline ml-1 mr-1">
                                  Terms & Conditions
                                </span>
                              </a> 
                              and 
                              <a href="/privacy-policy" target="_blank">
                                <span className=" text-blue-600 underline ml-1">
                                   Privacy Policy
                                </span>
                              </a>
                            </p>
   </div>
  </div>
<span className="error text-[12px] mb-2 text-red-500">{errors.checkError}</span>

</div>
         
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-[22px] text-black w-full py-2 rounded lg:rounded-3xl font-bold animation-btn"
                >Submit
                  {/* Get Flat 30% OFF <br /> <span className='text-[15px]'>Upto ₹ 5000</span> */}
                </button>
                   {isSubmitted && <p className="text-black font-bold text-[14px] text-center">We have received your request. Our team will contact you shortly or Call us at +91 90090 00798</p>}
              </div>
            </form>
            </div>


            <div className=" w-full p-2 justify-between mt-3 items-center hidden lg:flex lg:w-[700px]">
          <div className=" w-full justify-start items-center gap-4 px-2  ">
<button className='text-[12px] md:text-[18px]  text-black font-semibold rounded   flex items-center gap-2 '><Image priority width={100} height={100} sizes='100' className=' w-[40px] rounded-full  border-[2px] border-black color-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-calculator.png" alt="" />Smart Area Calculator

</button>
<button className='text-[12px] md:text-[18px]  text-black font-semibold rounded   flex items-center gap-2 pt-2'><Image priority width={100} height={100} sizes='100' className=' w-[40px] rounded-full  border-[2px] border-black color-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-camera.png" alt="" />24/7 CCTV Surveillance

</button>
</div>
<div className=" w-full justify-start items-center gap-4 px-2 ">

<button className='text-[12px] md:text-[18px]  text-black font-semibold rounded   flex items-center gap-2 '><Image priority width={100} height={100} sizes='100' className=' w-[40px] rounded-full  border-[2px] border-black color-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-door-to-door-delivery.png" alt="" />End-to-End Doorstep Services

</button>
<button className='text-[12px] md:text-[18px]  text-black font-semibold rounded   flex items-center gap-2 pt-2'><Image priority width={100} height={100} sizes='100' className=' w-[40px] rounded-full  border-[2px] border-black color-black  p-1 ' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/icons-insurance.png" alt="" /> Insurance Coverage
</button>

   
</div>
   
</div>


  {/* <Image priority width={100} height={100} sizes='100' aria-hidden="true" alt="moving truck" src="https://openui.fly.dev/openui/400x300.svg?text=🚚" class="mt-4" /> */}
</div>
</>
  )
}

export default Index

