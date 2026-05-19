import { useEffect, useRef, useState } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Head from "next/head";
import { MdDoubleArrow } from "react-icons/md";
import Link from "next/link";
import faqData from "@/components/FaqData";
export default function Home() {
  const relocationRef = useRef(null);
  const affordableRef = useRef(null);
  const storageRef = useRef(null);
  const listingRef = useRef(null);
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

  useEffect(() => {
    document.querySelectorAll(".accordion-header").forEach((button) => {
      button.addEventListener("click", () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          accordionContent.style.maxHeight =
            accordionContent.scrollHeight + "px";
        } else {
          accordionContent.style.maxHeight = 0;
        }

        // Close other open accordion items
        document
          .querySelectorAll(".accordion-header")
          .forEach((otherButton) => {
            if (otherButton !== button) {
              otherButton.classList.remove("active");
              otherButton.nextElementSibling.style.maxHeight = 0;
            }
          });
      });
    });
  }, []); // Empty dependency array to run the effect only once after mount

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
        <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>FAQs | Xtended Space - Storage & Moving Services Help</title>
        <meta name="description" content="Find answers to your questions about Xtended Space's storage services and packer and mover solutions, designed for a seamless moving and storage experience."/>
        <meta name="author" content="Xtended Space" />
        {/* <meta name="keywords" content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"/> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com/faqs" />
        <link rel="alternate" href="https://www.xtendedspace.com/faqs" hreflang="en-in" />
        <meta property="og:title" content="FAQs | Xtended Space - Storage & Moving Services Help"/>
        <meta property="og:description" content="Find answers to your questions about Xtended Space's storage services and packer and mover solutions, designed for a seamless moving and storage experience."/>
        <meta property="og:image" content="https://web.xtendedspace.com/images/logo.png"/>
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Xtended Space Logo"/>
        <meta property="og:url" content="https://www.xtendedspace.com/faqs"/>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="FAQs | Xtended Space - Storage & Moving Services Help"/>
<meta name="twitter:site" content="@https://www.xtendedspace.com/faqs"/>
<meta name="twitter:description" content="Find answers to your questions about Xtended Space's storage services and packer and mover solutions, designed for a seamless moving and storage experience."/>
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
		FAQ
	  </Link>
	 </li>
  </ul>
</div>
      <section className="about flex-col md:flex-row flex p-4 ">
        
        <div className="hidden md:block ">
        <div
  className=" md:sticky top-[60px] md:top-[80px] h-[40px]  py-2 md:py-0 z-10 bg-white w-full md:w-[250px] min-h-[300px]"
>
  <ul className="category text-left my-0 aboutleft md:px-5 md:flex items-start justify-start md:flex-col gap-2 md:gap-6 hidden ">
  
    <li className={`text-[14px] md:text-[20px] hover:text-blue-500 ${activeSection === 'relocation' ? "text-[#1B1C57] font-semibold" : "text-gray-500"}`}>
      <button className="text-left w-full" onClick={() => scrollToSection(relocationRef, "relocation")}>
      Relocation
      </button>
    </li>
    <li className={`text-[14px] md:text-[20px] hover:text-blue-500 ${activeSection === 'affordable' ? "text-[#1B1C57] font-semibold" : "text-gray-500"}`}>
      <button className="text-left w-full" onClick={() => scrollToSection(affordableRef, "affordable")}>
        Store with Host
      </button>
    </li>
    <li className={`text-[14px] md:text-[20px] hover:text-blue-500 ${activeSection === 'storage' ? "text-[#1B1C57] font-semibold" : "text-gray-500"}`}>
      <button className="text-left w-full" onClick={() => scrollToSection(storageRef, "storage")}>
        Store at a Warehouse
      </button>
    </li>
    <li className={`text-[14px] md:text-[20px] hover:text-blue-500 ${activeSection === 'listing' ? "text-[#1B1C57] font-semibold" : "text-gray-500"}`}>
      <button className="text-left w-full" onClick={() => scrollToSection(listingRef, "listing")}>
        List Your Space
      </button>
    </li>

  </ul>
</div>

                        </div>
                        <div className="accordion-container">
  <h1 className="text-[22px] md:text-[24px] font-semibold my-6 text-[#1B1C57]" id="1" ref={relocationRef}>
    Relocation FAQ’s
  </h1>

  
  <div className="accordion-item">
    <button className="accordion-header">
      Can I track the real-time travel during relocation?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Xtended Space shares live GPS tracking during transit to prioritize customer mental relief and the safety of goods.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      What if something gets damaged while shifting?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>The skilled workers at Xtended promise careful handling. However, during damage, users can claim compensation through an insurance service.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      What types of relocation services does Xtended Space offer?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>We provide local, intercity, and B2B relocation services for homes and offices.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Do you help with unpacking and rearranging at the new location?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Our team unpacks and places your items on request to help customers settle quickly and stress-free.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Are weekend and holiday moves available?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>We provide 24/7 and 365-day services.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      How early should I book packers and movers?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>At least 24 days in advance is recommended.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Do you provide dismantling and reinstallation?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, for beds, ACs, furniture, etc.</p>
    </div>
  </div>

  {/* Store with Host FAQ */}
  <h1 className="text-[22px] md:text-[24px] font-semibold my-6 text-[#1B1C57]" ref={affordableRef}>
    Store with Host FAQ’s
  </h1>
  <div className="accordion-item">
    <button className="accordion-header">
      What is Xtended Space’s P2P Host Service?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>P2P Service allows individuals to list their unoccupied space such as garages, rooms, shop basements, and warehouses for tenants to rent and store goods safely, according to company guidelines.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I see the host’s space before booking?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Hosts usually upload photos and descriptions. You can request a virtual or in-person walkthrough appointment before confirming your booking with the team.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Is my booking amount secure?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes. All payments are processed securely via the Xtended Space platform. You also receive an official invoice for every transaction.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      How much does it cost?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Pricing depends on location, space size (sq ft), and booking duration. Some hosts also offer discounts on bookings.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      What happens if I cancel the booking?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Our team provides refundable services within 24 hours of receiving information from the Xtended Space team.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can Xtended Space help pick up and drop off my items?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Pickup and delivery services are available with add-on charges. You can schedule it during and after the booking.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I extend or modify my booking later?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, you can modify the duration or upgrade your space, depending on host availability.</p>
    </div>
  </div>

  {/* Store at Warehouse FAQ */}
  <h1 className="text-[22px] md:text-[24px] font-semibold my-6 text-[#1B1C57]" ref={storageRef}>
    Store at Warehouse FAQ’s
  </h1>
  <div className="accordion-item">
    <button className="accordion-header">
      What items can I store at Xtended Space warehouse?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Furniture, household goods, electronics, boxes, office documents, and business inventory.<br />❌ We do not store perishable, flammable, hazardous, or illegal items.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Do you provide pickup and packing support?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, our operational team offers professional packing, doorstep pickup, transportation to warehouse, and ensures safe storage.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I get insurance for my stored items?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, we provide insurance services.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I modify the booked space after storing goods?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, Xtended Space offers tailor-made services and flexibility in booking storage space.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I access my stored goods?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, you can access your goods after making an appointment with our team.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      How do I book a storage service with Xtended Space?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Through our website or app, or by contacting our support team.</p>
    </div>
  </div>

  {/* List Your Space FAQ */}
  <h1 className="text-[22px] md:text-[24px] font-semibold my-6 text-[#1B1C57]" ref={listingRef}>
    List Your Space FAQ’s
  </h1>
  <div className="accordion-item">
    <button className="accordion-header">
      What does "List Your Space" mean on Xtended Space?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Renting out your unoccupied area, such as a spare room, garage, shop, or basement, through Xtended Space to earn passive income by storing customers' goods.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      How do I list my space?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Fill in your property details by visiting www.xtendedspace.com in the List Your Space section. Our team will review it, contact you for inspection, and onboard your property.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Is my space eligible if it is in a small or residential area?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, we welcome secure, clean, and accessible residential property.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Is there a cost to list my property?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>No, listing is free. The commission is charged only for confirmed bookings.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Who handles customer queries, pickups, and packaging?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Xtended Space takes care of logistics; hosts maintain the property.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      How much money can I make?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Depending on the size, location, and duration of storage on your property, you earn money.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Why should I list my space with Xtended Space?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>To turn occupied space into income, with full operational support, verified customers, transparent payments, and zero marketing effort on your part.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I reject a customer booking?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, based on your availability or valid concerns.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Who can become a host on Xtended Space?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Homeowners, shop owners, or warehouse operators can become hosts and generate passive income through their idle yet secure space.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Is it safe to rent my property to unknown tenants?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Before booking and providing digital tracking support, our operational team ensures the renter's authenticity to maintain the trust between the host and renter.</p>
    </div>
  </div>
  <div className="accordion-item">
    <button className="accordion-header">
      Can I temporarily disable or pause my listing?
      <span className="icon">+</span>
    </button>
    <div className="accordion-content">
      <p>Yes, via dashboard or support team assistance.</p>
    </div>
  </div>
</div>

      </section>
      <Footer />
    </div>
  );
}