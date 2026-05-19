import React from 'react';

const Workflow = () => {
  return (
    <>
      <section className="process">
        <div className="process-info">
          <h2 className='text-[2rem]'>How it Works?</h2>
          <p>Xtended Space, the ultimate storage platform in India, stores your belongings safely.</p>
        </div>
        <div className="row">
          <div className="process-col flex flex-col items-center">
            <img src="/images/storage-facilities-process/Easy-Booking.png" alt="Easy Booking" />
            <h2>01</h2>
            <h3>Easy Booking</h3>
            <p className="html_article">Seamlessly book your storage space with our straightforward and user-friendly process.</p>
          </div>
          <div className="process-col flex flex-col items-center">
            <img src="/images/storage-facilities-process/Doorstep-Pickup.png" alt="Doorstep Pickup packing and moving" />
            <h2>02</h2>
            <h3>Doorstep Pickup</h3>
            <p className="html_article">We pick up your goods right from your doorstep, ensuring maximum convenience.</p>
          </div>
          <div className="process-col flex flex-col items-center">
            <img src="/images/storage-facilities-process/Store-Goods-in-Storage-Space.png" alt="Store Goods in Storage units" />
            <h2>03</h2>
            <h3>Store Goods in Storage Units</h3>
            <p className="html_article">Your items are securely stored in our state-of-the-art Storage Units with advanced security features.</p>
          </div>
          <div className="process-col flex flex-col items-center">
            <img src="/images/storage-facilities-process/Hassle-Free-Return.png" alt="Hassle-Free Return" />
            <h2>04</h2>
            <h3>Hassle-Free Return</h3>
            <p className="html_article">When you need your items back, our logistics team will deliver them to your doorstep promptly and safely.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Workflow;
