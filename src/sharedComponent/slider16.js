import React from "react";
import Slider from "react-slick";
import { BsPersonCircle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // Small tablets and large phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "Prince Juneja",
      rating: 4.7,
      image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/pack-move-store/Packers-movers.webp",
      heading: "We Provide Excellent Services",
      review: [
        "Our premium yet cost-effective packers and movers service helps you relocate your household, manufactured items, and office assets.",
        "At Xtended Space, we prioritise smooth, effective, and speedy services. Choose the packers and movers services with Xtended Space available PAN India and make your relocation hassle-free.",
      ],
    },
    {
      name: "Abhishek Jain",
      rating: 4.9,
      image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/pack-move-store/packer-mover-2.webp",
      heading: "Our Top-Notch Services",
      review: [
        "There will be no delay in household shifts and business inventory shifting because our operational team smoothly and safely handles your belongings throughout the relocation journey.",
        "The process from packing your household items to unloading at your destination is simple and cost-effective. We can be your trusted choice for easy-moving solutions in India.",
      ],
    },
    {
      name: "Anubhav Tyagi",
      rating: 4.5,
      image: "https://xtendedspace.s3.ap-south-1.amazonaws.com/pack-move-store/packer-mover.webp",
      heading: "Easy Relocation with Xtended Space",
      review: [
        "The triple-layer packaging protects your fragile and bulky items from all damage during packing and loading in the vehicles, which keeps you stress-free and less burdened.",
        "Our Packers and Movers Service offers relocation to different places in India. We provide packers and movers for your household items and office assets to satisfy you by ensuring the safety of your items.",
      ],
    },
  ];

  return (
    <div className="slider-container max-w-full mx-auto p-4">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative flex flex-col mb-6 rounded-lg px-2 "
          >
            <img
              alt="packer and mover"
              src={testimonial.image}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <blockquote className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <BsPersonCircle className="text-4xl text-blue-400" />
                  <div className="flex flex-col ml-4">
                  <p className="text-[16px] md:text-[20px] font-bold text-blue-400 text-left">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <p className="text-sm font-semibold">{testimonial.rating}</p>
                    <div
                      className="rating"
                      style={{ "--rating": testimonial.rating * 20 }}
                    ></div>
                  </div>
                </div>
                </div>
                <FcGoogle className="text-4xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mt-4">{testimonial.heading}</h4>
              {testimonial.review.map((paragraph, idx) => (
                <p key={idx} className="text-md text-gray-600 mt-2">
                  {paragraph}
                </p>
              ))}
            </blockquote>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
