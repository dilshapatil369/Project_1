"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Video,
  CalendarIcon,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Download,
  Target,
  Brain,
  MessageSquare,
} from "lucide-react"
import { format } from "date-fns"

interface InterviewSession {
  id: string
  type: "behavioral" | "technical" | "case-study" | "general"
  duration: number
  scheduledDate?: Date
  status: "scheduled" | "completed" | "in-progress"
  score?: number
  feedback?: {
    overall: string
    strengths: string[]
    improvements: string[]
    detailedScores: {
      communication: number
      technical: number
      problemSolving: number
      confidence: number
    }
  }
}

interface Question {
  id: string
  text: string
  type: "behavioral" | "technical" | "case-study"
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number
  category: string
}

const mockSessions: InterviewSession[] = [
  {
    id: "1",
    type: "behavioral",
    duration: 30,
    status: "completed",
    score: 85,
    feedback: {
      overall: "Strong performance with clear examples and good structure using the STAR method.",
      strengths: ["Clear communication", "Relevant examples", "Good use of STAR method"],
      improvements: ["More specific metrics", "Stronger closing statements"],
      detailedScores: {
        communication: 90,
        technical: 0,
        problemSolving: 80,
        confidence: 85,
      },
    },
  },
  {
    id: "2",
    type: "technical",
    duration: 45,
    status: "completed",
    score: 72,
    feedback: {
      overall: "Good technical knowledge but could improve explanation clarity and problem-solving approach.",
      strengths: ["Solid technical foundation", "Correct final solution"],
      improvements: ["Explain thought process more clearly", "Consider edge cases", "Optimize time complexity"],
      detailedScores: {
        communication: 65,
        technical: 85,
        problemSolving: 70,
        confidence: 68,
      },
    },
  },
  {
    id: "3",
    type: "general",
    duration: 60,
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: "scheduled",
  },
]

const sampleQuestions: Question[] = [
  {
    id: "1",
    text: "Tell me about a time when you had to work with a difficult team member.",
    type: "behavioral",
    difficulty: "medium",
    timeLimit: 180,
    category: "Teamwork",
  },
  {
    id: "2",
    text: "Implement a function to reverse a linked list.",
    type: "technical",
    difficulty: "medium",
    timeLimit: 300,
    category: "Data Structures",
  },
  {
    id: "3",
    text: "How would you design a URL shortening service like bit.ly?",
    type: "case-study",
    difficulty: "hard",
    timeLimit: 600,
    category: "System Design",
  },
]

