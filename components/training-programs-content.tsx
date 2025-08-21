"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Users, Star, Search, Play, FileText, CheckCircle, User } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  topic: string
  rating: number
  students: number
  progress?: number
  thumbnail: string
  schedule: string
  lessons: number
  isEnrolled?: boolean
}

const courses: Course[] = [
  {
    id: "1",
    title: "React Advanced Patterns",
    instructor: "Dr. Sarah Smith",
    description: "Master advanced React patterns including hooks, context, and performance optimization techniques.",
    duration: "8 weeks",
    difficulty: "Advanced",
    topic: "Frontend Development",
    rating: 4.9,
    students: 1234,
    progress: 75,
    thumbnail: "/react-advanced-patterns.png",
    schedule: "Mon, Wed, Fri - 2:00 PM",
    lessons: 24,
    isEnrolled: true,
  },
  {
    id: "2",
    title: "System Design Fundamentals",
    instructor: "Prof. Michael Chen",
    description: "Learn to design scalable systems from scratch. Cover load balancing, databases, and microservices.",
    duration: "6 weeks",
    difficulty: "Intermediate",
    topic: "System Design",
    rating: 4.8,
    students: 987,
    progress: 45,
    thumbnail: "/system-design-architecture.png",
    schedule: "Tue, Thu - 3:00 PM",
    lessons: 18,
    isEnrolled: true,
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Emily Johnson",
    description: "Comprehensive coverage of essential data structures and algorithms for technical interviews.",
    duration: "10 weeks",
    difficulty: "Intermediate",
    topic: "Computer Science",
    rating: 4.9,
    students: 2156,
    thumbnail: "/data-structures-algorithms-visualization.png",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    lessons: 30,
  },
  {
    id: "4",
    title: "Behavioral Interview Mastery",
    instructor: "Jane Williams",
    description: "Master the art of behavioral interviews with proven frameworks and real-world examples.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topic: "Interview Skills",
    rating: 4.7,
    students: 543,
    thumbnail: "/professional-interview-prep.png",
    schedule: "Sat - 11:00 AM",
    lessons: 9,
  },
  {
    id: "5",
    title: "Full-Stack Web Development",
    instructor: "Alex Rodriguez",
    description: "Build complete web applications using modern technologies like Next.js, Node.js, and databases.",
    duration: "12 weeks",
    difficulty: "Intermediate",
    topic: "Full-Stack Development",
    rating: 4.8,
    students: 1876,
    thumbnail: "/full-stack-coding.png",
    schedule: "Tue, Thu, Sat - 1:00 PM",
    lessons: 36,
  },
  {
    id: "6",
    title: "Machine Learning Basics",
    instructor: "Dr. Lisa Park",
    description: "Introduction to machine learning concepts, algorithms, and practical applications.",
    duration: "8 weeks",
    difficulty: "Beginner",
    topic: "Machine Learning",
    rating: 4.6,
    students: 765,
    thumbnail: "/placeholder-94msm.png",
    schedule: "Wed, Fri - 4:00 PM",
    lessons: 24,
  },
]

export function TrainingProgramsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const topics = ["all", ...Array.from(new Set(courses.map((course) => course.topic)))]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === "all" || course.topic === selectedTopic
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesTopic && matchesDifficulty
  })

  if (selectedCourse) {
    return <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Training Programs</h1>
        <p className="text-muted-foreground mt-2">Enhance your skills with our comprehensive training courses</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic === "all" ? "All Topics" : topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {course.isEnrolled && <Badge className="absolute top-2 right-2 bg-primary">Enrolled</Badge>}
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <User className="w-3 h-3" />
                    {course.instructor}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {course.lessons} lessons
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  <Badge
                    variant={
                      course.difficulty === "Beginner"
                        ? "secondary"
                        : course.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {course.difficulty}
                  </Badge>
                </div>

                {course.isEnrolled && course.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    variant={course.isEnrolled ? "outline" : "default"}
                    onClick={() => setSelectedCourse(course)}
                  >
                    {course.isEnrolled ? "Continue" : "Enroll Now"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setSelectedCourse(course)}>
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all available courses.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface CourseDetailViewProps {
  course: Course
  onBack: () => void
}

function CourseDetailView({ course, onBack }: CourseDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const lessons = [
    { id: 1, title: "Introduction to Advanced Patterns", duration: "15 min", completed: true, type: "video" },
    { id: 2, title: "Custom Hooks Deep Dive", duration: "25 min", completed: true, type: "video" },
    { id: 3, title: "Context API Best Practices", duration: "20 min", completed: true, type: "video" },
    { id: 4, title: "Performance Optimization Quiz", duration: "10 min", completed: false, type: "quiz" },
    { id: 5, title: "Render Props Pattern", duration: "30 min", completed: false, type: "video" },
    { id: 6, title: "Higher-Order Components", duration: "22 min", completed: false, type: "video" },
  ]

  const discussions = [
    {
      id: 1,
      author: "John Doe",
      title: "Question about useCallback optimization",
      replies: 5,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "Sarah Wilson",
      title: "Sharing my custom hook implementation",
      replies: 12,
      time: "1 day ago",
    },
    {
      id: 3,
      author: "Mike Johnson",
      title: "Performance testing results",
      replies: 8,
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Courses
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground">by {course.instructor}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Video/Image */}
          <Card>
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <div className="flex gap-4 border-b">
                {["overview", "lessons", "discussions"].map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className={`capitalize ${activeTab === tab ? "border-b-2 border-primary" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Course Description</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What You'll Learn</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Advanced React patterns and best practices
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Performance optimization techniques
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Custom hooks development
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Context API and state management
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "lessons" && (
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          lesson.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : lesson.type === "video" ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                      </div>
                      <Badge variant={lesson.type === "video" ? "default" : "secondary"}>{lesson.type}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "discussions" && (
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">{discussion.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline">
                    Start New Discussion
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lessons</span>
                <span className="font-medium">{course.lessons}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <Badge
                  variant={
                    course.difficulty === "Beginner"
                      ? "secondary"
                      : course.difficulty === "Intermediate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {course.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Schedule</span>
                <span className="font-medium text-sm">{course.schedule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Students</span>
                <span className="font-medium">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>

              {course.isEnrolled && course.progress !== undefined && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Your Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <Button className="w-full" size="lg">
                {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">{course.instructor}</h4>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Experienced developer with 10+ years in React and frontend technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
