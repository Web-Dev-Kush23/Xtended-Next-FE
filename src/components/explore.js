import { useState, useEffect, useRef } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMailUnread } from "react-icons/io";
import exploreimg from "../../public/images/logo/Favicon.webp"
import Image from "next/image";
const explore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-0 right-0 m-4 z-50">
      {isOpen ? null : (
        <button
          onClick={toggleOptions}
          className=" text-white rounded-full text-[10px] shadow-lg focus:outline-none bg-[#318cfd] flex gap-1 items-center"
        >
         <Image
         className='rounded-full w-6 h-6 bg-white text-white p-1 shadow-2xl'
         src={exploreimg}
         priority
         alt="image"
         /> <span className='px-2 leading-0 mr-2'>Contact Us</span>
        </button>
      )}
      {isOpen && (
        <div className="flex flex-col items-end bg-transprent">
          <a
            href="https://api.whatsapp.com/send?phone=919009000798&text=Hello" target="_blank" rel="noreferrer"
            className="  bg-white p-2 items-center mb-2 shadow-md flex w-full gap-2 rounded-full"
            
          >
            <IoLogoWhatsapp  className='rounded-full w-6 h-6 bg-green-400 text-white p-1'/> Whatsapp
          </a>
          <a
            href="tel:+919009000798"
            className="  bg-white p-2 items-center mb-2 shadow-md flex w-full gap-2 rounded-full"
          >
            <BiSolidPhoneCall  className='rounded-full w-6 h-6 bg-green-400 text-white p-1'/>

            Contact
          </a>
          <a
            href="mailto:info@xtendedspace.com"
            className="  bg-white p-2 items-center shadow-md flex w-full gap-2 rounded-full"
          >
            <IoMdMailUnread  className='rounded-full w-6 h-6 bg-green-400 text-white p-1'/>Email
          </a>
        </div>
      )}
    </div>
  );
};

export default explore;
