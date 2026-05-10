"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, ArrowLeft, Mail, Lock } from "lucide-react"
import { GoogleSignInButton } from "@/components/auth/google-signin-button"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Use NextAuth signIn for proper authentication
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Authentication failed")
        setIsLoading(false)
        return
      }

      // Redirect based on user role
      if (data.isAdmin) {
        window.location.href = "/admin"
      } else {
        window.location.href = "/dashboard"
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
      console.error("[v0] Login error:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-blue-600">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"
                alt="Edusanna Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-3xl font-bold gradient-text">EDUSANNA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Login Form */}
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl gradient-text">Sign In to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center text-gray-700 mb-2">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full premium-button h-12 text-lg">
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <GoogleSignInButton />

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
