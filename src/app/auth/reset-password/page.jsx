'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import loginImage from '@/assets/images/otppage.png'
import lock from '@/assets/images/lock.png'
import Link from 'next/link'




export default function ResetPassword() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    passwordsMatch: false
  })

  // Password validation checks
  useEffect(() => {
    const { newPassword, confirmPassword } = formData
    setValidations({
      minLength: newPassword.length >= 8,
      hasNumber: /\d/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword !== ''
    })
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const isPasswordValid = () => {
    return Object.values(validations).every(value => value === true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isPasswordValid()) {
      setError('Please ensure all password requirements are met')
      return
    }

    setLoading(true)
    try {
      // Add your password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated delay
      router.push('/auth/login')
    } catch (error) {
      setError('Failed to reset password. Please try again.')
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
            <h1 className="text-3xl font-bold mb-3 text-white">Reset Your Password</h1>
            <p className="text-gray-400 text-base leading-relaxed">
            Enter a new password to regain access to your account. Make sure to choose a strong and secure password that you can remember.</p>
          </div>

          {/* Updated Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#1A1A1A] border border-gray-800 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {/* New Password Requirements */}
              {formData.newPassword && (
                <div className="text-sm text-gray-500 mt-1">
                  {!validations.minLength || !validations.hasNumber || !validations.hasSpecialChar ? (
                    <p className="text-red-500">
                      {(!validations.minLength ? "At least 8 characters long" : "")}
                      {(!validations.minLength && (!validations.hasNumber || !validations.hasSpecialChar)) ? " | " : ""}
                      {(!validations.hasNumber ? "Contains number" : "")}
                      {(!validations.hasNumber && !validations.hasSpecialChar) ? " | " : ""}
                      {(!validations.hasSpecialChar ? "Contains special character" : "")}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#1A1A1A] border border-gray-800 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Confirm Password Match */}
              {formData.confirmPassword && !validations.passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !isPasswordValid()}
              className="w-full bg-teal-400 text-black font-semibold py-3 rounded-xl hover:bg-teal-300 transition-all duration-200 transform hover:scale-[1.02] text-white cursor-pointer disabled:hover:scale-100"
            >
              {loading ? 'Creating Password...' : 'Create Password'}
            </button>
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
                <h2 className="text-4xl font-bold mb-4">Secure your Account</h2>
                <p className="text-xl">Secure your Future</p>
                {lock && (
                <Image
                src={lock}
                alt="Lock"
                width={120}
                height={120}
                className="object-cover object-center"
                priority
              />
              
              )}
              </div>
            </div>
          </div>
        </div>

 
    </main>
  )
}