import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";

const AutocompleteInput = ({ label, value, setPackerData, field,reset }) => {
  const [address, setAddress] = useState(value);
  const [autocomplete, setAutocomplete] = useState(null);
  const [error , setError] = useState(false);

  const initializeAutocomplete = () => {
    const options = {
      componentRestrictions: { country: "IN" }, // Restrict to India
    };
  
    const input = document.getElementById(`${field}-input`);
    
    // Ensure Google Maps API is available before proceeding
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(input, options);
  
      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (place && place.address_components) {
          const city = place.address_components.find((component) =>
            component.types.includes("locality")
          );
          if (city) {
            setError(false);
            const cityName = city.long_name; 
            setAddress(cityName); 
            setPackerData((prevData) => ({
              ...prevData,
              [field]: cityName,
            }));
          } else if (place?.formatted_address === "Delhi, India") {
            setAddress("Delhi");
            setPackerData((prevData) => ({
              ...prevData,
              [field]: "Delhi",
            }));
            setError(false);
          } else {
            setError(true);
          }
        }
      });
  
      setAutocomplete(autocompleteInstance);
    } else {
      console.error("Google Maps API not loaded or missing places library.");
    }
  };

  useEffect(() => {
    // Dynamically load Google Maps script if it's not already loaded
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = () => {
        if (window.google) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

     if (typeof window !== 'undefined' && !window.google) {
loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAbIvotWe6gIR8IPuYe_8jY8mK0eLiKr04&libraries=places');    } else {
      initializeAutocomplete();
    }
  }, [address,field, setPackerData]);

  useEffect(()=>{
    setAddress("")
  },[reset])


  return (
    <div className="relative">
      <input
        id={`${field}-input`} 
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)} 
        placeholder={`Enter ${label}`}
        className="px-4 py-2.5 border-gray-500"
        style={{
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #6b7280",
        }}
      />
      <FaLocationDot className="absolute top-1/4 text-lg text-gray-400 right-2"/>
      {error && <p className="md:absolute relative text-sm  text-red-500">Please enter your city name</p>}
    </div>
  );
};

export default AutocompleteInput;
