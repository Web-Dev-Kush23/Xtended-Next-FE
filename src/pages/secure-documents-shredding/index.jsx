"use client";

import React, { useState, useEffect } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer/index";
import Image from "next/image";
import { AWS_IMAGE_URL } from "../../config/constants"
import Link from "next/link";
import { TestimonialList, FAQList } from "../../data/record-management";
import { motion } from "framer-motion";
import { contact_us } from "@/service/homePageService";
import { CiCloud } from "react-icons/ci";
import { AiOutlinePicture } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdCloudOutline } from "react-icons/io";
import { LuFileStack } from "react-icons/lu";
import Head from "next/head";

const Index = () => {

    const [current, setCurrent] = useState(0);
    const [openIndex, setOpenIndex] = useState(null);
    const [formData, setFormData] = useState({
        subject: "Empty",
        source: "Empty",
        city: "Empty",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [multipleError, setMultipleError] = useState();
    const scrollToContact = (e) => {
        e.preventDefault(); // Prevent default link behavior
        const contactSection = document.getElementById("third");
        if (contactSection) {
            const yOffset = window.innerWidth <= 768 ? -50 : -100; // Adjust scroll position for mobile
            const y = contactSection.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    // Automatically change testimonials every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % TestimonialList.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        if (isChecked) {
            setErrors((prevErrors) => ({ ...prevErrors, checkError: "" }));
        }
    };

    const trimNumber = (s) => s.replace(/^0+/, '') || '0';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "phoneNumber" ? trimNumber(value) : value,
        }));
        setMultipleError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                checkError: "Please agree to the terms and conditions before submitting.",
            }));
            return;
        }
        if (isSubmitting) return;

        setIsSubmitting(true);
        const response = await contact_us(formData);
        if (response.success) {
            setShowSuccessMessage(true);
            document.getElementById("myform").reset();
        } else if (response?.error?.title === "One or more validation errors occurred.") {
            setMultipleError(response?.error?.errors);
        }
        setIsSubmitting(false);
    };

    // const nextTestimonial = () => {
    //     setCurrent((prev) => (prev + 1) % testimonials.length);
    // };

    return (
       <>
  <Head>

        <title>Secure Document Destruction (Shredding) Services in India</title>

        <meta
          name="description"
          content="Protect your data with certified document destruction services. Fast, secure, eco-friendly shredding for businesses of all sizes. Book your service today!"
        />

        <link
          rel="canonical"
          href="https://www.xtendedspace.com/secure-documents-shredding"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="alternate"
          href="https://www.xtendedspace.com/secure-documents-shredding"
          hreflang="en-in"
        />
      </Head>


        <div className="max-w-[1500px] mx-auto">
            <HeaderMenu />

            <div className="w-full overflow-x-hidden">
                <section className="relative h-[30vh] md:h-[50vh] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center sm:bg-top md:bg-center bg-no-repeat md:bg-fixed"
                        style={{
                            // backgroundImage:"url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/papper+shredding+service-04-01_batcheditor_fotor.webp')",
                            backgroundImage:"url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/paper-shredding-banner.webp')",
                        }}
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="relative w-[90%] sm:w-[80%] px-2 text-center py-6">
                        <h1 className="text-white text-3xl sm:text-5xl font-extralight inline-block pb-2">
                            Paper Shredding Services
                        </h1>
                        <div className="w-20 h-[1px] text-white bg-white border-none mx-auto mb-8" ></div>
                    </div>
                </section>

                <section className="flex flex-col md:flex-row items-center justify-between px-4 custom-padding py-8 bg-gray-100">
                    <div className="md:w-4/5 text-start md:text-left text-gray-700">
                        <span>
                            Xtended Space Pvt Ltd supports business organizations by shredding their documents. We manage your documents with secure storage. That is why our Document Disposal Service is always in high demand. By disposing of confidential and outdated records to prevent data leaks, we help the government and private organizations.
                        </span>
                    </div>
                    <div className="md:w-1/5 flex justify-end mt-4 md:mt-0">
                    <div
                            onClick={scrollToContact}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                Enquire Now
                            </div>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center bg-gray-200 py-8 px-4 custom-padding">
                    <div className="w-full px-6 text-center">
                        <header className="text-center py-5">
                            <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                Dispose of Your Documents Safely
                            </h2>
                            <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-8" ></div>
                        </header>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-full pt-0 md:pt-6">
                        <motion.span
                            className="md:w-1/2 text-justify md:text-left text-gray-800 leading-relaxed"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            viewport={{ once: true }}
                        >
                            Large businesses like hotels, banks, hospitals, and law firms usually generate paperwork that consumes huge office space. However, it is pivotal to recognize that unnecessary piled-up documents are not required. The Xtended Space team shreds your unwanted data efficiently and prevents the information from getting leaked by maintaining an organized system. So, share your outdated agreements and decade-old records securely at Xtended Space.

                            <br></br>
                            <br></br>

                            Our services assist businesses, government institutions, financial organizations, and educational bodies. Many industries follow strict regulations for storing records for up to ten years. Documents such as payroll reports, tax records, legal contracts, customer data, mailing lists, insurance policies, and lease agreements require proper disposal to safeguard your company's sensitive information.

                            <br></br>
                            <br></br>

                            To ensure more safety, we offer a dual-layered disposal process to businesses and make their space clutter-free. Our operational team meticulously aligns the documents and verifies each consignment before transporting it to the warehouse by maintaining complete transparency where shredding takes place under close supervision. This process eliminates the risks of data breaches and maintains industry trust.


                            <br></br>
                            <br></br>
                            With our tailored services and spacious warehouse, you can confidently dispose of sensitive documents. We believe that when it comes to data protection, there should not be room for compromise.
                        </motion.span>

                        {/* Image Section */}
                        <motion.div
                            className="md:w-1/2 flex justify-center"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}>
                            <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/dispose.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            />
                            {/* <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/document+shredding+company-03-03_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            /> */}
                        </motion.div>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center bg-gray-100 py-8 px-4 custom-padding">

                    <div className="w-full px-6 text-center">
                        <header className="text-center py-5">
                            <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                Paper Shredding Services – Varied Options
                            </h2>
                            <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-8" ></div>
                        </header>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-full pt-0 md:pt-6">
                        <motion.div
                            className="md:w-1/2 flex justify-center"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/paper-shredding-service.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover"
                            />
                            {/* <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/papper+shredding+service-04-04_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover"
                            /> */}
                        </motion.div>

                        <motion.span
                            className="md:w-1/2 text-justify md:text-left text-gray-800 leading-relaxed"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            You can choose multiple document disposal options based on your requirements. Our operational team personally visits your office and collects your documents for safe disposal. Your document information is managed by our selected team members.


                            <br></br>
                            <br></br>

                            This process maintains the reliability between the team and customers. Whether you are a large-scale company or an institution our goal is to provide you with the best quality service by keeping your documents confidential. It depends on your requirements and what information you want us to eradicate permanently. So, experience a secure and hassle-free way to manage document destruction.
                        </motion.span>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center bg-gray-200 py-8 px-4 custom-padding">
                    <div className="w-full px-6 text-center">
                        <header className="text-center py-5">
                            <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                Eco-friendly Process
                            </h2>
                            <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-8" ></div>
                        </header>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-full pt-0 md:pt-6">
                        {/* Text Content */}
                        <motion.span
                            className="md:w-1/2 text-justify md:text-left text-gray-800 leading-relaxed"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            To reduce the carbon footprint, we recommend shredding over incineration for safe and eco-friendly document disposal. This process effectively eliminates your confidential documents by simultaneously supporting the environment. By following this process, we have reduced 5% of the carbon emissions from our planet and contributed more by recycling paper. So, Xtended Space is helping your businesses by making the environment sustainable.

                            <br></br>
                            <br></br>

                            These options are available to our customers, regardless of the size of their stored documents. We follow strict regulations to ensure the highest quality service. Our expertise and deep understanding of our client's needs help us provide the best solutions in the industry.
                        </motion.span>


                        <motion.div
                            className="md:w-1/2 flex justify-center"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}>
                            <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/eco+frendly-05-05_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            />
                        </motion.div>

                    </div>
                </section>

                <section className="w-full bg-white py-8 px-4 custom-padding">
                    <div className="max-w-10xl mx-auto text-center">
                        <div className="w-full px-6 text-center">
                            <header className="text-center py-5">
                                <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                    Other Services
                                </h2>
                                <div className="w-20 h-[1px] bg-black border-none mx-auto mb-8" ></div>
                            </header>
                        </div>
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
                                <div className="flex flex-col items-center text-center">
                                    <Link
                                        href="/record-and-information-management"
                                    >
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-1 border-transparent group hover:border-black">
                                            <LuFileStack size={48} className="text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:animate-jump" />
                                        </div>
                                    </Link>
                                    <Link
                                        href="/record-and-information-management"
                                    >
                                        <h3 className="text-lg font-semibold text-blue-500">Record & Information Management</h3>
                                    </Link>
                                    <p className="text-gray-700 mt-2">
                                        Xtended Space document management service stores your goods digitally. Managing physical paperwork consumes lots of time and needs extra space and effort to align and recover when required. Especially, big companies struggle to organize and place official documents rapidly.
                                    </p>
                                </div>

                                {/* Document Management System */}
                                <div className="flex flex-col items-center text-center">
                                    <Link
                                        href="/document-management-system"
                                    >
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-1 border-transparent group hover:border-black">
                                            <IoMdCloudOutline size={48} className="text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:animate-jump" />
                                            {/* <CiCloud size={48} className="text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:animate-jump" /> */}
                                        </div>
                                    </Link>
                                    <Link
                                        href="/document-management-system"
                                    >
                                        <h3 className="text-lg font-semibold text-blue-500">Document Management System</h3>
                                    </Link>
                                    <p className="text-gray-700 mt-2">
                                        Smart solutions for anytime access to vital business information on the go with
                                        online document storage solutions. Our Records Management System provides high security,
                                        performance, and disaster recovery abilities for your most sensitive information.
                                    </p>
                                </div>

                                {/* Scanning and Digitization */}
                                <div className="flex flex-col items-center text-center">
                                    <Link
                                        href="/scanning-and-digitization"
                                    >
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-1 border-transparent group hover:border-black">
                                            {/* <i className="fas fa-file-image text-4xl text-gray-600 group-hover:text-blue-500"></i> */}
                                            <AiOutlinePicture size={48} className="text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:animate-jump" />

                                        </div>
                                    </Link>
                                    <Link
                                        href="/scanning-and-digitization"
                                    >
                                        <h3 className="text-lg font-semibold text-blue-500">Scanning and Digitization</h3>
                                    </Link>
                                    <p className="text-gray-700 mt-2">
                                        Xtended Space offers hassle-free document digitizing solutions so that your
                                        productivity remains unaffected and the information workflow within the
                                        organization is streamlined.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="relative w-full bg-fixed bg-cover bg-center py-8 px-4 custom-padding text-white overflow-hidden pb-2"
                    style={{
                        backgroundImage: "url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/record-management-banner.webp')",
                       // backgroundImage: "url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/Record+%26+Information+Management+System_7_11zon.webp')",
                        backgroundAttachment: "fixed",
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Content Wrapper */}
                    <div className="relative max-w-4xl mx-auto text-center px-4">
                        {/* Header */}
                        <div className="w-full px-6 text-center">
                            <header className="text-center py-5">
                                <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                    Testimonials
                                </h2>
                                <div className="w-20 h-[1px] text-white bg-white border-none mx-auto mb-4" ></div>
                            </header>
                        </div>

                        {/* Testimonial Content with Animation */}
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="text-xl font-normal px-4"
                        >
                            {TestimonialList[current].text}
                        </motion.div>

                        {/* Testimonial Author */}
                        <div className="mt-4 flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src={TestimonialList[current].image}
                                    width={80}
                                    height={80}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-lg font-semibold mt-2">— {TestimonialList[current].name}</p>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex justify-center space-x-2 mt-2 pb-4">
                            {TestimonialList.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className="relative h-4 w-4 flex items-center justify-center"
                                >
                                    {/* Outer Gray Dot */}
                                    <div className="h-4 w-4 rounded-full opacity-50 bg-gray-500"></div>

                                    {/* Inner White Dot (Only Visible When Active) */}
                                    {index === current && (
                                        <div className="absolute h-2.5 w-2.5 bg-white rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                    </div>
                </section>

                <section className="w-full bg-gray-100 py-8 px-4 custom-padding">
                    <div className="max-full mx-auto">
                        {/* <h2 className="text-3xl font-semibold text-center mb-2"></h2>
                        <hr className="w-16 border-b-2 border-black mx-auto mb-8" /> */}
                        <div className="w-full px-6 text-center">
                            <header className="text-center py-5">
                                <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                    FAQs
                                </h2>
                                <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-6" ></div>
                            </header>
                        </div>


                        {/* FAQ List */}
                        <div className="space-y-4">
                            {FAQList.map((faq, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full text-left flex justify-between items-center font-semibold text-lg text-gray-800"
                                    >
                                        {faq.question}
                                        <span className="text-xl">
                                            {openIndex === index ? "−" : "+"}
                                        </span>
                                    </button>
                                    {openIndex === index && (
                                        <p className="mt-3 text-gray-700">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="third" className="third bg-sky-50 w-full overflow-hidden">
                    <div className="max-w-screen-xl mx-auto md:items-center md:justify-center lg:flex-row flex lg:items-start items-center justify-center flex-col lg:pt-[50px] w-full px-4 custom-padding">
                        <div className="mygit home-text lg:pb-[70px] pb-0 w-full">
                            <div className="ht1">
                                <h2 className="text-[18px] md:text-[32px] font-bold text-[#1b1c57] capitalize">
                                    Get in touch with us
                                </h2>
                                {/* <p className="text-[12px] text-[#1b1c57] py-3 md:text-[18px]">
                                    Xtended Space smoothens your storage needs with just a click away by providing you pickup to secure storage and convenient redelivery.
                                </p> */}
                            </div>
                            <div className="w-full md:flex-col my-2 flex-wrap hidden md:block">
                                {[
                                    { src: "email.svg", label: "Email", value: "info@xtendedspace.com" },
                                    { src: "phone-1.svg", label: "Call Us", value: "+(91) 900 900 0798" },
                                    { src: "clock.svg", label: "Time", value: "Mon - Sun (24 X 7)" },
                                ].map((item, index) => (
                                    <div key={index} className="contact-item mt-4 gap-2 mr-2 flex items-center">
                                        <Image className="w-[28px] md:w-[46px]" src={`${AWS_IMAGE_URL}${item.src}`} alt={item.label} width={28} height={28} loading="lazy" />
                                        <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                                            {item.label}: <br /> {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="about-img mt w-full max-w-lg">
                            <div className="w-full">
                                <form id="myform" onSubmit={handleSubmit} className="w-full">
                                    <div className="form-row gap-4">
                                        <div className="form-group w-full m-0">
                                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                            <input type="text" id="name" placeholder="Enter your name" name="name" required onChange={handleChange} className="w-full" />
                                            {multipleError?.Name && <p className="text-sm text-red-500">{multipleError.Name[0]}</p>}
                                        </div>
                                        <div className="form-group w-full m-0">
                                            <label htmlFor="email">Email<span className="text-danger">*</span></label>
                                            <input type="email" id="email" placeholder="Enter your email" name="email" required onChange={handleChange} className="w-full" />
                                            {multipleError?.Email && <p className="text-base text-red-500">{multipleError.Email[0]}</p>}
                                        </div>
                                    </div>
                                    <div className="form-row gap-4">
                                        <div className="form-group w-full m-0">
                                            <label htmlFor="phone">Phone<span className="text-danger">*</span></label>
                                            <input type="tel" id="phone" placeholder="Enter your mobile no." name="phoneNumber" required onChange={handleChange} className="w-full" />
                                            {multipleError?.PhoneNumber && <p className="text-sm text-red-500">{multipleError.PhoneNumber[0]}</p>}
                                        </div>
                                        <div className="form-group w-full m-0">
                                            <label htmlFor="city">City<span className="text-danger">*</span></label>
                                            <input type="text" id="city" placeholder="Enter your city" name="city" required onChange={handleChange} className="w-full" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group w-full m-0">
                                            <label htmlFor="message">Message:</label>
                                            <textarea id="message" rows="3" placeholder="Your Message" name="message" onChange={handleChange} className="w-full"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-checkbox py-2">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="form-checkbox-input" />
                                            <p className="text-[12px] text-[#374151]">
                                                By continuing, you agree to our
                                                <Link href="/terms-and-conditions" target="_blank" className="text-blue-500 underline ml-1 mr-1">Terms & Conditions</Link>
                                                and
                                                <Link href="/privacy-policy" target="_blank" className="text-blue-500 underline ml-1">Privacy Policy</Link>
                                            </p>
                                        </div>
                                        <span className="error text-[12px] mb-2 text-red-500">{errors.checkError}</span>
                                    </div>
                                    <div className="form-row">
                                        <button type="submit" disabled={isSubmitting}>Submit</button>
                                    </div>
                                    {showSuccessMessage && <p className="success-message text-green-500 font-semibold py-2 px-2">Thank you for contacting us! Our Team will contact you soon!</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
       </>
    );
};

export default Index;
