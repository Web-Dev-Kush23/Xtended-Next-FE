
import Image from "next/image";
import React from "react";

function AutoPlay() {

  return (
    <>
        <div class="w-[100%] overflow-hidden inline-flex flex-nowrap">
    <ul class="flex items-center justify-center md:justify-between [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
   
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
               <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Live+Mint.webp"
            alt="livemint"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
       <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/VcCircle.webp"
            alt="vcCircle"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
        <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Fever+104.webp"
            alt="fever104"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
             <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/HT+MEDIA.webp"
            alt="htmedia"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
               <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Live+Mint.webp"
            alt="livemint"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
       <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/VcCircle.webp"
            alt="vcCircle"
            width={150}
            height={150}
          />
        </li>

       
    </ul>
    <ul class="flex items-center justify-center md:justify-between [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
      
  
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
        <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Fever+104.webp"
            alt="fever104"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
             <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/HT+MEDIA.webp"
            alt="htmedia"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
               <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Live+Mint.webp"
            alt="livemint"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
       <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/VcCircle.webp"
            alt="vcCircle"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
        <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Fever+104.webp"
            alt="fever104"
            width={150}
            height={150}
          />
        </li>
        <li className="w-[150px] lg:w-[200px] mx-[100px]">
             <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/HT+MEDIA.webp"
            alt="htmedia"
            width={150}
            height={150}
          />
        </li>
       
    </ul>
</div>
    </>
  );
}

export default AutoPlay;
