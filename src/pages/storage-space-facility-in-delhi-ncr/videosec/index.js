import React from 'react'

const Videosec = () => {
  return (
    <>
    <div className="container3">
    <div className="video-section">
          <div className="video-container" itemscope itemtype="http://schema.org/VideoObject">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/KZWIwlO3_9Q?si=ym6wO37tGlRjEDCT"
              allowFullScreen
              title="Xtended Space Relocation"
            ></iframe>
            <meta itemProp="name" content="The Best Storage Space In Delhi NCR| Storage and logistics | Storage facility" />
            <meta itemProp="description" content="Xtended Space offers secure and affordable storage facilities in Delhi NCR. Flexible leases available. Contact us now!" />
            <meta itemProp="duration" content="T0M50S" />
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

export default Videosec