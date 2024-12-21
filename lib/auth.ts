import jwt from 'jsonwebtoken'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function verifyToken(token: string): Promise<string | null> {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err)
        resolve(null)
      } else {
        resolve((decoded as any).userId)
      }
    })
  })
}

