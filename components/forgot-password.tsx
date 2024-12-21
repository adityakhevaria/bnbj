'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setMessage('If an account with that email exists, we sent a password reset link.')
      } else {
        const data = await res.json()
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F5F5]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#F37B0D]">Forgot Password</h1>
          <p className="text-gray-600 mt-2">Enter your email to reset your password.</p>
        </div>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-[#F37B0D] hover:bg-[#E16C00] text-white py-6 text-lg h-auto"
          >
            Reset Password
          </Button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <a href="/login" className="font-medium text-[#F37B0D] hover:text-[#E16C00]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

