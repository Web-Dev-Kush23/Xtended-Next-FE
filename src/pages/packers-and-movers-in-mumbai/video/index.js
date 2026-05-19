import React from 'react';

const Video = () => {
  return (
    <>
      <div className="container3">
        <div className="video-section">
          <div className="video-container" itemscope itemtype="http://schema.org/VideoObject">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/PeS2Pcr3goA"
              allowFullScreen
              title="Xtended Space Relocation"
            ></iframe>
            <meta itemProp="name" content="Xtended Space Relocation service provide in Mumbai" />
            <meta itemProp="description" content="Experience worry-free business and houseold Relocate at Xtended Space's, where affordability meets security and convenience." />
            <meta itemProp="duration" content="T0M26S" />
            <meta itemProp="thumbnailUrl" content="https://i.ytimg.com/vi/PeS2Pcr3goA/maxresdefault.jpg" />
            <meta itemProp="uploadDate" content="2024-03-27" />
          </div>
        </div>
        {/* <a  class="whats-app" href="https://api.whatsapp.com/send?phone=919009000798&text=Hello" target="_blank" rel="noreferrer">
                <i className="ri-whatsapp-line"></i>
                <img src='/images/icon/whatsiconr.png'alt='whatsapp'/>
              </a> */}
      </div>
    </>
  );
};

export default Video;
