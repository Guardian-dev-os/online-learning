"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MotivationalPopup } from "@/components/motivational-popup"
import {
  BookOpen,
  LogOut,
  Trophy,
  Clock,
  Play,
  CheckCircle,
  Star,
  Calendar,
  GraduationCap,
  Award,
  TrendingUp,
  ArrowRight,
  Target,
  Zap,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    joinDate: "2024-01-15",
    completedCertificates: 2,
    completedDiplomas: 1,
    inProgressCourses: 2,
    totalHours: 65,
    avgScore: 4.8,
  }

  const enrolledCourses = [
    {
      id: "accounting-cert",
      title: "Accounting Fundamentals",
      diplomaTitle: "Accounting Professional",
      level: "certificate",
      category: "Finance & Accounting",
      progress: 75,
      currentModule: 4,
      totalModules: 5,
      lastAccessed: "2024-01-20",
      status: "in-progress",
      timeSpent: 12,
      nextDeadline: "2024-02-01",
      price: 12,
      hasDiploma: true,
      diplomaId: "accounting-dip",
    },
    {
      id: "web-dev-cert",
      title: "Web Development",
      diplomaTitle: "Full Stack Development",
      level: "certificate",
      category: "IT & Technology",
      progress: 100,
      currentModule: 6,
      totalModules: 6,
      lastAccessed: "2024-01-18",
      status: "completed",
      timeSpent: 18,
      completionDate: "2024-01-18",
      certificateId: "CN011T005L3V",
      price: 12,
      hasDiploma: true,
      diplomaId: "web-dev-dip",
      canUpgrade: true,
    },
    {
      id: "web-dev-dip",
      title: "Full Stack Development",
      level: "diploma",
      category: "IT & Technology",
      progress: 40,
      currentModule: 3,
      totalModules: 8,
      lastAccessed: "2024-01-19",
      status: "in-progress",
      timeSpent: 15,
      nextDeadline: "2024-02-15",
      price: 18,
      prerequisite: "Web Development Certificate",
    },
    {
      id: "marketing-dip",
      title: "Strategic Marketing",
      level: "diploma",
      category: "Business & Leadership",
      progress: 100,
      currentModule: 10,
      totalModules: 10,
      lastAccessed: "2024-01-10",
      status: "completed",
      timeSpent: 20,
      completionDate: "2024-01-10",
      certificateId: "CN012T008L4V",
      price: 18,
      finalGrade: "distinction",
    },
  ]

  const inProgressCourses = enrolledCourses.filter((course) => course.status === "in-progress")
  const completedCourses = enrolledCourses.filter((course) => course.status === "completed")
  const certificateCourses = enrolledCourses.filter((c) => c.level === "certificate")
  const diplomaCourses = enrolledCourses.filter((c) => c.level === "diploma")

  const upgradeOpportunities = completedCourses.filter((c) => c.level === "certificate" && c.canUpgrade)

  return (
    <div className="min-h-screen">
      {/* Motivational Popup */}
      <MotivationalPopup />

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
              <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Welcome back, {user.fullName.split(" ")[0]}!</h1>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{user.completedCertificates}</div>
                  <div className="text-gray-600 text-xs">Certificates</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Award className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{user.completedDiplomas}</div>
                  <div className="text-gray-600 text-xs">Diplomas</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{user.inProgressCourses}</div>
                  <div className="text-gray-600 text-xs">In Progress</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{user.totalHours}h</div>
                  <div className="text-gray-600 text-xs">Learning Time</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xl font-bold gradient-text">{user.avgScore}</div>
                  <div className="text-gray-600 text-xs">Avg. Score</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "overview" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "journey" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Learning Journey
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "in-progress"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              In Progress ({inProgressCourses.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "completed" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Completed ({completedCourses.length})
            </button>
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Upgrade Opportunities */}
                {upgradeOpportunities.length > 0 && (
                  <Card className="glass-card border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-purple-600" />
                        <CardTitle className="gradient-text">Upgrade to Diploma</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Congratulations! You've completed certificates that can be upgraded to Diploma programs.
                      </p>
                      <div className="space-y-3">
                        {upgradeOpportunities.map((course) => (
                          <div
                            key={course.id}
                            className="p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800 mb-1">{course.title}</div>
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm text-green-600">Certificate Completed</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                  <TrendingUp className="w-4 h-4 text-blue-600" />
                                  <span>Upgrade to: {course.diplomaTitle}</span>
                                </div>
                              </div>
                              <Badge className="bg-blue-600 text-white">$18</Badge>
                            </div>
                            <Link href={`/course/${course.diplomaId}/diploma`}>
                              <Button className="w-full premium-button mt-2">
                                Upgrade Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <h2 className="text-2xl font-bold gradient-text">Continue Learning</h2>
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <Card key={course.id} className="course-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                              <Badge
                                className={
                                  course.level === "certificate"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }
                              >
                                {course.level}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{course.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold gradient-text">{course.progress}%</div>
                            <div className="text-gray-600 text-sm">Complete</div>
                          </div>
                        </div>

                        <Progress value={course.progress} className="mb-4" />

                        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                          <span>
                            Module {course.currentModule} of {course.totalModules}
                          </span>
                          <span>{course.timeSpent} hours spent</span>
                        </div>

                        <Link href={`/course/${course.id}`}>
                          <Button className="w-full premium-button">
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="gradient-text">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {completedCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          {course.level === "certificate" ? (
                            <GraduationCap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          ) : (
                            <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm">{course.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={
                                  course.level === "certificate"
                                    ? "bg-purple-100 text-purple-700 text-xs"
                                    : "bg-blue-100 text-blue-700 text-xs"
                                }
                              >
                                {course.level}
                              </Badge>
                              {course.finalGrade && (
                                <Badge className="bg-yellow-100 text-yellow-700 text-xs">{course.finalGrade}</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs mt-1">
                              {new Date(course.completionDate!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="gradient-text">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/courses">
                      <Button variant="outline" className="w-full bg-transparent">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse All Courses
                      </Button>
                    </Link>
                    <Link href="/verify">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Award className="w-4 h-4 mr-2" />
                        Verify Certificate
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "journey" && (
            <div className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="gradient-text">Your Learning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Track your progression from Certificate to Diploma programs. Complete foundations, then advance to
                    professional mastery.
                  </p>

                  <div className="space-y-8">
                    {/* Group courses by subject */}
                    {Array.from(
                      new Set(
                        enrolledCourses.filter((c) => c.level === "certificate").map((c) => c.title.split(" ")[0]),
                      ),
                    ).map((subject) => {
                      const cert = enrolledCourses.find((c) => c.level === "certificate" && c.title.startsWith(subject))
                      const dip = enrolledCourses.find((c) => c.level === "diploma" && cert && c.id === cert.diplomaId)

                      return (
                        <div key={subject} className="relative">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Certificate */}
                            <div className="relative">
                              <Card
                                className={`${
                                  cert?.status === "completed"
                                    ? "border-2 border-green-300 bg-green-50/50"
                                    : cert?.status === "in-progress"
                                      ? "border-2 border-purple-300 bg-purple-50/50"
                                      : "border-2 border-gray-200"
                                }`}
                              >
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                      <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <Badge className="bg-purple-100 text-purple-700 mb-1">Certificate</Badge>
                                      <div className="text-sm text-gray-600">Foundation Level</div>
                                    </div>
                                  </div>

                                  <h3 className="text-lg font-bold text-gray-800 mb-2">{cert?.title}</h3>
                                  <div className="text-sm text-gray-600 mb-4">{cert?.category}</div>

                                  {cert ? (
                                    <>
                                      <Progress value={cert.progress} className="mb-3" />
                                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                                        <span>{cert.progress}% Complete</span>
                                        <span>
                                          {cert.currentModule}/{cert.totalModules} modules
                                        </span>
                                      </div>

                                      {cert.status === "completed" ? (
                                        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 mb-3">
                                          <div className="flex items-center gap-2 text-green-700">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="font-semibold">Certificate Earned!</span>
                                          </div>
                                          <div className="text-xs text-green-600 mt-1">
                                            Completed {new Date(cert.completionDate!).toLocaleDateString()}
                                          </div>
                                        </div>
                                      ) : (
                                        <Link href={`/course/${cert.id}`}>
                                          <Button className="w-full premium-button mb-3">
                                            <Play className="w-4 h-4 mr-2" />
                                            Continue Course
                                          </Button>
                                        </Link>
                                      )}

                                      <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {cert.timeSpent} hours • ${cert.price}
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="outline" className="w-full bg-transparent">
                                      View Course
                                    </Button>
                                  )}
                                </CardContent>
                              </Card>

                              {/* Arrow */}
                              <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                                <div className="w-16 h-16 flex items-center justify-center">
                                  <ArrowRight className="w-8 h-8 text-purple-600" />
                                </div>
                              </div>
                            </div>

                            {/* Diploma */}
                            <div className="relative">
                              <Card
                                className={`${
                                  dip?.status === "completed"
                                    ? "border-2 border-green-300 bg-green-50/50"
                                    : dip?.status === "in-progress"
                                      ? "border-2 border-blue-300 bg-blue-50/50"
                                      : !dip && cert?.status === "completed"
                                        ? "border-2 border-blue-300 bg-blue-50/30"
                                        : "border-2 border-gray-200 opacity-50"
                                }`}
                              >
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                      <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <Badge className="bg-blue-100 text-blue-700 mb-1">Diploma</Badge>
                                      <div className="text-sm text-gray-600">Advanced Level</div>
                                    </div>
                                  </div>

                                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {dip?.title || cert?.diplomaTitle || "Advanced Program"}
                                  </h3>
                                  <div className="text-sm text-gray-600 mb-4">{dip?.category || cert?.category}</div>

                                  {dip ? (
                                    <>
                                      <Progress value={dip.progress} className="mb-3" />
                                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                                        <span>{dip.progress}% Complete</span>
                                        <span>
                                          {dip.currentModule}/{dip.totalModules} modules
                                        </span>
                                      </div>

                                      {dip.status === "completed" ? (
                                        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 mb-3">
                                          <div className="flex items-center gap-2 text-green-700">
                                            <Trophy className="w-5 h-5" />
                                            <span className="font-semibold">Diploma Earned!</span>
                                          </div>
                                          {dip.finalGrade && (
                                            <div className="text-xs text-green-600 mt-1">
                                              Grade: {dip.finalGrade.toUpperCase()}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <Link href={`/course/${dip.id}`}>
                                          <Button className="w-full premium-button mb-3">
                                            <Play className="w-4 h-4 mr-2" />
                                            Continue Course
                                          </Button>
                                        </Link>
                                      )}

                                      <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {dip.timeSpent} hours • ${dip.price}
                                      </div>
                                    </>
                                  ) : cert?.status === "completed" && cert.canUpgrade ? (
                                    <>
                                      <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-3 mb-4">
                                        <div className="flex items-center gap-2 text-purple-700 mb-2">
                                          <TrendingUp className="w-5 h-5" />
                                          <span className="font-semibold">Ready to Upgrade!</span>
                                        </div>
                                        <div className="text-xs text-purple-600">
                                          You've completed the certificate. Advance to diploma level.
                                        </div>
                                      </div>
                                      <Link href={`/course/${cert.diplomaId}/diploma`}>
                                        <Button className="w-full premium-button mb-3">
                                          <TrendingUp className="w-4 h-4 mr-2" />
                                          Upgrade to Diploma
                                        </Button>
                                      </Link>
                                      <div className="text-xs text-gray-500">8-10 modules • $18</div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-3 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                          <Target className="w-5 h-5" />
                                          <span className="font-semibold text-sm">Locked</span>
                                        </div>
                                        <div className="text-xs text-gray-500">Complete the certificate first</div>
                                      </div>
                                      <Button variant="outline" className="w-full bg-transparent" disabled>
                                        Not Available Yet
                                      </Button>
                                    </>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "in-progress" && (
            <div className="grid md:grid-cols-2 gap-6">
              {inProgressCourses.map((course) => (
                <Card key={course.id} className="course-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                          <Badge
                            className={
                              course.level === "certificate"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{course.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">{course.progress}%</div>
                      </div>
                    </div>

                    <Progress value={course.progress} className="mb-4" />

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Progress:</span>
                        <span>
                          Module {course.currentModule} of {course.totalModules}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Spent:</span>
                        <span>{course.timeSpent} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Accessed:</span>
                        <span>{new Date(course.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      {course.nextDeadline && (
                        <div className="flex justify-between">
                          <span>Next Deadline:</span>
                          <span className="text-orange-600">{new Date(course.nextDeadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/course/${course.id}`}>
                      <Button className="w-full premium-button">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "completed" && (
            <div className="grid md:grid-cols-2 gap-6">
              {completedCourses.map((course) => (
                <Card key={course.id} className="course-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                          <Badge
                            className={
                              course.level === "certificate"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{course.category}</p>
                      </div>
                      {course.level === "certificate" ? (
                        <GraduationCap className="w-8 h-8 text-purple-600" />
                      ) : (
                        <Award className="w-8 h-8 text-blue-600" />
                      )}
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                        <span className="font-semibold text-green-800">
                          {course.level === "certificate" ? "Certificate" : "Diploma"} Earned!
                        </span>
                      </div>
                      <div className="text-center text-green-700 text-sm">
                        100% • {course.totalModules} modules • {course.timeSpent} hours
                        {course.finalGrade && ` • ${course.finalGrade}`}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span>{new Date(course.completionDate!).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificate ID:</span>
                        <span className="font-mono text-xs">{course.certificateId}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/course/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Review Course
                        </Button>
                      </Link>
                      <Button className="premium-button px-4">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
