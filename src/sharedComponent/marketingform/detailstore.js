import React from 'react'

const detailstore = () => {
  return (
    <div> <div class="additeam p-[20px] md:p-[50px]">
    <h2 class="text-2xl font-semibold mb-6">Let's Add Your Details</h2>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="name">
                Name
            </label>
            <input class="appearance-none block w-full  text-zinc-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Enter Name"/>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="phone">
                Phone Number
            </label>
            <input class="appearance-none block w-full  text-zinc-700 border border-zinc-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="phone" type="text" placeholder="Enter your ph no"/>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="email">
                Email ID
            </label>
            <input class="appearance-none block w-full  text-zinc-700 border border-zinc-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="email" type="email" placeholder="Enter Email"/>
        </div>
    </div>

    <div class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Your Address</h3>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="address1">
                    Address line 1
                </label>
                <input class="appearance-none block w-full  text-zinc-700 border border-zinc-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="address1" type="text" placeholder="Address Line 1"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="address2">
                    Address line 2
                </label>
                <input class="appearance-none block w-full  text-zinc-700 border border-zinc-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="address2" type="text" placeholder="Address Line 2"/>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="district">
                    District
                </label>
                <div class="relative">
                    <select class="block appearance-none w-full  border border-zinc-200 text-zinc-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="district">
                        <option>Select</option>
                    </select>
                    {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div> */}
                </div>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="state">
                    State
                </label>
                <div class="relative">
                    <select class="block appearance-none w-full  border border-zinc-200 text-zinc-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="state">
                        <option>Select</option>
                    </select>
                    {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div> */}
                </div>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="city">
                    City
                </label>
                <div class="relative">
                    <select class="block appearance-none w-full  border border-zinc-200 text-zinc-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="city">
                        <option>Select</option>
                    </select>
                    {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div> */}
                </div>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2" for="pincode">
                    Pincode
                </label>
                <input class="appearance-none block w-full  text-zinc-700 border border-zinc-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="pincode" type="text" placeholder="Enter Pincode"/>
            </div>
        </div>
    </div>
    <div class="flex justify-center gap-4">
        <button class="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-8 rounded">
            Cancel
        </button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
            Next
        </button>
    </div>
</div></div>
  )
}

export default detailstore