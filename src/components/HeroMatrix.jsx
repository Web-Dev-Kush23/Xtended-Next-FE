import React, { useEffect, useState } from 'react';

const HeroMatrix = () => {
  const [state, setState] = useState({
    customers: 0,
    space: 0,
    cities: 0,
    hosts: 0,
    satisfaction: 0,
    repeatCustomers: 0
  });

  useEffect(() => {
    const animateValue = (key, target, increment, interval) => {
      let timer;
      if (state[key] < target) {
        timer = setInterval(() => {
          setState((prevState) => {
            const newValue = prevState[key] + increment;
            return {
              ...prevState,
              [key]: newValue > target ? target : newValue
            };
          });
        }, interval);
      }
      return () => clearInterval(timer);
    };

    const animations = [
      animateValue("customers", 7000, 500, 100),
      animateValue("space", 100000, 1000, 100),
      animateValue("cities", 15, 1, 100),
      animateValue("hosts", 500, 50, 100),
    //   animateValue("satisfaction", 4.7, 4, 100),
      animateValue("repeatCustomers", 41.5, 5, 100)
    ];

    return () => animations.forEach((cleanup) => cleanup());
  }, [state]);

  return (
    <div className="pb-4 overflow-auto lg:overflow-none mx-auto">
      <div className="flex lg:grid grid-cols-6  p-4 gap-4">
        <div className="shadow rounded p-2 lg:p-0">
        <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold ">{state.customers}<span className='text-[#328bff]'>+</span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Number of Customers</p>
        </div>
        </div>
       <div className="shadow rounded p-2 lg:p-0"> <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold ">{state.space}<span className='text-[#328bff]'>+</span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Total Available Space (sq.ft.)</p>
        </div></div>
      <div className="shadow rounded p-2 lg:p-0">
      <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold ">{state.cities}<span className='text-[#328bff]'>+</span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Total Cities Covered</p>
        </div>
      </div>
       <div className="shadow rounded p-2 lg:p-0">
       <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold ">{state.hosts}<span className='text-[#328bff]'>+</span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Total Registered Hosts</p>
        </div>
       </div>
       <div className="shadow rounded p-2 lg:p-0"> <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold "><span className="text-3xl text-[#328bff]">4.7★</span> <span className='text-[#328bff]'></span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Customer Satisfaction Rate</p>
        </div></div>
       <div className="shadow rounded p-2 lg:p-0"> <div className="text-center  lg:p-4  w-[250px] lg:w-full ">
          <h6 className="text-3xl text-[#328bff] font-bold ">{state.repeatCustomers.toFixed(1)}<span className='text-[#328bff]'>%</span></h6>
          <p className="font-bold pt-2 text-[#1b1c57]">Repeated Customers</p>
        </div></div>
      </div>
    </div>
  );
};

export default HeroMatrix;
