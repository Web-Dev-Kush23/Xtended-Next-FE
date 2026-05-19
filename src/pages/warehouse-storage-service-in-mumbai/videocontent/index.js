import React from 'react'

const VideoContent = () => {
  return (
   <>
     <div className="container3">
        <div className="video-section">
          <div className="video-container" itemscope itemtype="http://schema.org/VideoObject">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/4Www6lQAqGQ"
              allowFullScreen
              title="Xtended Space Warehouse storage solutions in Mumbai"
            ></iframe>
            <meta itemProp="name" content="Best storage space in Mumbai| Storage and logistics | Warehouse in Mumbai" />
            <meta itemProp="description" content="Exciting news, Mumbai! Xtended Space has arrived, offering the best storage space in Mumbai. Say goodbye to clutter and hello to convenience with our secure warehouses and household storage solutions. Whether you're storing furniture or inventory, we've got you covered. Experience peace of mind with Xtended Space – your ultimate storage destination in Mumbai" />
            <meta itemProp="duration" content="T0M44S" />
            <meta itemProp="thumbnailUrl" content="https://i.ytimg.com/vi/4Www6lQAqGQ/maxresdefault.jpg" />
            <meta itemProp="uploadDate" content="2024-06-03" />
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

export default VideoContent;