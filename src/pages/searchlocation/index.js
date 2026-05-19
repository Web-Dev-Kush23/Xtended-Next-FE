import React from "react";
import Link from "next/link";
import citiesData from "@/components/citiesData";
const Index = ({ cities, cityPath }) => {
 
  const addTypeMapping = {
    "packers-and-movers": "Packers & Movers",
    "storage-space": "Storage Space",
    "business-storage": "Business Storage",
    "b2b-logistics": "B2B Logistics",
  };

  let cityLength = cities?.filter((elem) => elem?.parentId);
 
  return (
    <div>
      {!!cityLength?.length && (
        <div className=" bg-background py-4 px-[20px] lg:px-[50px]">
          <h2 className="text-[16px] md:text-[20px] font-bold mb-3 text-[rgb(27,28,87)]">
            Search By Area
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57] ">
            {cities
              ?.filter((elem) => elem?.parentId)
              ?.map((city) => (
                <li key={city.location}>
                  <Link
                    href={`/${
                      cityPath && cityPath !== ""
                        ? `${city.addType}/${cityPath}`
                        : city.addType
                    }/${city.location.toLowerCase()}`}
                  >
                    <span className="hover:text-blue-500 capitalize mr-1 list-none relative lg:before:content-['•'] before:text-blue-500 before:absolute before:-left-3">
                      {addTypeMapping[city.addType] || city.addType}{" "}
                      {city.location.replace(/-/g, " ")}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className=" bg-background py-4 px-[20px] lg:px-[50px]">
        <h2 className="text-[16px] md:text-[20px] font-bold mb-3 text-[#1B1C57]">
          Search By Location
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57] ">
          {cities
            ?.filter((e) => (e?.parentId ? e?.parentId == "" : true))
            ?.map((city) => (
              <li key={city.location}>
                <Link href={`/${city.addType}/${city.location.toLowerCase()}`}>
                  <span className="hover:text-blue-500 capitalize mr-1 list-none relative lg:before:content-['•'] before:text-blue-500 before:absolute before:-left-3">
                    {addTypeMapping[city.addType] || city.addType}{" "}
                    {city.location}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export const getStaticProps = async () => {
  const cities = Object.values(citiesData);
  return { props: { cities } };
};
export default Index;
