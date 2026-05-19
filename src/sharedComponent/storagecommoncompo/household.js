import React from 'react'

const Household = () => {
  return (
   <React.Fragment>
    <div className="slider_sec   border  p-4 mb-2   ">
            <img
              src="/images/calculator/Imageslider.svg"
              alt="calc1"
              className="w-full md:w-[650px]"
            />
            <img
              src="/images/calculator/rating4.svg"
              alt="rating1"
              className=" rating_slider absolute w-12 h-auto top-0 right-0 hidden md:block  "
            />
            <div className="middle_seccalculatorstorage flex w-[200px] justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full mt-2">
              <img
                src="/images/calculator/ph_house-fill.svg"
                alt="household1"
                className="w-15"
              />
              <div className="text-sm  text-blue-600 mr-2">Household Items</div>
              <img
                src="/images/calculator/fluent_desk.svg"
                alt="fluent_desk1 "
              />
            </div>
            <div className="bottom_detail leading-7  mb-2 mt-2">
              <div className="text-[#6B7280]">
                Description will come here in the slider about the warehouse and
                lorem ipsum 10 words currently lorem ipsum is not working in my
                vs code so writing manually business Inventory as well.......
              </div>

              <div className="flex justify-between">
                <div className="flex  items-center gap-1 mt-3 mb-2 ">
                  {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                  <div className="flex justify-evenly items-center">
                    <del className="text-red-500 font-extralight">
                      &#8377; 500
                    </del>
                  </div>
                  <div className="text-lg font-medium ">
                    &#8377; 325 <span>/Day</span>
                  </div>
                </div>
                <div className="flex  items-center gap-1 mt-3 mb-2 ">
                  {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                  <div className="flex justify-evenly items-center">
                    Sq.Ft: 168ft (1BHK)
                  </div>
                </div>
              </div>
            </div>
          </div>

   </React.Fragment>
  )
}

export default Household;