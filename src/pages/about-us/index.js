import React, { useRef, useState } from 'react';
import Footer from "@/components/footer";
import HeaderMenu from "@/components/header/header";
import Head from "next/head";
import { MdDoubleArrow } from "react-icons/md";
import Link from 'next/link';
const AboutUs = () => {
    const missionRef = useRef(null);
    const visionRef = useRef(null);
    const aboutRef = useRef(null)
    const servicesRef = useRef(null)

    const [activeSection, setActiveSection] = useState(null);
    const scrollToSection = (ref, sectionName) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 150, 
                behavior: "smooth",
            });
            setActiveSection(sectionName);
        }
    };

    return (
        <div className="max-w-[1550px] mx-[auto] w-[100%] ">
            <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>About Xtended Space | Storage & Packer Mover Services</title>
        <meta name="description" content="Learn about Xtended Space, offering secure storage solutions and reliable packer and mover services tailored to meet your moving and storage needs."/>
        <meta name="author" content="Xtended Space" />
        {/* <meta name="keywords" content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"/> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com/about-us" />
        <link rel="alternate" href="https://www.xtendedspace.com/about-us" hreflang="en-in" />
        <meta property="og:title" content="Xtended Space Secure Storage | Packers Movers Services India"/>
       <meta property="og:description" content="Xtended Space offers safe storage solutions and reliable packers and movers services across India for a hassle-free experience."/>
        <meta property="og:image" content="https://www.xtendedspace.com/images/xtended-space-storage-and-relocation-service.webp"/>
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Xtended Space Storage & Packers Movers India"/>
        <meta property="og:url" content="https://www.xtendedspace.com/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary"/>
<meta name="twitter:site" content="@xtendedspace"/>
<meta name="twitter:description" content="Xtended Space offers safe storage solutions and reliable packers and movers services across India for a hassle-free experience."/>
<meta name="twitter:title" content="Xtended Space Secure Storage | Packers Movers Services India"/>
<meta name="twitter:image" content="https://www.xtendedspace.com/images/xtended-space-storage-and-relocation-service.webp"/>
<meta name="twitter:image:alt" content="Xtended Space Storage & Packers Movers India"/>

        
      </Head>
            <HeaderMenu />
            <div class="bg-white py-4 pl-[50px] items-center flex-wrap hidden lg:flex">
  <ul class="flex items-center">
	<li class="inline-flex items-center">
	  <Link href="/" class="text-gray-600 hover:text-blue-500 ">
		Home
	  </Link>
      <div className="w-5 h-auto fill-current mx-2 text-gray-400"><MdDoubleArrow /></div>
	  </li>
	<li class="inline-flex items-center">
	  <Link href="" class="text-gray-600 hover:text-blue-500">
		About Us
	  </Link>
	 </li>
  </ul>
</div>
            <section className="about flex-col md:flex-row flex p-4">
                
                <div>
                    <div
                        className="fixed md:sticky top-[60px] md:top-[100px]  z-10 bg-white h-[40px] py-2 md:py-0 w-full md:w-[250px]"
                    >
                        <ul
                            className="category my-0 aboutleft md:px-5 flex md:flex-col items-center md:items-start  gap-2 md:gap-6 "
                        >
                            {/* <h2 className="text-[14px] md:text-[35px] font-semibold text-[#1B1C57]">
                                About US
                            </h2> */}
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'about' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(aboutRef, "about")}>
                                About US
                                </button>
                            </li>
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'mission' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(missionRef, "mission")}>
                                    Our Mission
                                </button>
                            </li>
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'vision' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(visionRef, "vision")}>
                                    Our Vision
                                </button>
                            </li>
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'services' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(servicesRef, "services")}>
                                    Our Services
                                </button>
                            </li>
                          
                           
                        </ul>
                    </div>
                </div>

                <div className="aboutright w-full lg:pr-[200px] ht1 mt-[20px] md:mt-0">
                    <h1 className="text-[22px] md:text-[38px] font-semibold mb-6 text-[#1B1C57]" id="0"
                        ref={aboutRef}>
                        About Us
                    </h1>
                    <h2 className="text-[16px] md:text-[24px] text-black mb-6">
                    Where AI Meets Efficiency: Your Go-To Storage and Logistics Partner!
                    </h2>
                    <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                    Xtended Space is India's first and only Peer-to-peer AI storage platform offering storage and logistics services in B2B and B2C markets. It was founded by Rachna Suneja in 2022 with an aim to provide comprehensive storage and logistics services integrated with AI-driven solutions. 
                    </p>
                    <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                    Currently, top brands like Hero, TVS, Mankind, Coca Cola etc. have trusted us for their logistics and storage needs. Our pan-India reach allows us to cover every nook and corner. 
                    </p>
                    <h2
                        id="1"
                        ref={missionRef}
                        className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]"
                    >
                        Our Mission
                    </h2>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    Our mission is to provide efficient, productive, and cost-friendly solutions to our customers. We are dedicated to offer innovative, tech-driven solutions to meet surging logistics and storage demands.
                    </p>
                    <h2
                        id="2"
                        ref={visionRef}
                        className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]"
                    >
                        Our Vision
                    </h2>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    Our vision is to become the flagbearer of the logistics and supply chain management industry. With a blend of technology and efficient management, we envision becoming the go-to provider for logistics and storage partner solutions. 
                    </p>
                    <h2
                        id="3"
                        ref={servicesRef}
                        className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]"
                    >
                       Our Services
                    </h2>
                    <h3 className='text-[12px] md:text-[18px] font-semibold my-2 '>Packers and Movers</h3>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    We provide custom-made solutions that make relocation hassle-free and convenient for customers. The professional Packers and Movers team provides door-to-door services catering to business and household needs. 
                    </p>
                    <h3 className='text-[12px] md:text-[18px] font-semibold my-2 '>B2B Logistics</h3>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    B2B logistics service allows businesses to streamline their supply chain management. Our 3PL service ensures you focus on other business needs while we take care of transportation. B2B logistics coverage is pan India with real-time tracking options for businesses </p>
                    <h3 className='text-[12px] md:text-[18px] font-semibold my-2 '>Business Storage</h3>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    Our commercial warehouse allows businesses to store their valuable inventory with utmost security and safety. The business storage service is ideal for all business sizes ranging from small to large scale. </p>
                    <h3 className='text-[12px] md:text-[18px] font-semibold my-2 '>Storage Space</h3>
                    <p className="text-[10px] md:text-[16px] text-gray-500 mb-6">
                    Storage space service ensures businesses and households valuable items are stored securely and safely. Customers have the liberty to choose a space that meets their convenience and needs. Our competitive price keeps your belongings safe without compromising the budget.</p>
                   
                  
                   
                </div>
            </section>
            <div className="w-100 absolute bottom-auto">
            <Footer />
            </div>

            
        </div>
    );
};

export default AboutUs;
