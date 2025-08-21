"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Building2,
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Clock,
  Star,
  BookOpen,
  Download,
  Eye,
  Heart,
  ExternalLink,
  Filter,
  Calendar,
} from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Internship" | "Contract"
  salary: string
  posted: string
  description: string
  requirements: string[]
  applied: boolean
  logo: string
}

interface Company {
  id: string
  name: string
  industry: string
  size: string
  location: string
  rating: number
  description: string
  openPositions: number
  logo: string
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    posted: "2 days ago",
    description: "Join our dynamic team to build cutting-edge web applications using React and modern technologies.",
    requirements: ["React", "TypeScript", "Node.js", "3+ years experience"],
    applied: true,
    logo: "/placeholder.svg?height=40&width=40&text=TC",
  },
  {
    id: "2",
    title: "Software Engineer Intern",
    company: "StartupXYZ",
    location: "Remote",
    type: "Internship",
    salary: "$25/hour",
    posted: "1 week ago",
    description: "Great opportunity for students to gain real-world experience in full-stack development.",
    requirements: ["JavaScript", "Python", "Git", "Currently enrolled in CS program"],
    applied: false,
    logo: "/placeholder.svg?height=40&width=40&text=SX",
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "DataFlow Systems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    posted: "3 days ago",
    description: "Build scalable backend systems and APIs for our data processing platform.",
    requirements: ["Python", "PostgreSQL", "AWS", "5+ years experience"],
    applied: false,
    logo: "/placeholder.svg?height=40&width=40&text=DF",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "DesignStudio Pro",
    location: "Austin, TX",
    type: "Contract",
    salary: "$60 - $80/hour",
    posted: "5 days ago",
    description: "Create beautiful and intuitive user interfaces for mobile and web applications.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Portfolio required"],
    applied: true,
    logo: "/placeholder.svg?height=40&width=40&text=DS",
  },
]

const companies: Company[] = [
  {
    id: "1",
    name: "TechCorp Inc.",
    industry: "Technology",
    size: "1000-5000",
    location: "San Francisco, CA",
    rating: 4.5,
    description: "Leading technology company focused on innovative software solutions.",
    openPositions: 12,
    logo: "/placeholder.svg?height=60&width=60&text=TC",
  },
  {
    id: "2",
    name: "StartupXYZ",
    industry: "Fintech",
    size: "50-200",
    location: "Remote",
    rating: 4.2,
    description: "Fast-growing fintech startup revolutionizing digital payments.",
    openPositions: 8,
    logo: "/placeholder.svg?height=60&width=60&text=SX",
  },
  {
    id: "3",
    name: "DataFlow Systems",
    industry: "Data Analytics",
    size: "500-1000",
    location: "New York, NY",
    rating: 4.7,
    description: "Enterprise data analytics platform serving Fortune 500 companies.",
    openPositions: 15,
    logo: "/placeholder.svg?height=60&width=60&text=DF",
  },
  {
    id: "4",
    name: "DesignStudio Pro",
    industry: "Design Agency",
    size: "20-50",
    location: "Austin, TX",
    rating: 4.3,
    description: "Creative design agency specializing in digital experiences.",
    openPositions: 5,
    logo: "/placeholder.svg?height=60&width=60&text=DS",
  },
]

const resumeTemplates = [
  {
    id: "1",
    name: "Professional",
    description: "Clean and modern design for corporate roles",
    preview: "/placeholder.svg?height=300&width=200&text=Professional",
  },
  {
    id: "2",
    name: "Creative",
    description: "Eye-catching design for creative positions",
    preview: "/placeholder.svg?height=300&width=200&text=Creative",
  },
  {
    id: "3",
    name: "Technical",
    description: "Structured layout perfect for technical roles",
    preview: "/placeholder.svg?height=300&width=200&text=Technical",
  },
  {
    id: "4",
    name: "Minimalist",
    description: "Simple and elegant design",
    preview: "/placeholder.svg?height=300&width=200&text=Minimalist",
  },
]

