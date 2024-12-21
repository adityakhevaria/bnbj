import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Here you would typically fetch repositories from your database
    // For this example, we'll return mock data
    const repositories = [
      { name: 'frontend-project', description: 'React-based frontend for our main application', lastUpdated: '2 hours ago' },
      { name: 'backend-api', description: 'Node.js API for data processing', lastUpdated: '1 day ago' },
      { name: 'mobile-app', description: 'React Native mobile application', lastUpdated: '3 days ago' },
    ]

    return NextResponse.json({ repositories })
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json({ error: 'An error occurred while fetching repositories' }, { status: 500 })
  }
}

