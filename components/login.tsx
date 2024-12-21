'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [isEmailLogin, setIsEmailLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token)
        router.push('/repository')
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Stats */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 p-4 relative">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <Image
            src="/codeantai.jpg"
            alt="CodeAnt AI Watermark"
            width={600}
            height={600}
            className="opacity-10 object-contain"
          />
        </div>
        <div className="relative z-10 w-full max-w-sm mx-auto mt-20">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/codeantai.jpg"
                    alt="CodeAnt AI"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <span className="text-sm font-medium">AI to Detect & Autofix Bad Code</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-lg font-bold">30+</div>
                    <div className="text-xs text-gray-500">Language Support</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">10K+</div>
                    <div className="text-xs text-gray-500">Developers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">100K+</div>
                    <div className="text-xs text-gray-500">Hours Saved</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-600">Issues Fixed</div>
                  <div className="bg-purple-100 rounded-full p-1.5">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">500K+</div>
                <div className="text-xs text-green-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  14% This week
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="flex-1 flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-sm shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2">
                <Image
                  src="/codeantai.jpg"
                  alt="CodeAnt AI"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
                <span className="text-lg font-semibold">CodeAnt AI</span>
              </div>
              <h1 className="text-xl font-semibold">Welcome to CodeAnt AI</h1>
            </div>

            <Card className="border shadow-sm">
              <CardContent className="p-1">
                <div className="flex gap-1">
                  <Button 
                    variant={!isEmailLogin ? "default" : "ghost"}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 h-8 text-sm"
                    onClick={() => setIsEmailLogin(false)}
                  >
                    SAAS
                  </Button>
                  <Button 
                    variant={isEmailLogin ? "default" : "ghost"}
                    className="flex-1 h-8 text-sm"
                    onClick={() => setIsEmailLogin(true)}
                  >
                    Self Hosted
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isEmailLogin ? (
              <form onSubmit={handleLogin} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-9"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-9" disabled={loading}>
                  Sign in
                </Button>
              </form>
            ) : (
              <div className="space-y-2">
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <Button variant="ghost" className="w-full h-9 justify-start px-3 text-sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Sign in with Github
                  </Button>
                </Card>
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <Button variant="ghost" className="w-full h-9 justify-start px-3 text-sm">
                    <svg className="w-4 h-4 mr-2 text-blue-400" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M2.65 15.5V8.5L12 12l9.35-3.5v7l-9.35 3.5L2.65 15.5z"/>
                      <path fill="currentColor" d="M12 22L2.65 18.5V8.5L12 12v10z"/>
                      <path fill="currentColor" d="M12 22l9.35-3.5V8.5L12 12v10z"/>
                      <path fill="currentColor" d="M12 2L2.65 5.5l9.35 3.5 9.35-3.5L12 2z"/>
                    </svg>
                    Sign in with Bitbucket
                  </Button>
                </Card>
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <Button variant="ghost" className="w-full h-9 justify-start px-3 text-sm">
                    <svg className="w-4 h-4 mr-2 text-blue-600" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z"/>
                    </svg>
                    Sign in with Azure DevOps
                  </Button>
                </Card>
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <Button variant="ghost" className="w-full h-9 justify-start px-3 text-sm">
                    <svg className="w-4 h-4 mr-2 text-orange-500" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.45.045 13.587a.924.924 0 00.331 1.023L12 23.054l11.624-8.443a.92.92 0 00.331-1.024"/>
                    </svg>
                    Sign in with GitLab
                  </Button>
                </Card>
              </div>
            )}

            <div className="space-y-2 text-center">
              <p className="text-xs text-gray-500">
                By signing up you agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
              <p className="text-xs">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

