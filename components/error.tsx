'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Something went wrong!</h2>
        <p className="mt-2 text-gray-600">An error occurred while loading this page.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button 
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}

