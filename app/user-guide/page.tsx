"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, BookOpen, Users, Award, Mail, Download, HelpCircle } from "lucide-react"

export default function UserGuidePage() {
  const stages = [
    {
      number: 1,
      title: "Create Your Free Account",
      description: "Sign up with your email address in just 2 minutes",
      steps: [
        "Click 'Get Started' button on the home page",
        "Enter your email and create a strong password",
        "Verify your email by clicking the link sent to your inbox",
        "Complete your profile with name and country",
        "You're all set!"
      ],
      icon: "📝"
    },
    {
      number: 2,
      title: "Browse & Explore Courses",
      description: "Discover 70+ courses available in Certificate and Diploma levels",
      steps: [
        "Go to 'Browse All Courses' from the home page",
        "Filter courses by category or search by name",
        "Click on any course to view details",
        "Read course description, modules, and learning outcomes",
        "Check both Certificate and Diploma level options"
      ],
      icon: "🔍"
    },
    {
      number: 3,
      title: "Select Your Learning Level",
      description: "Choose between Certificate (5-6 modules) or Diploma (8-10 modules)",
      steps: [
        "Open your chosen course",
        "Click 'Learn Certificate' for the 5-6 module program",
        "OR click 'Learn Diploma' for the comprehensive 8-10 module program",
        "Review the course syllabus and learning objectives",
        "You can always upgrade from Certificate to Diploma later"
      ],
      icon: "🎯"
    },
    {
      number: 4,
      title: "Start Learning",
      description: "Begin your learning journey with engaging course content",
      steps: [
        "Click 'Start Learning' button when you're ready",
        "You'll be taken to your personalized learning dashboard",
        "Access the first module immediately",
        "Learn at your own pace - no deadlines!",
        "Track your progress in real-time"
      ],
      icon: "📚"
    },
    {
      number: 5,
      title: "Complete Modules & Take Quizzes",
      description: "Work through each module and test your knowledge",
      steps: [
        "Read each module's content carefully",
        "Take notes and practice the concepts",
        "Mark module as complete when finished",
        "Take the module quiz to reinforce learning",
        "Repeat for all modules in your chosen level"
      ],
      icon: "✍️"
    },
    {
      number: 6,
      title: "Take the Final Assessment",
      description: "Complete the comprehensive final quiz to demonstrate mastery",
      steps: [
        "After completing all modules, access the final assessment",
        "Answer all questions to the best of your ability",
        "Your score is calculated immediately",
        "You need 70% or higher to pass",
        "View detailed feedback on your performance"
      ],
      icon: "🎓"
    },
    {
      number: 7,
      title: "Request Your Certificate or Diploma",
      description: "Get your official Edusanna credential upon successful completion",
      steps: [
        "Click 'Request Certificate' or 'Request Diploma' button",
        "Your score must be 70% or higher to qualify",
        "Complete verification process (may include identity check)",
        "Pay the certificate fee ($12) or diploma fee ($18) if you want the credential",
        "Your certificate will be issued and available for download within 24-48 hours"
      ],
      icon: "🏆"
    },
    {
      number: 8,
      title: "Download & Share Your Certificate",
      description: "Get your official credential and share your achievement",
      steps: [
        "Go to your Dashboard → My Certificates section",
        "Click 'Download' next to your certificate",
        "Save the PDF to your device",
        "Share on LinkedIn, email to employers, or print it",
        "Use your certificate code to verify it at our verification page"
      ],
      icon: "📥"
    }
  ]

  const faqs = [
    {
      q: "Is Edusanna really free?",
      a: "Yes! All courses and learning materials are completely free. You only pay ($12 for Certificate, $18 for Diploma) if you want to receive an official credential after completion."
    },
    {
      q: "Do I need any prerequisites to start?",
      a: "No! Our courses are designed for beginners. Most courses start from the basics and progress to advanced topics. You just need internet access and dedication."
    },
    {
      q: "Can I switch from Certificate to Diploma?",
      a: "Yes! You can upgrade from Certificate to Diploma at any time. We offer discounts for upgrades, so you won't pay the full price twice."
    },
    {
      q: "What's the difference between Certificate and Diploma?",
      a: "Certificate: 5-6 modules covering core concepts (Foundation level). Diploma: 8-10 modules with advanced topics and deeper expertise (Advanced level). Both are recognized credentials."
    },
    {
      q: "How long does each course take?",
      a: "It depends on your pace! Most students complete a Certificate course in 4-8 weeks (studying 5-10 hours/week) and a Diploma in 8-12 weeks. There are no deadlines - learn at your own speed."
    },
    {
      q: "Can I get a refund after paying for a certificate?",
      a: "Yes! We offer a 7-day money-back guarantee. If you're not satisfied, contact support@edusanna.com for a full refund."
    },
    {
      q: "How can I verify someone's certificate?",
      a: "Go to 'Verify Certificate' on our home page, enter the certificate code, and you'll see the recipient's name, course, level, and issue date."
    },
    {
      q: "What if I'm stuck on a module?",
      a: "We offer 24/7 support! Email support@edusanna.com or use our in-app chat. Our team typically responds within a few hours."
    },
    {
      q: "Can I download course materials?",
      a: "Yes! All course materials, notes, and resources are available for download so you can learn offline."
    },
    {
      q: "Is my data and progress secure?",
      a: "Absolutely! We use industry-standard encryption and security measures. Your personal data and learning progress are fully protected."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold text-blue-700">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-700">Student Guide</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">How to Get Started with Edusanna</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            This guide walks you through every step of your learning journey, from signing up to getting your official certificate or diploma.
          </p>
        </div>

        {/* Learning Journey Stages */}
        <div className="space-y-8 mb-16">
          {stages.map((stage) => (
            <Card key={stage.number} className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{stage.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                        {stage.number}
                      </div>
                      <CardTitle className="text-xl text-slate-900">{stage.title}</CardTitle>
                    </div>
                    <p className="text-sm text-slate-600">{stage.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ol className="space-y-3">
                  {stage.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features Highlight */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Recognized Credentials</h3>
              <p className="text-sm text-slate-600">Your certificates and diplomas are verifiable and recognized by employers worldwide.</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Supportive Community</h3>
              <p className="text-sm text-slate-600">Connect with thousands of learners from Africa and around the world pursuing their goals.</p>
            </CardContent>
          </Card>
          <Card className="border-pink-200 bg-pink-50">
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 text-pink-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Learn Your Way</h3>
              <p className="text-sm text-slate-600">Study at your own pace with no deadlines. Fit learning around your busy schedule.</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="border border-blue-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                <summary className="font-semibold text-slate-900 cursor-pointer flex items-center gap-2">
                  <span className="text-blue-600">+</span> {faq.q}
                </summary>
                <p className="text-slate-600 mt-4 ml-6">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="mb-4">Our support team is available 24/7 to help you with any questions or technical issues.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                    Email: support@edusanna.com
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Learning?</h2>
          <Link href="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg font-semibold">
              Browse All Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
