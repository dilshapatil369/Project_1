"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Target,
  TrendingUp,
  RefreshCw,
} from "lucide-react"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string[]
  }>
  education: Array<{
    degree: string
    school: string
    year: string
    gpa?: string
  }>
  skills: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  certifications: string[]
}

interface AnalysisResult {
  overallScore: number
  scores: {
    format: number
    content: number
    keywords: number
    experience: number
    skills: number
  }
  strengths: string[]
  improvements: Array<{
    category: string
    issue: string
    suggestion: string
    priority: "high" | "medium" | "low"
  }>
  missingKeywords: string[]
  atsCompatibility: number
}

const mockResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
  },
  summary:
    "Computer Science student with 2+ years of experience in full-stack development. Passionate about creating efficient, scalable web applications using modern technologies.",
  experience: [
    {
      title: "Software Engineering Intern",
      company: "TechCorp Inc.",
      duration: "Jun 2023 - Aug 2023",
      description: [
        "Developed React components for customer dashboard, improving user engagement by 25%",
        "Implemented REST APIs using Node.js and Express, handling 1000+ daily requests",
        "Collaborated with cross-functional team of 8 developers using Agile methodology",
      ],
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "Jan 2023 - May 2023",
      description: [
        "Built responsive web applications using React and TypeScript",
        "Optimized application performance, reducing load times by 40%",
        "Mentored 2 junior developers on best practices and code review",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "Expected May 2024",
      gpa: "3.8",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Docker",
    "MongoDB",
    "Express.js",
    "HTML/CSS",
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack web application with user authentication, payment processing, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    },
    {
      name: "Task Management App",
      description: "Real-time collaborative task management tool with drag-and-drop functionality",
      technologies: ["React", "Socket.io", "Express.js", "PostgreSQL"],
    },
  ],
  certifications: ["AWS Cloud Practitioner", "Google Analytics Certified"],
}

const mockAnalysis: AnalysisResult = {
  overallScore: 78,
  scores: {
    format: 85,
    content: 75,
    keywords: 70,
    experience: 80,
    skills: 82,
  },
  strengths: [
    "Strong technical skills section with relevant technologies",
    "Quantified achievements in work experience",
    "Clean, professional formatting",
    "Relevant project experience showcased",
    "Good balance of technical and soft skills",
  ],
  improvements: [
    {
      category: "Keywords",
      issue: "Missing industry-specific keywords",
      suggestion: "Add keywords like 'Agile', 'Scrum', 'CI/CD', 'Microservices' to match job descriptions",
      priority: "high",
    },
    {
      category: "Summary",
      issue: "Generic professional summary",
      suggestion: "Tailor your summary to specific roles and include your career goals",
      priority: "high",
    },
    {
      category: "Experience",
      issue: "Limited work experience details",
      suggestion: "Add more specific metrics and outcomes for each role",
      priority: "medium",
    },
    {
      category: "Education",
      issue: "Missing relevant coursework",
      suggestion: "Include relevant coursework, academic projects, or honors",
      priority: "low",
    },
  ],
  missingKeywords: ["Agile", "Scrum", "CI/CD", "Microservices", "REST API", "GraphQL", "Redux"],
  atsCompatibility: 82,
}

