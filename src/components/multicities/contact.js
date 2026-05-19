import React from "react";
import Image from "next/image";
import Link from "next/link";
import CallIconWhite from "../../../public/images/assets-multiple-cities/callIconWhite.svg";
import emailIcon from "../../../public/images/assets-multiple-cities/emailIcon.svg";
const Contact = () => {
  return (
    <div>
      <section>
        <div className="grid lg:grid-cols-2 place-items-center bg-lime-500 text-white py-6 gap-1 px-4">
          <div className="flex flex-col items-center justify-center w-full border-b-2 lg:border-b-0 lg:border-r-2 ">
            <div className="flex flex-col items-center lg:items-start justify-center ">
              <Link href="tel:+919009000798" className="flex items-center justify-center mt-2">
                <Image
                  src={CallIconWhite}
                  alt="icon"
                  width={32}
                  className="mr-3"
                />
                <span className="text-[20px] lg:text-[30px] font-bold">9009000798	</span>
              </Link>
              <Link href="tel:+919009000798" className="text-[16px] lg:text-[26px] mt-[1px]">
                Call us Now
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start justify-center">
            {/* emailIcon */}
            <Link href="mailto:info@xtendedspace.com" className="flex items-center justify-center mt-2">
              <Image src={emailIcon} alt="icon" width={32} className="mr-3" />
              <p className="text-[20px] lg:text-[30px] font-bold">info@XtendedSpace.com</p>
            </Link>
            <Link href="mailto:info@xtendedspace.com" className="text-[16px] lg:text-[26px] mt-[1px]">
              Mail us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
