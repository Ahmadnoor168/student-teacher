'use client'


import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import loginImage from '@/assets/images/otppage.png'
import tick from '@/assets/images/tick.png'
import Image from 'next/image'



export default function OTPVerification() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const signupData = JSON.parse(localStorage.getItem('signupData') || '{}')

    if (!signupData.email) {
      router.replace('/auth/signup')
    }
    setUserEmail(signupData.email)

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle pasting of full OTP
    if (value.length > 1) {
      const otpArray = value.split('').slice(0, 6);
      setOtp(otpArray.concat(Array(6 - otpArray.length).fill('')));
      return;
    }

    // Handle single digit input
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter all digits')
      return
    }

    setLoading(true)
    try {
      // Verify OTP logic here
      await new Promise(resolve => setTimeout(resolve, 1500))
      localStorage.removeItem('signupData')
      router.push('/auth/login')
    } catch (error) {
      setError('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (timer > 0) return
    setTimer(30)
    // Implement resend logic here
  }


  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0A]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-6 lg:py-12 bg-[#0A0A0A] flex flex-col justify-center">
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
            <h1 className="text-3xl font-bold mb-3 text-white">Verify Your Identity</h1>
            <p className="text-gray-400 text-base leading-relaxed">
            Enter the 6-digit OTP sent to your registered email to verify your account.</p>
          </div>

          {/* Updated Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
  <label htmlFor="otp" className="text-white font-semibold">OTP Code</label>
  <div className="flex gap-2 justify-center">
    {otp.map((digit, index) => (
      <input
        key={index}
        id={`otp-${index}`}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className="w-12 h-12 text-center bg-[#2A2A2A] border border-gray-800 rounded-xl text-white text-xl font-bold focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        autoComplete="off"
      />
    ))}
  </div>
</div>


          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.some(digit => !digit)}
            className="w-full bg-teal-400 text-black font-semibold py-3 rounded-xl hover:bg-teal-300 transition-all duration-200 disabled:opacity-90 cursor-pointer text-white"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0}
              className="text-teal-400 hover:text-teal-300 disabled:text-gray-500 cursor-pointer"
            >
              Resend Code {timer > 0 ? `(${timer}s)` : ''}
            </button>
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
                
                className="object-cover object-bottom "
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              )}
              
              <div className="absolute inset-0  flex flex-col items-center justify-center text-white p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Identity Verification</h2>
                <p className="text-xl">Verify your OTP to continue</p>
                {tick && (
                <Image
                src={tick}
                alt="Tick"
                width={200}
                height={200}
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