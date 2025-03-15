'use client'

import { useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

// Google Maps API Key and Libraries
const GOOGLE_MAPS_API_KEY = 'AIzaSyCmjiTW64B01tMxtOGACg7vnW4QJAFmY0A' // Replace with your actual API key
const libraries = ['places']

export default function LocationSelector({ onClose, onSelect }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 33.667127,
    lng: 72.929464,
    city: '',
    address: '',
  })

  // Lazily initialize the usePlacesAutocomplete hook
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    initOnMount: false, // Disable initial mount
  })

  const [loading, setLoading] = useState(true)

  // Initialize usePlacesAutocomplete once Google Maps API is loaded
  if (isLoaded && loading) {
    init() // Initialize places autocomplete when the Maps API is ready
    setLoading(false)
  }

  const handleSearchChange = (e) => {
    setValue(e.target.value)
  }

  const handleSearchSelect = async (description) => {
    try {
      setValue(description, false)
      clearSuggestions()

      const results = await getGeocode({ address: description })
      const { lat, lng } = await getLatLng(results[0])

      const addressComponent = results[0].formatted_address
      const cityComponent = results[0].address_components.find(
        (component) =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
      )?.long_name || ''

      const locationData = {
        lat,
        lng,
        city: cityComponent,
        address: addressComponent,
      }

      setSelectedLocation(locationData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>
  }

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    try {
      const geocoder = new window.google.maps.Geocoder()
      const response = await geocoder.geocode({ location: { lat, lng } })

      if (response.results[0]) {
        const address = response.results[0].formatted_address
        const cityComponent = response.results[0].address_components.find(
          (component) =>
            component.types.includes('locality') ||
            component.types.includes('administrative_area_level_1')
        )?.long_name || ''

        const locationData = {
          lat,
          lng,
          city: cityComponent,
          address: address,
        }

        setSelectedLocation(locationData)
        setValue(address)
      }
    } catch (error) {
      console.error('Geocoding error:', error)
    }
  }

  const handleSubmitLocation = () => {
    if (selectedLocation.address) {
      // Log the selected location data
      console.log('Selected Location Data:', {
        address: selectedLocation.address,
        city: selectedLocation.city,
        coordinates: {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng
        }
      })

      onSelect(selectedLocation)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-semibold text-white">Select Location</span>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Close</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        <div className="flex">
          {/* Left Side - Form */}
          <div className="w-2/5 p-4 border-r border-gray-800">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Selected Address
                </label>
                <input
                  value={selectedLocation.address}
                  readOnly
                  className="w-full p-3 bg-[#2A2A2A] border border-gray-800 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Selected address will appear here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City
                </label>
                <input
                  value={selectedLocation.city}
                  readOnly
                  className="w-full p-3 bg-[#2A2A2A] border border-gray-800 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="City will appear here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Coordinates
                </label>
                <div className="space-y-2 p-3 bg-[#2A2A2A] border border-gray-800 rounded-xl text-gray-300 text-sm">
                  <p>Lat: {selectedLocation.lat.toFixed(6)}</p>
                  <p>Lng: {selectedLocation.lng.toFixed(6)}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitLocation}
                  disabled={!selectedLocation.address}
                  className={`w-full py-2.5 ${
                    selectedLocation.address 
                      ? 'bg-teal-400 hover:bg-teal-300 text-black' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  } font-semibold rounded-xl transition-colors`}
                >
                  {selectedLocation.address ? 'Confirm Location' : 'Select a location'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="w-3/5">
            {/* Search box above map */}
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <input
                  value={value}
                  onChange={handleSearchChange}
                  disabled={!ready}
                  className="w-full p-3 bg-[#2A2A2A] border border-gray-800 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Search for a location..."
                />

                {/* Show suggestions only when there are results */}
                {status === "OK" && (
                  <div className="absolute z-10 mt-1 w-full bg-[#2A2A2A] border border-gray-800 rounded-xl overflow-hidden">
                    {data.map(({ place_id, description }) => (
                      <div
                        key={place_id}
                        onClick={() => handleSearchSelect(description)}
                        className="p-3 hover:bg-gray-800 cursor-pointer text-gray-300 text-sm"
                      >
                        {description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '450px' }}
              center={selectedLocation}
              zoom={15}
              onClick={handleMapClick}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    featureType: "all",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#242f3e" }]
                  },
                  {
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#746855" }]
                  }
                ]
              }}
            >
              <Marker position={selectedLocation} />
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  )
}
