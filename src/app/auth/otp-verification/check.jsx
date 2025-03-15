'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OTPVerification() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // const signupData = JSON.parse(localStorage.getItem('signupData') || '{}')

    // if (!signupData.email) {
    //   router.replace('/auth/signup')
    // }
    // setUserEmail(signupData.email)

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
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
        <p className="text-gray-400 mb-6">
          We've sent a verification code to<br />
          <span className="text-white">{userEmail}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 justify-between">
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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.some(digit => !digit)}
            className="w-full bg-teal-400 text-black font-semibold py-3 rounded-xl hover:bg-teal-300 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0}
              className="text-teal-400 hover:text-teal-300 disabled:text-gray-500"
            >
              Resend Code {timer > 0 ? `(${timer}s)` : ''}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
