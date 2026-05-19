import AutocompleteInput from "@/components/Autocompletep2p";
import FormModal from "@/sharedComponent/modal/formModal";
import { DatePicker } from "antd";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaChevronDown, FaChevronUp, FaFilter, FaTimes } from "react-icons/fa";
import dayjs from "dayjs";

export default function MobileViewFilter ({
  isFilterChanged,
  clearFilter,
  tab,
  handleTabToggle,
  onChangeFilter,
  filter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  distanceVal,
  autocompleteRef,
  setSearchedLocation,
})  {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="block md:hidden sticky top-[61px] z-20 bg-white">
      {/* Filter Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaFilter size={16} />
          <span>Filters</span>
        </button>
        {isFilterChanged && (
          <button
            onClick={clearFilter}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Offcanvas Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Autocomplete Input */}
          <div className="mb-4">
            <AutocompleteInput
              ref={autocompleteRef}
              onLocationSelect={(location) => {
                setSearchedLocation({
                  latitude: location.lat,
                  longitude: location.lng,
                  cityName: location.address,
                });
              }}
              className="w-full border rounded-lg"
            />
          </div>

          {/* Filter Sections */}
          <div className="space-y-4">
            {/* Sort By */}
           <div>
              <button
                onClick={() => handleTabToggle("sort_by")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Sort By
                {tab?.sort_by ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab?.sort_by && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <Form>
                    {[
                      { value: "Pricing(High to low)", label: "Pricing (high to low)" },
                      { value: "Pricing(Low to high)", label: "Pricing (Low to high)" },
                      { value: "Recent", label: "Recent" },
                      { value: "Discount(High to low)", label: "Discount (High to Low)" },
                      { value: "Discount(Low to high)", label: "Discount (Low to High)" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 py-2 text-sm">
                        <Form.Check
                          type="radio"
                          name="sortBy"
                          value={option.value}
                          onChange={onChangeFilter}
                          checked={filter?.sortBy === option.value}
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </Form>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div>
              <button
                onClick={() => handleTabToggle("prop_type")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Property Type
                {tab.prop_type ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.prop_type && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <Form>
                    {[
                      "Household Storage",
                      "Business Storage",
                      "Car Storage",
                      "Business Storage,Car Storage",
                      "Household Storage,Business Storage",
                      "Household Storage,Car Storage",
                    ].map((value) => (
                      <label key={value} className="flex items-center gap-2 py-2 text-sm">
                        <Form.Check
                          type="radio"
                          name="propertyType"
                          value={value}
                          onChange={onChangeFilter}
                          checked={filter?.propertyType === value}
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-gray-700">
                          {value.includes("Car Storage") ? value.replace("Car Storage", "Vehicle Storage") : value}
                        </span>
                      </label>
                    ))}
                  </Form>
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => handleTabToggle("price_range")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Price Range
                {tab.price_range ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.price_range && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <Form>
                    {[
                      "1-1000",
                      "1000-5000",
                      "5000-20000",
                      "20000-50000",
                    ].map((range) => (
                      <label key={range} className="flex items-center gap-2 py-2 text-sm">
                        <Form.Check
                          type="radio"
                          name="pricerange"
                          value={range}
                          onChange={onChangeFilter}
                          checked={filter?.pricerange === range}
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-gray-700">₹{range}</span>
                      </label>
                    ))}
                  </Form>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="₹ Min"
                      name="MinPrice"
                      onChange={onChangeFilter}
                      className="h-10 w-1/2 border rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="₹ Max"
                      name="MaxPrice"
                      onChange={onChangeFilter}
                      className="h-10 w-1/2 border rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Storage Type */}
            <div>
              <button
                onClick={() => handleTabToggle("storage")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Storage Type
                {tab.storage ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.storage && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <Form>
                    {["Independent", "Shared"].map((value) => (
                      <label key={value} className="flex items-center gap-2 py-2 text-sm">
                        <Form.Check
                          type="radio"
                          name="StorageType"
                          value={value}
                          onChange={onChangeFilter}
                          checked={filter?.StorageType === value}
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-gray-700">{value}</span>
                      </label>
                    ))}
                  </Form>
                </div>
              )}
            </div>

            {/* Duration */}
            <div>
              <button
                onClick={() => handleTabToggle("time_duration")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Duration
                {tab.time_duration ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.time_duration && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex gap-2">
                    <DatePicker
                      format="DD/MM/YYYY"
                      name="FromDate"
                      value={fromDate ? dayjs(fromDate, "DD/MM/YYYY") : null}
                      onChange={(date) => {
                        setFromDate(date ? date.format("DD/MM/YYYY") : null);
                        onChangeFilter({
                          target: { name: "FromDate", value: date },
                        });
                      }}
                      placeholder="From"
                      className="h-10 w-1/2 border rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <DatePicker
                      format="DD/MM/YYYY"
                      name="ToDate"
                      value={toDate ? dayjs(toDate, "DD/MM/YYYY") : null}
                      disabledDate={(current) =>
                        current && fromDate && current.isBefore(dayjs(fromDate, "DD/MM/YYYY"), "day")
                      }
                      onChange={(date) => {
                        setToDate(date ? date.format("DD/MM/YYYY") : null);
                        onChangeFilter({
                          target: { name: "ToDate", value: date },
                        });
                      }}
                      placeholder="To"
                      className="h-10 w-1/2 border rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Distance */}
            <div>
              <button
                onClick={() => handleTabToggle("distance")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Distance
                {tab.distance ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.distance && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">(in Km)</p>
                  <input
                    type="range"
                    name="distance"
                    min="0"
                    max="500"
                    onChange={onChangeFilter}
                    value={distanceVal}
                    className="rangeinkm"
                  />
                  <div className="flex justify-center items-center mt-2 p-2 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-700">{distanceVal} Km</span>
                  </div>
                </div>
              )}
            </div>

            {/* Space Dimension */}
            <div>
              <button
                onClick={() => handleTabToggle("space_dimension")}
                className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg text-gray-800 font-medium hover:bg-gray-200"
              >
                Space Dimension
                {tab.space_dimension ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              {tab.space_dimension && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <Form>
                    {[
                      { value: "0-300", label: "0-300 sq ft. (Few)" },
                      { value: "300-600", label: "300-600 sq ft. (1BHK)" },
                      { value: "600-1000", label: "600-1000 sq ft. (2BHK)" },
                      { value: "900-1500", label: "900-1500 sq ft. (3BHK)" },
                      { value: "1200-2000", label: "1200-2000 sq ft. (4BHK)" },
                      { value: "2001-100000", label: "Other" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 py-2 text-sm">
                        <Form.Check
                          type="radio"
                          name="space_dimension"
                          value={option.value}
                          onChange={onChangeFilter}
                          checked={filter?.space_dimension === option.value}
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};