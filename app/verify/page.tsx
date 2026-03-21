"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Search, CheckCircle, XCircle, Award } from "lucide-react"

export default function VerifyPage() {
  const [uniqueId, setUniqueId] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Mock certificate data
  const mockCertificates = [
    {
      uniqueId: "CN010T020L2V",
      fullName: "Portia Lee",
      courseName: "Human Physiology",
      completionDate: "2024-01-15",
      isValid: true,
    },
    {
      uniqueId: "CN010T010L1V",
      fullName: "Portia Lee",
      courseName: "Counselling Fundamentals",
      completionDate: "2024-02-28",
      isValid: true,
    },
    {
      uniqueId: "CN011T005L3V",
      fullName: "John Smith",
      courseName: "Financial Literacy",
      completionDate: "2024-01-20",
      isValid: true,
    },
  ]

  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = mockCertificates.find((cert) => cert.uniqueId.toLowerCase() === uniqueId.toLowerCase())

    setSearchResult(result || null)
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-card fixed top-0 w-full z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-blue-600">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"
                  alt="Edusanna Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">EDUSANNA</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/login">
                <Button className="premium-button">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Certificate Verification</h1>
            <p className="text-xl text-gray-600">Verify the authenticity of EDUSANNA certificates</p>
          </div>

          {/* Search Form */}
          <Card className="glass-card border-0 shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-center gradient-text">Enter Certificate ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="uniqueId" className="text-gray-700 mb-2 block">
                    Unique ID Number (as shown on certificate)
                  </Label>
                  <Input
                    id="uniqueId"
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="e.g., CN010T020L2V"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={!uniqueId.trim() || isSearching}
                  className="w-full premium-button h-12 text-lg"
                >
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Verify Certificate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {hasSearched && (
            <Card className="glass-card border-0 shadow-2xl">
              <CardContent className="p-8">
                {searchResult ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Certificate Verified ✓</h2>
                    <div className="bg-green-50 rounded-lg p-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-600 text-sm">Certificate Holder</Label>
                          <p className="font-semibold text-gray-800">{searchResult.fullName}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600 text-sm">Course Completed</Label>
                          <p className="font-semibold text-gray-800">{searchResult.courseName}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600 text-sm">Completion Date</Label>
                          <p className="font-semibold text-gray-800">
                            {new Date(searchResult.completionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-gray-600 text-sm">Certificate ID</Label>
                          <p className="font-semibold text-gray-800">{searchResult.uniqueId}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4">This certificate is authentic and was issued by EDUSANNA.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Certificate Not Found</h2>
                    <p className="text-gray-600 mb-6">
                      No certificate found with the ID "{uniqueId}". Please check the ID and try again.
                    </p>
                    <div className="bg-yellow-50 rounded-lg p-4 text-left">
                      <h3 className="font-semibold text-yellow-800 mb-2">Tips:</h3>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Ensure you've entered the complete certificate ID</li>
                        <li>• Check for any typos in the ID</li>
                        <li>• The certificate holder must have completed the course</li>
                        <li>• Contact support if you believe this is an error</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="gradient-text">How to Verify</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Locate the Certificate ID</p>
                    <p className="text-sm">Find the unique ID number on the certificate (e.g., CN010T020L2V)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Enter the ID</p>
                    <p className="text-sm">Type the complete ID exactly as shown on the certificate</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Verify</p>
                    <p className="text-sm">Click verify to check the certificate's authenticity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
