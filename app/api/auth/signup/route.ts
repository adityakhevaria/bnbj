/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    console.log('Signup attempt:', email)

    const client = await clientPromise
    const db = client.db("auth_db")

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      console.log('User already exists:', email)
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('Password hashed for:', email)

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword
    })

    console.log('User created:', email, 'with ID:', result.insertedId)

    return NextResponse.json({ message: "User created successfully", userId: result.insertedId }, { status: 201 })
  }  catch (error) {
    console.error('Signup error:', error);
  
    return NextResponse.json(
      { error: "An error occurred while creating the user", details: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Unknown error' },
      { status: 500 }
    )}
}

