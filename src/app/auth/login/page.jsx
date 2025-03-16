"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import loginImage from '@/assets/images/auth/login1.png'
import loginIcon from '@/assets/images/auth/login2.png'
import { login, logout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log("Checking auth status:", isAuthenticated);
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Real-time validation
    if (name === 'email') {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!emailPattern.test(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }))
      }
    } else if (name === 'password') {
      const missingRequirements = []

      if (value.length < 8) {
        missingRequirements.push('8+ characters')
      }
      if (!/[A-Z]/.test(value)) {
        missingRequirements.push('uppercase letter')
      }
      if (!/[a-z]/.test(value)) {
        missingRequirements.push('lowercase letter')
      }
      if (!/\d/.test(value)) {
        missingRequirements.push('number')
      }
      if (!/[@$!%*?&]/.test(value)) {
        missingRequirements.push('special character')
      }

      setErrors(prev => ({
        ...prev,
        password: missingRequirements.length > 0 ?
          `Missing: ${missingRequirements.join(', ')}` :
          value.length > 0 ? '✓ Password is valid' : ''
      }))
    } else {
      // Clear error for other fields
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must contain 8+ characters with uppercase, lowercase, number & special character'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create user data object
      const userData = {
        email: formData.email,
        // Add any other user data you want to store
      };

      // Dispatch login action with user data
      dispatch(login(userData));
      console.log('Login dispatched, auth status:', isAuthenticated);

      // Navigation will be handled by useEffect when isAuthenticated changes
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Login failed. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div suppressHydrationWarning>
      <main className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0A] relative">
        {/* Blur Circle */}
        <div className="fixed w-[200px] h-[200px] top-[-27px] left-[-34px] rounded-full bg-[#2EBFA5] blur-[200px]" />

        {/* Image Section - Now shows on both mobile and desktop */}
        <div className="w-full lg:w-1/2 h-[200px] lg:h-screen relative z-10 order-1 lg:order-2">
          <div className="h-full p-4 lg:p-10">
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
              <div className="absolute inset-0 bg-[#2EBFA5]/80 flex flex-col items-center justify-center text-white p-4 lg:p-12 text-center">
                <h2 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">Welcome Back</h2>
                <p className="text-base lg:text-xl">Log in to continue your journey.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 relative z-10 order-2 lg:order-1">
          <div className="h-full p-6 lg:py-16">
            <div className="mx-auto lg:pl-20">
              {/* Logo */}
              <div className="mb-6 lg:mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] bg-gradient-to-r from-[#20A2A0] to-[#2EBFA5] rounded-[9px] flex items-center justify-center">
                    {loginIcon && (
                      <Image
                        src={loginIcon}
                        alt="Teacher with blackboard"
                        className="object-cover object-center"
                        width={30}
                        height={30}
                        priority
                      />
                    )}
                  </div>
                  <span className="text-2xl font-semibold text-white">Tutoria</span>
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-6">
                <h1 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold mb-3 text-white leading-tight">
                  Welcome to Tutoria!
                </h1>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                  Your one-stop platform to explore personalized learning experiences and master new skills at your own pace
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="">
                <div className="space-y-1.5">
                  <label className="block text-[15px] font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 bg-[#1A1A1A] border ${errors.email ? 'border-amber-500' :
                        formData.email && !errors.email ? 'border-green-500' :
                          'border-gray-800'
                      } rounded-xl focus:outline-none focus:border-[#20a2a0] text-white placeholder-gray-500 transition-all`}
                    placeholder="Enter your email address"
                  />
                  <div className="h-5">
                    {errors.email && (
                      <p className="text-sm text-amber-500 mt-1 animate-fadeIn">
                        {errors.email}
                      </p>
                    )}
                    {formData.email && !errors.email && (
                      <p className="text-sm text-green-500 mt-1 animate-fadeIn">
                        ✓ Email is valid
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[15px] font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-3 bg-[#1A1A1A] border ${errors.password ? 'border-amber-500' :
                          formData.password && !errors.password ? 'border-green-500' :
                            'border-gray-800'
                        } rounded-xl focus:outline-none focus:border-[#20a2a0] text-white placeholder-gray-500 transition-all`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
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
                  <div className="h-5">
                    {(errors.password || (formData.password && !errors.password)) && (
                      <p className="text-sm text-amber-500 mt-1 animate-fadeIn">
                        {errors.password || '✓ Password is valid'}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#20A2A0] to-[#2EBFA5] text-black text-[16px] font-semibold p-3.5 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="text-center text-[15px] text-gray-400 mt-4">
                  Not have an account?{' '}
                  <Link href="/auth/signup" className="text-[#2EBFA5] hover:text-[#20A2A0] font-medium">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
