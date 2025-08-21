import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Briefcase,
  MessageSquare,
  FileText,
  Video,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react"
import Link from "next/link"

export function DashboardContent() {
  const quickStats = [
    { label: "Courses Completed", value: "12", change: "+2 this month", icon: BookOpen, color: "text-chart-1" },
    { label: "Job Applications", value: "8", change: "+3 this week", icon: Briefcase, color: "text-chart-2" },
    { label: "Interview Scheduled", value: "3", change: "Next: Tomorrow", icon: Calendar, color: "text-chart-3" },
    { label: "Profile Views", value: "47", change: "+12 this week", icon: TrendingUp, color: "text-chart-4" },
  ]

  const recentActivities = [
    {
      type: "course",
      title: 'Completed "Advanced Interview Skills"',
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-chart-1",
    },
    {
      type: "application",
      title: "Applied to Software Engineer at TechCorp",
      time: "1 day ago",
      icon: Briefcase,
      color: "text-chart-2",
    },
    {
      type: "message",
      title: "New message from Sarah (Recruiter)",
      time: "2 days ago",
      icon: MessageSquare,
      color: "text-chart-3",
    },
    {
      type: "interview",
      title: "Mock interview feedback received",
      time: "3 days ago",
      icon: Video,
      color: "text-chart-4",
    },
  ]

  const upcomingSessions = [
    { title: "React Advanced Patterns", instructor: "Dr. Smith", time: "Today, 2:00 PM", type: "Live Session" },
    {
      title: "Mock Interview with Google Recruiter",
      instructor: "Jane Doe",
      time: "Tomorrow, 10:00 AM",
      type: "Interview",
    },
    { title: "Career Fair Q&A", instructor: "Multiple Recruiters", time: "Friday, 3:00 PM", type: "Event" },
  ]

  const recommendedCourses = [
    { title: "System Design Fundamentals", rating: 4.8, students: 1234, duration: "6 weeks" },
    { title: "Data Structures & Algorithms", rating: 4.9, students: 2156, duration: "8 weeks" },
    { title: "Behavioral Interview Mastery", rating: 4.7, students: 987, duration: "3 weeks" },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your most important tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Link href="/resume-scanner">
              <Button className="h-auto p-4 justify-start gap-3 bg-transparent w-full" variant="outline">
                <FileText className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Scan Resume</div>
                  <div className="text-sm text-muted-foreground">Get AI-powered feedback</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>

            <Link href="/interview-practice">
              <Button className="h-auto p-4 justify-start gap-3 bg-transparent w-full" variant="outline">
                <Video className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Practice Interview</div>
                  <div className="text-sm text-muted-foreground">Book a mock session</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>

            <Link href="/placement">
              <Button className="h-auto p-4 justify-start gap-3 bg-transparent w-full" variant="outline">
                <Briefcase className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Browse Jobs</div>
                  <div className="text-sm text-muted-foreground">Find new opportunities</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>

            <Link href="/chat">
              <Button className="h-auto p-4 justify-start gap-3 bg-transparent w-full" variant="outline">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Chat with Recruiters</div>
                  <div className="text-sm text-muted-foreground">2 new messages</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your current course progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>React Advanced Patterns</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>System Design</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Interview Skills</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled events and classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 mt-0.5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{session.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {session.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{session.instructor}</p>
                    <p className="text-xs text-muted-foreground">{session.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Courses that match your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">{course.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <Link href="/training">
                    <Button size="sm" className="w-full">
                      Enroll Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
