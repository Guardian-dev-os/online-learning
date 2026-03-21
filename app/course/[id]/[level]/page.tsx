"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CourseLearningModule } from "@/components/course-learning-module"
import { CourseFeedback } from "@/components/course-feedback"
import { CertificateRequestModal } from "@/components/certificate-request-modal"
import { AuthGuardPrompt } from "@/components/auth-guard-prompt"
import { SkillsShowcase } from "@/components/course/skills-showcase"
import {
  ArrowLeft,
  Play,
  Clock,
  Star,
  CheckCircle,
  Lock,
  Award,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  BookOpen,
} from "lucide-react"
import { courseCatalog } from "@/lib/course-catalog"
import { getCourseSkills } from "@/lib/course-skills"

// Edusanna logo URL
const EDUSANNA_LOGO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"

export default function CoursePage({ params }: { params: { id: string; level: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [courseScore, setCourseScore] = useState(92)

  const course = courseCatalog.find((c) => c.id === params.id)
  const level = params.level as "certificate" | "diploma"
  const isCertificate = level === "certificate"
  const moduleCount = isCertificate ? "5-6" : "8-10"
  const title = isCertificate ? course?.certificateTitle : course?.diplomaTitle
  
  // Get course-specific skills
  const courseSkills = getCourseSkills(params.id, title)

  const handleStartLearning = () => {
    if (status === "loading") return
    
    if (!session) {
      // User not logged in - show auth prompt
      setShowAuthPrompt(true)
    } else {
      // User is logged in - redirect to learning page
      router.push(`/learn/${params.id}/${level}`)
    }
  }

  const handleCertificateRequest = async (selectedLevel: "certificate" | "diploma") => {
    try {
      const response = await fetch(`/api/request-${selectedLevel}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.email || "user-123",
          courseId: params.id,
          courseName: title,
          score: courseScore,
          userName: session?.user?.name || "Student Name",
          phoneNumber: "+1234567890",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to request certificate")
      }

      const data = await response.json()
      console.log("[Certificate Requested]", data)
    } catch (error) {
      console.error("[Certificate Error]", error)
      throw error
    }
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Auth Prompt Modal */}
      <AuthGuardPrompt 
        isOpen={showAuthPrompt} 
        onClose={() => setShowAuthPrompt(false)}
        title="Start Learning Today"
        description="Create an account or sign in to enroll in this course and track your progress."
      />

      {/* Navigation */}
      <nav className="glass-card fixed top-0 w-full z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/courses" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-blue-600">
                <img
                  src={EDUSANNA_LOGO}
                  alt="Edusanna Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">EDUSANNA</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              <Card className="glass-card mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={isCertificate ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}>
                      {level.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{course.letter}</Badge>
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-3xl gradient-text mb-2">{title}</CardTitle>
                      <div className="flex items-center space-x-4 text-gray-600 mt-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Relatively Appealing
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {moduleCount} modules
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          4.8
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {isCertificate
                      ? `Master the foundational skills and knowledge in ${title}. Perfect for beginners or professionals looking to establish core competencies.`
                      : `Advanced ${course.certificateTitle} program with in-depth training, real-world projects, and industry case studies. Includes all Certificate content plus advanced modules.`}
                  </p>

                  {isCertificate && (
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-800">Upgrade Path Available</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Complete this Certificate and upgrade to the Diploma program with a special discount
                      </p>
                      <Link href={`/course/${course.id}/diploma`}>
                        <Button variant="outline" size="sm">
                          View Diploma Program
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}

                  {!isCertificate && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">Prerequisite</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Certificate in {course.certificateTitle} OR equivalent professional experience recommended
                      </p>
                    </div>
                  )}
                </CardHeader>
              </Card>

              {/* Skills Showcase - Course-specific skills */}
              <SkillsShowcase 
                skills={courseSkills.map(s => s.name)} 
                courseTitle={title || course.certificateTitle} 
              />

              <Card className="glass-card mb-8">
                <CardHeader>
                  <CardTitle className="gradient-text">
                    {isCertificate ? "Certificate" : "Diploma"} Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isCertificate ? (
                      <>
                        <ModuleItem number={1} title="Foundations & Core Concepts" locked={false} />
                        <ModuleItem number={2} title="Practical Applications" locked={false} />
                        <ModuleItem number={3} title="Hands-On Practice" locked={false} />
                        <ModuleItem number={4} title="Case Studies" locked={false} />
                        <ModuleItem number={5} title="Assessment & Certification" locked={false} />
                      </>
                    ) : (
                      <>
                        <ModuleItem number={1} title="Advanced Theory & Concepts" locked={false} />
                        <ModuleItem number={2} title="Specialized Applications" locked={false} />
                        <ModuleItem number={3} title="Industry Case Studies" locked={false} />
                        <ModuleItem number={4} title="Research & Analysis" locked={false} />
                        <ModuleItem number={5} title="Professional Project" locked={false} />
                        <ModuleItem number={6} title="Advanced Techniques" locked={false} />
                        <ModuleItem number={7} title="Real-World Implementation" locked={false} />
                        <ModuleItem number={8} title="Capstone Assessment" locked={false} />
                      </>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-yellow-600" />
                      <span className="font-semibold text-gray-800">Final Assessment</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {isCertificate
                        ? "Complete 5 exercises and 1 comprehensive exam to earn your Certificate"
                        : "Complete 8 exercises, 2 projects, and 1 comprehensive exam. Graded as Distinction, Merit, or Pass"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="gradient-text">What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {courseSkills.map((skill, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-gray-800 font-medium">{skill.name}</span>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <div className="text-center">
                    {isCertificate ? (
                      <GraduationCap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    ) : (
                      <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    )}
                    <CardTitle className="gradient-text mb-2">Enroll Now</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isEnrolled ? (
                    <Button 
                      className="w-full premium-button text-lg py-6" 
                      onClick={handleStartLearning}
                      disabled={status === "loading"}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Learning
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" 
                      disabled
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Enrolled - Continue Learning
                    </Button>
                  )}

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-800">Relatively Appealing</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Modules:</span>
                      <span className="font-semibold text-gray-800">{moduleCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-semibold text-gray-800 capitalize">{level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Certificate:</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  {showPayment && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Payment Options</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <span className="mr-2">💳</span> PayPal
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <span className="mr-2">🏦</span> Bank Transfer (ZB Bank USD)
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        Secure payment processing. Certificate issued upon completion.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      {isCertificate ? "Ready for advanced training?" : "Prefer to start with basics?"}
                    </p>
                    <Link href={`/course/${course.id}/${isCertificate ? "diploma" : "certificate"}`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        View {isCertificate ? "Diploma" : "Certificate"} Program
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learning Interface - Shows after enrollment */}
          {isEnrolled && (
            <div className="mt-16">
              <CourseLearningModule
                modules={[
                  {
                    id: "1",
                    title: "Module 1: Foundations & Core Concepts",
                    description: "Learn the fundamental concepts and principles",
                    duration: "2 hours",
                    content: "Comprehensive video lessons and reading materials",
                    quiz: [
                      {
                        id: "q1",
                        question: "What is the primary focus of this module?",
                        options: ["Option A", "Option B", "Option C", "Option D"],
                        correctAnswer: 0,
                      },
                    ],
                  },
                  {
                    id: "2",
                    title: "Module 2: Practical Applications",
                    description: "Apply concepts to real-world scenarios",
                    duration: "3 hours",
                    content: "Hands-on exercises and practical examples",
                  },
                  {
                    id: "3",
                    title: "Module 3: Assessment",
                    description: "Test your knowledge",
                    duration: "1 hour",
                    content: "Final assessment and certification exam",
                  },
                ]}
                courseLevel={level}
                courseName={title || course.certificateTitle}
                onModuleComplete={(moduleId) => {
                  setCompletedModules([...completedModules, moduleId])
                }}
                onCourseComplete={() => {
                  setShowFeedback(true)
                }}
              />

              {/* Feedback Section */}
              {showFeedback && (
                <div className="mt-8">
                  <CourseFeedback
                    courseLevel={level}
                    courseName={title || course.certificateTitle}
                    onSubmit={() => {
                      setShowFeedback(false)
                      setTimeout(() => setShowCertificateModal(true), 500)
                    }}
                  />
                </div>
              )}

              {/* Certificate Request Modal */}
              <CertificateRequestModal
                isOpen={showCertificateModal}
                courseName={title || course.certificateTitle}
                level={level}
                score={courseScore}
                price={isCertificate ? 12 : 18}
                onClose={() => setShowCertificateModal(false)}
                onConfirm={handleCertificateRequest}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ModuleItem({ number, title, locked }: { number: number; title: string; locked: boolean }) {
  return (
    <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200">
      <div className="flex-shrink-0 mr-3">
        {locked ? (
          <Lock className="w-5 h-5 text-gray-400" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm">
            {number}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-800">{title}</div>
      </div>
    </div>
  )
}
