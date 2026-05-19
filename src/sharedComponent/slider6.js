
import { useState, useEffect } from 'react';
import Image from 'next/image';

const CarouselComponent = () => {
  const reviews = [
    {
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review1.webp",
      reviewText: "Xtended Space is the best for the short-term storage facility in Delhi and NCR even at the last minute. ",
      reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Tanay+Pandya.webp",
      reviewerName: "Tanay Pandya",
    },
    {
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp",
      reviewText: "Great customer service I must say- the drive-up car storage unit was easily accessible, and the prices are reasonable.",
      reviewerImage: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/AvineshSoni.webp",
      reviewerName: "Avinesh Soni",
    },
    {
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review3.webp",
      reviewText: "Xtended Space provides me extra earning opportunities from my unused car parking space. Plus, it is always getting better.",
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
  ];
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
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
          {reviews.map((review, index) => (
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
                  <p className="text-gray-700">{review.reviewText}</p>
                  <div className="box3 flex items-center mt-4">
                    <div className="b2 flex items-center space-x-4">
                      <Image
                        src={review.reviewerImage}
                        alt={review.reviewerName}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">
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

     
      <div className="flex justify-center items-center w-fit mx-auto gap-6">
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
};

export default CarouselComponent;

