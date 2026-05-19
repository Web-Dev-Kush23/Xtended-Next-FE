 import { getEasyStorageDate, getPaymentGateway } from '@/service/storageService';
import React, { useEffect, useState } from 'react'

export const Button1 = () => {
  return (
 <React.Fragment>
<div className='w-full'>
<div className="bottom_buttonsec flex   justify-center items-center w-full md:w-[450px] h-[48px] mx-[auto] gap-2">
            <div className="cancel_buton flex justify-center items-center  w-full md:w-[251px] text-[12px] leading-[14px] h-[48px] rounded-lg  text-[#338CFF] border border-solid border-[#D1D5DB] bg-white">
              Cancel
            </div>
            <div className="casncel_buton  flex justify-center items-center w-full md:w-[251px] h-[48px] rounded-lg  text-[12px] leading-[14px]  text-white border border-solid border-[#D1D5DB] bg-[#338CFF]">
              Pay Now
            </div>
          </div>
</div>

 </React.Fragment>
  )
}


export default Button1;