export function ResumeScanner() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setActiveTab("analysis")
      setIsAnalyzing(true)

      // Simulate AI analysis
      setTimeout(() => {
        setResumeData(mockResumeData)
        setAnalysis(mockAnalysis)
        setIsAnalyzing(false)
      }, 3000)
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file)
      setActiveTab("analysis")
      setIsAnalyzing(true)

      setTimeout(() => {
        setResumeData(mockResumeData)
        setAnalysis(mockAnalysis)
        setIsAnalyzing(false)
      }, 3000)
    }
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return XCircle
      case "medium":
        return AlertTriangle
      case "low":
        return CheckCircle
      default:
        return CheckCircle
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Resume Scanner</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered feedback to optimize your resume for job applications
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!resumeData}>
            Analysis Results
          </TabsTrigger>
          <TabsTrigger value="optimize" disabled={!analysis}>
            Optimization
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>Upload your resume in PDF, DOC, or DOCX format for AI-powered analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop your resume here</h3>
                <p className="text-muted-foreground mb-4">or click to browse files</p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {uploadedFile && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null)
                        setResumeData(null)
                        setAnalysis(null)
                        setActiveTab("upload")
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI analyzes your resume structure, content, and keywords
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">ATS Optimization</h3>
                <p className="text-sm text-muted-foreground">Ensure your resume passes Applicant Tracking Systems</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Get specific, actionable recommendations to enhance your resume
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {isAnalyzing ? (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium mb-2">Analyzing Your Resume</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI is reviewing your resume structure, content, and keywords...
                </p>
                <Progress value={66} className="w-64 mx-auto" />
              </CardContent>
            </Card>
          ) : analysis ? (
            <>
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Resume Analysis Results</CardTitle>
                  <CardDescription>Comprehensive analysis of your resume quality and optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${analysis.overallScore}, 100`}
                            className="text-primary"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-muted"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{analysis.overallScore}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold">Overall Score</h3>
                      <p className="text-muted-foreground">
                        {analysis.overallScore >= 80
                          ? "Excellent"
                          : analysis.overallScore >= 60
                            ? "Good"
                            : "Needs Improvement"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(analysis.scores).map(([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{category}</span>
                            <span>{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths and Improvements */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-chart-1" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-chart-1 rounded-full mt-2" />
                          <p className="text-sm">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-chart-4" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.improvements.slice(0, 3).map((improvement, index) => {
                        const Icon = getPriorityIcon(improvement.priority)
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="font-medium text-sm">{improvement.category}</span>
                              <Badge variant={getPriorityColor(improvement.priority) as any} className="text-xs">
                                {improvement.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">{improvement.issue}</p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ATS Compatibility */}
              <Card>
                <CardHeader>
                  <CardTitle>ATS Compatibility Score</CardTitle>
                  <CardDescription>How well your resume will perform with Applicant Tracking Systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span>ATS Compatibility</span>
                        <span>{analysis.atsCompatibility}%</span>
                      </div>
                      <Progress value={analysis.atsCompatibility} className="h-3" />
                    </div>
                    <Badge
                      variant={analysis.atsCompatibility >= 80 ? "default" : "secondary"}
                      className="text-sm px-3 py-1"
                    >
                      {analysis.atsCompatibility >= 80 ? "ATS Friendly" : "Needs Optimization"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimize" className="space-y-6">
          {analysis && (
            <>
              {/* Detailed Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Improvement Suggestions</CardTitle>
                  <CardDescription>Prioritized recommendations to enhance your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analysis.improvements.map((improvement, index) => {
                      const Icon = getPriorityIcon(improvement.priority)
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <Icon className="w-5 h-5 mt-1" />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{improvement.category}</h4>
                                <Badge variant={getPriorityColor(improvement.priority) as any}>
                                  {improvement.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{improvement.issue}</p>
                              <div className="bg-muted p-3 rounded-md">
                                <p className="text-sm">
                                  <strong>Suggestion:</strong> {improvement.suggestion}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle>Missing Keywords</CardTitle>
                  <CardDescription>Important keywords that could improve your resume's visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Click on keywords to add them to your resume optimization notes.
                  </p>
                </CardContent>
              </Card>

              {/* Download Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Download Optimized Resume</CardTitle>
                  <CardDescription>Get your improved resume with AI-powered enhancements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button className="h-auto p-4 justify-start gap-4 bg-transparent" variant="outline">
                      <Download className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Download Analysis Report</div>
                        <div className="text-sm text-muted-foreground">Detailed PDF report with all suggestions</div>
                      </div>
                    </Button>
                    <Button className="h-auto p-4 justify-start gap-4">
                      <FileText className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-medium">Download Optimized Resume</div>
                        <div className="text-sm text-primary-foreground/80">Enhanced version with improvements</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
