import React from "react";
import Image from "next/image"; // If you're using Next.js, otherwise replace with <img />

const Service = ({ services }) => {
  return (
    <>
      <div className="service-container">
        <div id="scrollbarslide" className="service-scroll">
          {services.map((service, index) => (
            <div
              key={service.index}
              className={`service-item ${
                index === 0 || index === 2 ? 'service-item-mb' : index === 1 || index === 3 ? 'service-item-mt' : ''
              }`}
            >
              <Image
                src={service.imageSrc}
                alt={service.title}
                width={60}
                height={60}
                priority
              />
              <p className="service-title">{service.title}</p>
              <div className="service-circle">
                <span className="service-circle-text">{service.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .service-container {
          padding: 1rem;
          display:flex;
          padding-top:50px;
          justify-content: center;
          height: auto;
        }

        .service-scroll {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding-top: 0;
          padding-bottom: 30px;
        }

        @media (min-width: 768px) {
          .service-scroll {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (min-width: 1024px) {
          .service-scroll {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .service-item {
          background-color: white;
          border-radius: 18px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          min-height: 150px;
          min-width: 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 1rem;
          position: relative;
        }

        @media (min-width: 768px) {
          .service-item {
            min-height: 236px;
            width: 280px;
            justify-content: space-evenly;
          }
             .service-item-mb {
          margin-bottom: 50px;
        }

        .service-item-mt {
          margin-top: 50px;
        }
        }
@media (max-width: 768px) {
   .service-item-mb {
          margin-bottom: 0px;
        }

        .service-item-mt {
          margin-top: 0px;
        }
          .service-container {
          padding-top: 20px;
          }

}
       

        .service-title {
          font-weight: bold;
          color: #1b1c57;
          text-align: center;
          font-size: 20px;
        }

        @media (min-width: 768px) {
          .service-title {
            font-size: 24px;
          }
        }

        .service-circle {
          position: absolute;
          bottom: -30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #84cc16;
          border: 5px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-circle-text {
          font-weight: bold;
          color: white;
          font-size: 25px;
        }
      `}</style>
    </>
  );
};

export default Service;
