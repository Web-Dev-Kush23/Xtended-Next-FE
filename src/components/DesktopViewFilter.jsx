import AutocompleteInput from "@/components/Autocompletep2p";
import { DatePicker } from "antd";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import dayjs from "dayjs";
import styles from "../styles/DesktopViewFilter.module.css"
export default function DesktopViewFilter({
  isFilterChanged,
  clearFilter,
  isOpen,
  handleToggle,
  onChangeFilter,
  filter,
  isInputActive,
  setIsInputActive,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  distanceVal,
  autocompleteRef,
  setSearchedLocation,
})  {
  return (
    <div className="hidden md:block w-full md:w-1/4 bg-gradient-to-b from-gray-50 to-white shadow-lg rounded-lg p-6 h-full overflow-y-auto">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          {isFilterChanged && (
            <button
              onClick={clearFilter}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Autocomplete Input */}
        <div className="mb-6">
          <AutocompleteInput
            ref={autocompleteRef}
            onLocationSelect={(location) => {
              setSearchedLocation({
                latitude: location.lat,
                longitude: location.lng,
                cityName: location.address,
              });
            }}
            className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Sections */}
        <div className="space-y-4">
          {/* Property Type */}
          <div>
            <button
              onClick={() => handleToggle("Property type")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Property Type</span>
              {isOpen === "Property type" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Property type" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              {[
                "Household Storage",
                "Business Storage",
                "Car Storage",
                "Business Storage,Car Storage",
                "Household Storage,Business Storage",
                "Household Storage,Car Storage",
              ].map((value) => (
                <label key={value} className="flex items-center gap-2 py-2 text-sm pl-4 text-gray-700">
                  <input
                    type="radio"
                    name="propertyType"
                    value={value}
                    onChange={onChangeFilter}
                    checked={filter?.propertyType === value}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span>{value.includes("Car Storage") ? value.replace("Car Storage", "Vehicle Storage") : value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => handleToggle("Price Range")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Price Range</span>
              {isOpen === "Price Range" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Price Range" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              {[
                "1-1000",
                "1000-5000",
                "5000-20000",
                "20000-50000",
              ].map((range) => (
                <label key={range} className="flex items-center gap-2 py-2 text-sm pl-4 text-gray-700">
                  <input
                    type="radio"
                    name="pricerange"
                    value={range}
                    onChange={onChangeFilter}
                    checked={filter?.pricerange === range}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span>₹{range}</span>
                </label>
              ))}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="₹ Min"
                  name="MinPrice"
                  onChange={onChangeFilter}
                  onFocus={() => setIsInputActive(true)}
                  onBlur={() => setIsInputActive(false)}
                  className="h-10 w-1/2 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  placeholder="₹ Max"
                  name="MaxPrice"
                  onChange={onChangeFilter}
                  onFocus={() => setIsInputActive(true)}
                  onBlur={() => setIsInputActive(false)}
                  className="h-10 w-1/2 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Storage Type */}
          <div>
            <button
              onClick={() => handleToggle("Storage type")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Storage Type</span>
              {isOpen === "Storage type" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Storage type" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              {["Independent", "Shared"].map((value) => (
                <label key={value} className="flex items-center gap-2 py-2 text-sm pl-4 text-gray-700">
                  <input
                    type="radio"
                    name="StorageType"
                    value={value}
                    onChange={onChangeFilter}
                    checked={filter?.StorageType === value}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <button
              onClick={() => handleToggle("Time Duration")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Duration</span>
              {isOpen === "Time Duration" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Time Duration" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
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
                  className="h-10 w-1/2 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
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
                  className="h-10 w-1/2 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Distance */}
          <div>
            <button
              onClick={() => handleToggle("Distance in km")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Distance (in Km)</span>
              {isOpen === "Distance in km" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Distance in km" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              <input
                type="range"
                name="distance"
                min="0"
                max="500"
                onChange={onChangeFilter}
                value={distanceVal}
                className="w-full h-2 rangeinkm"
              />
              <div className="flex justify-center items-center mt-3 p-2 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-700">{distanceVal} Km</span>
              </div>
            </div>
          </div>

          {/* Space Dimensions */}
          <div>
            <button
              onClick={() => handleToggle("Space Dimensions")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Space Dimensions</span>
              {isOpen === "Space Dimensions" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Space Dimensions" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              {[
                { value: "0-300", label: "0-300 sq ft. (Few)" },
                { value: "300-600", label: "300-600 sq ft. (1BHK)" },
                { value: "600-1000", label: "600-1000 sq ft. (2BHK)" },
                { value: "900-1500", label: "900-1500 sq ft. (3BHK)" },
                { value: "1200-2000", label: "1200-2000 sq ft. (4BHK)" },
                { value: "2001-100000", label: "Other" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 py-2 text-sm pl-4 text-gray-700">
                  <input
                    type="radio"
                    name="space_dimension"
                    value={option.value}
                    onChange={onChangeFilter}
                    checked={filter?.space_dimension === option.value}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <button
              onClick={() => handleToggle("Sort By")}
              className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Sort By</span>
              {isOpen === "Sort By" ? (
                <FaChevronUp className="text-gray-600" size={16} />
              ) : (
                <FaChevronDown className="text-gray-600" size={16} />
              )}
            </button>
            <div
              className={`${styles.accordionContent} ${isOpen === "Sort By" ? styles.accordionContentVisible : styles.accordionContentHidden} bg-gray-50 rounded-lg`}
            >
              {[
                { value: "Pricing(High to low)", label: "Pricing (High to Low)" },
                { value: "Pricing(Low to high)", label: "Pricing (Low to High)" },
                { value: "Recent", label: "Recent" },
                { value: "Discount(High to low)", label: "Discount (High to Low)" },
                { value: "Discount(Low to high)", label: "Discount (Low to High)" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 py-2 text-sm pl-4 text-gray-700">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    onChange={onChangeFilter}
                    checked={filter?.sortBy === option.value}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};