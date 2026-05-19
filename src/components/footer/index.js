import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <footer className="bg-blue-500 text-white p-5 px-2 xl:px-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full xl:w-1/4 block xl:flex-col    mb-8 xl:mb-0">
              <Link href="/">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/xtended-space-white-logo.png"
                  alt="Xtended Space Logo"
                  className="mb-4 w-[200px] xl:mb-4"
                  width={250}
                  height={250}
                />
              </Link>
              <div className="">
                <p className="text-md text-justify pl-4 xl:pl-0 pr-0 ">
                  Xtended Space stores your belongings in a secure storage unit.
                  Additionally, it provides you door-to-door logistics services.

                </p>
                <div className="flex justify-evenly lg:justify-start lg:gap-4 mt-2 xl:pl-0 pr-0 xl:pr-[220px]">
                  <Link href="https://www.instagram.com/xtendedspace/" target="blank" className="">
                    <FaInstagramSquare className="text-[30px]" />
                  </Link>
                  <Link href="https://www.facebook.com/XtendedSpace" target="blank" className="">
                    <FaFacebookSquare className="text-[30px]" />
                  </Link>
                  <Link href="https://x.com/XtendedSpace" target="blank" className="">
                    <FaSquareXTwitter className="text-[30px]" />
                  </Link>
                  <Link href="https://www.youtube.com/@xtendedspace" target="blank" className="">
                    <IoLogoYoutube className="text-[30px]" />
                  </Link>
                  <Link href="https://www.linkedin.com/company/xtended-space/ " target="blank" className="">
                    <FaLinkedin className="text-[30px]" />
                  </Link>

                </div>
              </div>


            </div>
            <div className="xl:w-1/6 block xl:flex-col  xl:ml-auto  mb-8 xl:mb-0">

              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="text-md text-justify space-y-2">

                <li>
                  <Link href="/about-us" className="hover:text-zinc-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.html"
                    // target="blank"
                    className="hover:text-zinc-300"
                  >
                    Site Map
                  </Link>
                </li>

              </ul>

            </div>
            <div className="w-1/2 xl:w-1/6  ">
              <h3 className="font-semibold mb-3">Storage</h3>
              <ul className="text-md  space-y-2">
                <li>
                  <Link href="/business-storage" target="blank" className="hover:text-zinc-300">
                    Business Storage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store-at-a-warehouse"
                    target="blank"
                    className="hover:text-zinc-300"
                  >
                    Store at a Warehouse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store-with-a-host"
                    target="blank"
                    className="hover:text-zinc-300"
                  >
                    Store with a Host
                  </Link>
                </li>
                <li>
                  <Link
                    href="/list-storage"
                    target="blank"
                    className="hover:text-zinc-300"
                  >
                    List Your Space
                  </Link>
                </li>
                <li>
                  <Link
                    href="/record-and-information-management"
                    target="blank"
                    className="hover:text-zinc-300"
                  >
                    Record Management Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-1/2 xl:w-1/6">
              <h3 className="font-semibold mb-3">Our Presence</h3>
              <ul className="text-md text-justify space-y-2">
                <li>
                  <div className="hover:text-zinc-300">
                    Delhi
                  </div>
                </li>
                <li>
                  <div className="hover:text-zinc-300">
                    Noida
                  </div>
                </li>
                <li>
                  <div className="hover:text-zinc-300">
                    Gurugram
                  </div>
                </li>
                <li>
                  <div className="hover:text-zinc-300">
                    Pune
                  </div>
                </li>
                <li>
                  <div className="hover:text-zinc-300">
                    Bangalore
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-1/2 xl:w-1/6  xl:mt-0">
              <h3 className="font-semibold mb-3">Corporate Office</h3>
              <ul className="text-md ">
                <li>
                  A-96 ,3rd Floor, Sector-63 Noida,Uttar Pradesh 201301
                </li>
                <li >
                  {" "}
                  <Link href="tel:+919009000798" className="flex items-center mt-2">
                    {/* <span className="">
                    <FaPhoneAlt className="text-white mr-2"/>
                    </span> */}

                    <span className=""> +(91) 900 900 0798</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:info@XtendedSpace.com"
                    className="hover:text-zinc-300 flex items-center"
                  >
                    {/* <IoMdMail className="text-white"/>  */}
                    info@XtendedSpace.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "end", gap: '10px' }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.xtendedspaceapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                alt="Get it on Google Play"
                style={{ height: '50px' }}
              />
            </a>
            <a
              href="https://apps.apple.com/in/app/xtended-space/id1671530684"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                alt="Download on the App Store"
                style={{ height: '50px' }}
              />
            </a>
          </div> */}

           <div className="flex   gap-4 py-4"style={{justifyContent:'end'}}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.xtendedspaceapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/googlepay.svg"
                      alt="Get it on Google Play"
                      className="h-12"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/xtended-space/id1671530684"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/playstore.svg"
                      alt="Download on the App Store"
                      className="h-12"
                    />
                  </a>
                </div>
        </div>
      </footer>
    </>
  );
}