const interviewGuides = [
  {
    id: "1",
    title: "Behavioral Interview Mastery",
    type: "Video Course",
    duration: "2 hours",
    description: "Learn the STAR method and practice common behavioral questions",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Behavioral",
  },
  {
    id: "2",
    title: "Technical Interview Prep",
    type: "Interactive Guide",
    duration: "45 min",
    description: "Coding challenges and system design fundamentals",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Technical",
  },
  {
    id: "3",
    title: "Salary Negotiation Strategies",
    type: "PDF Guide",
    duration: "30 min",
    description: "Research-backed techniques for negotiating your worth",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Salary",
  },
  {
    id: "4",
    title: "Virtual Interview Best Practices",
    type: "Video Tutorial",
    duration: "25 min",
    description: "Master remote interviews with technical setup and etiquette",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Virtual",
  },
]

export function PlacementResourcesContent() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [searchTerm, setSearchTerm] = useState("")
  const [jobFilter, setJobFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = jobFilter === "all" || job.type === jobFilter
    return matchesSearch && matchesFilter
  })

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = companyFilter === "all" || company.industry === companyFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Placement Resources</h1>
        <p className="text-muted-foreground mt-2">Everything you need to land your dream job</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-chart-1" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-chart-2" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-chart-3" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-chart-4" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="jobs">Job Board</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
          <TabsTrigger value="guides">Interview Guides</TabsTrigger>
        </TabsList>

        {/* Job Board Tab */}
        <TabsContent value="jobs" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs or companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={jobFilter} onValueChange={setJobFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-12 h-12 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Heart className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button size="sm" disabled={job.applied}>
                              {job.applied ? "Applied" : "Apply Now"}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </div>
                          <Badge variant={job.applied ? "default" : "secondary"}>{job.type}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search companies or industries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Fintech">Fintech</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="Design Agency">Design Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Company Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={company.logo || "/placeholder.svg"} alt={company.name} className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span className="text-sm">{company.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{company.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{company.size} employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{company.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open Positions:</span>
                      <Badge variant="secondary">{company.openPositions}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      View Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resume Builder Tab */}
        <TabsContent value="resume" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Builder</CardTitle>
                  <CardDescription>Create a professional resume with our easy-to-use builder</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button className="h-auto p-6 justify-start gap-4 bg-transparent" variant="outline">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Create New Resume</div>
                        <div className="text-sm text-muted-foreground">Start from scratch with guided steps</div>
                      </div>
                    </Button>
                    <Button className="h-auto p-6 justify-start gap-4 bg-transparent" variant="outline">
                      <Download className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Upload Existing Resume</div>
                        <div className="text-sm text-muted-foreground">Import and enhance your current resume</div>
                      </div>
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Choose a Template</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {resumeTemplates.map((template) => (
                        <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <img
                              src={template.preview || "/placeholder.svg"}
                              alt={template.name}
                              className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            <Button size="sm" className="w-full mt-3">
                              Use Template
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="font-medium text-sm">Keep it concise</p>
                        <p className="text-xs text-muted-foreground">Limit to 1-2 pages maximum</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="font-medium text-sm">Use action verbs</p>
                        <p className="text-xs text-muted-foreground">Start bullet points with strong verbs</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="font-medium text-sm">Quantify achievements</p>
                        <p className="text-xs text-muted-foreground">Include numbers and percentages</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="font-medium text-sm">Tailor for each job</p>
                        <p className="text-xs text-muted-foreground">Customize keywords and skills</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Resumes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Software Engineer Resume</p>
                      <p className="text-xs text-muted-foreground">Updated 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Frontend Developer Resume</p>
                      <p className="text-xs text-muted-foreground">Updated 1 week ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Interview Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Preparation Guides</CardTitle>
              <CardDescription>Master your interviews with our comprehensive preparation materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {interviewGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <img
                        src={guide.thumbnail || "/placeholder.svg"}
                        alt={guide.title}
                        className="w-full h-32 object-cover rounded-md mb-4"
                      />
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold">{guide.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{guide.type}</Badge>
                            <span className="text-sm text-muted-foreground">{guide.duration}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Start Guide
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Interview Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Interview Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Before the Interview</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Research the company thoroughly</li>
                    <li>• Practice common questions</li>
                    <li>• Prepare your own questions</li>
                    <li>• Test your tech setup (for virtual)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">During the Interview</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Arrive 10-15 minutes early</li>
                    <li>• Use the STAR method for stories</li>
                    <li>• Ask thoughtful questions</li>
                    <li>• Show enthusiasm and interest</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">After the Interview</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Send a thank-you email within 24h</li>
                    <li>• Reflect on your performance</li>
                    <li>• Follow up appropriately</li>
                    <li>• Continue your job search</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
