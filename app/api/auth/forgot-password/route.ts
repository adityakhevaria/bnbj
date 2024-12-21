import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'
import { sendResetPasswordEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const client = await clientPromise
    const db = client.db("auth_db")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken, resetTokenExpiry } }
    )

    await sendResetPasswordEmail(email, resetToken)

    return NextResponse.json({ message: "Password reset email sent" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

