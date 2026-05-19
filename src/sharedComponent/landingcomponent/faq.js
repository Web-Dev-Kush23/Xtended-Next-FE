import React from "react";

const Faq = ({ data }) => {
  const { heading1, services } = data;

  return (
    <>
      <div className="flex flex-col items-start justify-center flex-wrap w-[90%]">
        <h2 className="text-[#1B1C57] text-[18px] md:text-[32px] font-bold mb-4">
          {heading1}
        </h2>
      </div>

      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-center flex-wrap w-[90%] mt-6"
        >
          <h3 className="text-[#1B1C57] text-[16px] md:text-[20px] font-bold mb-3">
            {service.title}
          </h3>
          <p className="text-[#1B1C57] text-[14px] md:text-[18px]">
            {service.description}
          </p>
        </div>
      ))}

      {/* <div className="flex flex-col items-start justify-center flex-wrap w-[90%] mt-6">
        <h4 className="text-[#1B1C57] text-2xl font-bold mb-3">Packers and Movers Charges in Delhi</h4>
        <table className="w-full text-[#1B1C57]">
          <thead>
            <tr className="border-b-2 border-zinc-100 h-[60px]">
              <th>Shifting Type</th>
              <th>Packing Prices</th>
              <th>Labor Costs</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b-2 border-zinc-100 h-[60px]">
                <td>{row.type}</td>
                <td>{row.packingPrices}</td>
                <td>{row.laborCosts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Faq;
