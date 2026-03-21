"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CourseFeedback } from "@/components/course-feedback"
import { CertificateRequestModal } from "@/components/certificate-request-modal"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Award,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react"
import { courseCatalog } from "@/lib/course-catalog"
import { getCourseModules } from "@/lib/course-data-loader"
import { getCourseSkills } from "@/lib/course-skills"

// Edusanna logo URL
const EDUSANNA_LOGO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"

export default function LearnPage({ params }: { params: { courseId: string; level: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [expandedModule, setExpandedModule] = useState<number | null>(1)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState<Record<string, number>>({})
  const [showQuizResults, setShowQuizResults] = useState<Record<number, boolean>>({})
  const [quizScores, setQuizScores] = useState<Record<number, number>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [courseScore, setCourseScore] = useState(0)

  const course = courseCatalog.find((c) => c.id === params.courseId)
  const level = params.level as "certificate" | "diploma"
  const isCertificate = level === "certificate"
  const title = isCertificate ? course?.certificateTitle : course?.diplomaTitle
  
  // Get course modules from our data loader
  const modules = getCourseModules(params.courseId, level)
  
  // Calculate progress
  const completionPercentage = Math.round((completedModules.length / modules.length) * 100)

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/course/${params.courseId}/${level}`)
    }
  }, [status, router, params.courseId, level])

  const handleModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId]
      setCompletedModules(newCompleted)
      
      // Calculate average score
      const scores = Object.values(quizScores)
      const avgScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 85
      setCourseScore(avgScore)

      // Check if all modules completed
      if (newCompleted.length === modules.length) {
        setTimeout(() => {
          setShowFeedback(true)
        }, 1000)
      } else {
        // Expand next module
        const nextModule = moduleId + 1
        if (nextModule <= modules.length) {
          setExpandedModule(nextModule)
        }
      }
    }
  }

  const handleQuizSubmit = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId)
    if (!module?.quiz) return

    let correct = 0
    module.quiz.forEach((q) => {
      const answer = currentQuizAnswers[`${moduleId}-${q.id}`]
      if (answer === q.correctAnswer) correct++
    })

    const score = Math.round((correct / module.quiz.length) * 100)
    setQuizScores({ ...quizScores, [moduleId]: score })
    setShowQuizResults({ ...showQuizResults, [moduleId]: true })
  }

  const handleCertificateRequest = async (selectedLevel: "certificate" | "diploma") => {
    try {
      const response = await fetch(`/api/request-${selectedLevel}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.email || "user-123",
          courseId: params.courseId,
          courseName: title,
          score: courseScore,
          userName: session?.user?.name || "Student Name",
          phoneNumber: "+1234567890",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to request certificate")
      }
    } catch (error) {
      console.error("[Certificate Error]", error)
      throw error
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="text-lg text-gray-600">Course not found</p>
          <Link href="/courses">
            <Button className="mt-4">Browse Courses</Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="glass-card fixed top-0 w-full z-50 border-b border-white/10 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href={`/course/${params.courseId}/${level}`} className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Course Overview</span>
              </Link>
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-blue-600">
                <img
                  src={EDUSANNA_LOGO}
                  alt="Edusanna Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold gradient-text hidden sm:inline">EDUSANNA</span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className={isCertificate ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}>
                {level.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Course Header */}
          <Card className="glass-card mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl md:text-3xl gradient-text mb-2">{title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{modules.length} modules</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Relatively Appealing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold gradient-text">{completionPercentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3 mt-4" />
              <p className="text-sm text-gray-600 mt-2">
                {completedModules.length} of {modules.length} modules completed
              </p>
            </CardHeader>
          </Card>

          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Course Modules
            </h2>

            {modules.map((module, index) => {
              const isCompleted = completedModules.includes(module.id)
              const isLocked = index > 0 && !completedModules.includes(modules[index - 1].id) && !completedModules.includes(module.id)
              const isExpanded = expandedModule === module.id
              const canExpand = !isLocked || isCompleted

              return (
                <Card
                  key={module.id}
                  className={`border-2 transition-all ${
                    isCompleted
                      ? "border-green-300 bg-green-50"
                      : isLocked
                      ? "border-gray-200 bg-gray-50 opacity-60"
                      : isExpanded
                      ? "border-purple-400 bg-white shadow-lg"
                      : "border-gray-200 hover:border-purple-300 bg-white"
                  }`}
                >
                  {/* Module Header */}
                  <button
                    onClick={() => canExpand && setExpandedModule(isExpanded ? null : module.id)}
                    className="w-full text-left"
                    disabled={isLocked && !isCompleted}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                          ) : isLocked ? (
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <Play className="w-5 h-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              Module {module.id}: {module.title}
                            </h3>
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-700">Completed</Badge>
                            )}
                            {quizScores[module.id] && (
                              <Badge className={quizScores[module.id] >= 70 ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}>
                                Score: {quizScores[module.id]}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {canExpand && (
                            isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            )
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </button>

                  {/* Module Content */}
                  {isExpanded && canExpand && (
                    <CardContent className="border-t border-gray-200 pt-6">
                      {/* Content */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          Module Content
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-6 text-gray-700 leading-relaxed">
                          {module.content}
                        </div>
                      </div>

                      {/* Quiz Section */}
                      {module.quiz && module.quiz.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            Module Quiz
                          </h4>
                          <div className="space-y-4">
                            {module.quiz.map((question, qIdx) => (
                              <div key={question.id} className="bg-purple-50 rounded-lg p-4">
                                <p className="font-medium text-gray-900 mb-3">
                                  Q{qIdx + 1}: {question.question}
                                </p>
                                <div className="space-y-2">
                                  {question.options.map((option, optIdx) => {
                                    const answerKey = `${module.id}-${question.id}`
                                    const isSelected = currentQuizAnswers[answerKey] === optIdx
                                    const showResult = showQuizResults[module.id]
                                    const isCorrect = optIdx === question.correctAnswer
                                    
                                    return (
                                      <label
                                        key={optIdx}
                                        className={`flex items-center gap-3 p-3 rounded cursor-pointer transition ${
                                          showResult
                                            ? isCorrect
                                              ? "bg-green-100 border-green-300"
                                              : isSelected
                                              ? "bg-red-100 border-red-300"
                                              : "bg-white"
                                            : isSelected
                                            ? "bg-purple-100 border-purple-300"
                                            : "bg-white hover:bg-purple-100"
                                        } border`}
                                      >
                                        <input
                                          type="radio"
                                          name={answerKey}
                                          value={optIdx}
                                          checked={isSelected}
                                          onChange={() => setCurrentQuizAnswers({
                                            ...currentQuizAnswers,
                                            [answerKey]: optIdx
                                          })}
                                          disabled={showResult}
                                          className="w-4 h-4"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                        {showResult && isCorrect && (
                                          <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                        )}
                                      </label>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>

                          {!showQuizResults[module.id] && (
                            <Button 
                              onClick={() => handleQuizSubmit(module.id)}
                              className="mt-4 premium-button"
                            >
                              Submit Quiz
                            </Button>
                          )}

                          {showQuizResults[module.id] && (
                            <div className={`mt-4 p-4 rounded-lg ${quizScores[module.id] >= 70 ? "bg-green-100" : "bg-yellow-100"}`}>
                              <p className="font-semibold">
                                {quizScores[module.id] >= 70 
                                  ? `Excellent! You scored ${quizScores[module.id]}%`
                                  : `You scored ${quizScores[module.id]}%. Review the material and try again.`}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Complete Button */}
                      <Button
                        onClick={() => handleModuleComplete(module.id)}
                        disabled={isCompleted || (module.quiz && !showQuizResults[module.id])}
                        className={`w-full ${
                          isCompleted 
                            ? "bg-green-600" 
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Module Completed
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            {module.quiz && !showQuizResults[module.id] 
                              ? "Complete Quiz First" 
                              : "Mark as Complete & Continue"}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Completion Message */}
          {completedModules.length === modules.length && (
            <Card className="mt-8 border-2 border-green-400 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h2>
                <p className="text-green-700 mb-4">
                  You have completed the {title} {level}! Your average score is {courseScore}%.
                </p>
                <Button 
                  onClick={() => setShowCertificateModal(true)}
                  className="premium-button"
                >
                  Request Your {level === "certificate" ? "Certificate" : "Diploma"}
                </Button>
              </CardContent>
            </Card>
          )}

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
      </div>
    </div>
  )
}
