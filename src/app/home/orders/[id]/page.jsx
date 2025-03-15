"use client";
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const OrderDetailsPage = () => {
  const { id } = useParams();

  // Mock data
  const orderDetails = {
    id: "#GA555A",
    location: "Peshawar Road, Committee Chowk, Rawalpindi",
    studentName: "Maryam Javed",
    subjects: "Biology, Chemistry",
    startDate: "23/08/2024",
    endDate: "23/11/2024",
    time: "09:00 Pm",
    price: "Rs.20,000/-",
    status: "Awaiting Confirmation"
  };

  // Islamabad coordinates
  const center = {
    lat: 33.6844,
    lng: 73.0479
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '12px'
  };

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <h1 className="text-white text-2xl mb-6">Session Details</h1>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Student Info Card */}
                <div className="bg-[#1A1A1A] rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#1CD3C6] rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(orderDetails.studentName)}
                    </div>
                    <div>
                      <h2 className="text-white text-lg">{orderDetails.studentName}</h2>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {orderDetails.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#2A2A2A] text-white py-2 rounded-md hover:bg-[#3A3A3A] transition-colors">
                      Call
                    </button>
                    <button className="flex-1 bg-[#1CD3C6] text-white py-2 rounded-md hover:bg-[#19BFB3] transition-colors">
                      Message
                    </button>
                  </div>
                </div>

                {/* Session Summary Card */}
                <div className="bg-[#1A1A1A] rounded-xl p-6">
                  <h2 className="text-white text-lg mb-4">Session Summary</h2>
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 mb-1">Start Date:</p>
                        <p className="text-white">{orderDetails.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">End Date:</p>
                        <p className="text-white">{orderDetails.endDate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Time:</p>
                      <p className="text-white">{orderDetails.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Request ID:</p>
                      <p className="text-white">{orderDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Subjects:</p>
                      <p className="text-white">{orderDetails.subjects}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Price:</p>
                      <p className="text-white">{orderDetails.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Request Status:</p>
                      <p className="text-[#1CD3C6]">{orderDetails.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="bg-[#1A1A1A] rounded-xl p-6">
                <LoadScript googleMapsApiKey="AIzaSyCmjiTW64B01tMxtOGACg7vnW4QJAFmY0A">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    options={{
                      styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                      ],
                      disableDefaultUI: true,
                    }}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 