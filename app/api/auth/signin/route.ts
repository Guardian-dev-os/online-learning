import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Sign in user with Supabase Auth
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Failed to sign in" },
        { status: 400 }
      )
    }

    // Check if user is admin by fetching profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .single()

    const isAdmin = profileData?.is_admin === true

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      isAdmin,
    })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
