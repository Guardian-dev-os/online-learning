import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      fullName,
      mobileNumber,
      country,
      city,
    } = await request.json()

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, and full name are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Sign up user with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      )
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          email,
          full_name: fullName,
          country,
          city,
          whatsapp_number: mobileNumber,
          is_admin: false,
        },
      ])

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      // Don't fail here - user is created even if profile creation fails
      // They can update it later
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
