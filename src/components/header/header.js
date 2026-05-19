import LogoutModal from "@/sharedComponent/modal/LogoutModal";
import { localStorageManager } from "@/util/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";

function HeaderMenu({ refresh }) {
  // const [profilePicture, setProfilePicture] = useState("");
  const [userdata, setUserData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileTitle, setProfileTitle] = useState("");

  useEffect(() => {
    const userData = localStorageManager.getValue("userDetails") || "";
    //console.log("userData && setUserData(JSON.parse(userData));", userData, !!userData, userData !==undefined )
    userData && userData !== undefined && setUserData(JSON.parse(userData));
  }, [refresh]);

  useEffect(() => {
    const updateProfileTitle = () => {
      setIsMobile(window.innerWidth < 768 ? true : false);
      const title =
        window.innerWidth < 768
          ? "My Profile"
          : userdata && (
            <div className="w-7 h-7 p-[1px] rounded-full inline-block mx-2 text-center bg-[#ddd]">
              <img
                src={userdata?.profileImage || ""}
                alt="image"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          );
      setProfileTitle(title);
    };

    updateProfileTitle();
    window.addEventListener("resize", updateProfileTitle);

    return () => window.removeEventListener("resize", updateProfileTitle);
  
  }, [userdata]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const logout = () => {
    setShowPopup(true);
  };

  return (
    <>

      <nav className={`bg-white w-full z-20 md:z-40 shadow-sm border-gray-200 py-2.5 dark:bg-gray-900 ${isScrolled ? "fixed left-0" : "relative"}
        } top-0 `}>
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
              alt="logo"
              className="w-[95px] md:w-[150px]"
              width={200}
              height={100}
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 sm:inline-block">
              <span></span>
            </div>

            {userdata && (

              <div className="flex relative items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                <button
                  onMouseEnter={() => setShowPopup3(true)} onMouseLeave={() => setShowPopup3(false)} onClick={() => setShowPopup3(!showPopup3)}
                  type="button"
                  data-dropdown-toggle="language-dropdown-menu"
                  className="inline-flex border items-center font-medium justify-center px-2 py-2 text-lg text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {userdata?.profileImage ? <img src={userdata?.profileImage} className="h-6 w-6 rounded-2xl" /> : <FaCircleUser className="h-6 w-6 text-gray-800" />}
                  {/* {userdata?.firstName.split("")[0]} */}
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {/* Dropdown */}
                {showPopup3 &&
                  <div
                    onMouseEnter={() => setShowPopup3(true)} onMouseLeave={() => setShowPopup3(false)}
                    className="z-50 absolute profile-popup top-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                    id="language-dropdown-menu"
                  >
                    <ul className="py-2 font-medium" role="none">
                      <li>
                        <Link
                          href="/profile"
                          className="flex  px-4 py-2 nav-tab-dropdown text-sm text-gray-700 hover:bg-gray-100 bg-white"
                          role="menuitem"
                        >
                          <FaRegUser className="h-4 w-4 mr-2" /> Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/notification"
                          className="flex px-4 py-2 nav-tab-dropdown text-sm text-gray-700 hover:bg-gray-100 bg-white"
                          role="menuitem"
                        ><FaRegBell className="h-4 w-4 mr-2" />
                          Notification
                        </Link>
                      </li>
                      <li>
                        <button
                          href="#"
                          onClick={logout}
                          className="flex px-4 py-2 nav-tab-dropdown text-sm text-gray-700 hover:bg-gray-100 bg-white"
                          role="menuitem"
                        ><CiLogout className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </li>

                    </ul>
                  </div>}
              </div>

            )}
            {!userdata && <Link href="/login"
              className="text-white flex bg-blue-500 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ">
              <Image
                className="w-[16px]"
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/login.svg"
                alt="login"
                width={64}
                height={64}
              />
              Login
            </Link>}
            <button data-collapse-toggle="mobile-menu-2" onClick={() => setMobileNav(!mobileNav)} type="button" class="inline-flex items-center p-2  text-lg ml-4 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none "
              aria-controls="mobile-menu-2" aria-expanded="true">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${mobileNav ? "block" : "hidden"}`} id="mobile-menu-2">
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="relative">
                <button onMouseEnter={() => setShowPopup2(true)} onMouseLeave={() => setShowPopup2(false)} onClick={() => setShowPopup2(!showPopup2)}
                  className="flex items-center nav-tab justify-between border-b border-gray-100 w-full py-2 header-nav text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white">
                  Relocation
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                {showPopup2 && <div onMouseEnter={() => setShowPopup2(true)} onMouseLeave={() => setShowPopup2(false)}
                  className="z-50 absolute top-4 md:top-8 left-1/3 md:left-0  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                  <ul className="py-2 nav-tab text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
                    <li>
                      <a href="/services/packers-and-movers" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white ">Packers & Movers</a>
                    </li>
                    <li>
                      <a href="/services/b2b-logistics" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white ">B2B Logistic</a>
                    </li>

                    {/* <li>
                      <a href="/alltimelogistic" className="block px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white">Track Shipment</a>
                    </li> */}
                  </ul>
                </div>}
              </li>

              <li className="relative">
                <button onMouseEnter={() => setShowPopup1(true)} onMouseLeave={() => setShowPopup1(false)} onClick={() => setShowPopup1(!showPopup1)}
                  className="flex items-center nav-tab justify-between w-full py-2 header-nav text-gray-900 rounded border-b border-gray-100 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto ">
                  Storage
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                {showPopup1 && <div onMouseEnter={() => setShowPopup1(true)} onMouseLeave={() => setShowPopup1(false)}
                  className="z-50 absolute top-4 md:top-8 left-1/3 md:left-0   font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-[200px] ">
                  <ul className="py-2 nav-tab text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  
                    <li>
                      <Link href="/store-with-a-host" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white">Store with a Host </Link>
                    </li>
                    <li>
                      <Link href="/store-at-a-warehouse" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white ">Store at a Warehouse </Link>
                    </li>
                    <li>
                      <Link href="/services/business-storage" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white">Business Storage</Link>
                    </li>
                    <li>
                      <Link href="/record-and-information-management" className="block nav-tab-dropdown px-4 py-2 hover:bg-gray-100 bg-white  dark:hover:text-white">Secure Documents</Link>
                    </li>

                  </ul>
                </div>}
              </li>

              <li>
                <Link href="/list-storage"
                  className="block py-2 nav-tab  text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">List Your Space</Link>
              </li>

              <li>
                <Link href="/alltimelogistic"
                  className="block py-2 nav-tab  text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Track Shipment</Link>
              </li>
              <li>
                <Link href="/contact-us"
                 
                 className="block py-2 nav-tab cursor-pointer  text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact Us
                </Link>
              </li>

              <li>
                <Link href="/area-calculator"
                  className="flex items-center  hover:bg-green-700 py-2 px-2  bg-[#8DC63F] text-white rounded "><span><FaCalculator className="text-lg mr-1 text-white"/></span>Area Calculator</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LogoutModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        setUserData={setUserData}
      />
    </>
  );
}

export default HeaderMenu;