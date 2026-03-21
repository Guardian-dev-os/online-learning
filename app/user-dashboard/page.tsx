'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Clock, Target, Award, TrendingUp, LogOut, Settings, ArrowRight } from 'lucide-react';

const motivationalMessages = [
  "Keep pushing! You're doing amazing!",
  "Every step forward is progress. Keep learning!",
  "Your dedication is inspiring. Stay focused!",
  "You're building a brighter future. Keep going!",
  "Excellence is not a destination, it's a journey. Continue!",
  "Your success story is being written right now!",
  "Invest in yourself - the best investment ever!",
  "From knowledge comes power. Keep learning!",
];

export default function UserDashboard() {
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    // Show random motivational message
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setMotivationIndex(randomIndex);
    setShowMotivation(true);

    const timer = setTimeout(() => setShowMotivation(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const enrolledCourses = [
    {
      id: 1,
      name: 'Web Development Diploma',
      progress: 65,
      completedModules: 13,
      totalModules: 20,
      level: 'diploma',
      enrollDate: '2024-12-01',
      status: 'in-progress',
    },
    {
      id: 2,
      name: 'Digital Marketing Certificate',
      progress: 100,
      completedModules: 10,
      totalModules: 10,
      level: 'certificate',
      enrollDate: '2024-11-15',
      status: 'completed',
      score: 88,
    },
    {
      id: 3,
      name: 'Data Analysis Diploma',
      progress: 40,
      completedModules: 4,
      totalModules: 10,
      level: 'diploma',
      enrollDate: '2025-01-01',
      status: 'in-progress',
    },
  ];

  const certificates = [
    {
      id: 1,
      courseName: 'Digital Marketing Fundamentals',
      level: 'Certificate',
      issueDate: '2025-01-18',
      certificateId: 'CERT-2025-001',
    },
  ];

  const stats = {
    totalEnrolled: 3,
    coursesCompleted: 1,
    certificatesEarned: 1,
    learningStreak: 15, // days
    totalHours: 42,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <div className="w-8 h-8 rounded-full overflow-hidden shadow-md border-2 border-blue-600">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jan%2022%2C%202026%2C%2012_21_21%20AM-WKqkdSRv1DtoghNmzkCDSdNQKXoMsG.png"
                  alt="Edusanna Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">Edusanna</span>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Motivational Pop-up */}
      {showMotivation && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <Card className="border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <p className="text-blue-900 font-semibold">
                {motivationalMessages[motivationIndex]}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Learner!</h1>
          <p className="text-gray-600">Continue your learning journey and unlock your potential with Edusanna</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrolled}</p>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.coursesCompleted}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.certificatesEarned}</p>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.learningStreak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                <p className="text-sm text-gray-600">Total Learning</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{course.name}</CardTitle>
                        <Badge className={course.level === 'diploma' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                          {course.level === 'diploma' ? 'Diploma' : 'Certificate'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {course.completedModules} of {course.totalModules} modules completed
                      </p>
                    </div>
                    {course.status === 'completed' && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{course.score}%</p>
                        <p className="text-xs text-gray-600">Score</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-600">Enrolled: {course.enrollDate}</span>
                      {course.status === 'in-progress' ? (
                        <Link href="/course-learn">
                          <Button size="sm">
                            Continue Learning
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <Card key={cert.id} className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-amber-600" />
                          {cert.courseName}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-2">
                          Certificate ID: {cert.certificateId}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Issued: {cert.issueDate}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No certificates earned yet. Complete a course to earn your certificate!</p>
                  <Link href="/courses">
                    <Button className="mt-4">Explore Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
