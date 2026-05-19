import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios"; // Add axios for making API requests
import { useState } from "react";

const HeaderMenu = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("@/components/footer"));

const Index = () => {
  const [docketNo, setDocketNo] = useState(""); // Add state for docket number
  const [shipmentData, setShipmentData] = useState(null); // Add state for shipment data
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const onChange = (e) => {
    setDocketNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark form as submitted
    try {
      const response = await axios.get(
        `https://xtendedspace-web-api.azurewebsites.net/Landing/GetDocketStatus?docketNo=${docketNo}`
      );
      setShipmentData(response.data);
    } catch (error) {
      console.error(error);
      setShipmentData(null); // Reset data if error occurs
    }
  };

  return (
    <div className="text-[12px] md:text-[15px] text-blue-950 min-h-screen flex flex-col w-[100vw]">
      <HeaderMenu />
      <div className=" flex-grow max-w-6xl mx-auto w-full p-4 py-6 ">
        {/* <!-- Track Shipment Form --> */}
        <div className="mb-2">
          <h2 className="text-xl font-semibold">Track Shipment</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="Number"
              value={docketNo}
              onChange={onChange}
              name="docketNo"
              placeholder="Docket Number"
              className="border p-6 rounded-md my-6 sm:mr-4 flex-grow w-full"
            />
            <button
              type="submit"
              className="bg-[rgb(138,199,64)] text-white font-semibold p-3 px-4 rounded-md w-[120px]"
            >
              Submit
            </button>
          </form>
        </div>

        {/* <!-- Conditional Rendering for no DocketNo --> */}
        {isSubmitted && shipmentData?.DocketNo === null && (
          <p className="mt-4 text-red-600">{shipmentData?.Message || 'No data found for the provided Docket Number.'}</p>
        )}

        {/* <!-- Display Shipment Data if DocketNo is present --> */}
        {shipmentData?.DocketNo && (
          <div>
            {/* <!-- Shipment Details --> */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">DOCKET NUMBER :</td>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">#{shipmentData.DocketNo}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">ORIGIN :</td>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">{shipmentData.Origin}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">DESTINATION :</td>
                  <td className="border border-gray-300 p-2 text-[12px] md:text-[15px]">{shipmentData.Destination}</td>
                </tr>
              </tbody>
            </table>

            {/* <!-- Shipment Status Table --> */}
            <table className="min-w-full table-auto border-collapse border border-gray-300 mt-[20px]">
              <thead>
                <tr className="bg-blue-500 bg-opacity-75 text-white">
                  <th className="border border-gray-300 p-2 text-left">STATUS</th>
                  <th className="border border-gray-300 p-2 text-left">DATE</th>
                </tr>
              </thead>
              <tbody>
              {shipmentData?.DocketStatusDetailApiList?.slice().reverse().map((statusDetail, index) => (
    <tr key={index}>
      <td className="border border-gray-300 p-2">{statusDetail.Status || 'N/A'}</td>
      <td className="border border-gray-300 p-2">{statusDetail.StatusDateTime || 'N/A'}</td>
      {/* Optionally, you can also show the StatusLocation if needed */}
      {/* <td className="border border-gray-300 p-2">{statusDetail.StatusLocation || 'N/A'}</td> */}
    </tr>
))}
</tbody>
              {/* <tbody>
                
                <tr>
                  <td className="border border-gray-300 p-2">Delivered</td>
                  <td className="border border-gray-300 p-2">{shipmentData.DocketDateTime || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Out for Delivery</td>
                  <td className="border border-gray-300 p-2">{shipmentData?.DocketStatusDetailApiList?.[0]?.StatusDateTime || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Shipment Booking</td>
                  <td className="border border-gray-300 p-2">{shipmentData.DocketDateTime || 'N/A'}</td>
                </tr>
              </tbody> */}
            </table>

            {/* <!-- E-Way Bill and Invoice Details (Only Display if Data Exists) --> */}
            <table className="min-w-full table-auto border-collapse border border-gray-300 mt-[30px]">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">EWAY BILL NO :</td>
                  <td className="border border-gray-300 p-2">{shipmentData?.DocketInvoiceList?.[0]?.EwayBillNo || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">INVOICE NO :</td>
                  <td className="border border-gray-300 p-2">{shipmentData?.DocketInvoiceList?.[0]?.InvoiceNo || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;

