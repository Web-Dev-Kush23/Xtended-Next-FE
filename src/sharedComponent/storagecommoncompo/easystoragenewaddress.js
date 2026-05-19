import React, { useEffect, useState } from "react";
import { getUserAddress } from "@/service/storageService";
import { getUserId } from "@/util/common";

const easystoragenewaddress = ({addresses = [], setAddressid}) => {
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const defaultAddress = addresses.find((obj)=>obj.isDefault);
  const withoutDefaultAddress = addresses.filter((obj, index)=>{
    return !obj.isDefault
    
    })

  useEffect(() => {
    // Check if there are addresses and set the first one as selected by default
    
     if (addresses.length && addresses.length === 1) {
      setSelectedAddresses(addresses[0].id);
      setAddressid(addresses[0].id);
    }

    if(addresses.length >1 && defaultAddress){
      setSelectedAddresses(defaultAddress.id);
      setAddressid(defaultAddress.id);
    }
  }, [defaultAddress, addresses]);

  const handleCheckboxChange = (addressId) => {
    setAddressid(addressId);
    setSelectedAddresses(addressId)
  };






  return (
    <div>
      <div className="default-sec w-[auto] md:w-[70%] h-[auto] my-2">
        <div className="default-details w-[auto] h-auto  text-[#1B1C57] font-inter font-medium text-[18px] leading-8 ">
          {
            defaultAddress && <>
           
              <div className="default-heading font-inter font-semibold text-[20px]  leading-8 text-[#1B1C57]">
              Default
            </div>
    
            <div className='flex flex-wrap py-2 '>
            <input
                  type="checkbox"
                  className="mr-2 capitalize"
                  checked={selectedAddresses===defaultAddress.id}
                  onChange={() => handleCheckboxChange(defaultAddress.id)}
                />
              <p className="capitalize">&nbsp;{` ${defaultAddress.address1}`}</p>
              {defaultAddress.address2 && (
    <>
      ,<p className="capitalize">&nbsp;{` ${defaultAddress.address2}`}</p>
    </>
  )},
              {/* <p className="capitalize">&nbsp;{` ${defaultAddress.address2}`}</p>, */}
              <p className="capitalize">&nbsp;{` ${defaultAddress.city}`}</p>,
              <p className="capitalize">&nbsp;{` ${defaultAddress.state}`}</p>,
              <p className="capitalize">&nbsp;{` ${defaultAddress.pincode}`}</p>
              &nbsp;(<p className="capitalize">{`Floor - ${defaultAddress.floor}`}</p> ,<p className="capitalize">&nbsp;{`Lift Availability - ${defaultAddress.isLiftAvailable ? 'Yes' : 'No'}`}</p>)
              {/* <p className="capitalize">&nbsp;{` ${defaultAddress.district}`}</p> */}
            </div>
          
              <div className="default-heading font-inter font-medium text-[18px] leading-8 text-[#1B1C57] border  ">
             
            </div>
            </>
          }
          {withoutDefaultAddress.map((address, index) => {
            if(index < withoutDefaultAddress.length-2){
              return
            }
            return(
              <>
          
            <div key={address.id} className='flex flex-wrap py-2 '>
            <input
                  type="checkbox"
                  className="mr-2 "
                  checked={selectedAddresses===address.id}
                  onChange={() => handleCheckboxChange(address.id)}
                />
              <p>&nbsp;{` ${address.address1}`}</p>
              {address.address2 && (
        <>
          ,<p>&nbsp;{` ${address.address2}`}</p>
        </>
      )},

              {/* <p>&nbsp;{` ${address.address2}`}</p>, */}
              <p>&nbsp;{` ${address.city}`}</p>,
              <p>&nbsp;{` ${address.state}`}</p>,
              <p>&nbsp;{` ${address.pincode}`}</p>
              &nbsp;(<p className="capitalize">{`Floor - ${defaultAddress.floor}`}</p> ,<p className="capitalize">&nbsp;{`Lift Availability - ${defaultAddress.isLiftAvailable ? 'Yes' : 'No'}`}</p>)

              {/* <p>&nbsp;{` ${address.district}`}</p> */}
            </div>
           
            </>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default easystoragenewaddress;
