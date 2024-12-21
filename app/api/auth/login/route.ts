import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    console.log('Login attempt:', email)

    const client = await clientPromise
    const db = client.db("auth_db")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    console.log('User found:', JSON.stringify(user, null, 2))
    console.log('Stored hashed password:', user.password)
    console.log('Provided password:', password)

    const isMatch = await bcrypt.compare(password, user.password)
    console.log('Password match:', isMatch)

    if (!isMatch) {
      console.log('Invalid password for:', email)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    console.log('Login successful:', email)

    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: "An error occurred while logging in" }, { status: 500 })
  }
}

