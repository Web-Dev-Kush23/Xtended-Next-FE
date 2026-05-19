import React from 'react'
import Breadcrumbs from "../profile/Breadcrumb";
const HeroSection = () => {
  return (
    <section className="esbanner">
          <div className="md:block absolute top-2 left-14 hidden ">
            <div className="flex text-white">
              <a
                href="/"
                className="font-medium leading-8 text-[#fff] text-sm"
              >
                Home
              </a>

              <Breadcrumbs packer={true} />
            </div>
          </div>
          {/* <div className="escontent">
            <h1 className="text-[24px] md:text-[40px] font-bold capitalize leading-[55px]">
              Xtended Space Storage Units Ease Your Storage
            </h1>
            <p className="text-[14px] md:text-[24px] text-white  my-[10px]">
              Access secure and convenient storage space at your doorstep
            </p>
          </div> */}
        </section>
  )
}

export default HeroSection