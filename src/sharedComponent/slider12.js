import React, { useState } from "react";
import Slider from "react-slick";
import FormModal from "./storagecommoncompo/viewdetailmodal";
import FormModalsee from "./storagecommoncompo/seedetailmodal";
function Responsive() {
  const [viewdetailModalShow, setviewdetailModalShow] = useState(false);
  const [newModalShow, setNewModalShow] = useState(false);
  

  const ModalBody = () =>{
  const [currentDetails ,setcurrentDetails] = useState ();

if(currentDetails === 1){
return(
  <p>Hello  Details of first Section</p>
)



  }




    return(
     
            <section className="BankOffer_modal w-full h-[70vh]">
              <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                <div className="offersec w-[40rem] h-[17rem] border-b border-gray-300">
                  <div className="offer_heading font-inter font-medium text-[20px] leading-6 text-[#1B1C57] py-2">
                    Offer 1
                  </div>
                  <div className="Offer_detailpara w-[40rem] h-[3rem] font-inter font-normal text-base text-[#374151] mb-2">
                    Flat INR 1250 Instant Discount on HDFC Bank Credit Card 6
                    and 9 month EMI Trxn. Minimum purchase value ₹15,000
                  </div>
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] whitespace-nowrap "
                      onClick={()=>setcurrentDetails(1)}
                    >
                      See Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                <div className="offersec w-[40rem] h-[17rem] border-b border-gray-300">
                  <div className="offer_heading font-inter font-medium text-[20px] leading-6 text-[#1B1C57] py-2">
                    Offer 1
                  </div>
                  <div className="Offer_detailpara w-[40rem] h-[3rem] font-inter font-normal text-base text-[#374151] mb-2">
                    Flat INR 1250 Instant Discount on HDFC Bank Credit Card 6
                    and 9 month EMI Trxn. Minimum purchase value ₹15,000
                  </div>
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] whitespace-nowrap "
                      onClick={openModaldetail}
                    >
                      See Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                  <div className="offersec w-[40rem] h-[17rem] border-b border-gray-300">
                    <div className="offer_heading font-inter font-medium text-[20px] leading-6 text-[#1B1C57] py-2">
                      Offer 1
                    </div>
                    <div className="Offer_detailpara w-[40rem] h-[3rem] font-inter font-normal text-base text-[#374151] mb-2">
                      Flat INR 1250 Instant Discount on HDFC Bank Credit Card 6
                      and 9 month EMI Trxn. Minimum purchase value ₹15,000
                    </div>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] whitespace-nowrap "
                        onClick={openModaldetail}
                      >
                        See Details
                      </a>
                    </div>
                  </div>
                </div>
                <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                  <div className="offersec w-[40rem] h-[15rem] border-b border-solid border-[#D1D5DB]">
                    <div className="offersec w-[40rem] h-[17rem] border-b border-gray-300">
                      <div className="offer_heading font-inter font-medium text-[20px] leading-6 text-[#1B1C57] py-2">
                        Offer 1
                      </div>
                      <div className="Offer_detailpara w-[40rem] h-[3rem] font-inter font-normal text-base text-[#374151] mb-2">
                        Flat INR 1250 Instant Discount on HDFC Bank Credit Card
                        6 and 9 month EMI Trxn. Minimum purchase value ₹15,000
                      </div>
                      <div>
                        <a
                          href="javascript:void(0)"
                          className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] whitespace-nowrap "
                          onClick={openModaldetail}
                        >
                          See Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          
    )
  }

  const openModal = () => {
    setviewdetailModalShow(true);
  };

  const openModaldetail = () => {
    setNewModalShow(true);
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="movable_sec mx-2 w-full flex justify-center items-center md:w-[120px] h-[150px] rounded-xl border border-solid border-[#D1D5DB] bg-[#FFFFFF] custom-shadow ">
          <div className="bank_offer w-full md:w-[130px] h-[22px] font-inter font-semibold  text-[18px] leading-6 text-[#1B1C57] p-3 ml-3">
            Bank Offers
          </div>
          <div className="bankoffer_body w-full md:w-[120px] h-[51px] font-inter font-normal text-[14px] leading-4 text-[#374151] px-4">
            Upto 500 discount on payment by Credit Cards
          </div>
          <div className="bankoffer_lowerheading flex w-[87px] h-[20px] p-4">
            <a
              href="javascript:void(0)"
              className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] "
              onClick={openModal}
            >
              View All
            </a>

            <div>
              <img
                src="/images/icon/rightarrowvector.svg"
                alt="rightarrowvector"
              />
            </div>
          </div>
        </div>
        <div className="movable_sec mx-2 w-full flex justify-center items-center md:w-[120px] h-[150px] rounded-xl border border-solid border-[#D1D5DB] bg-[#FFFFFF] custom-shadow ">
          <div className="bank_offer w-full md:w-[130px] h-[22px] font-inter font-semibold  text-[18px] leading-6 text-[#1B1C57] p-3 ml-3">
            Bank Offers
          </div>
          <div className="bankoffer_body w-full md:w-[120px] h-[51px] font-inter font-normal text-[14px] leading-4 text-[#374151] px-4">
            Upto 500 discount on payment by Credit Cards
          </div>
          <div className="bankoffer_lowerheading flex w-[87px] h-[20px] p-4">
            <a
              href="javascript:void(0)"
              className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] "
              onClick={openModal}
            >
              View All
            </a>

            <div>
              <img
                src="/images/icon/rightarrowvector.svg"
                alt="rightarrowvector"
              />
            </div>
          </div>
        </div>
        <div className="movable_sec mx-2 w-full flex justify-center items-center md:w-[120px] h-[150px] rounded-xl border border-solid border-[#D1D5DB] bg-[#FFFFFF] custom-shadow ">
          <div className="bank_offer w-full md:w-[130px] h-[22px] font-inter font-semibold  text-[18px] leading-6 text-[#1B1C57] p-3 ml-3">
            Bank Offers
          </div>
          <div className="bankoffer_body w-full md:w-[120px] h-[51px] font-inter font-normal text-[14px] leading-4 text-[#374151] px-4">
            Upto 500 discount on payment by Credit Cards
          </div>
          <div className="bankoffer_lowerheading flex w-[87px] h-[20px] p-4">
            <a
              href="javascript:void(0)"
              className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] "
              onClick={openModal}
            >
              View All
            </a>

            <div>
              <img
                src="/images/icon/rightarrowvector.svg"
                alt="rightarrowvector"
              />
            </div>
          </div>
        </div>
        <div className="movable_sec mx-2 w-full flex justify-center items-center md:w-[120px] h-[150px] rounded-xl border border-solid border-[#D1D5DB] bg-[#FFFFFF] custom-shadow ">
          <div className="bank_offer w-full md:w-[130px] h-[22px] font-inter font-semibold  text-[18px] leading-6 text-[#1B1C57] p-3 ml-3">
            Bank Offers
          </div>
          <div className="bankoffer_body w-full md:w-[120px] h-[51px] font-inter font-normal text-[14px] leading-4 text-[#374151] px-4">
            Upto 500 discount on payment by Credit Cards
          </div>
          <div className="bankoffer_lowerheading flex w-[87px] h-[20px] p-4">
            <a
              href="javascript:void(0)"
              className="view_all flex justify-between w-[62px] h-5 font-inter font-medium text-base leading-5 text-[#338CFF] "
              onClick={openModal}
            >
              View All
            </a>

            <div>
              <img
                src="/images/icon/rightarrowvector.svg"
                alt="rightarrowvector"
              />
            </div>
          </div>
        </div>
      </Slider>
      <FormModal
        modalShow={viewdetailModalShow}
        setModalShow={setviewdetailModalShow}
        ModalBody= {ModalBody}
          
      
        title="Bank offers"
      />

     
    </div>
  );
}

export default Responsive;
