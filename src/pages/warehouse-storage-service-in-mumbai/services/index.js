import Link from "next/link";
import React from "react";

const Services = () => {
  return (
    <>
      <div className="html_article">
        {/* ye wali properties  div ke andar lagana hai in future service p-4 w-full h-auto bg-white  */}
        <h1 className="font-bold text-[25px] flex items-center justify-center pb-6 border-b-4 border-gray-200">
          Locations We Serve
        </h1>

        <div className="container mx-auto pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6  gap-4">
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2 ">South Mumbai</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Colaba</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Fort</li>
                </Link>
                <Link href="">
                  <li>Warehouse Service in Churchgate</li>
                </Link>
                <Link href="">
                  <li>Warehouse Service in Nariman Point</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Marine Drive</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Cuffe Parade</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Byculla</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Worli</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Lower Parel</li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2">Western Suburbs</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Bandra</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Khar</li>
                </Link>
                <Link href="">
                  <li>Warehouse Service in Santacruz</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Andheri</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Jogeshwari</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Goregaon</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Malad</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Kandivali</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Borivali</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Dahisar</li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2">Eastern Suburbs</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Kurla</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Ghatkopar</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Vikhroli</li>
                </Link>
                <Link href="">
                  <li>Warehouse Service in Bhandup</li>
                </Link>
                <Link href="">
                  <li>Warehouse Service in Mulund</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Powai</li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2">Central Mumbai</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Dadar</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Sion</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Matunga</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Parel</li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2">Thane</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Majiwada</li>
                </Link>
                <li className="text-sm pl-3">
                  Warehouse Service in Ghodbunder Road
                </li>
                <Link href="">
                  <li>Warehouse Service in Wagle Estate</li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 text-[15px]  font-semibold leading-[30px]">
              <h2 className="text-xl font-bold mb-2">Navi Mumbai</h2>
              <ul className="storage-list  pl-5">
                <Link href="">
                  <li> Warehouse Service in Vashi</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Nerul</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Belapur</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Kharghar</li>
                </Link>
                <Link href="">
                  <li> Warehouse Service in Airoli</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
