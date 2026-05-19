import Link from "next/link";
import React from "react";

const Service = () => {
  return (
    <div className="html_article ">
      {/* div ke andar ye wala class lagana hai service p-4 w-full h-auto bg-white */}
      <h1 className="font-bold text-[25px] flex items-center justify-center pb-6 border-b-4 border-gray-200">
        Locations We Serve
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">South Mumbai</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Colaba</li>
              </Link>
              <Link href="">
                <li> Storage Space in Fort</li>
              </Link>
              <Link href="">
                <li>Storage Space in Churchgate</li>
              </Link>
              <Link href="">
                <li>Storage Space in Nariman Point</li>
              </Link>
              <Link href="">
                <li> Storage Space in Marine Drive</li>
              </Link>
              <Link href="">
                <li> Storage Space in Cuffe Parade</li>
              </Link>
              <Link href="">
                <li> Storage Space in Byculla</li>
              </Link>
              <Link href="">
                <li> Storage Space in Worli</li>
              </Link>
              <Link href="">
                <li> Storage Space in Lower Parel</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">Western Suburbs</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Bandra</li>
              </Link>
              <Link href="">
                <li> Storage Space in Khar</li>
              </Link>
              <Link href="">
                <li>Storage Space in Santacruz</li>
              </Link>
              <Link href="">
                <li> Storage Space in Andheri</li>
              </Link>
              <Link href="">
                <li> Storage Space in Jogeshwari</li>
              </Link>
              <Link href="">
                <li> Storage Space in Goregaon</li>
              </Link>
              <Link href="">
                <li> Storage Space in Malad</li>
              </Link>
              <Link href="">
                <li> Storage Space in Kandivali</li>
              </Link>
              <Link href="">
                <li> Storage Space in Borivali</li>
              </Link>
              <Link href="">
                <li> Storage Space in Dahisar</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">Eastern Suburbs</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Kurla</li>
              </Link>
              <Link href="">
                <li> Storage Space in Ghatkopar</li>
              </Link>
              <Link href="">
                <li> Storage Space in Vikhroli</li>
              </Link>
              <Link href="">
                <li>Storage Space in Bhandup</li>
              </Link>
              <Link href="">
                <li>Storage Space in Mulund</li>
              </Link>
              <Link href="">
                <li> Storage Space in Powai</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">Central Mumbai</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Dadar</li>
              </Link>
              <Link href="">
                <li> Storage Space in Sion</li>
              </Link>
              <Link href="">
                <li> Storage Space in Matunga</li>
              </Link>
              <Link href="">
                <li> Storage Space in Parel</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">Thane</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Majiwada</li>
              </Link>
              <Link href="">
                <li className="text-sm pl-3">
                  Storage Space in Ghodbunder Road
                </li>
              </Link>
              <Link href="">
                <li>Storage Space in Wagle Estate</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-1 text-[15px] whitespace-nowrap font-semibold leading-[30px]">
            <h2 className="text-xl font-bold mb-2">Navi Mumbai</h2>
            <ul className="storage-list list-disc pl-5">
              <Link href="">
                <li> Storage Space in Vashi</li>
              </Link>
              <Link href="">
                <li> Storage Space in Nerul</li>
              </Link>
              <Link href="">
                <li> Storage Space in Belapur</li>
              </Link>
              <Link href="">
                <li> Storage Space in Kharghar</li>
              </Link>
              <Link href="">
                <li> Storage Space in Airoli</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