export function InterviewPracticeTools() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(180)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-chart-1 text-white"
      case "medium":
        return "bg-chart-4 text-white"
      case "hard":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Interview Practice Tools</h1>
        <p className="text-muted-foreground mt-2">
          Practice and perfect your interview skills with AI-powered feedback
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-chart-1" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-chart-2" />
              <div>
                <p className="text-2xl font-bold">78</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-chart-3" />
              <div>
                <p className="text-2xl font-bold">8.5</p>
                <p className="text-sm text-muted-foreground">Hours Practiced</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-chart-4" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Session</TabsTrigger>
          <TabsTrigger value="practice">Live Practice</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start Practice</CardTitle>
                <CardDescription>Jump into a practice session immediately</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    className="h-auto p-4 justify-start gap-4 bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("practice")}
                  >
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Behavioral Interview</div>
                      <div className="text-sm text-muted-foreground">Practice STAR method responses</div>
                    </div>
                  </Button>
                  <Button
                    className="h-auto p-4 justify-start gap-4 bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("practice")}
                  >
                    <Brain className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Technical Interview</div>
                      <div className="text-sm text-muted-foreground">Coding and problem-solving</div>
                    </div>
                  </Button>
                  <Button
                    className="h-auto p-4 justify-start gap-4 bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("practice")}
                  >
                    <Target className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Case Study</div>
                      <div className="text-sm text-muted-foreground">System design and analysis</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
                <CardDescription>Your latest interview practice scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSessions
                    .filter((session) => session.status === "completed")
                    .slice(0, 3)
                    .map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              session.score! >= 80
                                ? "bg-chart-1 text-white"
                                : session.score! >= 60
                                  ? "bg-chart-4 text-white"
                                  : "bg-destructive text-destructive-foreground"
                            }`}
                          >
                            {session.score}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{session.type} Interview</p>
                            <p className="text-sm text-muted-foreground">{session.duration} minutes</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled interview practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSessions
                  .filter((session) => session.status === "scheduled")
                  .map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium capitalize">{session.type} Interview Practice</p>
                          <p className="text-sm text-muted-foreground">
                            {session.scheduledDate && format(session.scheduledDate, "PPP 'at' p")} • {session.duration}{" "}
                            minutes
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Session</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Session Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Session</CardTitle>
                <CardDescription>Book a practice interview session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interview Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                        <SelectItem value="technical">Technical Interview</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                        <SelectItem value="general">General Interview</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Focus Areas</label>
                    <div className="flex flex-wrap gap-2">
                      {["Communication", "Problem Solving", "Technical Skills", "Leadership", "Teamwork"].map(
                        (area) => (
                          <Badge
                            key={area}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {area}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <Button className="w-full">Schedule Session</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Types</CardTitle>
                <CardDescription>Choose the right practice format for your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Behavioral Interview</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Practice answering questions about your experience using the STAR method.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      15-45 minutes
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Technical Interview</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Solve coding problems and explain your thought process.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      30-60 minutes
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Case Study</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Work through business problems and system design challenges.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      45-60 minutes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          {!isInterviewActive ? (
            <Card>
              <CardHeader>
                <CardTitle>Start Practice Session</CardTitle>
                <CardDescription>Configure your practice session settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Interview Type</label>
                      <Select defaultValue="behavioral">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                          <SelectItem value="technical">Technical Interview</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Number of Questions</label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Questions</SelectItem>
                          <SelectItem value="5">5 Questions</SelectItem>
                          <SelectItem value="10">10 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCameraEnabled(!cameraEnabled)}
                        className={cameraEnabled ? "bg-primary text-primary-foreground" : ""}
                      >
                        {cameraEnabled ? <Camera className="w-4 h-4 mr-2" /> : <CameraOff className="w-4 h-4 mr-2" />}
                        Camera
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMicEnabled(!micEnabled)}
                        className={micEnabled ? "bg-primary text-primary-foreground" : ""}
                      >
                        {micEnabled ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                        Microphone
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-6 text-center">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">Camera preview will appear here</p>
                    <p className="text-xs text-muted-foreground">
                      Make sure you have good lighting and a quiet environment
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => setIsInterviewActive(true)}>
                  <Play className="w-5 h-5 mr-2" />
                  Start Practice Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Interview Interface */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Question {currentQuestion + 1} of 5</CardTitle>
                      <CardDescription>Behavioral Interview Practice</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-mono">{formatTime(timeRemaining)}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsRecording(!isRecording)}
                        className={isRecording ? "bg-destructive text-destructive-foreground" : ""}
                      >
                        {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="p-6 bg-muted rounded-lg">
                        <h3 className="font-medium mb-3">Current Question:</h3>
                        <p className="text-lg">{sampleQuestions[currentQuestion]?.text}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <Badge className={getDifficultyColor(sampleQuestions[currentQuestion]?.difficulty)}>
                            {sampleQuestions[currentQuestion]?.difficulty}
                          </Badge>
                          <Badge variant="outline">{sampleQuestions[currentQuestion]?.category}</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                          disabled={currentQuestion === 0}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => setCurrentQuestion(Math.min(sampleQuestions.length - 1, currentQuestion + 1))}
                          disabled={currentQuestion === sampleQuestions.length - 1}
                        >
                          Next Question
                        </Button>
                        <Button variant="outline" onClick={() => setTimeRemaining(180)}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset Timer
                        </Button>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm opacity-75">Your video feed</p>
                        {isRecording && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-sm">Recording</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsInterviewActive(false)
                        setCurrentQuestion(0)
                        setTimeRemaining(180)
                        setIsRecording(false)
                      }}
                    >
                      End Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Session History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Review your past interview practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSessions
                  .filter((session) => session.status === "completed")
                  .map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold capitalize">{session.type} Interview</h3>
                            <p className="text-sm text-muted-foreground">{session.duration} minutes</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{session.score}</div>
                            <div className="text-sm text-muted-foreground">Overall Score</div>
                          </div>
                        </div>

                        {session.feedback && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Performance Breakdown</h4>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {Object.entries(session.feedback.detailedScores).map(([category, score]) => (
                                  <div key={category} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span className="capitalize">{category.replace(/([A-Z])/g, " $1").trim()}</span>
                                      <span>{score}%</span>
                                    </div>
                                    <Progress value={score} className="h-2" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-chart-1" />
                                  Strengths
                                </h4>
                                <ul className="space-y-1 text-sm">
                                  {session.feedback.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-chart-1 rounded-full mt-2" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-chart-4" />
                                  Areas for Improvement
                                </h4>
                                <ul className="space-y-1 text-sm">
                                  {session.feedback.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-chart-4 rounded-full mt-2" />
                                      {improvement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Video className="w-4 h-4 mr-2" />
                                Watch Recording
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download Report
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
