 import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import HeaderMenu from "@/components/header/header";
import { localStorageManager } from "@/util/common";

import Footer from "@/components/footer";
import Head from "next/head";
import { MdDoubleArrow } from "react-icons/md";
import { DecryptUserId } from "@/service/storageService"
export default function Home() {
  const policiesRef = useRef(null);
  const companyRef = useRef(null);
  const gurdlinesRef = useRef(null)
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
  const [activeButton, setActiveButton] = useState("#0"); // Default active section
  const [userId, setUserId] = useState("")

  const handleButtonClick = (id) => {
    setActiveButton(id); // Update the active section
  };
  useEffect(() => {
    const fetchUserData = async () => {
        if (typeof window !== "undefined") {
            const queryUserId = new URLSearchParams(window.location.search).get("userId");

            if (queryUserId) {
                setUserId(queryUserId);
                try {
                    const response = await DecryptUserId(`?userId=${queryUserId}`);
                    if (response?.success) {
                        localStorageManager?.setValue("userDetails", JSON.stringify(response.success.data));
                        const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                        setUserId(userData?.userId);
                    } else {
                        console.error("Error decrypting User ID:", response?.error);
                    }
                } catch (error) {
                    console.error("Error in DecryptUser Id API call:", error);
                }
            } else {
                const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                setUserId(userData?.userId);
            }
        }
    };

    fetchUserData();
}, []);
  const sections = [
    { id: "#0", label: "Introduction" },
    { id: "#1", label: "Lawful Basis for Processing" },
    { id: "#2", label: "Intended Users" },
    { id: "#3", label: "Data We Collect and How We Use It" },
    { id: "#4", label: "Sharing Your Information" },
    { id: "#5", label: "Technologies We Use" },
    { id: "#6", label: "Do Not Track Options" },
    { id: "#7", label: "Your Rights Regarding Your Data" },
    { id: "#8", label: "Contact Us" },
  ];

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
         <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>Privacy Policy | Xtended Space - Secure Storage & Moving Services</title>
        <meta name="description" content="Learn how Xtended Space protects your data while providing reliable storage solutions and packer and mover services for a secure and seamless experience"/>
        <meta name="author" content="Xtended Space" />
        {/* <meta name="keywords" content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"/> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com/privacy-policy" />
        <link rel="alternate" href="https://www.xtendedspace.com/privacy-policy" hreflang="en-in" />
        <meta property="og:title" content="Privacy Policy | Xtended Space - Secure Storage & Moving Services"/>
        <meta property="og:image" content="https://web.xtendedspace.com/images/logo.png"/>
<meta property="og:description" content="Learn how Xtended Space protects your data while providing reliable storage solutions and packer and mover services for a secure and seamless experience"/>
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Xtended Space Logo"/>
        <meta property="og:url" content="https://www.xtendedspace.com/privacy-policy"/>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />

        <meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="Privacy Policy | Xtended Space - Secure Storage & Moving Services"/>
<meta name="twitter:site" content="@https://www.xtendedspace.com/privacy-policy"/>
<meta name="twitter:description" content="Learn how Xtended Space protects your data while providing reliable storage solutions and packer and mover services for a secure and seamless experience"/>
<meta name="twitter:image" content="https://web.xtendedspace.com/images/logo.png"/>
<meta name="twitter:image:alt" content="Xtended Space Logo"/>


        
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
		Privacy Policy
	  </Link>
	 </li>
  </ul>
</div>
      <section className="about flex-col md:flex-row flex p-4 ">
      <div>
                    <div
                        className="fixed md:sticky top-[60px] md:top-[100px] py-2 md:py-0 z-10 bg-white w-full md:w-[300px]"
                    >
      {/* <ul
                            className="category my-0 aboutleft md:px-5 flex md:flex-col items-center md:items-start gap-2 md:gap-6 "
                        >
                          
                          <li className={`text-[14px] md:text-[24px] ${activeSection === 'policies' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(policiesRef, "policies" )}>
                                User Policies
                                </button>
                            </li>
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'company' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(companyRef, "company")}>
                                Company
                                </button>
                            </li>
                            <li className={`text-[14px] md:text-[24px] ${activeSection === 'gurdlines' ? "text-[#1B1C57] font-semibold":"text-gray-500"}`}>
                                <button onClick={() => scrollToSection(gurdlinesRef, "gurdlines")}>
                                Guidelines
                                </button>
                            </li>
                        </ul> */}
                        <ul id="tocList" className="category my-0 hidden md:block">
              {sections.map((section) => (
                <li className="mb-2" key={section.id}>
                  <a
                    href={section.id}
                    onClick={() => handleButtonClick(section.id)}
                    className={`text-[14px] md:text-[18px] font-semibold ${
                      activeButton === section.id
                        ? "text-[#1B1C57]"
                        : "text-gray-500"
                    } hover:text-[#1B1C57]`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
                        </div>
                        </div>
    
        <div className="aboutright w-full  lg:pr-[200px] ">
          <h1 className="text-[22px] md:text-[42px] font-semibold mb-6  text-[#1B1C57]" id="0" >
            Privacy Policy
          </h1>

         
          {/* <h3 className="text-[16px] md:text-[24px] text-black mb-6 ">Connecting people with XTRA SPACE to those who need it on short and long-term rental</h3> */}
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
          Thank you for doing business with Xtended Space , Inc. (“Xtended Space ,” “Company,” “we,” “our,” or “us”). We welcome you and hope you find our websites, mobile and web applications, products, and our other subscription services and tools (collectively, the “Services”) helpful and useful. We have adopted this privacy policy (“Privacy Policy”) to help our website visitors, mobile application users, current and potential customers, clients, their employees, our employees, and other business partners (“you” or “your,”) understand what Data we collect, store, share, and use, how and why we do so, and what your rights are regarding that Data.

          </p>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">If a capitalized term is not specifically defined in this Privacy Policy, it has the meaning given to it in our Terms of Service.
          </p>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">We always seek to improve our Services to you, and that requires that we collect, store, share, and use information about you and your usage preferences. As we do so, we are absolutely committed to protecting your privacy and the security of your personal information.
          </p>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500"> In this Privacy Policy, we use the word “Data” to describe all the information we collect that relates to you and your use of our Services. “Data” is broken into different categories, which are defined in the “Data We Collect and How We Use It” section of this Privacy Policy. We may refer to the different categories separately, but when we use the word “Data,” we mean all the different categories described in this Privacy Policy. The term “Data” does not apply to de-identified, anonymized, and aggregated data that may be derived from Data, such as traffic patterns, search activity, and other information that cannot be reasonably connected with any individual (“De-identified Data”). We may use De-identified Data for our own purposes in any manner and without attribution or compensation to any person.
          </p>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500"> With that exception, this Privacy Policy applies to everybody who interacts with us online or otherwise. Since different portions of the Privacy Policy will apply differently to the various groups who interact with us, we have tried to clearly categorize the types of Data we process and how we do so. If you have any questions about this Privacy Policy or how we handle your Data, please email us at info@xtendedspace.com.
          </p>
       

          <h2 className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]" id="1">
          Lawful Basis for Processing 
          </h2>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  Many jurisdictions require that we disclose to you the lawful basis for our processing of your Data. We do that in the “Data We Collect and How We Use It” section and otherwise throughout this Privacy Policy. In general, our lawful basis for processing your Data is based on your specific consent or your contract with us.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  By accessing or using any of the Services or by otherwise interacting with us online, you consent to our use of your Data as described in this Privacy Policy. If our processing of your Data is based on your consent, you may withdraw your consent at any time, and we will cease collecting your Data. However, in some cases, this may result in your inability to receive partial or full access to the Services, and your withdrawal of consent does not limit our ability to use the De-Identified Data for use by us in connection with our legitimate business efforts in the future.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  In addition, your withdrawal of consent may not prevent us from retaining and processing Data if we have gathered such Data pursuant to a different lawful basis or to preserve legal claims. For example, if you give your consent for us to process your Data, but we are also required by law to keep your Data, that separate “lawful basis” will still apply, even if you withdraw your consent.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  When you enter into an agreement with us, either by accessing the Services, by executing an agreement in hard copy or by clicking “I Accept” or similar language online, or through an app store, we will process your Data for the purposes of fulfilling the terms of our contract with you. In that case, our processing of your Data is based on the contract, so your withdrawal of consent will only be effective after the purposes for processing that Data have been fulfilled and after we no longer have a legal obligation to keep that Data.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  In all cases, we will comply with applicable law and we will cease processing your Data after the legal right, obligation, or other lawful basis expires.
</p>

<h2 className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]" id="2"  >
Intended Users 
          </h2>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
          The Services are directed solely to persons 18 years of age or older or of children under 18 who are supervised by a parent, guardian, or other caregiver. Other than for Data collected for the specific purpose of providing the Services to users, we do not knowingly collect Data from users who are under 13. If we become aware that we have gathered Data from a person under 13, except to provide the Services to such person, and except to the extent allowed or required by law, then we will attempt to delete such Data as soon as possible, subject to our obligations under applicable law. If you believe that we have gathered Data from a person under 13 in contravention of this policy, please contact us at info@xtendedspace.com.</p>
          <h2 className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]" id="3"  >
          Data We Collect and How We Use it  
          </h2>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
          Listed below are the categories of Data we collect when you use our Services. We never sell your Data, and we always have a lawful basis for gathering the Data, but that lawful basis might be different for different categories, and we describe those uses below. Regardless, we never use the Data for any purpose other than the purpose for which we gathered the Data in the first place, unless we get your prior explicit consent.</p>
          
          <h3 className="text-[12px] md:text-[18px] mb-6 font-semibold text-[#1B1C57]"></h3>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
         </p>
         <h3 className="text-[12px] md:text-[18px] mb-6 font-semibold text-[#1B1C57]">Registration Data</h3>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Data Description:</strong> Registration Data consists of the name, email address, address, mobile number, identity-authentication information (such as that contained on a government-issued ID or passport), other contact information, listing details, item details, and other information you provide us using the Services, both when you register your account and thereafter. Registration Data also includes your username, client type, and other applicable registration information, if any. Further, Registration Data may include information collected when you link your account through Facebook, Google, or Apple, including registration and profile information. When you link third-party platforms to the Services, you authorize us to collect, store, and use any data the third-party platform may give us (i.e., email address, mobile number, username, address, etc.); all of such data is considered Registration Data. Please note that any third-party platform you link to the Services likely has its own privacy policy that governs its use and processing of your data. Please refer to any applicable third-party privacy policy for information regarding their use and processing of your information.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Registration Data is our contract with you and your consent. We can only provide certain of the Services to you if we have the Registration Data, so we need to store and access that Registration Data during the term of our contract. Even when the Registration Data is not critically necessary to the provision of the Services, we may still process that Registration Data to facilitate our contractual interactions with you.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>How We Use It and Who We Share It With:</strong> Registration Data is accessible generally only to us and to you. In limited circumstances, we may share your Registration Data with our service providers, which parties help us provide the Services and are under obligations to protect the confidentiality of your Registration Data. We use it to provide the Services to you. At times, we will share the Registration Data with other third parties at your request or to fulfill requests that you make of us. We may also use your Registration Data to offer our own goods or services to you, either directly through emails or through third-party platforms, but you may opt out of those communications at any time. We will never share your username or password with any third party.
</p>

<h3 className="text-[12px] md:text-[18px] mb-6 font-semibold text-[#1B1C57]">Engagement Data</h3>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Data Description:</strong> Engagement Data consists of all the information you input or record using the Services, except as otherwise stated in this Privacy Policy. It also includes all information that is proprietary to you regarding your use of the Services (other than the data that qualifies as “Usage Data” below) that is collected or processed by the Services. For example, Engagement Data includes payroll information, personal information about employees, and internal company communications, among other things.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Engagement Data is (1) our contract with you, (2) our obligation to provide you with the Services and (3) our legitimate interest in improving our Services based on the Engagement Data we receive from you.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>How We Use It and Who We Share It With:</strong> Your Engagement Data is accessible to us, to you, and to limited third parties that we use to provide and improve the Services. If we share your Engagement Data with a third Party, that party will be obligated to protect the confidentiality of your Engagement Data. We may also share Engagement Data with other third parties. We do not de-identify or aggregate Engagement Data for use for any purpose other than to provide the Services to you and to improve our knowledge of how our systems are used.
</p>

<h3 className="text-[12px] md:text-[18px] mb-6 font-semibold text-[#1B1C57]">Payment Data</h3>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Data Description:</strong> Payment Data is only collected when your use of the Services is subject to the payment of a fee or other charge. Payment Data will vary depending on the payment method you use (e.g., direct via your mobile phone carrier or by invoice) but will include information such as:
  <ul className="list-disc pl-6">
    <li>Name</li>
    <li>Date of birth</li>
    <li>Credit card information, debit card details, bank account details (Please note that we use a third-party provider to collect information. Further, we only use payment processors that are compliant with government norms.)</li>
    <li>Address and postal code</li>
    <li>Mobile phone number</li>
  </ul>
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Payment Data is (1) our contract with you and (2) our legitimate interest in improving our Services based on the Payment Data we receive from you.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>How We Use It and Who We Share It With:</strong> We only use Payment Data to facilitate payment, and we only communicate it to those parties who are strictly necessary for that purpose.
</p>

<h3 className="text-[12px] md:text-[18px] mb-6 font-semibold text-[#1B1C57]">Supplemental Mobile Data</h3>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Data Description:</strong> Where applicable to the Services, Supplemental Mobile Data consists of the following and similar information:
  <ul className="list-disc pl-6">
    <li>Your precise device location - If you give us permission to access your precise location, this enables us to access your GPS or Bluetooth to provide location-aware functionality in the Services.</li>
    <li>Your voice data - If you give us permission, this enables us to access the voice commands captured via your device microphone to enable you to interact with the Services with your voice.</li>
    <li>The Company user profile includes age, gender, and other personal characteristics used for delivering certain features.</li>
    <li>Your photos - If you give us permission to access your photos or camera, we will only access images that you specifically choose to share with us and metadata related to those images, such as the type of file and the size of the image.</li>
  </ul>
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Supplemental Mobile Data is (1) our contract with you and (2) our legitimate interest in improving our Services based on the Supplemental Mobile Data we receive from you.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  <strong>How We Use It and Who We Share It With:</strong> We only use Supplemental Mobile Data when you specifically authorize it, and we only share it with those parties who are strictly necessary for the purpose you have authorized.
</p>
<h2 className="text-[18px] md:text-[24px] mb-4 text-[#1B1C57] font-semibold" id="4">Sharing your Information</h2>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  Except where a specific limitation is noted above, we may share your Data as follows:
</p>
<ol className="list-decimal ml-6 text-gray-500 text-[10px] md:text-[16px]">
  <li className="mb-4">
    <strong>At Your Instruction:</strong> If you request us to make your Data available to a third party, and such request furthers the purposes of our Services, we will do so.
  </li>
  <li className="mb-4">
    <strong>Sharing with Vendors:</strong> In certain cases, we use the services of third-party vendors to assist us in providing the Services. We may share your Data with such vendors solely for that purpose, and we will require those parties to abide by our privacy policies or privacy policies substantially in consonance with ours.
  </li>
  <li className="mb-4">
    <strong>Hosts and Renters:</strong> We may share information between Hosts and Renters to facilitate the booking process and give you access and control during your renting or hosting experience. Such information as your full name, telephone number, email address, and the address of the Space to be rented (if you are a Host) may be shared between the two parties upon a confirmed booking of a Space.
  </li>
  <li className="mb-4">
    <strong>Public Listings and Profiles:</strong> To advertise your Listings and assure customer safety, we make certain information available for public access via the services. The information on public Listings and Profiles may include information such as your first name, your description of the Space, your general description of yourself, the general area in which your Space is located, a verified ID status (if we have verified your identity via documentation you have provided us), a verified Host status (if you have previously hosted with Xtended Space), and any other information you choose to provide in your public Profile or Listing.
  </li>
  <li className="mb-4">
    <strong>Third-Party Offers:</strong> We may allow other companies to offer you their products and services, including offers through our Services, co-branded pages hosted by the third parties, or via email. Whether or not you decide to participate in any such offers is up to you. If you purchase a product or service on a co-branded page, or via a third-party offer on our Services that requires you to submit financial and personal information, you are also consenting to our delivery of this information to that party. The offer will notify you if any financial or personally identifiable information will be shared. Such third party will be authorized to use this information in keeping with our contractual relationship with them and in accordance with their own privacy policy and information practices. We do not control these third parties and you agree that we are not liable for their acts, or any failure to act on their part.
  </li>
  <li className="mb-4">
    <strong>Third-Party Advertising:</strong> We may use aggregated, statistical information to describe our membership and to establish advertising and other business relationships with third parties. We may serve you with targeted advertisements based on your personal or profile information, but we do not provide any of this personal or profile information to an advertiser or any third party with the exception of those uses expressly disclosed in this policy. However, if you click or view an ad on our Services then you consent to the likelihood that the advertiser will assume that you meet the targeting criteria, if any, used to display such ad, and as described above, you will be subject to the advertiser's privacy policy and information collection practices (if any).
  </li>
  <li className="mb-4">
    <strong>Service Providers:</strong> We may sometimes use a third party to provide specific Services on our behalf, including sending emails/messages to you, conducting surveys, processing transactions or performing statistical analysis of our Services. In these cases, we may provide certain personal information, such as your name, telephone number and email address and other financial information necessary for the service to be provided. However, these third parties are required to maintain the confidentiality of this information and are prohibited from retaining, sharing, storing or using this information for any other purposes.
  </li>
  <li className="mb-4">
    <strong>Internet Service Providers:</strong> We may provide certain portions of your Data, such as your email address or name, back to your internet service provider if we have an existing advertising relationship with them. This is done to allow them to target or discontinue your exposure to our advertisements, once you have become a participating member of our Services. As part of our agreement with your internet service provider, they will be required to maintain this information in a confidential manner and use it solely for the purpose described in this Privacy Policy.
  </li>
  <li className="mb-4">
    <strong>Business Transitions:</strong> In the event that we go through a business transition, such as a merger, acquisition, liquidation, or sale of all or a portion of our assets, the information we have about you will, in most instances, be part of the assets transferred. We reserve the right to transfer that information in connection with such transactions without notice to you. We will not be required to obtain your consent for such a transfer.
  </li>
  <li className="mb-4">
    <strong>Legal Disclosure:</strong> We may disclose your Information if required to do so by law or in the good faith belief that such action is necessary to conform to applicable law, comply with a judicial proceeding, court order or legal process served on us, protect and defend our rights or property, or investigate, prevent or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, or violations of our terms of service.
  </li>
</ol>

<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  If we ever plan to use any Data in the future for any other purposes not identified above and we do not have a separate lawful basis for that new purpose for processing, we will only do so after obtaining your specific consent.
</p>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  Further, we do not sell your Data for any purpose.
</p>

<h2 className="text-[18px] md:text-[24px] mb-4 text-[#1B1C57] font-semibold" id="5">Technologies We Use</h2>
<p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
  The technologies we use for automatic Data collection may include the following:
</p>
<ul className="list-disc text-[10px] md:text-[16px] ml-6 text-gray-500 ">
  <li className="mb-4">
    <strong>Cookies (or browser cookies):</strong> A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Services. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Services.
  </li>
  <li className="mb-4">
    <strong>Flash Cookies:</strong> Certain features of our Services may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on our Services. Flash cookies are not managed by the same browser settings as are used for browser cookies. For more information on disabling flash cookies, you can visit <a href="https://helpx.adobe.com/flash-player/kb/dsiable-local-shared-object-flash.html">this link</a>.
  </li>
  <li className="mb-4">
    <strong>Web Beacons:</strong> Pages of the Services and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).
  </li>
  <li className="mb-4">
    <strong>Geolocation:</strong> We may use GPS (or other similar) technology when you use our Services, and more specifically any mobile application, to determine your current location. If you do not want us to use your location to provide you the Services, you can turn off your location services on your mobile device in your device's account settings.
  </li>
  <li className="mb-4">
    <strong>Widgets:</strong> We may use technologies such as widgets or APIs to display parts of our Services (e.g., your Listing page) on sites that are operated by our business partners. Listings displayed on a business partners’ site only include the information you provide in your public Xtended Space Listings.
  </li>
  <li className="mb-4">
    <strong>Other Technologies:</strong> We may also use device identifiers, local storage, html modifiers, and different types of caching to help us understand the devices and users who access the Services. Those methods include device identifiers that are either hardware-based or software-based, persistent or non-persistent, and which may identify either a device or a software module within a device (such as a web browser).
  </li>
</ul>
<h2 className="text-[18px] md:text-[24px] text-[#1B1C57] font-bold mb-4" id="6">"Do Not Track" Options</h2>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        Your web browser(s) may offer a "Do Not Track" option, which allows the individual to signal to operators of websites and web applications and services (including behavioral advertising services) that they do not wish to be tracked over time and across different websites. Our Services do not support Do Not Track requests at this time, meaning we may collect information about your online activities both during and after your use of the Services.
      </p>

      <h2 className="text-[18px] md:text-[24px] text-[#1B1C57] font-bold mb-4" id="7">Your Rights Regarding Your Data</h2>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        Under applicable data protection, privacy, and other laws, you have certain rights related to your access and control over your Data. These rights may include the following:
      </p>
      <ul className="list-disc text-[10px] md:text-[16px] ml-6 mb-4 text-gray-500">
        <li>The right to access, correct, update, or request deletion of your Data.</li>
        <li>The right to object to processing or restrict the processing of your Data. Please note that exercising this right may limit or eliminate our ability to provide the Services.</li>
        <li>The right to request portability of your Data.</li>
        <li>The right to opt-out of marketing communications. You can do this by clicking the "Unsubscribe" or "Opt-Out" link in any marketing communications we send you.</li>
        <li>The right not to be subject to decisions based solely on automated processing, including profiling, known as Automatic Decision Making.</li>
      </ul>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        We may use additional processes to verify your identity before revealing or deleting any Data, including two-factor or two-step authentication measures. This list may not include all of your rights under applicable laws. If you believe you have additional rights, please contact us using the methods in this Privacy Policy.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        While we do not currently process Data without consent, if we do so in the future, you may opt-out or withdraw consent at any time.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        Please note, exercising these rights may limit or eliminate our ability to provide the Services. If so, we may terminate the Services due to such requests.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        We will try to comply with your requests as soon as reasonably practicable. Upon receipt of your request, we will provide you with a copy of your information, but in some cases, such as when information pertains to another user, we may not be able to provide all relevant details. We will provide reasons for any denial.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        Even if you opt-out of receiving marketing-related emails, you may still receive administrative or service-related messages necessary for your use of the Services.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        To exercise any of these rights, or if you have questions about our processing of your Data, please contact us at <a href="mailto:info@xtendedspace.com" className="text-blue-500">info@xtendedspace.com</a>.
      </p>

      <h2 className="text-[18px] md:text-[24px] text-[#1B1C57] font-bold mb-4" id="8">Contact Us</h2>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        Please keep us informed of any changes, such as updated contact information. If you would like to access your information, have any questions, comments, or suggestions, or find errors in the information we hold about you, please contact us at <a href="mailto:info@xtendedspace.com" className="text-blue-500">info@xtendedspace.com</a>.
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        If you have a complaint about our compliance with privacy laws, we will investigate and, if justified, take appropriate measures.
      </p>

      <h3 className="text-[12px] md:text-[18px]  font-semibold mb-4 text-[#1B1C57]">Usage Data</h3>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        1. <strong>Data Description:</strong>
      </p>
      <ul className="list-disc text-[10px] md:text-[16px] ml-6 mb-4 text-gray-500">
        <li>Interactions with the Services, like the date and time of any requests.</li>
        <li>Adjustments to the default state of the Services (e.g., custom categories or settings).</li>
        <li>Timing and details of your posts or interactions with our Services, excluding content, which is considered Engagement Data.</li>
        <li>Technical data including URL, IP address, device information, network connection type, browser type, and GPS data (if permission is granted).</li>
        <li>Motion data, such as accelerometer or gyroscope information, if needed for specific features.</li>
      </ul>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        2. <strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Usage Data is:
        <ul className="list-disc text-[10px] md:text-[16px] ml-6">
          <li>(1) Our contract with you.</li>
          <li>(2) Our legitimate interest in improving our Services based on the data we receive.</li>
        </ul>
      </p>
      <p className="mb-4 text-[10px] md:text-[16px] text-gray-500">
        3. <strong>How We Use It and Who We Share It With:</strong>
      </p>
      <ul className="list-disc text-[10px] md:text-[16px] ml-6 mb-4 text-gray-500">
        <li>Usage Data is accessible to us and you, and also shared with third parties that help provide and improve the Services. Any third party receiving your data will be required to maintain its confidentiality.</li>
        <li>We may also use this data to improve the Services, both during and after the term of our agreement with you.</li>
        <li>We may use De-Identified Data, which belongs solely to us and may be used at our discretion, including for sale.</li>
        <li>Even if we delete certain Usage Data, we may retain aggregated and anonymized information.</li>
      </ul>
          {/* <h3 className="text-[14px] md:text-[24px] text-[#1B1C57] font-semibold mt-[100px]"> Interested in joining our team? Contact us today!</h3> */}
        </div>
      </section>
      <Footer />
    </div>
  );
}
