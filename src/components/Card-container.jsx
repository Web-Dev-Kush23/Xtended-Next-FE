import React from "react";

const CardContainer = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-around flex-wrap gap-4 pb-4 pt-4">
        {children}
      </div>
    </React.Fragment>
  );
};

export default CardContainer;
