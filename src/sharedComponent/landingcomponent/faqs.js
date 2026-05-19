import React from "react";
import { Accordion } from "react-bootstrap"; // Import Accordion from the appropriate library

const Faqs = ({ FAQData }) => {
  // Receive FAQData as a prop
  return (
    <div className="md:px-[100px]">
    <div className=" py-[25px]  px-4">
      <div className="lg:w-[100%] w-[100%] mx-auto">
        <h2 className=" text-[18px] md:text-[32px] text-center  mb-4   font-bold text-[#1B1C57] capitalize">
          FAQ's
        </h2>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {FAQData.map((faq) => (
            <Accordion.Item eventKey={faq.key} key={faq.key}>
              <Accordion.Header className="font-bold">{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
    </div>
  );
};

export default Faqs;
