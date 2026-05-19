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

        <title>Document Scanning & Digitization Solutions - Xtended Space</title>

        <meta
          name="description"
          content="Digitize documents with secure scanning solutions. Boost access, cut storage costs, and go paperless with ease. Ideal for all business types. Get started!"
        />

        <link
          rel="canonical"
          href="https://www.xtendedspace.com/scanning-and-digitization"
        />

        <meta name="robots" content="index, follow" />


        <link
          rel="alternate"
          href="https://www.xtendedspace.com/scanning-and-digitization"
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
                            backgroundImage:
                                "url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/document-indexing-banner.webp')",
                        
                            // backgroundImage:"url('https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/document+scanning+%26digitzation+services-02-02_batcheditor_fotor.webp')",
                        }}
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="relative w-[90%] sm:w-[80%] px-2 text-center py-6">
                        <h1 className="text-white text-3xl sm:text-5xl font-extralight inline-block pb-2">
                            Document Indexing and Recovering
                        </h1>
                        <div className="w-20 h-[1px] text-white bg-white border-none mx-auto mb-8" ></div>
                    </div>
                </section>

                <section className="flex flex-col md:flex-row items-center justify-between px-4 custom-padding py-8 bg-gray-100">
                    <div className="md:w-4/5 text-justify md:text-left text-gray-700">
                        <span>
                            Indexing is a helpful tool that finds and retrieves documents from a Document Management System (DMS) database. It helps different departments within an organization store and organize files efficiently. The system allows users to quickly access files by searching under specific categories where they were stored.



                            Document Management System in the workplace improves the efficiency of data handling. It removes the need for paper, creating a more organized and eco-friendly work environment. This system gathers and arranges information from multiple sources into a single, well-structured database, making document access and management simple and efficient.
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
                                Document Scanning & Digitization Services
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
                            Xtended Space Pvt Ltd provides an extensive range of features designed to simplify and streamline the complex process of scanning and digitizing document storage.
                            
                            
                            Our advanced solutions ensure secure, organized, and easily accessible digital records, reducing manual effort and enhancing efficiency.
                            
                            <br></br>
                            <br></br>
                            Trusted by service providers across the globe, our document management solutions are essential for seamless data storage, retrieval, and long-term information management.
                        </motion.span>

                        <motion.div
                            className="md:w-1/2 flex justify-center"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}>
                            <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/document-scanning.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover"
                            />
                            {/* <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/smart+document+scanning-08-08_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover"
                            /> */}
                        </motion.div>

                    </div>
                </section>
                <section className="flex flex-col items-center justify-center bg-gray-100 py-8 px-4 custom-padding">

                    <div className="w-full px-6 text-center">
                        <header className="text-center py-5">
                            <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                Document Digitization and Data Processing
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
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/document+digitization+and+data+processing-06-06_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.span
                            className="md:w-1/2 text-justify md:text-left text-gray-800 leading-relaxed"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            Having instant access to information is a necessity rather than a luxury. Xtended Space Pvt Ltd, recognize this need and offer comprehensive document digitization services. You can convert your physical data into digital formats according to your requirements based on their specific requirements. Our team ensures a seamless and efficient transition, promptly fulfilling client requests.

                            <br></br>
                            <br></br>

                            We convert physical documents into digital formats, making data easily accessible while guiding clients through the process whenever needed. Managing physical records becomes significantly more convenient when supported by digital backups, and our team of skilled professionals provides complete assistance for a smooth and hassle-free experience.
                        </motion.span>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center bg-gray-200 py-8 px-4 custom-padding">
                    <div className="w-full px-6 text-center">
                        <header className="text-center py-5">
                            <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                Customer On-Boarding and Audit
                            </h2>
                            <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-8" ></div>
                        </header>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-full pt-0 md:pt-6">
                        <motion.span
                            className="md:w-1/2 text-justify md:text-left text-gray-800 leading-relaxed"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            Our in-house team of experienced professionals assists new customers in seamlessly synchronizing their data and information. Any management challenges faced during the process within less time these challenges are efficiently resolved.
                            
                            <br></br>
                            <br></br>
                            To ensure transparency, first-time customers receive a comprehensive audit report, maintaining a record of all available and stored data.
                        </motion.span>

                        <motion.div
                            className="md:w-1/2 flex justify-center"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}>
                            {/* <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/coustomer+on+boarding-07-07_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            /> */}
                            <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/customer-managemet.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            />
                            {/* <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/record-management/coustomer+on+boarding-07-07_batcheditor_fotor.webp"
                                width={600}
                                height={450}
                                alt="User Profile"
                                className="object-cover "
                            /> */}
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

                                <div className="flex flex-col items-center text-center ">
                                    <Link
                                        href="/secure-documents-shredding"
                                    >
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-1 border-transparent group hover:border-black">
                                            <IoTrashBinOutline size={48} className="text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:animate-jump" />

                                            {/* <i className="fas fa-trash-alt text-4xl text-gray-600 group-hover:text-blue-500"></i> */}
                                        </div>
                                    </Link>
                                    <Link
                                        href="/secure-documents-shredding"
                                    >
                                        <h3 className="text-lg font-semibold text-blue-500">Secure Documents Shredding</h3>
                                    </Link>
                                    <p className="text-gray-700 mt-2">
                                        Xtended Space protects your personnel, customers, and corporate data from
                                        an information breach or loss, which is now a legal matter, through secure shredding.
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
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    <div className="relative max-w-4xl mx-auto text-center px-4">
                        <div className="w-full px-6 text-center">
                            <header className="text-center py-5">
                                <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                    Testimonials
                                </h2>
                                <div className="w-20 h-[1px] text-white bg-white border-none mx-auto mb-4" ></div>
                            </header>
                        </div>

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

                        <div className="flex justify-center space-x-2 mt-2 pb-4">
                            {TestimonialList.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className="relative h-4 w-4 flex items-center justify-center"
                                >
                                    <div className="h-4 w-4 rounded-full opacity-50 bg-gray-500"></div>

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
                        <div className="w-full px-6 text-center">
                            <header className="text-center py-5">
                                <h2 className="text-[1.75rem] md:text-5xl font-extralight inline-block pb-2">
                                    FAQs
                                </h2>
                                <div className="w-20 h-[1px] text-black bg-black border-none mx-auto mb-6" ></div>
                            </header>
                        </div>

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
