import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PiCaretDoubleRightThin } from "react-icons/pi";
const BreadCrumb = (props) => {
  const { currentElement, detailPage } = props;

  const router = useRouter();
  const category = router.query["blog-category"];
  const id = router.query["blog-id"];
  const categoryUrl = `/blogs/${category}`;

  return (
    <div className="text-center font-normal text-[14px]  hidden md:flex ">
      <a href="/">
        {" "}
        <span>Home</span>
      </a>
      {/* <Image
        src="/images/blog/Double Alt Arrow Right.png"
        width={20}
        height={20}
        className="opacity-0"
      /> */}
      <div className="flex justify-center items-center ml-1 mr-1">
        <PiCaretDoubleRightThin />
      </div>
      <a href="/blogs">
        <span>{currentElement?.title}</span>
      </a>
      {/* <Image
        src="/images/blog/Double Alt Arrow Right.png"
        width={20}
        height={20}
      /> */}
      {/* <div className="flex justify-center items-center ml-1 "><PiCaretDoubleRightThin /></div> */}
      {/* <span className="ml-1">{detailPage}</span> */}
      <div className="flex justify-center items-center ml-1 ">
        <PiCaretDoubleRightThin />
      </div>
      <Link href={categoryUrl}>
        <span className="ml-1">{category}</span>
      </Link>
      <div className="flex justify-center items-center ml-1 ">
        <PiCaretDoubleRightThin />
      </div>
      <span className="ml-1">{id}</span>
    </div>
  );
};

export default BreadCrumb;
