import React, { useState } from 'react'

const store = () => {
   useState
   const [count, setCount] = useState(0);

   // Define your increment and decrement functions
   const increment = () => {
     setCount(prevCount => prevCount + 1);
   };
 
   const decrement = () => {
     if (count > 0) {
       setCount(prevCount => prevCount - 1);
     }
   };
   
  const [quantities, setQuantities] = useState({
    bedroomQuantity: 0,
    kitchenQuantity: 0,
    livingRoomQuantity: 0,
    otherQuantity: 0,
    miscQuantity: 0,
  });
  const [isHouseholdOpen, setIsHouseholdOpen] = useState(false);

  const decrease = (key) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: Math.max(prevQuantities[key] - 1, 0),
    }));
  };

  const increase = (key) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: prevQuantities[key] + 1,
    }));
  };

  // Function to toggle the visibility of the dropdown content
  const toggleHouseholdDropdown = () => {
    setIsHouseholdOpen(!isHouseholdOpen);
  };

  // const increase = (field) => {
  //   setQuantities((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  // };

  // const decrease = (field) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [field]: prev[field] > 0 ? prev[field] - 1 : 0,
  //   }));
  // };

  return (
    <div>
        <section className="additeam p-[20px] md:p-[50px]">
        <div className="ht1"> <h2 className="text-[14px] md:text-[30px] font-bold text-[#1B1C57] pb-4">Let’s add items to store</h2></div>
         <div class="flex flex-wrap gap-[2px] justify-evenly md:justify-between   max-w-[90vw]">
          <div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
 <button class="text-[12px] md:text-[20px]">Few Items</button>

            {/* </div> */}
</div>
<div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
                         <button class="text-[12px] md:text-[20px]">Few- Items</button>

            {/* </div> */}
</div> <div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
                         <button class="text-[12px] md:text-[20px]">Few- Items</button>

            {/* </div> */}
</div> <div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
                         <button class="text-[12px] md:text-[20px]">Few- Items</button>

            {/* </div> */}
</div> <div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
                         <button class="text-[12px] md:text-[20px]">Few- Items</button>

            {/* </div> */}
</div>
 <div class="h-[50px] md:h-[70px] w-[90px] md:w-[176px] my-1 items-center justify-center  flex  shadow-2xl border  rounded-2xl hover:bg-blue-500 hover:text-white">
 {/* <div class=" hover:bg-blue-500 hover:text-white text-sm text-gray-700"> */}
                         <button class="text-[12px] md:text-[20px]">Few- Items</button>

            {/* </div> */}
</div></div>
<div className="flex-col md:flex-row gap-5 flex mt-5">
   <div className="w-full md:w-1/3 bg-blue-50 p-[20px] ">
   <div className="">
      <h2 className="text-[16px] md:text-[24px] py-2 font-semibold text-[#1B1C57]">How much can be stored</h2>
        <h3 className="text-[16px] md:text-[24px]  font-semibold text-[#1B1C57]">1 BHK <span className=" font-light">(500-700 Sq Ft.)</span></h3>
        <p className="text-gray-700 text-[14px] md:text-[16px]">Type of items that can be stored here</p>
        
  <div class="flex flex-wrap gap-2 justify-evenly py-4   max-w-[100vw]  mx-auto">
 <div class="h-[30px] md:h-[50px] w-[auto] p-[5px] md:p-[10px]  items-center justify-between  flex   border  rounded-2xl bg-white">
 {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
 </path>
 </svg> */}
 <img className='w-[2em] h-[2em]' src="/images/icon/Box (1).svg" alt="" />

 <div className="w-[auto]"> 
<h2 class="text-[14px] md:text-[18px] ">2 Large</h2>


 </div></div>
 <div class="h-[30px] md:h-[50px] w-[auto] p-[5px] md:p-[10px] items-center justify-between  flex  border  rounded-2xl bg-white">
 <img className='w-[2em] h-[2em]' src="/images/icon/Box (1).svg" alt="" />
<div className="w-[auto]"> 
<h2 class="text-[14px] md:text-[18px] ">3 Medium</h2>


 </div>
 </div>
 <div class="h-[30px] md:h-[50px] w-[auto] p-[5px] md:p-[10px] items-center justify-between  flex   border  rounded-2xl bg-white">
 <img className='w-[1.5em] h-[1.5em]' src="/images/icon/Box (1).svg" alt="" />

 <div className="w-[auto]"> 
<h2 class="text-[14px] md:text-[18px] "> 5 Small</h2>


 </div></div>
 <div class="h-[30px] md:h-[50px] w-[auto] p-[5px] md:p-[10px] items-center justify-between  flex border  rounded-2xl bg-white">
 <img className='w-[1em] h-[1em]' src="/images/icon/Box (1).svg" alt="" />
 <div className="w-[auto]"> 
<h2 class="text-[14px] md:text-[18px] ">5 Boxes(approx)</h2>


 </div></div>
 
 </div>
 
      </div>

   </div>
<div className=" justify-center md:gap-5 mt-2 flex md:hidden">

   <a href="#" class=" bg-blue-500  w-[300px] h-[40px] hover:bg-blue-600 text-white font-bold py-2 text-center rounded transition duration-300 ease-in-out no-underline">Add Item</a>
</div>
   <div className="w-full md:w-2/3 px-[50px] hidden md:block">
   <div class="flex items-center w-full border rounded-3xl overflow-hidden">
   <div class="p-2 ">
      {/* <!-- SVG search icon (you can replace it with any icon library or image) --> */}
      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2M15 9a6 6 0 11-12 0 6 6 0 0112 0z"></path>
      </svg>
   </div>
   <input type="text" class="w-full py-2 px-4 text-gray-700 leading-tight outline-none border-none focus:outline-none" placeholder="Search..."/>
  
</div>

<div className="w-full flex-col md:flex-row flex gap-2 h-[200px] z-20 overflow-x-auto">
  
  <div className="w-full md:w-1/3 h-full ">
  
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    
    
    
  </div>
  <div className="w-full md:w-1/3 h-full ">
  
  <div className="flex items-center justify-between p-2">
    <span className=" w-[250px]">Item:</span>
    
   <div className="flex justify-center">
     <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
    <span className="mx-2">{count}</span>
    <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
    </div>
    
  </div>
  <div className="flex items-center justify-between p-2">
    <span className=" w-[250px]">Item:</span>
    
   <div className="flex justify-center">
     <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
    <span className="mx-2">{count}</span>
    <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
    </div>
    
  </div>
  <div className="flex items-center justify-between p-2">
    <span className=" w-[250px]">Item:</span>
    
   <div className="flex justify-center">
     <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
    <span className="mr-4">{count}</span>
    <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
    </div>
    
  </div>
  <div className="flex items-center justify-between p-2">
    <span className=" w-[250px]">Item:</span>
    
   <div className="flex justify-center">
     <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
    <span className="mr-4">{count}</span>
    <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
    </div>
    
  </div>
  
  
  
</div>
  <div className="w-full md:w-1/3 h-full">
 
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mr-4">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    
    
    
  </div>
  <div className="w-full md:w-1/3 h-full">
  
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    <div className="flex items-center justify-between p-2">
      <span className=" w-[250px]">Item:</span>
      
     <div className="flex justify-center">
       <button onClick={decrement} className="px-3 py-0 bg-gray-200 text-gray-700 rounded mr-2">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="px-3 py-0 bg-gray-200 text-gray-700 rounded">+</button>
      </div>
      
    </div>
    
    
    
  </div>
</div>
   </div>
  
</div>
<div className=" justify-center md:gap-5 mt-5 hidden md:flex">
   <a href="#" class="inline-block border border-blue-500 text-gray-500 font-bold py-2 px-5 md:px-20 rounded transition duration-300 ease-in-out no-underline">Cancel</a>
   <a href="#" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 md:px-20 rounded transition duration-300 ease-in-out no-underline">Next</a>

     </div>
      </section>


// components/OrderForm.js


  
    <form className="space-y-4 p-4">
   
      <div className="space-y-4">
      {/* Household Items Dropdown */}
      <div>
        <div className="flex justify-between items-center w-[300px] space-x-2">
          <label className="w-40" htmlFor="householdItems">
            Household Items:
          </label>
          <button
            type="button"
            onClick={toggleHouseholdDropdown}
            className="px-2 py-1  rounded"
          >
            {isHouseholdOpen ? <img  src="/images/icon/dropup.svg"
                      alt="upward arrow1" /> : <img src="/images/icon/dropdown.svg"
                      alt="dropdown" /> }
          </button>
        </div>
        {/* Conditionally render the content if the dropdown is open */}
        {isHouseholdOpen && (
        <div className="">
            <div className="flex justify-between w-[300px] items-center space-x-2">
        <label className="w-40" htmlFor="bedroomItems">Bedroom Items:</label>
     
       <div> <button type="button" onClick={() => decrease('bedroomQuantity')} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input type="text" value={quantities.bedroomQuantity} readOnly className="w-12 text-center border p-1" />
        <button type="button" onClick={() => increase('bedroomQuantity')} className="px-2 py-1 bg-gray-300 rounded">+</button></div>
      </div>

      <div className="flex justify-between w-[300px] items-center space-x-2">
        <label className="w-40" htmlFor="kitchenItems">Kitchen Items:</label>
       
       <div> <button type="button" onClick={() => decrease('kitchenQuantity')} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input type="text" value={quantities.kitchenQuantity} readOnly className="w-12 text-center border p-1" />
        <button type="button" onClick={() => increase('kitchenQuantity')} className="px-2 py-1 bg-gray-300 rounded">+</button></div>
      </div>

      <div className="flex justify-between w-[300px] items-center space-x-2">
        <label className="w-40" htmlFor="livingRoomItems">Living Room Items:</label>
     
       <div> <button type="button" onClick={() => decrease('livingRoomQuantity')} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input type="text" value={quantities.livingRoomQuantity} readOnly className="w-12 text-center border p-1" />
        <button type="button" onClick={() => increase('livingRoomQuantity')} className="px-2 py-1 bg-gray-300 rounded">+</button></div>
      </div>

      <div className="flex justify-between w-[300px] items-center space-x-2">
        <label className="w-40" htmlFor="otherItems">Other Items:</label>
      
       <div> <button type="button" onClick={() => decrease('otherQuantity')} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input type="text" value={quantities.otherQuantity} readOnly className="w-12 text-center border p-1" />
        <button type="button" onClick={() => increase('otherQuantity')} className="px-2 py-1 bg-gray-300 rounded">+</button></div>
      </div>

      <div className="flex justify-between w-[300px] items-center space-x-2">
        <label className="w-40" htmlFor="miscItems">Misc Items:</label>
     
       <div> <button type="button" onClick={() => decrease('miscQuantity')} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input type="text" value={quantities.miscQuantity} readOnly className="w-12 text-center border p-1" />
        <button type="button" onClick={() => increase('miscQuantity')} className="px-2 py-1 bg-gray-300 rounded">+</button></div>
      </div>
        </div>
        )}
      </div>

      {/* Replicate the structure for other categories */}
      {/* <div>...</div> */}
    </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
    </div>

  )
}

export default store
