'use client'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import HumanVerification from './components/human-verification'
// import Login from './components/login'
// import Signup from './components/signup'
// import Repository from './components/repository'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/repository')
    } else {
      router.push('/login')
    }
  }, [router])

  return null
}

