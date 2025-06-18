// src/app/api/test-vercel/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.VERCEL_TOKEN) {
      return NextResponse.json(
        {
          error: 'VERCEL_TOKEN not configured',
          success: false,
        },
        { status: 400 }
      )
    }

    // Test the Vercel API connection
    const response = await axios.get('https://api.vercel.com/v2/user', {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })

    return NextResponse.json({
      success: true,
      message: 'Vercel token is valid',
      user: {
        id: response.data.user?.id,
        username: response.data.user?.username,
        email: response.data.user?.email,
      },
    })
  } catch (error) {
    console.error('Vercel token test failed:', error)

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vercel API error',
          details: {
            status: error.response?.status,
            message: error.response?.data?.error?.message || error.message,
          },
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Unknown error testing Vercel token',
      },
      { status: 500 }
    )
  }
}
