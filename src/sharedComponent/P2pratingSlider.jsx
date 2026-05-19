import React from "react";
import Slider from "react-slick";

function P2pratingSlider({data}) {
  const settings = {
    dots: false,
    infinite: data.length>3?true:false,
    speed: 500,
    slidesToShow: data?.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container max-w-full mx-auto px-4 py-6">
      <Slider {...settings}>
        {data?.map((review, idx) => (
          <div key={idx} className="px-2">
            <div className="flex flex-col border rounded-lg p-4 bg-white shadow-sm h-full min-h-[220px]">
              
              <div className="flex items-start space-x-4">
               
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg ${idx%2==0?"bg-green-500":"bg-blue-600"}`}
                >
                  {review?.userName.slice(0,1)}
                </div>

               
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900">{review?.userName}</p>
                  <p className="text-sm text-zinc-500">{review?.createdAt?.slice(0,10)}</p>
                </div>

                <span className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                  Verified renter
                </span>
              </div>

              
              <div className="flex items-center mt-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.115 3.429a1 1 0 00.95.69h3.6c.969 0 1.371 1.24.588 1.81l-2.915 2.118a1 1 0 00-.364 1.118l1.115 3.429c.3.921-.755 1.688-1.538 1.118l-2.915-2.118a1 1 0 00-1.176 0l-2.915 2.118c-.783.57-1.838-.197-1.538-1.118l1.115-3.429a1 1 0 00-.364-1.118L2.796 8.856c-.783-.57-.38-1.81.588-1.81h3.6a1 1 0 00.95-.69l1.115-3.429z" />
                  </svg>
                ))}
              </div>

              
              {review.comment && (
                <p className="text-sm text-zinc-700 mt-3">{review.comment}</p>
              )}
            </div>
          </div>
        ))}
       
      </Slider>
    </div>
  );
}

export default P2pratingSlider;
