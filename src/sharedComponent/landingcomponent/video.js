

const video = ({videoData}) => {
  return (
    <section className="text-center py-[25px]  md:py-[50px] md:pr-[50px] px-4 w-full">
      <div className="w-full flex flex-col items-center lg:px-[10%]">
        {/* <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1B1C57] capitalize  mb-4">
          {videoData.heading}
        </h3>
        <p className="text-[14px] md:text-[18px] text-[#1B1C57] mb-4">
          {videoData.description}
        </p> */}
        <div className="video-container" itemscope itemtype="http://schema.org/VideoObject">
          <iframe
            className="youtube-video w-[90vw] md:w-[80vw] rounded-lg h-[500px]"
            src={videoData.video.url}
            allowFullScreen
            title={videoData.video.title}
          ></iframe>
          <meta itemProp="name" content={videoData.video.name} />
          <meta itemProp="description" content={videoData.video.description} />
          <meta itemProp="duration" content={videoData.video.duration} />
          <meta itemProp="thumbnailUrl" content={videoData.video.thumbnailUrl} />
          <meta itemProp="uploadDate" content={videoData.video.uploadDate} />
        </div>
      </div>
    </section>
  );
};

export default video;
