import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("auth_db")
    
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)

    return NextResponse.json({ 
      message: "Successfully connected to MongoDB",
      collections: collectionNames
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 })
  }
}

