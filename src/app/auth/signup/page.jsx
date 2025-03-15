'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import loginImage from '@/assets/images/image (2).png'
import Link from 'next/link'

// Dynamically import LocationSelector with no SSR
const LocationSelector = dynamic(
  () => import('@/app/components/LocationSelector'),
  { ssr: false }
)

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showLocationSelector, setShowLocationSelector] = useState(false)

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.length < 3 ? 'Name must be at least 3 characters' : ''
      
      case 'email':
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return !emailPattern.test(value) ? 'Invalid email address' : ''
      
      case 'phone':
        const phonePattern = /^\+?[0-9]{10,}$/
        return !phonePattern.test(value.replace(/\s/g, '')) 
          ? 'Phone number must be at least 10 digits' 
          : ''
      
      case 'location':
        return !value ? 'Location is required' : ''
      
      case 'password':
        const passwordErrors = []
        if (value.length < 8) passwordErrors.push('8+ characters')
        if (!/[A-Z]/.test(value)) passwordErrors.push('uppercase letter')
        if (!/[a-z]/.test(value)) passwordErrors.push('lowercase letter')
        if (!/\d/.test(value)) passwordErrors.push('number')
        if (!/[@$!%*?&]/.test(value)) passwordErrors.push('special character')
        return passwordErrors.length > 0 ? `Missing: ${passwordErrors.join(', ')}` : ''
      
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleLocationSelect = (locationData) => {
    // Log the received location data
    console.log('Location Data Received in Signup:', {
      address: locationData.address,
      city: locationData.city,
      coordinates: {
        lat: locationData.lat,
        lng: locationData.lng
      }
    })
                      
                      setFormData(prev => ({
                        ...prev,
      location: locationData.address,
      city: locationData.city
    }))

    // Log the updated form data
    console.log('Updated Form Data:', {
      location: locationData.address,
      city: locationData.city
    })

    setErrors(prev => ({
      ...prev,
      location: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'city') { // city is optional
        const error = validateField(key, formData[key])
        if (error) {
          newErrors[key] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Store form data in localStorage for OTP verification page
      localStorage.setItem('signupData', JSON.stringify(formData))
      
      // Navigate to OTP verification page
      router.push("/auth/otp-verification")
    } catch (error) {
      console.error('Error:', error)
      setErrors(prev => ({
        ...prev,
        submit: 'Something went wrong. Please try again.'
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0A]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-6 lg:py-12 bg-[#0A0A0A]">
        <div className="mx-auto lg:pl-20">
          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-semibold text-white">Tutoria</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-3 text-white">Welcome to Tutoria!</h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Your one-stop platform to access unlimited learning opportunities and master new skills at your own pace
            </p>
          </div>

          {/* Updated Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
              <input
                  id="fullName"
                  name="fullName"
                type="text"
                  placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                  className={`w-full p-3 bg-[#2A2A2A] border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-800'
                  } rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
            </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
              <input
                  id="email"
                  name="email"
                type="email"
                  placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                  className={`w-full p-3 bg-[#2A2A2A] border ${
                    errors.email ? 'border-red-500' : 'border-gray-800'
                  } rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone No.
                </label>
              <input
                  id="phone"
                  name="phone"
                type="tel"
                  placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                  className={`w-full p-3 bg-[#2A2A2A] border ${
                    errors.phone ? 'border-red-500' : 'border-gray-800'
                  } rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onClick={() => setShowLocationSelector(true)}
                  readOnly
                  className={`w-full p-3 bg-[#2A2A2A] border ${
                    errors.location ? 'border-red-500' : 
                    formData.location ? 'border-green-500' : 
                    'border-gray-800'
                  } rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500 cursor-pointer`}
                  placeholder="Click to select location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                  type="password"
                placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                className={`w-full p-3 bg-[#2A2A2A] border ${
                  errors.password ? 'border-red-500' : 'border-gray-800'
                } rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}

            <button 
              type="submit"
              disabled={loading || Object.keys(errors).some(key => errors[key])}
              className="w-full bg-teal-400 text-black font-semibold py-3 rounded-xl hover:bg-teal-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center text-[15px] text-gray-400 mt-[-14px]">
            Have an account?
                  <Link href="/auth/login" className="text-[#2EBFA5] hover:text-[#20A2A0] font-medium">
                    Sign up
                  </Link>
                </div>
          </form>
        </div>
      </div>







      {/* Right Section - Image with Overlay */}
      <div className="hidden lg:block lg:w-1/2 relative z-10">
          <div className="h-full p-10">
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              {loginImage && (
                <Image
                  src={loginImage}
                  alt="Teacher with blackboard"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-[#2EBFA5]/80 flex flex-col items-center justify-center text-white p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                <p className="text-xl">Log in to continue your journey.</p>
              </div>
            </div>
          </div>
        </div>

      {showLocationSelector && (
        <LocationSelector
          onClose={() => setShowLocationSelector(false)}
          onSelect={(locationData) => {
            handleLocationSelect(locationData)
            setShowLocationSelector(false)
          }}
        />
      )}
    </main>
  )
}