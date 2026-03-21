"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, GraduationCap, Award, Clock, Filter, ArrowRight, ArrowLeft } from "lucide-react"
import { courseCatalog, getAllLetters, courseCategories } from "@/lib/course-catalog"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const letters = getAllLetters()

  const filteredCourses = courseCatalog.filter((course) => {
    const matchesSearch =
      course.certificateTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.diplomaTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLetter = !selectedLetter || course.letter === selectedLetter
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    return matchesSearch && matchesLetter && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-card fixed top-0 w-full z-50 border-b border-blue-300/20 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition transform hover:scale-105">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-blue-400 glow-blue">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"
                    alt="Edusanna Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold gradient-text">EDUSANNA</span>
              </Link>
              <Link href="/" className="flex items-center space-x-1 text-blue-300 hover:text-blue-200 font-medium transition">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/verify">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hidden sm:flex">
                  Verify Certificate
                </Button>
              </Link>
              <Link href="/login">
                <Button className="premium-button">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">Complete A-Z Course Catalog</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn for free. Pay only when you're ready for official certification. Choose between Certificate or Diploma
            programs across all professional fields.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 glass-card p-3 rounded-xl border-gray-200">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Certificate</span>
              <Badge className="bg-blue-100 text-blue-700">Foundation</Badge>
            </div>
            <div className="flex items-center gap-2 glass-card p-3 rounded-xl border-gray-200">
              <Award className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-700">Diploma</span>
              <Badge className="bg-gray-100 text-gray-700">Advanced</Badge>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-4 rounded-xl border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Filter by Letter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedLetter(null)}
                variant={selectedLetter === null ? "default" : "outline"}
                className={selectedLetter === null ? "premium-button" : "border-gray-300"}
                size="sm"
              >
                All
              </Button>
              {letters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  variant={selectedLetter === letter ? "default" : "outline"}
                  className={selectedLetter === letter ? "premium-button" : "border-gray-300"}
                  size="sm"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-4 rounded-xl border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "premium-button" : "border-gray-300"}
                size="sm"
              >
                All Categories
              </Button>
              {courseCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={selectedCategory === category.id ? "premium-button" : "border-gray-300"}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-gray-600">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="course-card group border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-700 text-xs">{course.letter}</Badge>
                    <Badge variant="outline" className="text-xs border-gray-300">
                      {courseCategories.find((c) => c.id === course.category)?.name || course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-800 leading-tight mb-4">{course.certificateTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50/50 hover:border-blue-400 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">Certificate</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      5-6 modules
                    </div>
                    <Link href={`/course/${course.id}/certificate`}>
                      <Button className="w-full premium-button" size="sm">
                        View Certificate
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-gray-300 bg-gray-50/50 hover:border-gray-400 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-gray-700" />
                        <span className="font-semibold text-gray-800">Diploma</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{course.diplomaTitle}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      8-10 modules
                    </div>
                    <Link href={`/course/${course.id}/diploma`}>
                      <Button variant="outline" className="w-full bg-white border-gray-300" size="sm">
                        View Diploma
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
