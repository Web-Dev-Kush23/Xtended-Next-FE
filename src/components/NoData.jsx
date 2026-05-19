import Image from "next/image";
import nodata_image from "../../public/images/nodata.png";
import React from "react";

const NoData = () => {
  return (
    <React.Fragment>
      <div className="grid place-items-center w-full">
        <Image
          src={nodata_image}
          alt="image"
          width="200"
          className="pt-14"
          priority
        />
      </div>
    </React.Fragment>
  );
};

export default NoData;
