"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Globe, ArrowRight, Play, CheckCircle, GraduationCap } from "lucide-react"
import { useSecretAdminAccess } from "@/hooks/use-secret-admin-access"
import { SecretAdminModal } from "@/components/secret-admin-modal"
import { platformBenefits, platformFeatures } from "@/lib/seo-content"

export default function HomePage() {
  const {
    showSecretPrompt,
    code1,
    setCode1,
    code2,
    setCode2,
    codeError,
    isVerifying,
    handleLogoTap,
    handleCodeSubmit,
    closePrompt,
  } = useSecretAdminAccess()

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Dual Certification System",
      description: "Choose Certificate or Diploma level for any course you complete",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with learners from Africa and around the world",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Stackable Credentials",
      description: "Start with Certificate, upgrade to Diploma with discount",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessible Anywhere",
      description: "Mobile-first design for learning on any device",
    },
  ]

  const stats = [
    { number: "70+", label: "Courses (A-Z)" },
    { number: "2 Levels", label: "Certificate & Diploma" },
    { number: "FREE", label: "Learning" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <>
      <SecretAdminModal
        isOpen={showSecretPrompt}
        code1={code1}
        code2={code2}
        codeError={codeError}
        isVerifying={isVerifying}
        onCode1Change={setCode1}
        onCode2Change={setCode2}
        onSubmit={handleCodeSubmit}
        onClose={closePrompt}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
        {/* Light glow background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Light ray effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-xl"></div>
          <div className="absolute bottom-40 right-0 w-96 h-1 bg-gradient-to-l from-transparent via-blue-200 to-transparent blur-xl"></div>
        </div>

        {/* Particle effect overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 relative z-10">
              <button
                onClick={handleLogoTap}
                className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition transform hover:scale-105 flex-shrink-0"
                title="Edusanna - Elevate Your Mind"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-lg border-2 border-blue-600">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"
                    alt="Edusanna Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg sm:text-2xl font-bold text-blue-700">EDUSANNA</span>
                  <div className="text-xs text-blue-600 font-medium">Elevate Your Mind</div>
                </div>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <Link href="/login">
                  <Button variant="ghost" className="text-blue-700 hover:text-blue-600 hover:bg-blue-50 text-sm sm:text-base">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

          {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 text-balance mt-4 leading-tight">
              <span className="text-blue-700">Learn Anything.</span>
              <br />
              <span className="text-slate-900">Completely Free.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a free account and access all courses instantly. Learn at your own pace completely for free, track your progress and only pay when you're ready to receive an official, prestigious Certificate ($12) or Diploma ($18).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Browse All Courses
                </Button>
              </Link>
              <Link href="/verify">
                <Button
                  variant="outline"
                  className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100 bg-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all"
                >
                  Verify Certificate
                </Button>
              </Link>
            </div>

            {/* Stats with circular badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-3 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 border-4 border-white shadow-lg flex items-center justify-center text-4xl sm:text-5xl font-bold">
                    {index === 0 && <span className="text-white">📚</span>}
                    {index === 1 && <span className="text-white">🎓</span>}
                    {index === 2 && <span className="text-white">💰</span>}
                    {index === 3 && <span className="text-white">🎧</span>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm sm:text-base text-slate-700 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>

          {/* Platform Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Edusanna Benefits for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, professional, teacher or entrepreneur, Edusanna empowers you with the skills to succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {platformBenefits.map((category) => (
              <div
                key={category.title}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-8 border border-blue-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </section>

          {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose EDUSANNA?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Africa's leading online learning platform with proven excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="course-card text-center border-gray-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {platformFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        </section>

          {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and student-focused</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-600">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Sign Up Free</h3>
              <p className="text-gray-600">
                Create your account in seconds. No credit card required. Access all courses immediately.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Learn & Progress</h3>
              <p className="text-gray-600">
                Study as many courses as you want. Your progress is automatically saved across all devices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-600">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Certified</h3>
              <p className="text-gray-600">
                When ready, purchase your Certificate ($12) or Diploma ($18) to prove your achievement.
              </p>
            </div>
          </div>
        </div>
        </section>

          {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-gray-200 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Transform Your Life?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our community of learners and start your journey to personal and professional excellence today.
              </p>
              <Link href="/signup">
                <Button className="premium-button text-lg px-10 py-4">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-blue-50 to-white border-t border-blue-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">About Edusanna</h3>
              <p className="text-sm text-slate-600">
                Africa's premier online learning platform offering 70+ courses with certificate and diploma options.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">For Students</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/courses" className="text-blue-600 hover:text-blue-700 transition font-medium">
                    Browse Courses
                  </Link>
                </li>
                <li>
                  <Link href="/user-guide" className="text-blue-600 hover:text-blue-700 transition font-medium">
                    How to Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="text-blue-600 hover:text-blue-700 transition font-medium">
                    Verify Certificate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/user-guide" className="text-blue-600 hover:text-blue-700 transition font-medium">
                    Student Guide
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="text-blue-600 hover:text-blue-700 transition font-medium">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">Support</h3>
              <p className="text-sm text-slate-600">Email: support@edusanna.com</p>
              <p className="text-sm text-slate-600">Available 24/7</p>
              <p className="text-xs text-slate-500 mt-2">Response time: &lt; 2 hours</p>
            </div>
          </div>
          <div className="border-t border-blue-200 mt-8 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2025 Edusanna. All rights reserved. | Empowering learners across Africa and beyond</p>
          </div>
        </footer>
      </div>
    </>
  )
}
