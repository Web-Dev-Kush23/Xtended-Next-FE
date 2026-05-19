import React from 'react'

const videosec = () => {
  return (
   <>
     <div className="container3">
     <div className="video-section">
          <div className="video-container" itemscope itemtype="http://schema.org/VideoObject">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/KZWIwlO3_9Q?si=2KNEZ9TiN-q2kyhk"
              allowFullScreen
              title="Xtended Space Warehouse Storage Services"
            ></iframe>
            <meta itemProp="name" content="The Best Storage Space In Delhi NCR| Storage and logistics | Storage facility" />
            <meta itemProp="description" content="Looking for the best storage space in Delhi NCR? Look no further than Xtended Space! Our facility offers secure storage and logistics solutions designed to meet your requirements. Enjoy convenient access, triple layer packing, and round-the-clock security. Say goodbye to clutter and hello to peace of mind with Xtended Space." />
            <meta itemProp="duration" content="T0M26S" />
            <meta itemProp="thumbnailUrl" content="https://i.ytimg.com/vi/KZWIwlO3_9Q/maxresdefault.jpg" />
            <meta itemProp="uploadDate" content="2024-06-01" />
          </div>
        </div>
        <a  class="whats-app" href="https://api.whatsapp.com/send?phone=919009000798&text=Hello" target="_blank" rel="noreferrer">
                {/* <i className="ri-whatsapp-line"></i> */}
                <img src='/images/icon/whatsiconr.png'alt='whatsapp'/>
              </a>
      </div>
   </>
  )
}
export default videosec;