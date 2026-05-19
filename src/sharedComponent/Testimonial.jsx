import React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";

function Testimonial({ name }) {
  console.log(name);

  const reviews = [
    {
      name: "b2blogistic",
      data: [
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/b2b+logistic+1.webp",
          reviewText:
            "Xtended Space last-mile services are phenomenal. The team helped me deliver my goods within 2 hours.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Raghav+Mittaour+.webp",
          reviewerName: "Raghav Mittaour",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/b2b+logistic+2.webp",
          reviewText:
            "I observed a 15% growth in my business two months after I partnered with Xtended Space for 3PL services.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Himanshu+Goel.webp",
          reviewerName: "Himanshu Goel",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/b2b+logistic+3.webp",
          reviewText:
            "They are good at packing and loading goods. One of the best parts I liked about them was handling things patiently.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Suraj+Kohli+.webp",
          reviewerName: "Suraj Kohli",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/b2b+logistic+4.webp",
          reviewText:
            "The 3PL services at Xtended Space transformed our supply chain with their reliable, fast deliveries and smart storage.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Maya+Gupta+.webp",
          reviewerName: "Maya Gupta",
        },
      ],
    },
    {
      name: "packers-and-movers",
      data: [
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/packers+and+movers+1.webp",
          reviewText:
            "Xtended Space made my household relocation journey comfortable and convenient.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Priyansh+Mehta+.webp",
          reviewerName: "Priyansh Mehta",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/packers+and+movers+2.webp",
          reviewText:
            "The team's dedication to handling my goods was beyond expectation.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Asha+Rastogi++.webp",
          reviewerName: "Asha Rastogi",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/packers+and+movers+3.webp",
          reviewText:
            "I liked the services, from packing my items to rearranging them in my new home, Mayur Vihar, Delhi.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Ritu+Saluja+.webp",
          reviewerName: "Ritu Saluja",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/packers+and+movers+4.webp",
          reviewText:
            "The relocation from Delhi to Lucknow for my new outlet opening was safe and stress-free.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Megh+Nath+Prasad+.webp",
          reviewerName: "Megh Nath Prasad",
        },
      ],
    },
    {
      name: "list-storage",
      data: [
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/p2p+1.webp",
          reviewText:
            "I have earned extra income by listing my property on Xtended Space. The services are secure and smooth.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Rohit+Vaidya+.webp",
          reviewerName: "Rohit Vaidya",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/p2p+2.webp",
          reviewText:
            "What I love about Xtended Space is earning money. You get a chance to inspect who is using your property.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Mohan+Gujral+.webp",
          reviewerName: "Mohan Gujral",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/p2p3.webp",
          reviewText:
            "I have earned money by listing my property on Xtended Space.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Kashish+Jha+.webp",
          reviewerName: "Kashish Jha",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/p2p+4.webp",
          reviewText:
            "My five months earned income from Xtended Space helped me pay my fitness bills.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Gargi+Verma+.webp",
          reviewerName: "Gargi Verma",
        },
      ],
    },
    {
      name: "business-storage",
      data: [
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/business+storage1.webp",
          reviewText:
            "The team storage policy is super flexible. I can easily access the warehouse to see my belongings.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Mukesh+Pasricha+.webp",
          reviewerName: "Mukesh Pasricha",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/business+storage2.webp",
          reviewText:
            "They stored my official documents safely through their Xpress delivery services.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Monish+Dutta.webp",
          reviewerName: "Monish Dutta",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/business+storage3.webp",
          reviewText:
            "The packing of bubble wrap was a saviour for my fragile items. I liked their packing sense.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Kriti+Mittal+.webp",
          reviewerName: "Kriti Mittal",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/business+storage4.webp",
          reviewText:
            "It was a successful storage journey because they helped the way I expected from the team.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Jeevika+Sikka+++.webp",
          reviewerName: "Jeevika Sikka",
        },
      ],
    },
    {
      name: "homepage",
      data: [
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review1.webp",
          reviewText: "Xtended Space is the best for the short-term storage facility in Delhi and NCR even at the last minute. ",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Tanay+Pandya.webp",
          reviewerName: "Tanay Pandya",
        },
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
          reviewText: "Very professional and trustworthy. The entire storage process was done appropriately.",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Nidhi+Guleria+.webp",
          reviewerName: "Nidhi Guleria",
        },
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review3.webp",
          reviewText: "Xtended Space provides me extra earning opportunities from my unused car parking space.",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Raghav+Ahuja.webp",
          reviewerName: "Raghav Ahuja",
        },
        // {
        //   imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review4.webp",
        //   reviewText: "Xtended Space staff eased the stress of renting a safe furniture storage unit in Noida for me.",
        //   reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/AvineshSoni.webp",
        //   reviewerName: "Hemant Rai",
        // },
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review5.webp",
          reviewText: "I have been hosting in Faridabad for the past two weeks now and it’s been a phenomenal experience.",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Shubham+Bhaskar.webp",
          reviewerName: "Shubham Bhaskar",
        },
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review1.webp",
          reviewText: "Such a stress-free experience. Xtended Space eased the stress of renting a safe furniture unit in Noida for me.",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Nikita+Singh.webp",
          reviewerName: "Nikita Singh",
        },
        {
          imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
          reviewText: "Xtended Space staff eased the stress of renting a safe furniture storage unit in Noida for me.",
          reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Aakansha+Adhikari.webp",
          reviewerName: "Aakansha Adhikari",
        },
      ],
    },
    {
      name: "easy-storage",
      data: [
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/easy+storage+1.webp",
          reviewText:
            "The operational team at Xtended Space stored my fragile crockery. The skilled workers packed my goods with proper care.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Ankit+Kumar+.webp",
          reviewerName: "Ankit Kumar",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/easy+storage+2.webp",
          reviewText:
            "The storage services at Xtended Space are customised, trustworthy, and pocket friendly. ",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Aanchal+Soni+.webp",
          reviewerName: "Aanchal Soni",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/easy+storage+3.webp",
          reviewText:
            "Xtended Space provides a team of skilled workers handled my belongings perfectly.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Sonal+Chawla+.webp",
          reviewerName: "Sonal Chawla",
        },
        {
          imageSrc:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/easy+storage+4.webp",
          reviewText:
            "The operational team made my storage journey stress-free. From packing to storing, my goods were a seamless experience.",
          reviewerImage:
            "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Testimonial/users/Suresh+Chaudhary+.webp",
          reviewerName: "Suresh Chaudhary",
        },
      ],
    },
    
  ];

  const filteredReviews =
    reviews.find((review) => review.name === name)?.data || [];

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (filteredReviews.length === 0) return;
    setCurrentSlide((prevIndex) => (prevIndex + 1) % filteredReviews.length);
  };

  const prevSlide = () => {
    if (filteredReviews.length === 0) return;
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? filteredReviews.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="w-full relative">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * (isMobile ? 100 : 30)}%)`,
          }}
        >
          {filteredReviews?.map((review, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 flex justify-center items-center"
            >
              <div id="box1" className="rounded-lg ">
                <Image
                  className="b1 rounded-lg"
                  src={review.imageSrc}
                  alt="review"
                  width={500}
                  height={500}
                />
                <div className="box2 shadow p-4 bg-white rounded-lg">
                  <p className="text-gray-700 font-[500px]">
                    {review.reviewText}
                  </p>
                  <div className="box3 flex items-center mt-0 md:mt-4">
                    <div className="b2 flex items-center space-x-2 md:space-x-4">
                      <Image
                        src={review.reviewerImage}
                        alt={review.reviewerName}
                        width={60}
                        height={60}
                        className="rounded-full w-12 h-12 md:w-24 md:h-24"
                      />
                      <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                        {review.reviewerName}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center w-fit mx-auto md:gap-6">
        <button
          onClick={prevSlide}
          className="group p-2 flex justify-center items-center border border-solid border-indigo-600 w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-indigo-600 -translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="group p-2 flex justify-center items-center border border-solid border-indigo-600 w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-indigo-600 translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Testimonial;
