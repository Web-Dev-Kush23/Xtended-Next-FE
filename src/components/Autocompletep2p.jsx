import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

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
        componentRestrictions: { country: 'in' },
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

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        };

        setSearchValue(place.formatted_address);
        onLocationSelect(location);
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

export default AutocompleteInput;
