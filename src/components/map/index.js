import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Script from "next/script";

// AutocompleteInput Component
const AutocompleteInput = forwardRef(({ onLocationSelect }, ref) => {
  const [searchValue, setSearchValue] = useState('');
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  // Expose a method to clear the input value
  useImperativeHandle(ref, () => ({
    clearValue: () => setSearchValue(''),
  }));

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google) {
        setTimeout(initAutocomplete, 100);
        return;
      }

      const options = {
        componentRestrictions: { country: 'IN' },
        types: ['geocode', 'establishment'],
      };

      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autoCompleteRef.current.addListener('place_changed', () => {
        const place = autoCompleteRef.current.getPlace();

        if (!place.geometry) {
          console.log('No location data available for this place');
          return;
        }

        const addressComponents = place.address_components;
        const address = [
          addressComponents[0]?.long_name,
          addressComponents[1]?.long_name,
        ].filter(Boolean).join(", ");
        const postalCode = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || "";
        const sublocalityLevel2 = addressComponents[2]?.long_name || "";
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setSearchValue(place.formatted_address);
        onLocationSelect({
          address,
          postalCode,
          sublocalityLevel2,
          lat: location.lat,
          lng: location.lng,
        });
      });
    };

    initAutocomplete();

    return () => {
      if (autoCompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, [onLocationSelect]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search location..."
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
});

// Map Component
const Map = ({ lat, lng, onLocationSelect, type }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      console.log("Initializing map...");
      if (window.google && mapRef.current) {
        const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
        const map = new google.maps.Map(mapRef.current, {
          zoom: 14,
          center: location,
        });

        const markerOptions = {
          position: location,
          map,
          draggable: type === "listing", // Allow dragging only if type is "listing"
        };

        const newMarker = new google.maps.Marker(markerOptions);
        setMarker(newMarker);

        if (type === "listing" || type === "listinginput") {
          // Add click listener for selecting a location when type is "listing"
          google.maps.event.addListener(map, "click", (event) => {
            const clickedLocation = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };

            newMarker.setPosition(clickedLocation);
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: clickedLocation }, (results, status) => {
              if (status === "OK" && results[0]) {
                const addressComponents = results[0].address_components;
                const address = [
                  addressComponents[0]?.long_name,
                  addressComponents[1]?.long_name,
                ].filter(Boolean).join(", ");
                const postalCode = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || "";
                const sublocalityLevel2 = addressComponents[2]?.long_name || "";

                onLocationSelect({
                  address,
                  postalCode,
                  sublocalityLevel2,
                  lat: clickedLocation.lat,
                  lng: clickedLocation.lng,
                });
              } else {
                console.error("Geocoder failed:", status);
              }
            });
          });
        }
      }
    };

    if (window.google) {
      initializeMap();
    } else {
      const checkGoogleInterval = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogleInterval);
          initializeMap();
        }
      }, 100);
    }
  }, [lat, lng, onLocationSelect, type]);

  return (
    <>
      {type === "listing" && (
        <AutocompleteInput onLocationSelect={onLocationSelect} ref={inputRef} />
      )}
      <div ref={mapRef} style={{ width: "100%", height: "50vh" }} />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBv6cMx3tZiOCaPymQcMiUsQC1kFUYlccc&libraries=places,drawing,geometry&v=weekly`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Google Maps script loaded!");
        }}
        onError={(e) => {
          console.error("Failed to load Google Maps script:", e);
        }}
      />
    </>
  );
};

export default Map;