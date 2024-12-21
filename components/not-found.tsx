import Link from 'next/link'
import { Button } from "@/components/ui/button"

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
          <Link href="/">
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  )
}

