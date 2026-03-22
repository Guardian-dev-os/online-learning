"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminPricingEditor } from "@/components/admin-pricing-editor"
import {
  BookOpen,
  Users,
  Trophy,
  Search,
  Eye,
  CheckCircle,
  Download,
  GraduationCap,
  Award,
  DollarSign,
  TrendingUp,
  BookText,
  Settings,
  BarChart3,
  HardDrive,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [storageWarning, setStorageWarning] = useState(false)
  const [showPricingEditor, setShowPricingEditor] = useState(false)
  const [inspectingUser, setInspectingUser] = useState<null | { id: string | number; name: string }>(null)
  const [showUserJourney, setShowUserJourney] = useState(false)
  const [showSampleUserPreview, setShowSampleUserPreview] = useState(false)

  // Advanced Statistics
  const stats = {
    totalUsers: 15420,
    activeUsers: 3250,
    activeCourses: 147,
    certificatesIssued: 8950,
    diplomasIssued: 3420,
    totalEnrollments: 12370,
    completionRate: 72.4,
    totalRevenue: 0, // Free platform
    storageUsed: 45, // Percentage
    databaseRecords: 45230,
    pendingCompletions: 23,
  }

  const completionNotifications = [
    {
      id: 1,
      userName: "Samuel Mukonyo",
      userEmail: "samuel.m@example.com",
      country: "Zimbabwe",
      city: "Harare",
      course: "Web Development",
      level: "diploma",
      score: 94,
      startDate: "2024-11-15",
      finishDate: "2025-01-18",
      whatsapp: "+263712345678",
    },
    {
      id: 2,
      userName: "Amara Okafor",
      userEmail: "amara.ok@example.com",
      country: "Nigeria",
      city: "Lagos",
      course: "Digital Marketing",
      level: "certificate",
      score: 88,
      startDate: "2024-12-01",
      finishDate: "2025-01-17",
      whatsapp: "+2347012345678",
    },
    {
      id: 3,
      userName: "Njeri Kamau",
      userEmail: "njeri.k@example.com",
      country: "Kenya",
      city: "Nairobi",
      course: "Data Analysis",
      level: "diploma",
      score: 91,
      startDate: "2024-10-20",
      finishDate: "2025-01-16",
      whatsapp: "+254712345678",
    },
  ]

  const userManagement = [
    {
      id: 1,
      name: "Samuel Mukonyo",
      email: "samuel.m@example.com",
      country: "Zimbabwe",
      role: "student",
      enrollments: 5,
      completions: 2,
      joinDate: "2024-09-15",
      status: "active",
      access: "full",
    },
    {
      id: 2,
      name: "Amara Okafor",
      email: "amara.ok@example.com",
      country: "Nigeria",
      role: "student",
      enrollments: 3,
      completions: 1,
      joinDate: "2024-10-02",
      status: "active",
      access: "full",
    },
  ]

  const feedbackAndRatings = [
    {
      id: 1,
      userName: "Samuel M.",
      course: "Web Development",
      rating: 5,
      feedback: "Excellent course, very comprehensive and well-structured. Instructors are knowledgeable.",
      date: "2025-01-18",
      status: "published",
    },
    {
      id: 2,
      userName: "Amara O.",
      course: "Digital Marketing",
      rating: 4,
      feedback: "Great content but would benefit from more real-world case studies.",
      date: "2025-01-17",
      status: "published",
    },
  ]

  const courseCatalog = [
    // A Courses
    { name: "Accounting Fundamentals", cert: true, dip: true, enrollments: 1250 },
    { name: "Agriculture Management", cert: true, dip: true, enrollments: 890 },
    { name: "Android Development", cert: true, dip: true, enrollments: 650 },
    { name: "Anthropology Studies", cert: true, dip: false, enrollments: 320 },
    { name: "Art Therapy", cert: true, dip: true, enrollments: 420 },
    { name: "Artificial Intelligence Basics", cert: true, dip: true, enrollments: 2100 },
    { name: "Aviation Safety", cert: true, dip: true, enrollments: 280 },
    // B Courses
    { name: "Behavioral Psychology", cert: true, dip: true, enrollments: 750 },
    { name: "Biotechnology", cert: true, dip: true, enrollments: 520 },
    { name: "Blockchain Technology", cert: true, dip: true, enrollments: 980 },
    { name: "Business Management", cert: true, dip: true, enrollments: 1650 },
    { name: "Business Analytics", cert: true, dip: true, enrollments: 890 },
    // C Courses
    { name: "Cloud Computing", cert: true, dip: true, enrollments: 1200 },
    { name: "Cybersecurity", cert: true, dip: true, enrollments: 1450 },
    { name: "Culinary Arts", cert: true, dip: true, enrollments: 680 },
    // D Courses
    { name: "Data Analysis", cert: true, dip: true, enrollments: 1550 },
    { name: "Digital Marketing", cert: true, dip: true, enrollments: 1890 },
    // And more...
  ]

  const filteredCourses = courseCatalog.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = !selectedLevel || (selectedLevel === "cert" && course.cert) || (selectedLevel === "dip" && course.dip)
    return matchesSearch && matchesLevel
  })

  const handleEditUser = (userId: string | number) => {
    alert(`Edit user ${userId} - Form would open here`)
  }

  const handleEditRating = (ratingId: string | number) => {
    alert(`Edit rating ${ratingId} - Rating editor would open here`)
  }

  const handleDeleteRating = (ratingId: string | number) => {
    alert(`Rating ${ratingId} deleted`)
  }

  const handleDownloadReport = () => {
    alert("Downloading comprehensive admin report...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sample User Preview Modal */}
      {showSampleUserPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-4xl p-8 border-purple-300/30 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">👨‍🎓 Preview Student Experience</h2>
              <button onClick={() => setShowSampleUserPreview(false)} className="text-blue-300 hover:text-blue-200 text-2xl">×</button>
            </div>
            <div className="space-y-6 text-white">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-blue-300 mb-4">Student Dashboard View</h3>
                <p className="text-sm text-blue-200 mb-4">This is what students see when they log in and access their dashboard:</p>
                <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                  <div className="text-blue-300 font-semibold mb-3">📚 My Enrollments</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Web Development (Certificate)</span>
                      <span className="text-green-400">In Progress - 65%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-blue-300 mb-4">Learning Journey Stages</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">✓</div>
                    <span>1. Sign up and verify email</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">✓</div>
                    <span>2. Browse and select courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">✓</div>
                    <span>3. Choose Certificate or Diploma level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                    <span>4. Start learning and complete modules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center text-xs font-bold">5</div>
                    <span>5. Take final assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center text-xs font-bold">6</div>
                    <span>6. Request Certificate/Diploma</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-blue-300 mb-4">What Students Can Do</h3>
                <ul className="text-sm space-y-2 text-blue-200">
                  <li>✓ Browse 70+ courses across all categories</li>
                  <li>✓ Choose between Certificate (5-6 modules) and Diploma (8-10 modules) levels</li>
                  <li>✓ Track progress in real-time</li>
                  <li>✓ Complete quizzes and assessments</li>
                  <li>✓ Request and download certificates</li>
                  <li>✓ Verify other users' certificates</li>
                  <li>✓ Access 24/7 support</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Link href="/courses" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Try as Student</Button>
                </Link>
                <Button className="flex-1 bg-gray-600 hover:bg-gray-700" onClick={() => setShowSampleUserPreview(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Header - Premium Glass */}
      <div className="sticky top-0 z-40 glass-card border-b border-blue-200/20 backdrop-blur-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Edusanna Admin Control Center
              </h1>
              <p className="text-sm text-blue-200 mt-1">🛡️ Advanced Platform Management with AI-Powered Insights</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDownloadReport} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Link href="/">
                <Button className="bg-red-500/80 hover:bg-red-600 text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Key Statistics Cards - Premium Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 border-blue-300/30 hover:border-blue-300/50 transition-all hover:shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-300 font-semibold">Total Users</p>
                <p className="text-4xl font-black text-white mt-2">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-blue-300/80 mt-3">↑ {stats.activeUsers} active today</p>
              </div>
              <div className="icon-badge"><Users className="w-6 h-6 text-blue-300" /></div>
            </div>
          </div>

          <div className="glass-card p-6 border-green-300/30 hover:border-green-300/50 transition-all hover:shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-300 font-semibold">Courses Active</p>
                <p className="text-4xl font-black text-white mt-2">{stats.activeCourses}</p>
                <p className="text-xs text-green-300/80 mt-3">Across all levels</p>
              </div>
              <div className="icon-badge"><BookText className="w-6 h-6 text-green-300" /></div>
            </div>
          </div>

          <div className="glass-card p-6 border-purple-300/30 hover:border-purple-300/50 transition-all hover:shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-purple-300 font-semibold">Completion Rate</p>
                <p className="text-4xl font-black text-white mt-2">{stats.completionRate}%</p>
                <p className="text-xs text-purple-300/80 mt-3">Course completion</p>
              </div>
              <div className="icon-badge"><TrendingUp className="w-6 h-6 text-purple-300" /></div>
            </div>
          </div>

          <div className="glass-card p-6 border-amber-300/30 hover:border-amber-300/50 transition-all hover:shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-300 font-semibold">Total Enrollments</p>
                <p className="text-4xl font-black text-white mt-2">{stats.totalEnrollments.toLocaleString()}</p>
                <p className="text-xs text-amber-300/80 mt-3">Certificates + Diplomas</p>
              </div>
              <div className="icon-badge"><Award className="w-6 h-6 text-amber-300" /></div>
            </div>
          </div>
        </div>

        {/* Storage & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-600" />
                Storage Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Database Usage</span>
                    <span className="text-sm text-gray-600">{stats.storageUsed}%</span>
                  </div>
                  <Progress value={stats.storageUsed} className="h-2" />
                </div>
                <p className="text-xs text-gray-600">
                  {stats.databaseRecords.toLocaleString()} records • Free tier compatible
                </p>
                {stats.storageUsed > 80 && (
                  <div className="flex gap-2 items-start p-3 bg-amber-50 rounded border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-amber-700">Monitor storage closely</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Certificates vs Diplomas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Certificates</span>
                    <span className="font-bold">{stats.certificatesIssued.toLocaleString()}</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Diplomas</span>
                    <span className="font-bold">{stats.diplomasIssued.toLocaleString()}</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                  <span className="text-sm font-medium">Course Completions</span>
                  <Badge variant="destructive">{stats.pendingCompletions}</Badge>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Review All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Inspection Modal */}
        {inspectingUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-3xl p-8 border-purple-300/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🔍 Inspecting User Journey</h2>
                <button onClick={() => setInspectingUser(null)} className="text-blue-300 hover:text-blue-200 text-2xl">×</button>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-bold mb-4">User: {inspectingUser.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-white text-sm">
                    <div><span className="text-blue-300">Email:</span> user@example.com</div>
                    <div><span className="text-blue-300">Join Date:</span> Jan 15, 2025</div>
                    <div><span className="text-blue-300">Enrollments:</span> 5</div>
                    <div><span className="text-blue-300">Completions:</span> 2</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-blue-300 font-bold mb-4">📚 Learning Journey</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                      <span className="text-green-400 text-lg">✓</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">Web Development - Diploma</p>
                        <p className="text-blue-300 text-sm">Completed: Jan 18, 2025 | Score: 94%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                      <span className="text-green-400 text-lg">✓</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">Digital Marketing - Certificate</p>
                        <p className="text-blue-300 text-sm">Completed: Jan 17, 2025 | Score: 88%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-lg">⏳</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">Data Analysis - Diploma</p>
                        <p className="text-blue-300 text-sm">In Progress: 65% complete | Last accessed: Today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 lg:grid-cols-7 w-full mb-8 glass-card border-blue-300/20 overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">Overview</TabsTrigger>
            <TabsTrigger value="completions" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">Completions</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">Users</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">Courses</TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">Feedback</TabsTrigger>
            <TabsTrigger value="inspection" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">🔍 Inspect</TabsTrigger>
            <TabsTrigger value="powers" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-300">⚡ Powers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">System Status</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Database: Operational</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Authentication: Active</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Course Engine: Running</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Notifications: Enabled</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-4">⚡ Quick Actions</h3>
                    <div className="space-y-3">
                      <Link href="/admin">
                        <Button className="w-full justify-start bg-blue-600/30 hover:bg-blue-600/50 text-white border border-blue-400/30">
                          <Settings className="w-4 h-4 mr-2" />
                          Platform Settings
                        </Button>
                      </Link>
                      <Button 
                        className="w-full justify-start bg-purple-600/30 hover:bg-purple-600/50 text-white border border-purple-400/30"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Notifications
                      </Button>
                      <Link href="/admin?tab=overview">
                        <Button className="w-full justify-start bg-pink-600/30 hover:bg-pink-600/50 text-white border border-pink-400/30">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </Button>
                      </Link>
                      <Button 
                        className="w-full justify-start bg-amber-600/30 hover:bg-amber-600/50 text-white border border-amber-400/30"
                        onClick={() => setShowPricingEditor(true)}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Edit Pricing
                      </Button>
                      <Button 
                        className="w-full justify-start bg-green-600/30 hover:bg-green-600/50 text-white border border-green-400/30"
                        onClick={() => setShowSampleUserPreview(true)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview as Student
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completions Tab */}
          <TabsContent value="completions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Completions Notifications</CardTitle>
                <p className="text-sm text-gray-600">Users who have recently completed courses</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completionNotifications.map((completion) => (
                    <div key={completion.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{completion.userName}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {completion.userEmail}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {completion.whatsapp}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Location:</span> {completion.city}, {completion.country}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-semibold">Course:</span> {completion.course}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Level:</span>
                            <Badge className="ml-1" variant={completion.level === "diploma" ? "default" : "secondary"}>
                              {completion.level.charAt(0).toUpperCase() + completion.level.slice(1)}
                            </Badge>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Score:</span> {completion.score}%
                          </p>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Started: {completion.startDate}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            Completed: {completion.finishDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-gray-600">Manage user access and view user details</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Email</th>
                        <th className="text-left p-3 font-semibold">Country</th>
                        <th className="text-left p-3 font-semibold">Enrollments</th>
                        <th className="text-left p-3 font-semibold">Completions</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userManagement.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.joinDate}</p>
                          </td>
                          <td className="p-3 text-gray-600">{user.email}</td>
                          <td className="p-3">{user.country}</td>
                          <td className="p-3 font-semibold">{user.enrollments}</td>
                          <td className="p-3 font-semibold text-green-600">{user.completions}</td>
                          <td className="p-3">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user.id)}
                              className="text-xs"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit Access
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Catalog Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">All Levels</option>
                    <option value="cert">Certificates</option>
                    <option value="dip">Diplomas</option>
                  </select>
                </div>

                <div className="space-y-3">
                  {filteredCourses.map((course, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.enrollments.toLocaleString()} enrolled</p>
                      </div>
                      <div className="flex gap-2">
                        {course.cert && <Badge variant="outline">Certificate</Badge>}
                        {course.dip && <Badge>Diploma</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Feedback & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackAndRatings.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">{item.userName}</p>
                          <p className="text-sm text-gray-600">{item.course}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{item.feedback}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRating(item.id)}
                            className="text-xs"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRating(item.id)}
                            className="text-xs text-red-600"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Journey Inspection Tab */}
          <TabsContent value="inspection" className="space-y-6">
            <Card className="glass-card-light border-purple-300/30">
              <CardHeader>
                <CardTitle className="text-white">🔍 User Journey Inspection Tool</CardTitle>
                <p className="text-sm text-blue-300 mt-2">Inspect any user's complete learning journey - view all stages they go through</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Inspection Controls */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Select User to Inspect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input 
                        placeholder="Search by name or email..." 
                        className="bg-white/10 border-white/20 text-white placeholder-white/50"
                      />
                      <select className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2">
                        <option>All Users</option>
                        <option>Active Users</option>
                        <option>Completed Courses</option>
                        <option>In Progress</option>
                      </select>
                      <Button className="premium-button">🔍 Search Users</Button>
                    </div>
                  </div>

                  {/* User List for Inspection */}
                  <div className="space-y-3">
                    {userManagement.map((user) => (
                      <div 
                        key={user.id} 
                        onClick={() => setInspectingUser({ id: user.id, name: user.name })}
                        className="glass-card p-4 border-blue-300/20 hover:border-blue-300/50 cursor-pointer transform hover:scale-102 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-white font-bold">{user.name}</p>
                            <p className="text-blue-300 text-sm">{user.email} • {user.country}</p>
                            <div className="flex gap-3 mt-2 text-xs text-blue-200">
                              <span>📚 {user.enrollments} Enrollments</span>
                              <span>✓ {user.completions} Completed</span>
                              <span>📅 Joined {user.joinDate}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-500/30 text-green-300 mb-2">Active</Badge>
                            <Button size="sm" className="bg-blue-600/50 hover:bg-blue-600 text-white">
                              <Eye className="w-4 h-4 mr-1" />
                              Inspect
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Journey Stages Documentation */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
                    <h3 className="text-white font-bold mb-4">📖 User Journey Stages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="border-l-4 border-blue-400 pl-4">
                        <p className="text-white font-semibold">1. Authentication Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Sign up → Email verification → Profile setup</p>
                      </div>
                      <div className="border-l-4 border-purple-400 pl-4">
                        <p className="text-white font-semibold">2. Discovery Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Browse courses → View details → Filter by level</p>
                      </div>
                      <div className="border-l-4 border-pink-400 pl-4">
                        <p className="text-white font-semibold">3. Enrollment Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Select level → Accept terms → Enroll</p>
                      </div>
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <p className="text-white font-semibold">4. Learning Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Module progress → Quiz completion → Progress tracking</p>
                      </div>
                      <div className="border-l-4 border-green-400 pl-4">
                        <p className="text-white font-semibold">5. Assessment Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Final quiz → Score calculation → Feedback</p>
                      </div>
                      <div className="border-l-4 border-red-400 pl-4">
                        <p className="text-white font-semibold">6. Certification Stage</p>
                        <p className="text-blue-200 text-xs mt-1">Request cert → Verification → Issue certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Powers Tab */}
          <TabsContent value="powers" className="space-y-6">
            <Card className="glass-card-light border-purple-300/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">⚡ Advanced Admin Powers & Capabilities</CardTitle>
                <p className="text-sm text-blue-300 mt-2">Top-tier administrative tools for complete platform control</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Power Categories */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* User Management Powers */}
                    <div className="bg-white/5 border border-blue-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        User Management Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-blue-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>View all user profiles, emails, locations, and metadata</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Edit or delete user accounts and enrollment records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Reset user passwords and verify accounts manually</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Ban or suspend users from platform access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Assign admin roles and manage permissions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Export user data and analytics reports</span>
                        </li>
                      </ul>
                    </div>

                    {/* Course Management Powers */}
                    <div className="bg-white/5 border border-purple-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        Course Management Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-purple-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Create, edit, and publish new courses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Set pricing for certificates and diplomas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Manage course modules, quizzes, and assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Archive or remove courses from catalog</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Track enrollment and completion metrics per course</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Update course content and learning objectives</span>
                        </li>
                      </ul>
                    </div>

                    {/* Certificate Powers */}
                    <div className="bg-white/5 border border-amber-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        Certificate & Credential Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-amber-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Manually issue certificates and diplomas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Revoke or expire credentials if needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Generate certificate verification codes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>View all issued certificates with audit trail</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Customize certificate templates and branding</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Batch download certificate reports</span>
                        </li>
                      </ul>
                    </div>

                    {/* Analytics & Reporting */}
                    <div className="bg-white/5 border border-pink-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-pink-400" />
                        Analytics & Reporting Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-pink-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>View real-time analytics dashboard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Generate custom reports and insights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Track user engagement and learning trends</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Monitor system health and storage usage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Export data in multiple formats (CSV, PDF, Excel)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Set up automated report generation</span>
                        </li>
                      </ul>
                    </div>

                    {/* Content Moderation */}
                    <div className="bg-white/5 border border-red-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        Content Moderation Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-red-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Review and moderate user feedback and ratings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Delete or hide inappropriate content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Flag abusive users and content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Monitor course discussions and comments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Set up content filters and auto-moderation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Generate moderation reports and audit logs</span>
                        </li>
                      </ul>
                    </div>

                    {/* Platform Settings & Configuration */}
                    <div className="bg-white/5 border border-green-300/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-green-400" />
                        Platform Control Powers
                      </h3>
                      <ul className="space-y-3 text-sm text-green-200">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Configure platform-wide settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Manage notification preferences and templates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Set up email campaigns and bulk messages</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Monitor system performance and error logs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Manage integrations and API keys</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>Schedule maintenance and system updates</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Admin Actions */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
                    <h3 className="text-white font-bold mb-4">Quick Admin Actions</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Button className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-white">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Mass Email
                      </Button>
                      <Button className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-white">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Export Analytics
                      </Button>
                      <Button className="bg-amber-600/30 hover:bg-amber-600/50 border border-amber-400/30 text-white">
                        <DollarSign className="w-4 h-4 mr-2" />
                        View Revenue
                      </Button>
                      <Button className="bg-red-600/30 hover:bg-red-600/50 border border-red-400/30 text-white">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        System Alerts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Admin Manual */}
        <div className="glass-card p-8 mt-12 border-blue-300/30">
          <h2 className="text-2xl font-bold text-white mb-6">📘 Admin Dashboard User Manual</h2>
          <div className="text-sm text-blue-200 space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Overview Tab</h4>
              <p>View system status and quick access to platform settings, notifications, and analytics.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Completions Tab</h4>
              <p>Monitor all course completions with full details: user info, location, course, level, score, start/finish dates, and WhatsApp contact.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Users Tab</h4>
              <p>Manage user access controls. Edit user details and permissions. View enrollment and completion statistics per user.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Courses Tab</h4>
              <p>Browse all 147+ courses with certificate and diploma options. Search and filter by course name and level. Track enrollment numbers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Feedback Tab</h4>
              <p>Review user ratings and feedback. Edit or delete ratings as needed. Monitor course quality through user reviews.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🗄️ Storage Monitor</h4>
              <p className="text-blue-200">Track database usage and record counts. Optimized for free tier Supabase. Alerts when storage exceeds 80%.</p>
            </div>
          </div>
        </div>

        {/* Pricing Editor Modal */}
        <AdminPricingEditor isOpen={showPricingEditor} onClose={() => setShowPricingEditor(false)} />
      </div>
    </div>
  )
}
