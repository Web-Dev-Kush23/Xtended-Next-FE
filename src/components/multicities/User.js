import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
      image: props.image,
      // buttonText: props.buttonText,
      // buttonLink: props.buttonLink,
      reverse: props.reverse, // for alternating image and content position
      isSecond: props.isSecond, // for specific style of second section
    };
  }

  render() {
    const { title, content, image, buttonText, buttonLink, reverse, isSecond } =
      this.state;

    return (
      <div
        className={`${
          isSecond ? "bg-white" : "bg-[#F7F9FC]"
        } rounded-[10px] lg:rounded-[40px] py-[20px] lg:py-[65px] sm:text-center lg:text-start grid sm:grid-cols-1 lg:grid-cols-2 place-items-center mb-[30px] mt-[30px]`}
      >
        {/* Image first or last based on the reverse prop for desktop */}
        <div
          className={`w-[100%] grid place-items-center ${
            reverse ? "lg:order-last" : "lg:order-first"
          }`}
        >
               <Image
            src={image}
            priority
            alt={`${title} Image`}
            width={1000} // Increase width for better quality
            height={1000} // Keep height consistent with width
            // sizes="(max-width: 768px) 100%, 
            //        (max-width: 1200px) 100%, 
            //        100%"
            className="w-full h-auto lg:w-[500px] lg:h-auto object-contain" // Ensure the image scales well
          />
        </div>

        <div className="w-[100%] flex lg:items-start items-center justify-center flex-col px-4">
          <h3 className="font-bold capitalize text-[20px] md:text-[34px] py-2 text-[#1B1C57]">
            {title}
          </h3>
          <p className="text-[14px] md:text-[17px] text-[#1B1C57] ">
            {content}
          </p>
          {/* <a
            href={buttonLink}
            className="flex items-center justify-center mt-4 text-blue-500 px-14 py-2 border-2 border-blue-500 bg-none rounded text-sm"
          >
            {buttonText} <FaLongArrowAltRight className="ml-3" />
          </a> */}
        </div>
      </div>
    );
  }
}
