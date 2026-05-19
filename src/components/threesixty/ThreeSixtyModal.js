
import React from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";


const ThreeSixtyModal = ({ imageURL, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-2 md:p-3 rounded-md w-[98vw] max-w-[800px] shadow-lg relative flex flex-col justify-center items-center"
        style={{
          // maxHeight: "95vh",
          // minHeight: "500px",
          // height: "500px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-red-600 text-2xl font-bold z-10  p-1 rounded-full" 
          aria-label="Close"
        >
          ✖
        </button>
        <div className="w-full h-full flex-1 flex flex-col justify-center items-center pt-8">
          {imageURL ? (
            <ReactPhotoSphereViewer
              src={imageURL}
              height={"400px"}
              width={"100%"}
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeSixtyModal;
